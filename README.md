# deno

Deno Docs migration experiment. Setup only; no migrated publication yet.

Read AGENTS.md → MIGRATION.md → HANDOVER.md. D0 initialization review is in investigation/MIGRATION-INIT-REVIEW.md. Source/reference/tooling remain outside this repository.

Preserve authored Markdown/MDX, frontmatter, structured reference inputs and useful source organization. Prove corpus-driven compatibility before broad migration; transient rendered bodies are not maintained source.

Scaffold check: `nift build` then `nift status`. Upstream production entry point: `deno task build`, not build:light. Required parity and production methodology are in MIGRATION.md.
