# Customization Guide for A Nest Level Portfolio

Welcome to the customization playground! 🌿💻 This template is designed to be as flexible as a Sri Lankan tea plantation breeze – tweak it to reflect *your* story, style, and skills. Whether you're a solo dev from Colombo or a design duo in Kandy, these steps will help you make it yours without breaking a sweat.

This guide covers **beginner-friendly edits** to **pro-level hacks**. Fork the repo, fire up `npm run dev`, and let's dive in. Remember: Changes are live-reloadable in dev mode!

## 🎨 Quick Wins: Basic Customizations

Start here to personalize without touching code. All edits are in `index.html` unless noted.

### 1. **Hero Section: Your Intro Spotlight**
   - **Name & Tagline**: Swap "KELUM S. VIDU RANGA" in `<h1>` with your name. Update the typewriter (`#typewriter`) text in `src/main.js` (e.g., `gsap.to('#typewriter', { text: "Your Skills | Here | Now", ... });`).
   - **Profile Image**: Replace `/public/kelum-viduranga-portrait.jpg` with your photo (aspect 4:5, <500KB). Update `src` in `<img>`.
   - **Badge**: Edit the floating "FULL STACK CREATIVE" div for your title.

### 2. **About Section: Your Origin Story**
   - **Location**: Change "NUWARA ELIYA" to your city (e.g., "COLOMBO"). Update the SVG map path if you're not in Sri Lanka (or keep it for flair!).
   - **Bio Text**: Rewrite the `<p>` paragraph to tell your tale.
   - **Stats**: In `src/main.js`, tweak `updateTimeBasedStats()` for birthdate (`birthDate`) and career start (`careerStartDate`). Projects calc is approximate – adjust the multiplier.

### 3. **Works Gallery: Showcase Your Projects**
   - **Add/Remove Cards**: Duplicate the `<div class="work-item">` blocks in `#works-wrapper`. Update:
     - Image: `src="/your-project-screenshot.jpg"` (add to `/public/`).
     - Title/Desc: `<h3>` and `<p>`.
     - Tag: Top-right badge (e.g., "MOBILE APP").
     - Number: Sequential "04", etc.
   - **Horizontal Scroll**: Adjust `gap-20` in flex for spacing; tweak `w-[80vw]` for card width.

### 4. **Skills Timeline: Expertise Ladder**
   - **Add Services**: Duplicate `<div data-gsap="service-item">` blocks. Customize:
     - Icon: Remix Icon class (e.g., `ri-brush-3-fill` for design).
     - Title/Desc: `<h3>` and `<p>`.
     - List: `<ul>` items (e.g., "Vue.js", "MongoDB").
   - **Progress Line**: In `src/main.js`, modify `#scroll-line` scrub speed.

### 5. **Contact: Your Digital Doorway**
   - **Links**: Update hrefs (GitHub, email, WhatsApp). Add more icons (e.g., LinkedIn: `ri-linkedin-box-fill`).
   - **Footer**: Change copyright year/name in `<p>&copy; ...`.

| Quick Edit | File | Pro Tip |
|------------|------|---------|
| Text/Content | `index.html` | Use semantic tags for SEO. |
| Images | `/public/` | Optimize with TinyPNG (<100KB each). |
| Stats/Age | `src/main.js` | Birthdate affects chronometer – set accurately! |
| Colors | `src/main.css` (CSS vars) | `--accent: #your-hex;` for global tweaks. |

## ⚡ Advanced: Level Up Your Template

For those who love diving deep – edit JS/CSS for magic.

### 1. **Themes & Dark Mode**
   - Add a toggle in nav: `<button id="theme-toggle">🌙</button>`.
   - In `src/main.js`: 
     ```js
     const toggle = document.getElementById('theme-toggle');
     toggle.addEventListener('click', () => {
       document.body.classList.toggle('dark');
       // GSAP for smooth transition
       gsap.to('body', { backgroundColor: document.body.classList.contains('dark') ? '#111' : '#fff', duration: 0.5 });
     });
     ```
   - In `src/main.css`: Add dark variants (e.g., `@media (prefers-color-scheme: dark) { ... }`).

### 2. **Custom Animations**
   - **Hero Reveal**: In `src/main.js`, extend the loader timeline (`tl.to(...)`) for new staggers.
   - **Magnetic Elements**: Add class `magnetic-btn` to any interactive (e.g., social icons).
   - **Parallax**: Duplicate `.parallax-element` with custom `data-speed` (e.g., -0.3 for upward float).
   - **Clip-Path Morphs**: Tweak `.hero-img-container` polygon for unique shapes.

### 3. **Performance Tweaks**
   - **Bundle Size**: In `vite.config.js`, up `maxSizeInKb` if adding assets.
   - **Lazy Load**: Add `loading="lazy"` to work images.
   - **Obfuscation**: Dial down `controlFlowFlattening` in config if GSAP breaks.

### 4. **Integrations**
   - **Blog Feed**: Add RSS via JS fetch in a new section.
   - **Form**: Replace contact links with Netlify Forms (add `netlify` attribute to `<form>`).
   - **Analytics**: Drop GA script in `<head>`.

## 🔧 Troubleshooting Common Hiccups

| Issue | Cause | Fix |
|-------|-------|-----|
| **Build Fails (PostCSS)** | Missing Tailwind directives | Add `@tailwind base; @tailwind components; @tailwind utilities;` to `src/main.css`. |
| **Animations Lag** | GSAP/Lenis conflict | Refresh ScrollTrigger: `ScrollTrigger.refresh()` after loader. |
| **Images 404** | Wrong path | Ensure `/public/filename.jpg`; use absolute `/`. |
| **Mobile Scroll Jumps** | Lenis touch | Set `smoothTouch: true` in Lenis init. |
| **Obfuscation Breaks JS** | Heavy flattening | Set `controlFlowFlattening: false` in `vite.config.js`. |

Run `npm run build` after changes – check console for errors. Still stuck? [Open an issue](https://github.com/dnuzi/Portfolio-Site/issues/new) with your setup details.

## 📚 Resources & Inspiration

- **GSAP Docs**: [greensock.com/docs](https://greensock.com/docs) – Timeline mastery.
- **Tailwind Playground**: [play.tailwindcss.com](https://play.tailwindcss.com) – Utility experiments.
- **Vite Guide**: [vitejs.dev/guide](https://vitejs.dev/guide) – Build secrets.
- **Sri Lankan Dev Vibes**: Check [LankaDev](https://lankadev.org) for local collabs.
- **Inspo Repos**: [brittanychiang.com](https://brittanychiang.com) (similar animations).

## 🌟 Final Touches

Your portfolio isn't just code – it's your digital handshake. Test on real devices, get feedback from peers, and iterate like the monsoons: steady and transformative.

---

**Crafted by [Danu'Zz & Kelum'Xz](https://github.com/dnuzi)**  
*January 2026 Edition* | [YouTube Tutorials](https://www.youtube.com/@MovaNest)  

[Back to README](README.md) | [Contribute](CONTRIBUTING.md)  

> "Customize like a spice trader – blend boldly, taste often." 🧂
