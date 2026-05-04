const { test } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const BookStorePage = require('../pages/BookStorePage');
const testData = require('../data/testData.json');
require('dotenv').config();

test.describe('UI Automation Assignment', () => {
  test('Login, Search Book, Extract Details and Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const bookStorePage = new BookStorePage(page);

    const username = process.env.DEMOQA_USERNAME;
    const password = process.env.DEMOQA_PASSWORD;

    if (!username || !password || username === 'testuser_assignment') {
      console.warn('WARNING: Using placeholder credentials. Login might fail if the user does not exist.');
    }

    // 1. Navigate and Login
    await loginPage.navigate();
    await loginPage.login(username, password);
    await loginPage.verifySuccessfulLogin(username);

    // 2. Navigate to Bookstore
    await bookStorePage.verifyLogoutButtonVisible();
    await bookStorePage.navigateToStore();

    // 3. Search and Extract Book Details
    const bookName = testData.ui.bookToSearch;
    await bookStorePage.searchBook(bookName);
    await bookStorePage.openBookDetails(bookName);
    await bookStorePage.extractAndSaveBookDetails('book_details.txt');

    // 4. Logout
    await bookStorePage.logout();
  });
});
