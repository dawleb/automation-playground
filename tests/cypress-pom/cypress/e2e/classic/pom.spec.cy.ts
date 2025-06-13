// Alternative: Login test
import { getCredentials } from '../../support/utils/auth';
import LoginPage from '../../pages/login.page';
import WelcomePage from '../../pages/welcome.page';

describe('Login Test', () => {
  it('should successfully log in', () => {
    const { email, password } = getCredentials();
    const loginPage = new LoginPage();
    const welcomePage = new WelcomePage();

    loginPage.visit();
    loginPage.login(email, password);

    welcomePage.getHeading().should('be.visible').and('contain', 'Welcome!');
    cy.url().should('include', '/welcome');
  });
});
