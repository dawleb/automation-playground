// Generated from: bdd\features\login.feature
import { test } from "../../../bdd/steps/fixtures.ts";

test.describe('Login', () => {

  test('Successful login', async ({ Given, homePage, When, loginPage, Then, page }) => { 
    await Given('I am on the login page', null, { homePage }); 
    await When('I enter valid credentials', null, { loginPage }); 
    await Then('I should see the welcome page', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('bdd\\features\\login.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I enter valid credentials","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should see the welcome page","stepMatchArguments":[]}]},
]; // bdd-data-end