const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');

// import { defineConfig } from 'cypress';
// import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
// import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
// import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

// module.exports = defineConfig({
//   // export default defineConfig({
//   e2e: {
//     specPattern: '**/*.feature',
//     async setupNodeEvents(on, config) {
//       // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
//       await addCucumberPreprocessorPlugin(on, config, {
//         stepDefinitions: 'cypress/e2e/bdd/steps/**/*.steps.ts', // choose the right pattern here
//       });

//       on(
//         'file:preprocessor',
//         createBundler({
//           plugins: [createEsbuildPlugin(config)],
//         }),
//       );

//       // Make sure to return the config object as it might have been modified by the plugin.
//       return config;
//     },
//     // specPattern: ['cypress/e2e/bdd/**/*.feature', 'cypress/e2e/classic/*.spec.cy.ts'],
//   },
// });

// module.exports = defineConfig({
//   e2e: {
//     async setupNodeEvents(on, config) {
//       await addCucumberPreprocessorPlugin(on, config, {
//         stepDefinitions: 'cypress/e2e/bdd/steps/**/*.steps.ts',
//       });

//       on(
//         'file:preprocessor',
//         createBundler({
//           plugins: [createEsbuildPlugin(config)],
//         }),
//       );

//       return config;
//     },
//     supportFile: 'cypress/support/e2e.ts',
//     specPattern: ['cypress/e2e/bdd/**/*.feature', 'cypress/e2e/classic/*.spec.cy.ts'],
//   },
// // });

// module.exports = defineConfig({
//   e2e: {
//     async setupNodeEvents(on, config) {
//       await addCucumberPreprocessorPlugin(on, config, {
//         stepDefinitions: 'cypress/e2e/bdd/steps/**/*.steps.ts',
//       });

//       on(
//         'file:preprocessor',
//         createBundler({
//           plugins: [createEsbuildPlugin(config)],
//         }),
//       );

//       return config;
//     },
//     supportFile: 'cypress/support/e2e.ts',
//     specPattern: ['cypress/e2e/bdd/**/*.feature', 'cypress/e2e/classic/*.spec.cy.ts'],
//   },
// });

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );

      return config;
    },
    specPattern: [
      'cypress/e2e/bdd/**/*.feature',
      'cypress/e2e/classic/**/*spec.cy.ts',
      // 'cypress/e2e/**/*.spec.ts',
    ],
  },
});
