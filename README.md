# jatin-mishra.github.io

Personal portfolio and blog. The home page is hand-written HTML; the blog is Markdown, built by GitHub Pages' built-in Jekyll on every push.

- `index.html`, `styles.css`, `script.js` — the portfolio (not processed by Jekyll)
- `blog/` — the blog. Every folder is a topic, and the folder path is the URL
- `blog/<topic>/<sub-topic>/_posts/` — the posts in that topic, one Markdown file each
- `blog/<topic>/index.html` — four-line stub that gives the topic its title, description and listing page
- `_drafts/post-template.md` — starting point for a new post (drafts are never published)
- `_layouts/` — page shell (`default.html`), topic listing (`section.html`) and post page (`post.html`)
- `assets/blog.css`, `assets/blog.js` — blog styles and the Mermaid diagram loader
- `assets/blog/<post-name>/` — images for a post
- `_config.yml` — site title, URL, permalink format

## Topics

```
blog/
  agents/      reliability  build  security  observability  mcp  rag  claude-code
  backend/     general  infra  databases
  robotics/    general
  maths/
  physics/
  problems/    debugging  production-systems
```

`blog/agents/mcp/_posts/2026-01-05-scoped-tokens.md` is served at `/blog/agents/mcp/scoped-tokens/`. Each folder also has its own listing page (`/blog/agents/`, `/blog/agents/mcp/`) showing every post beneath it. Topics with no posts stay hidden from the blog's topic links until they have one.

To add a topic or sub-topic, copy an existing folder's `index.html` into a new folder, change its `title` and `description`, and add a `_posts/` folder next to it. Folder names should be lowercase with hyphens. Any folder can hold posts directly, including one that has sub-topics.

Moving a post to another folder changes its URL, so old links to it will break.

## Writing a post

1. Copy `_drafts/post-template.md` to `blog/<topic>/<sub-topic>/_posts/YYYY-MM-DD-post-name.md`. The date becomes the publish date; the folder and name become the URL.
2. Fill in the front matter (`title`, `description`, `tags`) and write the post in Markdown.
3. Commit and push to `main`. The post is live about a minute later.

What posts support:

- **Images** — save to `assets/blog/post-name/` and write `![alt text](/assets/blog/post-name/file.png)`. A line of `*italic text*` directly below becomes the caption.
- **Diagrams** — a fenced code block tagged `mermaid` is rendered in the browser. For hand-drawn diagrams, export an SVG from Excalidraw or draw.io and use it as an image.
- **Code** — fenced blocks with a language name are highlighted at build time.
- **Callouts** — a `>` blockquote; add `{: .warn}` on the next line for the amber variant.
- **Link-preview image** — optional `image: /assets/blog/post-name/cover.png` in the front matter (1200×630). Defaults to `assets/og.jpg`.

Two things to know:

- Posts pass through Liquid, so code samples containing `{{ ... }}` or `{% ... %}` (Jinja, Helm, Go templates) must be wrapped in `{% raw %}` … `{% endraw %}`.
- A post dated in the future is not published until that date.

## Deploy

Push to `main`. GitHub Pages (Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`) builds and serves it at https://jatin-mishra.github.io/. If a build fails, GitHub emails the error and the previous version stays live.

## Local preview (optional)

Needs Ruby 3.x (`brew install ruby` — the Ruby that ships with macOS is too old).

```sh
bundle install
bundle exec jekyll serve --drafts   # http://localhost:4000
```
