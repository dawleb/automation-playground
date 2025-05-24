import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { getCredentials } from '../../../support/utils/auth';

const { email, password } = getCredentials();

Given('I am on the login page', () => {
  cy.visitPage('login');
});

When('I enter valid credentials', () => {
  cy.doLogin(email, password);
});

Then('I should see the welcome page', () => {
  cy.url().should('include', '/welcome');
  cy.contains('h1', 'Welcome!').should('be.visible');
});
