# Happy Birthday — Love Site

A single-page, responsive, love-themed birthday site using **vanilla HTML/CSS/JS**. No frameworks or build tools.

## Quick Start

1. Edit text in **`script.js`** at the top inside the `CONTENT` object:
   - `herName`, `yourName`, `birthdayISO` (YYYY-MM-DD), `heroSub`
   - `timeline`, `reasons`, `loveNotes`, `letter`
2. Replace images in `assets/`:
   - `hero.jpg`, `gallery-1.jpg` … `gallery-6.jpg`, `favicon.png`, `heart.svg`, optional `song.mp3`
3. Open `index.html` in a browser to preview.

### Accessibility
- Semantic landmarks (`header`, `main`, `footer`), alt text, visible focus outlines.
- Keyboard: gallery lightbox supports **Esc**, **←**, **→**. Carousel has prev/next and dots, with `aria` attributes.
- Respects **prefers-reduced-motion**: animations are disabled/softened.

### Performance & SEO
- Fonts preloaded; images marked `loading="lazy"`.
- Meta: `title`, `description`, `theme-color`, Open Graph / Twitter.
- Lightweight confetti heart animation implemented in `script.js` (no external deps).

## Customize Text & Images

- All text lives in the `CONTENT` object in **`script.js`**.
- Replace image placeholders in `assets/` with your photos (keep the same filenames or update paths in `index.html`).

## Optional Music
Place a single MP3 at `assets/song.mp3`. Music **does not autoplay**; use the Play/Pause button in the header. User choice is remembered with `localStorage`.

## GitHub Pages Deploy

```bash
# Inside this folder:
git init
git add .
git commit -m "Initial cute birthday site"
git branch -M main
git remote add origin https://github.com/<your-username>/happy-birthday.git
git push -u origin main
```

Then in your GitHub repo:
- Go to **Settings → Pages**
- **Source:** "Deploy from a branch"
- **Branch:** `main` and **Folder:** `/ (root)` → **Save`
- Your site will be at `https://<your-username>.github.io/happy-birthday/`

### Custom Domain (optional)
- Add your domain under **Settings → Pages**
- Create a DNS `CNAME` record pointing to `<your-username>.github.io`
- GitHub will create a `CNAME` file in your repo automatically.

### Disable Jekyll (optional)
If you ever need it, add an empty `.nojekyll` file at the repo root to disable Jekyll.

## Notes
- This project intentionally uses **no frameworks** and can be hosted as plain static files.
- Works from mobile to desktop (around 320px up to 1440px+).
