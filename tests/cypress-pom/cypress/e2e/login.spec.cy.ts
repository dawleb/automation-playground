import { getCredentials } from '../support/utils/auth';

// Test suite for login functionality
describe('Login Test', () => {
  // Test case to check successful login
  it('should successfully log in', () => {
    // Arrange: prepare test data
    const { email, password } = getCredentials();

    // Act: perform login flow
    cy.visitPage('#/login');
    cy.doLogin(email, password);

    // Assert: verify successful login
    cy.url().should('include', '/welcome');
    cy.contains('h1', 'Welcome!').should('be.visible');
  });

  it('should show error message on 500 server error', () => {
    // Arrange: prepare test data, error message  and mocks
    const { email, password } = getCredentials();
    const errorMessage = 'An error occurred. Please try again later';

    cy.intercept('POST', '**/login', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('loginRequest');

    // Act: perform login flow
    cy.visitPage('#/login');
    cy.doLogin(email, password);

    cy.wait('@loginRequest');

    // Assert: verify error message
    cy.contains(errorMessage).should('be.visible');
  });
});
