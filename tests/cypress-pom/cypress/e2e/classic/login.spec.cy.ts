import { getCredentials } from '../../support/utils/auth';

// Test suite for login functionality
describe('Login Test', () => {
  // Test case to check successful login
  it('should log in successfully via the GUI', () => {
    // Arrange: prepare test data
    const { email, password } = getCredentials();

    // Act: perform login flow
    cy.visitPage('login');
    cy.doLogin(email, password);

    // Assert: verify successful login
    cy.url().should('include', '/welcome');
    cy.contains('h1', 'Welcome!').should('be.visible');
  });

  it('should show error message on 500 server error', () => {
    // Arrange: prepare test data, error message and mocks
    const { email, password } = getCredentials();
    const errorMessage = 'An error occurred. Please try again later';

    cy.intercept('POST', '**/login', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('loginRequest');

    // Act: perform login flow
    cy.visitPage('login');
    cy.doLogin(email, password);
    cy.wait('@loginRequest');

    // Assert: verify error message
    cy.contains(errorMessage).should('be.visible');
  });

  it('should log in successfully via the App Actions', () => {
    // Arrange: prepare test data
    const { email, password } = getCredentials();

    // Act: logs in using app action
    cy.visitPage('login');
    cy.window().its('login').invoke('call', null, email, password);

    // Assert: verify welcome page displayed
    cy.contains('Welcome').should('exist');
  });

  it('should log in successfully via the API', () => {
    // Arrange: prepare test data
    const { email, password } = getCredentials();

    // Act: logs in using api
    cy.apiLogin(email, password);
    cy.visitPage('login');

    // Assert: verify welcome page displayed
    cy.contains('Welcome').should('exist');
  });
});
