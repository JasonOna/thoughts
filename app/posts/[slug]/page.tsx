import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import '@/app/posts/post.css';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <main className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          ← Back to all posts
        </Link>

        <article className="prose prose-slate max-w-none">
          <h1 className="text-5xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            {post.title}
          </h1>
          <div className="text-gray-600 mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>{' '}
            • {post.author}
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    </div>
  );
}
