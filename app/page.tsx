import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-zinc-50">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-16">
          <h1 className="text-5xl font-bold mb-4 text-zinc-900">
            My Blog
          </h1>
          <p className="text-xl text-zinc-600">
            Welcome to my blog. I write about web development, programming, and more.
          </p>
        </header>

        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-zinc-200 pb-12">
              <Link href={`/posts/${post.slug}`} className="group">
                <h2 className="text-3xl font-bold mb-3 text-zinc-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
              </Link>
              <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>•</span>
                <span>{post.author}</span>
              </div>
              <p className="text-lg text-zinc-600 mb-4">
                {post.excerpt}
              </p>
              <Link
                href={`/posts/${post.slug}`}
                className="inline-flex items-center text-blue-600 hover:underline font-medium"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
