// cypress/support/commands.js
// cypress-real-events já está importado em e2e.js

import 'cypress-mochawesome-reporter/register';

// Comando customizado de login com sessão persistente
Cypress.Commands.add('login', () => {
  cy.session('loginSession', () => {
    // Corrigido: não repetir /web/index.php
    cy.visit('/auth/login');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Aguardar carregamento completo do dashboard
    cy.get('.oxd-topbar-header', { timeout: 10000 }).should('be.visible');
  }, {
    validate: () => {
      // Corrigido: acesso ao dashboard sem duplicar prefixo
      cy.visit('/dashboard/index');
      cy.get('.oxd-topbar-header', { timeout: 10000 }).should('be.visible');
    }
  });
});

// Comando para logout
Cypress.Commands.add('logout', () => {
  cy.get('.oxd-userdropdown-tab').click();
  cy.contains('Logout').click();
  cy.url().should('include', '/auth/login');
});

// Comando seguro para logout
Cypress.Commands.add('safeLogout', () => {
  cy.get('body').then(($body) => {
    // Verifica se o dropdown do usuário está presente
    if ($body.find('.oxd-userdropdown-tab').length > 0) {
      cy.get('.oxd-userdropdown-tab').click();
      cy.contains('Logout').click();
    } else {
      // Se não encontrar o dropdown, tenta fazer logout pela URL
      cy.visit('/auth/logout');
    }
    // Aguarda a URL de login
    cy.url().should('include', '/auth/login');
  });
});

// Comando para navegação por teclado usando cypress-real-events
Cypress.Commands.add('tab', { prevSubject: 'element' }, (subject) => {
  return cy.wrap(subject).realPress('Tab');
});

// Comando para aguardar elemento não estar mais carregando
Cypress.Commands.add('waitForLoading', (selector = '.oxd-loading-spinner, .oxd-table-loader') => {
  cy.get('body').then(($body) => {
    if ($body.find(selector).length > 0) {
      cy.get(selector, { timeout: 15000 }).should('not.exist');
    }
  });
});

// Comando para aguardar e clicar com retry
Cypress.Commands.add('waitAndClick', (selector, options = {}) => {
  cy.get(selector, { timeout: 10000, ...options })
    .should('be.visible')
    .should('not.be.disabled')
    .click();
});

// Comando para preencher campo com verificação
Cypress.Commands.add('typeInField', (selector, text, options = {}) => {
  cy.get(selector, { timeout: 10000, ...options })
    .should('be.visible')
    .clear()
    .type(text);
});