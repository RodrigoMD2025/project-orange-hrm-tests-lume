class LoginPage {
  constructor() {
    this.SelectorsList = {
      usernameField: "[name='username']",
      passwordField: "[name='password']",
      loginButton: "[type='submit']",
      wrongCredentialAlert: "[role='alert']",
    };
  }

  accessLoginPage() {
    cy.visit('/auth/login'); 
  }

  loginWithUser(username, password) {
    cy.get(this.SelectorsList.usernameField).type(username);
    cy.get(this.SelectorsList.passwordField).type(password);
    cy.get(this.SelectorsList.loginButton).click();
  }
}

export default LoginPage;
