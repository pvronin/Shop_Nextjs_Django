const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // آدرس پروژه شما
    setupNodeEvents(on, config) {
      // listeners
    },
  },
});
