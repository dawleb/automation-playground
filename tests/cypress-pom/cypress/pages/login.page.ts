// Alternative: LoginPage object
class LoginPage {
  visit() {
    cy.visit(`${Cypress.env('BASE_URL')}#/`);
  }

  login(email: string, password: string) {
    cy.get('#email').type(`${Cypress.env('EMAIL')}`);
    cy.get('#password').type(`${Cypress.env('PASSWORD')}`);
    cy.get('#submit').click();
  }
}

export default LoginPage;