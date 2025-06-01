# Test info

- Name: Login >> Successful login
- Location: C:\Users\Admin\Git\automation-playground\tests\playwright-bdd\.features-gen\bdd\features\login.feature.spec.js:6:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at C:\Users\Admin\AppData\Local\ms-playwright\chromium_headless_shell-1169\chrome-win\headless_shell.exe
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
```

# Test source

```ts
   1 | // Generated from: bdd\features\login.feature
   2 | import { test } from "../../../bdd/steps/fixtures.ts";
   3 |
   4 | test.describe('Login', () => {
   5 |
>  6 |   test('Successful login', async ({ Given, homePage, When, loginPage, Then, page }) => { 
     |   ^ Error: browserType.launch: Executable doesn't exist at C:\Users\Admin\AppData\Local\ms-playwright\chromium_headless_shell-1169\chrome-win\headless_shell.exe
   7 |     await Given('I am on the login page', null, { homePage }); 
   8 |     await When('I enter valid credentials', null, { loginPage }); 
   9 |     await Then('I should see the welcome page', null, { page }); 
  10 |   });
  11 |
  12 | });
  13 |
  14 | // == technical section ==
  15 |
  16 | test.use({
  17 |   $test: ({}, use) => use(test),
  18 |   $uri: ({}, use) => use('bdd\\features\\login.feature'),
  19 |   $bddFileData: ({}, use) => use(bddFileData),
  20 | });
  21 |
  22 | const bddFileData = [ // bdd-data-start
  23 |   {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I enter valid credentials","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should see the welcome page","stepMatchArguments":[]}]},
  24 | ]; // bdd-data-end
```