const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://mellow-paletas-1bc4eb.netlify.app/",
  },
});
