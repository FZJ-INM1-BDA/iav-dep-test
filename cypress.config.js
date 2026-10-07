const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    supportFile: false,
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
  },
  browser: {
    userAgent: `cypress bot at github.com FZJ-INM1-BDA iav-dep-test`
  }
});
