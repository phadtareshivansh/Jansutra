---
description: Build and deploy the project to Vercel production. Reports the deployment URL.
agent: build
---

Deploy to Vercel:

1. Run `npm run build` to ensure both frontend and backend build successfully
2. Run `npx vercel --prod` to deploy to production
3. Capture and report the deployment URL
4. If the build fails, show the error and fix it before retrying

Report: deployment status and URL.
