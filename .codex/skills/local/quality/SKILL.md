---
name: quality
description: Build and verify the Papanasi libraries and Storybook. Use when asked to build all packages, run Storybook locally, or sanity-check the component docs site.
---

# Quality

## Overview

Build all libraries, generate the Storybook static build, then run the local Storybook server and perform a quick visual check.

## Workflow

1. Run the build script or commands.
2. Start Storybook locally.
3. Verify the docs site loads and key pages render.
4. Report warnings or failures, and ask the user to confirm visual checks you cannot perform.

## Commands

Preferred:

```powershell
./scripts/run-quality.ps1
```

Manual:

```powershell
yarn compile
yarn build-storybook
```

Then start Storybook:

```powershell
yarn start
```

## Verification checklist

- Open `http://localhost:6006`.
- Confirm the Introduction page renders.
- Spot-check at least one component page (e.g. Button, Avatar).
- Confirm theme CSS is applied (papanasi or sketch).

If you cannot access a browser, ask the user to confirm the checks.
