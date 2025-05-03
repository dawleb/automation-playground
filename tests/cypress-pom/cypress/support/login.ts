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

// Rejestracja komendy z parametrami
Cypress.Commands.add('doLogin', (email: string, password: string) => {
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('#submit').click();
});

// Dodajemy przestrzeń nazw do cy
// @ts-ignore — tymczasowe obejście błędu TS
cy.login = {
  doLogin: (email: string, password: string) => {
    cy.doLogin(email, password);
  },
};
