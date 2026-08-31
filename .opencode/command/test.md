---
description: Run tests on both frontend and backend, summarize pass/fail results concisely.
agent: build
---

Run the test suites and summarize results:

1. Check if frontend has tests: `cd frontend && npm test` (if no test script, skip and note it)
2. Check if backend has tests: `cd backend && npm test` (if no test script, skip and note it)
3. If neither has tests, suggest which 2-3 core tests would be most valuable for the current features
4. Summarize: X passed, Y failed, Z skipped
5. For any failures, show the error and suggest a fix

Keep the summary short — just the numbers and any failures.
