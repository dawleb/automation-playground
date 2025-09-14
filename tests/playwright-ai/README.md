# Demo: Creating Playwright Tests for the Movies App

1. Ensure the server is running: npx @playwright/mcp@latest --port 8931

2. Add the prompts/context.prompt.md file to the chat context.

3. In Chat window click "Add Conext..." (choose your preferred model), and paste the following prompt:

Generate a Playwright test for this scenario using Playwright (MCP Server):
1. Go to https://testing.byst.re/#/login  
2. Log in using username: student@example.com and password: Test123!  
3. Confirm the welcome page is displayed  