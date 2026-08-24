# Adcote House Guest House — Website

A clean, modern, single-page website for Adcote House, a family-run guest
house in Llandudno, North Wales. Built with plain HTML5, CSS3 and vanilla
JavaScript only — no frameworks, no build tools, nothing to install.

## Project Overview

- **Type:** Single-page marketing website with smooth-scroll navigation
- **Tech stack:** HTML5, CSS3, vanilla JavaScript (ES5-friendly)
- **Design:** Boutique guest house style — deep navy, soft cream, warm
  grey and muted gold accents; rounded corners, soft shadows, generous
  whitespace
- **Status:** Structure, styling and content are complete. All photography
  is currently shown as clearly labelled placeholder blocks, ready to be
  swapped for real photos.

## Folder Structure

```
adcote-house/
│
├── index.html                 Main (and only) HTML page
│
├── assets/
│   ├── css/
│   │   └── styles.css         All site styling
│   │
│   ├── js/
│   │   └── script.js          Navigation, form validation, animations
│   │
│   ├── images/
│   │   ├── placeholders/      Drop final guest house photography here
│   │   └── logo/              Drop the official logo file here (optional)
│   │
│   └── icons/
│       └── favicon.svg        Simple "AH" monogram favicon
│
└── README.md                  This file
```

## Local Development

No build step, no dependencies, no installation required.

1. Download or clone the project folder.
2. Open `index.html` directly in a web browser — **or**, for the most
   accurate preview (recommended), serve it with a simple local server:

   **Using VS Code:** install the "Live Server" extension, right-click
   `index.html` and choose **Open with Live Server**.

   **Using Python (if installed):**
   ```
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000` in your browser.

3. Edit `index.html`, `assets/css/styles.css` or `assets/js/script.js` and
   refresh the browser to see your changes — there is nothing to compile.

## Deploying to GitHub

Repository: https://github.com/jabow/adcote-house

1. Initialise git in the project folder (if not already done):
   ```
   git init
   git add .
   git commit -m "Initial version of Adcote House website"
   ```
2. Connect it to the GitHub repository and push:
   ```
   git remote add origin https://github.com/jabow/adcote-house.git
   git branch -M main
   git push -u origin main
   ```
3. To publish it as a live website for free, enable **GitHub Pages**:
   - Go to the repository on GitHub → **Settings** → **Pages**
   - Under "Build and deployment", set **Source** to `Deploy from a branch`
   - Choose the `main` branch and the `/ (root)` folder, then **Save**
   - GitHub will publish the site at `https://jabow.github.io/adcote-house/`

## Replacing the Placeholder Images

Every image area on the site currently shows a navy placeholder block with
the text **"NEW PHOTOGRAPHY COMING SOON"**. These are plain `<div>`
elements styled in CSS (see the `.placeholder-image` and
`.placeholder-overlay` rules in `styles.css`), not `<img>` tags, so they
never show a broken-image icon while you're waiting on real photography.

To swap a placeholder for a real photo:

1. Add your image file to `assets/images/placeholders/` (or `logo/` for
   the site logo). Use descriptive file names, e.g. `exterior-front.jpg`,
   `double-room.jpg`, `breakfast-room.jpg`.
2. In `index.html`, find the placeholder block you want to replace. Each
   one looks like this:

   ```html
   <div class="placeholder-image room-image">
     <div class="placeholder-overlay">
       <p class="placeholder-text">NEW PHOTOGRAPHY COMING SOON</p>
       <p class="placeholder-subtext">Double Room</p>
     </div>
   </div>
   ```

3. Replace it with a real `<img>`, keeping the existing class name (e.g.
   `room-image`, `destination-image`, `hero-media`) so it keeps the same
   size, rounded corners and shadow:

   ```html
   <img src="assets/images/placeholders/double-room.jpg"
        alt="Double room at Adcote House with a comfortable bed and warm lighting"
        class="room-image">
   ```

4. Always write a clear, descriptive `alt` attribute — this matters for
   accessibility and for SEO.
5. Recommended image sizes for best performance and sharpness:
   - Hero background: at least 1920×1080px
   - Room / gallery / destination photos: at least 1200×900px
   - Compress photos before uploading (e.g. with Squoosh or TinyPNG) so
     the site stays fast-loading.

## Changing Text Content

All text lives directly in `index.html` — there is no CMS or database.

- **Section headings and body copy:** edit the text between the HTML tags
  directly, e.g. change the text inside `<h2>Welcome to Adcote House</h2>`
  or the following `<p>` tags.
- **Contact details:** update the address, phone number and email in the
  **Contact** (`#contact`) and **Footer** sections — the phone/email also
  appear as clickable links (`tel:` and `mailto:`), so update both the
  visible text and the `href` value together.
- **Reviews:** the sample testimonials in the **Reviews** (`#reviews`)
  section are placeholders — replace the quote, author and star rating
  with genuine guest reviews when available.
- **Rooms:** each room card in the **Rooms** (`#rooms`) section can be
  edited, duplicated or removed independently — copy an existing
  `<article class="room-card">...</article>` block to add a new room type.
- **Navigation menu:** links are listed in the `<nav class="primary-nav">`
  section near the top of `index.html`, and again in the footer — keep
  both in sync if you add or rename a section.

## Key Features

- Sticky header with active-section highlighting as you scroll
- Mobile hamburger menu for small screens
- Smooth-scrolling single-page navigation
- Scroll-reveal animations on section content
- "Back to top" button that appears after scrolling
- Contact form with plain JavaScript validation (name, email, phone,
  message) — see `assets/js/script.js`
- Fully responsive layout for mobile, tablet, desktop and large screens
- Semantic HTML, keyboard-accessible navigation and a "skip to content"
  link for screen reader and keyboard users

## Notes for Future Maintenance

- No build tools, package managers or frameworks are used — anyone with
  basic HTML/CSS/JS knowledge can maintain this site.
- Colour palette, spacing and font choices are defined once as CSS
  variables at the top of `styles.css` (`:root { ... }`) — change a value
  there to update it site-wide.
- The contact form currently validates input in the browser only and does
  not send data anywhere. To make it functional, connect it to a form
  service (e.g. Formspree, Netlify Forms) or a small backend endpoint —
  see the comment inside the `submit` event handler in `script.js`.
