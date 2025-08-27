describe('Testes do Módulo de Administração', () => {
  const selectors = {
    topbarHeader: '.oxd-topbar-header-breadcrumb h6',
    addButton: 'button.oxd-button',
    usernameInput: '.oxd-input-group:contains("Username") input',
    passwordInput: 'input[type="password"]',
    userRoleSelect: '.oxd-select-wrapper',
    selectOption: '.oxd-select-option',
    employeeNameInput: 'input[placeholder="Type for hints..."]',
    employeeNameHint: '.oxd-autocomplete-option',
    submitButton: 'button[type="submit"]',
    toastMessage: '.oxd-toast',
    body: 'body',
  };

  beforeEach(() => {
    cy.login();
  });

  it('Deve gerenciar contas de usuário', () => {
    cy.visit('/admin/viewAdminModule');
    cy.get(selectors.topbarHeader, { timeout: 10000 }).should('contain.text', 'Admin');

    // Criar usuário novo
    cy.get(selectors.addButton).contains('Add').click();
    const uniqueId = Date.now();
    
    // Preencher informações do usuário
    cy.get(selectors.usernameInput).type(`testuser${uniqueId}`);
    cy.get(selectors.passwordInput).first().type('Pass@1234');
    cy.get(selectors.passwordInput).last().type('Pass@1234');
    
    // Selecionar User Role
    cy.get(selectors.userRoleSelect).eq(0).click();
    cy.get(selectors.selectOption).contains('Admin').click();

    // Selecionar Status
    cy.get(selectors.userRoleSelect).eq(1).click();
    cy.get(selectors.selectOption).contains('Enabled').click();

    // Preencher nome do funcionário
    cy.get(selectors.employeeNameInput).type('a');
    cy.wait(3000);
    
    // Verificar se há sugestões e selecionar a primeira
    cy.get(selectors.body).then(($body) => {
      if ($body.find(selectors.employeeNameHint).length > 0) {
        cy.get(selectors.employeeNameHint).first().click();
      } else {
        // Tentar com outra letra se não houver sugestões
        cy.get(selectors.employeeNameInput).clear().type('John');
        cy.wait(3000);
        cy.get(selectors.employeeNameHint).first().click();
      }
    });

    cy.get(selectors.submitButton).click();

    // Verificar sucesso
    cy.get(selectors.toastMessage, { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Success');
  });
});