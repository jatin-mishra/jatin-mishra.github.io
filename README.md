# jatin-mishra.github.io

Personal portfolio. Plain static HTML/CSS/JS — no build step.

- `index.html` — all content lives here
- `styles.css` — design tokens at the top (`:root`)
- `script.js` — scroll-reveal only
- `assets/` — profile photo, favicon, OG image
- `Jatin_Resume.pdf` — linked from the hero

## Deploy

Push to `main`. GitHub Pages (Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`) serves it at https://jatin-mishra.github.io/.

## Local preview

```sh
python3 -m http.server 8000
```
