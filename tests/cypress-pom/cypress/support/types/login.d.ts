// cypress/support/index.ts
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('login-button')
       */
      dataQA(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to visit a specific hash-based page
       * @example cy.visitPage('login')
       */
      visitPage(hash: string): Chainable<void>;

      /**
       * Custom command to perform login
       * @example cy.doLogin('user@example.com', 'password')
       */
      doLogin(email: string, password: string): Chainable<void>;

      /**
       * Custom command to log in via API.
       * @param email - User's email
       * @param password - User's password
       */
      apiLogin(email: string, password: string): Chainable<void>;
    }
  }
}

// declare namespace Cypress {
//   interface Chainable {
//     doLogin(email: string, password: string): Chainable<void>;
//   }

//   interface CyLoginNamespace {
//     doLogin: (email: string, password: string) => void;
//   }
// }

// // Rozszerzenie typu globalnego `cy`
// declare global {
//   namespace Cypress {
//     interface Cy {
//       login: Cypress.CyLoginNamespace;
//     }
//   }

//   const cy: Cypress.Chainable & Cypress.Cy;
// }
