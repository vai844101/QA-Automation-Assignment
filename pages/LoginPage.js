const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.userNameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginBtn = page.locator('#login');
    this.userNameLabel = page.locator('#userName-value');
  }

  async navigate() {
    await this.page.goto('https://demoqa.com/login');
  }

  async login(username, password) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async verifySuccessfulLogin(username) {
    await this.userNameLabel.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {
        throw new Error('Login failed or username not displayed. Please check credentials or website availability.');
    });
    await expect(this.userNameLabel).toContainText(username);
  }
}

module.exports = LoginPage;
