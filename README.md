# Deno Docs — maintained Markdown/MDX migration

The pinned Deno documentation corpus is maintained as Markdown, MDX, frontmatter, JSX components and structured reference inputs under `authored/`. A corpus-bounded compatibility renderer creates transient HTML; Nift composes it through explicit raw-file dependencies. No Nift core changes or native `@markup` performance claims are involved.

Run the complete publication with `python3 scripts/build.py`. Set `DENO_BIN` to the pinned Deno executable and `DENO_DIR` to a prepared dependency cache. `python3 scripts/build.py --force` recomputes derived content and exports and forces Nift composition. Running `nift build` alone does not update compatibility-derived content.

Application caches live only in ignored `.generated/`. Page reuse checks explicit source/code/data/toolchain inputs and validates output hashes. Cross-page frontmatter and shared inputs invalidate conservatively. Ordinary body edits invalidate the corresponding page; search/LLM projections use a conservative whole-stage key. Missing/corrupted derived outputs are recomputed. Fresh application state renders the entire corpus.

OG images are maintained static assets under `assets/og/`, mapped to original public URLs by `data/og-assets.json`. Ordinary publication never regenerates them. Use `python3 scripts/update-og.py --route /runtime/run/` for an explicit image update, or `--all` for intentional corpus-wide maintenance. Image update cost is separate from normal publication.

Prepared reference JSON/types and compiled browser assets have explicit acquisition/refresh ownership; ordinary publication does not repeat upstream live dependency acquisition. Markdown downloads derive directly from maintained source. Search and LLM exports remain derived outputs. See `investigation/D5-COMPLETE-PUBLICATION.md`, `D6-WHOLE-SITE-PARITY.md`, and `D8-STATIC-OG-ASSETS.md` for the frozen parity and ownership contracts.

Read AGENTS.md → MIGRATION.md → HANDOVER.md before migration work. The original architecture, first static-asset observations and optimized measurements must remain distinguishable. D0–D9 profiling, benchmarks and lifecycle gates are complete. See [the final comparison](investigation/D9-COMPARISON.md) and [final init review](investigation/MIGRATION-INIT-FINAL-REVIEW.md). Deno Labs publication remains on hold by user instruction. [Final fresh-checkout verification](investigation/D9-CLOSEOUT.md) passed with complete byte equality and clean sources.
