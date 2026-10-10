# Physics GRE Practice Exam: source

The page is built by one script, then published as a single HTML file.

    npm install          # gets KaTeX (math typesetting)
    node build.mjs       # writes dist/index.html
    cp dist/index.html index.html   # publish: GitHub Pages serves index.html at the repo root

How it works:
- `src/content/*.mjs` holds the 70 questions, by topic. Each question has a stem,
  five choices, the answer letter, and a worked solution. Math is written in LaTeX between `$...$`.
- `src/content/index.mjs` sets the exam order and the topic list.
- `src/figs.mjs` draws every diagram with the small SVG helpers in `src/draw.mjs`.
- `build.mjs` turns all math into HTML at build time and embeds the math fonts, so the
  finished page needs no math library. The browser runs only `src/app.js`, a small script
  that handles scoring, the timer, and saved progress.
- `tools/verify.py` recomputes every answer key from scratch (needs numpy, scipy, sympy).

To add a question: add an object to a content file, add its `id` to `ORDER` in `index.mjs`, and rebuild.
