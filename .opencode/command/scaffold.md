---
description: Generate boilerplate for a new feature from a one-line description. Creates backend route + frontend component wired together.
agent: build
---

Scaffold a new feature based on this description: $ARGUMENTS

Follow these steps:
1. Create a new Express route file in backend/src/routes/ with the appropriate endpoint
2. Create a new React component in frontend/src/components/
3. Add the route to backend/src/index.ts
4. Wire the component into App.tsx or the specified parent
5. Keep it minimal — just the working round-trip, no extra abstractions
6. Use existing patterns from the codebase (check ping.ts and App.tsx for style)

Do NOT add comments unless asked. Commit after the feature works.
