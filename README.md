# Cherry Website

Official landing page for **Cherry**, an open-source beta task flow todo app.

## What this site communicates

- Cherry is currently a **beta / prototype**.
- Cherry is not just another flat todo list.
- The main idea is to organize tasks as **flows, branches, and schedules**.
- The project is moving toward a more polished open-source release.

## Files

```text
.
├── index.html
├── styles.css
├── script.js
├── .nojekyll
└── README.md
```

## Demo video / background motion

The hero section currently uses a CSS/JS animated product preview so the page looks alive even before a real video exists.

When a real screen recording is ready, recommended next step:

1. Add the video file as `assets/cherry-demo.mp4`.
2. Replace the animated `.video-frame` content in `index.html` with a muted autoplay video.
3. Keep a static poster image for slow connections and reduced-motion users.

Example:

```html
<video class="hero-video" autoplay muted loop playsinline poster="./assets/cherry-demo-poster.webp">
  <source src="./assets/cherry-demo.mp4" type="video/mp4" />
</video>
```

## Local preview

Open `index.html` directly, or run a local static server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Related repositories

- App: https://github.com/Fugu0141/Cherry-ToDo
- Website: https://github.com/Fugu0141/Cherry-ToDo_website
