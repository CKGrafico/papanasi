# Backlog - Papanasi 2.0

This backlog captures what is outdated today and what should be done differently for a sustainable revival.

## Outdated / Risky Today

- Storybook v6 + Webpack 4 tooling (requires `NODE_OPTIONS=--openssl-legacy-provider` to run).
- Legacy build assumptions (Webpack 4 in Storybook, Rollup 3 + Babel legacy decorators).
- Multi-platform compiler patches include temporary fixes and TODOs in Angular/Qwik/Vue builds.
- Toast extension is incomplete (non-reactive state updates, TODO notes, missing docs).
- Intent enum values are swapped (success/warning), which is likely a bug.
- Docs are marked as outdated/archived and include corrupted encoding in headings.
- Lerna v6 legacy package management is used without a modern monorepo strategy.
- Types are loose in places (e.g., `Children = any`, `classesToString` uses `any`).

## What Can Be Done Better (Needs a Plan)

- Modernize the documentation stack and upgrade Storybook to the current major version (or split docs from playground).
- Formalize a design token system and theming architecture (token naming, theme contract, dark mode, CSS variables).
- Define a stricter component API surface (consistent props, slot patterns, events, accessibility defaults).
- Replace compiler post-processing hacks with targeted transforms or upstream fixes to Mitosis.
- Establish test and QA pipelines (a11y checks, snapshot/visual tests, type tests, per-platform examples).
- Simplify platform support scope or create tiers (core platforms vs. community platforms).
- Provide clear contribution and release workflow for sustainability.

## Backlog Items

### P0 (Foundational)

- **BL-001** Upgrade Storybook to current major version and remove `openssl-legacy-provider` dependency.
- **BL-002** Refresh docs structure and encoding; remove archived disclaimers; rebuild landing docs.
- **BL-003** Define the 2.0 component API contract (props naming, variants, sizes, slots, states, a11y).
- **BL-004** Establish a token system and theme contract; align existing themes to it.
- **BL-005** Decide platform support tiers and update build pipeline accordingly.
- **BL-006** Update MDX docs to use supported Storybook doc blocks (`ArgTypes`/`Controls`) and remove legacy patterns.
- **BL-007** Align Storybook story globs with MDX-only docs to avoid missing-story warnings.

### P1 (Compiler and Build)

- **BL-010** Review Mitosis output patches per platform and replace TODO hacks with stable transforms.
- **BL-011** Update monorepo tooling strategy (Lerna modernization or alternative).
- **BL-012** Improve type safety in shared helpers and base models (remove `any`, improve generics).
- **BL-013** Normalize component exports and fix `--elements` compile breakage in `src/index.ts`.
- **BL-014** Refresh Browserslist data during builds to remove stale caniuse warnings.
- **BL-015** Audit PostCSS plugin stack to remove deprecated APIs or pin compatible versions.
- **BL-016** Reduce Storybook bundle size (docs split, addon review, or build optimization).

### P2 (Components and UX)

- **BL-020** Fix Intent enum mapping and audit intent-based styles across components.
- **BL-021** Rebuild Toast extension (reactive store, lifecycle, theming, docs).
- **BL-022** Add accessibility defaults and ARIA guidance to each component.
- **BL-023** Add a component status matrix (stable/beta/deprecated).

### P3 (Docs and Examples)

- **BL-030** Rewrite Stories to match 2.0 API and add usage patterns.
- **BL-031** Refresh CodeSandbox/StackBlitz templates for current framework versions.
- **BL-032** Add versioned migration notes and changelog for 2.0.

### P4 (Quality and Automation)

- **BL-040** Add lint/type/test pipelines per platform.
- **BL-041** Add visual regression testing and a11y checks for core components.
- **BL-042** Add release automation and semantic versioning workflow.
