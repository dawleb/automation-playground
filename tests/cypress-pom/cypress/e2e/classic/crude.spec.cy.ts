// // Test suite for login functionality
// describe('Login Test', () => {
//   // Test case to check successful login
//   it('should successfully log in', () => {
//     // Verify that required environment variables are set
//     if (!Cypress.env('EMAIL') || !Cypress.env('PASSWORD')) {
//       throw new Error('Email and password environment variables must be set');
//     }

//     // Navigate to the login page
//     cy.visit(`${Cypress.env('BASE_URL')}#/login`);

//     // Fill in the email and password fields
//     cy.get('#email').type(Cypress.env('EMAIL'));
//     cy.get('#password').type(Cypress.env('PASSWORD'));

//     // Click the submit button to attempt login
//     cy.get('#submit').click();

//     // Assert that the URL includes '/welcome' after login
//     cy.url().should('include', '/welcome');

//     // Verify that the Welcome heading is visible
//     cy.contains('h1', 'Welcome!').should('be.visible');

//     // Log some useful information from the browser
//     cy.window().then(win => {
//       const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//       const locale = win.navigator.language;
//       const userAgent = win.navigator.userAgent;
//       const screenSize = {
//         width: win.screen.width,
//         height: win.screen.height,
//       };

//       // Log timezone, locale, user agent, and screen size
//       cy.log(`Timezone: ${timezone}`);
//       cy.log(`Locale: ${locale}`);
//       cy.log(`User Agent: ${userAgent}`);
//       cy.log(`Screen Size: ${screenSize.width}x${screenSize.height}`);
//     });
//   });
// });
