const { test, expect } = require('@playwright/test');
const APIHelper = require('../utils/apiHelper');
const testData = require('../data/testData.json');

test.describe('API Automation Assignment', () => {
  let apiHelper;
  let createdUserId;

  test.beforeEach(async ({ request }) => {
    apiHelper = new APIHelper(request);
  });

  test('Create a user, validate the response http status code. Fetch and store userId.', async () => {
    const response = await apiHelper.createUser(testData.api.newUser);
    expect(response.status()).toBe(201);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.name).toBe(testData.api.newUser.name);
    expect(responseBody.job).toBe(testData.api.newUser.job);
    
    createdUserId = responseBody.id;
    console.log(`Created User ID: ${createdUserId}`);
  });

  test('Get the created user details and validate the same.', async () => {
    const testUserId = testData.api.existingUserId; 
    
    const response = await apiHelper.getUser(testUserId);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.data).toHaveProperty('id', testUserId);
    expect(responseBody.data).toHaveProperty('email');
    expect(responseBody.data).toHaveProperty('first_name');
    expect(responseBody.data).toHaveProperty('last_name');
    
    console.log(`Fetched User Details: ${JSON.stringify(responseBody.data)}`);
  });

  test('Update user\'s name, and validate the same.', async () => {
    const testUserId = testData.api.existingUserId;

    const response = await apiHelper.updateUser(testUserId, testData.api.updateUser);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.name).toBe(testData.api.updateUser.name);
    
    console.log(`Updated User Name: ${responseBody.name}`);
  });
});
