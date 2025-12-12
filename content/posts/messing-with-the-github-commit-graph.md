---
title: "Messing with the GitHub Commit Graph"
date: "2025-12-08"
excerpt: "I want to mess with the GitHub commit graph bc I'm looking for work and haven't committed to anything regularly with my personal work."
author: "Jason Ona"
---

## Intro

I want to mess with the GitHub commit graph bc I'm looking for work and haven't committed to anything regularly with my personal work. I don't think this makes me a bad developer, and I'm not going to take this lack of commits seriously. Instead, I thought it would be fun to write a script to get the word PIZZA! on the graph to show:

* Hey, I haven't done anything in my repo lately
* But, I can automate solutions to interesting problems—hopefully that demonstrates I can ship production-grade software
* I'm a fun loving guy (insert [Kawhi Leonard Laugh](https://www.youtube.com/watch?v=MKQiCJULEBM) here)

---

### The start

I started with GitHub Copilot. The prompt:

``` text
I want to mess with my github contributions graph. Create commits that would cause the commit graph to write the word "Pizza!" How would I do this?
```

Amazingly, it knew exactly what I was going for and generated something useable immediately:

* Python script that
  * mapped out dates that would spell the Pizza word
  * utilized Git's `--allow-empty` commit feature for backdated commits
    * `subprocess.run(["git", "commit", "--allow-empty", "-m", commit_message], check=True, env=env, stdout=subprocess.DEVNULL)`
    * manipulated `GIT_AUTHOR_DATE` and `GIT_COMMITTER_DATE` environment variables
  * Even included a `--dry-run` feature to verify output before execution

### Hurdle 1: Understanding GitHub's Contribution Rules

Apparently empty commits that aren't on important branches don't count :P

``` text
AI Overview

==

No, the GitHub contributions graph does not count empty commits

==

For a commit to be counted as a contribution in the profile graph, it must meet several criteria, and having substantial changes is one of the implicit requirements to distinguish genuine contributions from automated or trivial activity. 

Key conditions for commits to count towards your contributions graph include:

- The commit must be made to the **default branch** of the repository (commonly `main` or `master`, or `gh-pages` for project sites).
- The email address used to author the commit must be **verified and connected** to your GitHub account.
- The repository must not be a fork, or the changes must be merged into the upstream repository via a pull request.
- If in a private repository, you must enable the setting to show private contributions on your profile. 

The system is designed to reflect meaningful work and filters out contributions like empty commits and merge commits in the primary contributor graph.
```

**The fix:** Applied commits directly to `main` and... IT WORKED! Turns out they're not filtering empty commits as long as other criteria are met.

![Pizza commit graph](/images/pizza-commit-graph.png)

> No code is the cleanest code - someone

---

## Cool directions to take this:

* Parameterize the message (make it accept any word via CLI args)
* Support for different fonts/character sets
* Animated sequences across multiple weeks
* eat pizza

---

## The Script

Here's the full implementation with proper error handling, date manipulation, and subprocess management:

https://github.com/JasonOna/Blog/blob/main/generate_pizza.py
