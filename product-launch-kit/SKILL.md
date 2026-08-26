---
name: product-launch-kit
description: Analyze the current project and produce a ready-to-submit product launch content kit for Product Hunt and similar directories, including concise positioning, descriptions, category, tags, logo/cover/screenshot recommendations, gallery captions, maker profile copy, first comment, FAQs, and platform-specific field mappings. Use this skill whenever the user asks for 产品发布素材、上架目录、提交 Product Hunt、launch/listing/directory submission, marketing assets, app-store style copy, or promotional materials from an existing codebase, even if they do not name Product Hunt explicitly.
---

# Product Launch Kit

Turn a repository into practical, copy-ready launch materials. The goal is to reduce the gap between “the product works” and “the product can be submitted today” while staying grounded in what the project actually does.

## Operating principles

- Inspect the repository before writing copy. Prefer README files, package metadata, routes/pages, screenshots, public assets, changelogs, and visible UI over assumptions.
- Inspect existing launch documents (such as `product-introduction.md`), `package.json`, app routes, site configuration, and `public/` assets; reconcile naming conflicts and record which source wins.
- Never read or reproduce secrets from `.env`, credential files, private keys, or deployment tokens. Redact PII or secrets visible in screenshots.
- Separate verified facts from positioning suggestions. Label uncertain items as `需要确认` instead of inventing them.
- Write concise, concrete copy. Lead with the user, problem, and outcome; avoid empty claims such as “revolutionary” or “best-in-class.”
- Produce reusable source content first, then map it to each platform’s fields. Platform limits and rules change, so note any field that should be checked against the destination’s current UI before submission.
- Do not publish, contact users, create accounts, or upload assets unless the user explicitly asks for those actions.

## Workflow

### 1. Build a project brief

Scan the project using available local tools. Identify:

- Product name, one-line purpose, target users, core job-to-be-done, and differentiator.
- Primary workflows and 3–5 strongest user-visible benefits.
- Current status: live, beta, private, local-only, or unclear.
- Supported platforms, integrations, pricing clues, privacy/security claims, and notable limitations.
- Existing brand assets: favicon, logo, OG image, screenshots, demo video, colors, typography.

If launch URL, public access, pricing, audience, or founder identity materially affects a claim, ask the smallest necessary question. Otherwise continue with `需要确认` placeholders so the user still receives a useful draft.

For every key fact, keep an evidence ledger entry with `claim`, `source_path_or_route`, and (when useful) `line_or_selector`. Treat README-only, code-supported, and UI-verified claims differently; never upgrade a roadmap or dev-only integration into a live-product claim.

### 2. Create the master content kit

Use this exact structure in the final Markdown document:

```markdown
# Product Launch Kit: [Product]

## 1. Fact sheet
- Product:
- Launch URL:
- Status:
- Audience:
- Category:
- Pricing:
- Verified facts:
- Needs confirmation:

## 2. Positioning
### Tagline (one sentence)
### Short description (≤ 160 characters)
### Elevator pitch (50–80 words)
### Longer description (120–200 words)
### 3 key benefits
1.
2.
3.

## 3. Product Hunt submission
- Name:
- Tagline:
- Topics/categories:
- Maker intro:
- First comment:
- Gallery order and captions:
- Launch-day FAQ:

## 4. Other directory mappings
### AppSumo / AlternativeTo / BetaList / SaaSHub / generic directory
For each platform: field → copy, plus character-limit or asset notes.

## 5. Visual asset plan
- Logo:
- Cover/thumbnail:
- Screenshots:
- Demo video/GIF:
- Open Graph/social preview:
For every asset: recommended dimensions/aspect ratio, source path if found, design direction, overlay text, and a fallback if missing.

## 6. Submission checklist
- [ ] Claims verified
- [ ] URL and CTA tested
- [ ] Pricing and availability confirmed
- [ ] Logo and cover exported
- [ ] 3–5 screenshots selected and captioned
- [ ] Maker profile and first comment personalized
- [ ] Platform-specific limits checked
- [ ] Launch-readiness blockers resolved (URL, public access, account, pricing, maker identity)
```

### 3. Adapt the voice

Default to clear, friendly, founder-led language. Explain the problem in plain language, show the “aha” workflow, and make the first comment useful rather than salesy. If the product is developer-facing, include a technical differentiator; if consumer-facing, emphasize the moment of value and emotional payoff.

### 4. Handle visual assets honestly

If an existing asset can be reused, give its absolute path and explain what to crop/export. If no suitable asset exists, provide a production brief rather than pretending an image was created. Include:

- Logo brief: mark, wordmark, background, safe area, light/dark variants.
- Cover brief: focal UI, headline of 3–7 words, contrast, no tiny text.
- Screenshot set: recommended sequence from first impression → core workflow → outcome/integration.
- Captions: one benefit-led sentence per screenshot.

When an image-generation skill or design tool is available, the kit may include prompts for those tools, but the content document remains usable without them.

Mark every asset as `found`, `reusable`, `missing`, or `brief`. Include an absolute source path when a file exists, alt text, export format, and any privacy/license concern. Never claim that a logo, cover, screenshot, or video was generated unless a tool actually created the file.

### 5. Quality check

Before returning the kit, verify that every claim is traceable to project evidence or marked for confirmation, each platform section contains copy rather than generic advice, asset gaps have actionable briefs, and the first comment sounds like a real maker. Keep the final document skimmable; put deep rationale in a short “Notes” section only when it helps the user make a decision.

When current destination documentation or UI is available, check field limits and asset rules and record the ISO date plus source. Otherwise use `limit_status: "verify_current_ui"`; do not present remembered limits as authoritative. For arbitrary named platforms, add concrete mappings for known fields and `N/A` for unsupported fields. Infer language from the request; for global directories, default submission copy to English and optionally include Chinese localization.

## Output files

Unless the user requests another format, create:

1. `product-launch-kit.md` — the complete, copy-ready document.
2. `product-launch-kit.json` — structured fields for automation or later publishing.

Write both files to the repository root by default (or a user-specified directory). If writing is unavailable, return both complete contents in the response and say so explicitly.

The JSON must be valid JSON with this shape: `project` (name/url/status/audience/category/pricing), `positioning` (tagline/short_description/elevator_pitch/long_description/benefits), `platforms` (array of `{name, fields, topics, limits_to_check, source_checked_at, assets}`), `visual_assets` (array of `{type, source_path, absolute_path, status, spec, brief, alt_text}`), `checklist` (array of `{item, done}`), `verified_facts` (array of `{claim, source_path_or_route, line_or_selector}`), `needs_confirmation` (array of strings), and `faqs` (array of `{question, answer}`). Preserve arrays for benefits, topics, screenshots, and FAQs; emit no prose outside valid JSON in the `.json` file.

## Platform guidance

Read [references/platforms.md](references/platforms.md) when preparing multi-platform mappings. It contains stable field patterns and cautions, not guarantees about the current submission UI.

## Example trigger phrases

- “帮我分析这个项目，准备 Product Hunt 发布素材。”
- “Turn this repo into a launch kit for Product Hunt and BetaList.”
- “Generate the logo, cover, screenshots, categories, and first comment I need for directory submissions.”
