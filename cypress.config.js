const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'OrangeHRM Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: false,                // garante que não sobrescreve relatórios antigos
    reportDir: 'cypress/reports/html',
    json: true                       // 🔴 ESSENCIAL para gerar os .json
  },
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0
    },
    env: {
      hideCredentials: true
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      // Log de screenshots (opcional, pode remover se não usar)
      on('after:screenshot', (details) => {
        console.log(details);
      });

      // Logs de falhas no terminal
      on('task', {
        failed: require('cypress-failed-log/src/failed')()
      });

      return config;
    },
  },
});