class WelcomePage {
    getHeading() {
      return cy.contains('h1', 'Welcome!');
    }
  }
  
  export default WelcomePage;