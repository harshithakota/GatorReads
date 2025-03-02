const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // ✅ Change this to your actual frontend URL
    setupNodeEvents(on, config) {
      // Implement event listeners if needed
    },
    specPattern: 'cypress/e2e//*.cy.js', // ✅ Specifies where test files are located
    supportFile: false,
    viewportWidth: 1280, // ✅ Default viewport size
    viewportHeight: 720,
    video: true, // ✅ Record videos of test runs
    screenshotOnRunFailure: true, // ✅ Take a screenshot on test failure
  },
  defaultCommandTimeout: 8000, // ✅ Increase command timeout for slow network
  retries: 2, // ✅ Retry failing tests (useful for flaky tests)
});