const { expect } = require('@playwright/test');
const fs = require('fs');

class BookStorePage {
  constructor(page) {
    this.page = page;
    this.gotoStoreBtn = page.locator('#gotoStore');
    this.searchBox = page.locator('#searchBox');
    this.titleWrapper = page.locator('#title-wrapper #userName-value');
    this.authorWrapper = page.locator('#author-wrapper #userName-value');
    this.publisherWrapper = page.locator('#publisher-wrapper #userName-value');
    this.loginContainer = page.locator('#login');
  }

  getLogoutBtn() {
    return this.page.locator('button').filter({ hasText: /Log ?out/i }).first();
  }

  async verifyLogoutButtonVisible() {
    await expect(this.getLogoutBtn()).toBeVisible();
  }

  async navigateToStore() {
    await this.gotoStoreBtn.click();
  }

  async searchBook(bookName) {
    await this.searchBox.waitFor({ state: 'visible' });
    await this.searchBox.fill(bookName);
  }

  async openBookDetails(bookName) {
    const bookLink = this.page.locator('.action-buttons').filter({ hasText: bookName });
    await expect(bookLink).toBeVisible();
    await bookLink.click();
    await this.page.waitForSelector('#title-wrapper');
  }

  async extractAndSaveBookDetails(filePath) {
    const title = await this.titleWrapper.innerText();
    const author = await this.authorWrapper.innerText();
    const publisher = await this.publisherWrapper.innerText();

    const bookDetails = `Title: ${title}\nAuthor: ${author}\nPublisher: ${publisher}\n`;
    fs.writeFileSync(filePath, bookDetails, 'utf-8');
    
    console.log(`Successfully written book details to ${filePath}:`);
    console.log(bookDetails);
  }

  async logout() {
    let logoutButtonVisible = await this.getLogoutBtn().isVisible();
    
    if (!logoutButtonVisible) {
      await this.page.goto('https://demoqa.com/profile');
      await this.getLogoutBtn().waitFor({ state: 'visible' });
    }

    await this.getLogoutBtn().click();
    await expect(this.loginContainer).toBeVisible();
  }
}

module.exports = BookStorePage;
