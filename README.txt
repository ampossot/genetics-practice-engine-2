GENETICS PRACTICE ENGINE 2.0 — PHASE 1 FOUNDATION

What changed
------------
• The V5 interface and question behavior were preserved.
• CSS was extracted to css/styles.css.
• Runtime JavaScript was extracted to js/app.js.
• The complete Linkage chapter was moved to topics/linkage.js.
• Core module destinations were created for engine, scheduler, session,
  storage, UI, data, and every remaining topic.
• index.html now loads the application as an ES module.

Important deployment note
-------------------------
Upload the entire folder, preserving its structure. Do not open index.html
directly with file:// because browser module security may block imports.
Test it through Cloudflare Pages or a local web server.

Suggested local test
--------------------
From inside this folder run:

python3 -m http.server 8000

Then open:
http://localhost:8000

Next phase
----------
Move one remaining topic at a time from js/app.js into its matching file
inside topics/. After each extraction, test every mode and difficulty.
