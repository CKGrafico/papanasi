---
name: quality
description: Build and verify the Papanasi libraries and Storybook. Use when asked to build all packages, run Storybook locally, or sanity-check the component docs site.
---

# Quality

## Overview

Build all libraries, generate the Storybook static build, then run the local Storybook server and perform a quick visual check using Playwright MCP.

## Workflow

1. Tell the user that has to run by itslef `yarn compile` and `yarn build-storybook` but move to next step immediately withoud expecting confirmation.
2. Start Storybook locally using `yarn start`
3. Use Playwright MCP to open `http://localhost:6006` and verify key pages render.
4. Report warnings or failures. Do not use manual browser opening as a fallback.

## Verification checklist

- Once started open `http://localhost:6006`.
- Confirm the Introduction page renders.
- Spot-check at least one component page (e.g. Button, Avatar).
- Confirm theme CSS is applied (papanasi or sketch).

If Playwright MCP is not available, stop and report that verification cannot be completed.
Never run commands outside of the current repo.
