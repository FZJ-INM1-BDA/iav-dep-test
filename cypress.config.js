const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  browser: {
    userAgent: `cypress bot at github.com FZJ-INM1-BDA iav-dep-test`
  }
});
