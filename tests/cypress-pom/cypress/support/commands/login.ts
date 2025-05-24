// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('dataQA', (value: string) => {
  return cy.get(`[data-qa="${value}"]`);
});

Cypress.Commands.add('doLogin', (email: string, password: string) => {
  cy.dataQA('email-input').type(email);
  cy.dataQA('password-input').type(password);
  cy.dataQA('submit-button').click();
});

Cypress.Commands.add('apiLogin', (email, password) => {
  cy.request({
    method: 'POST',
    url: Cypress.env('API_URL'),
    body: { email, password },
  }).then(response => {
    expect(response.status).to.eq(200);
    expect(response.body.message).to.equal('Login successful');
  });
});

Cypress.Commands.add('visitPage', (fragment: string) => {
  cy.visit(`${Cypress.env('BASE_URL')}#/${fragment}`);
});

// // Dodajemy przestrzeń nazw do cy
// // @ts-ignore — tymczasowe obejście błędu TS
// cy.login = {
//   doLogin: (email: string, password: string) => {
//     cy.doLogin(email, password);
//   },
// };
