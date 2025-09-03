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

    // Preencher nome do funcionário com busca mais robusta
    cy.get(selectors.employeeNameInput).type('Admin');
    cy.wait(3000);
    
    // Verificar se há sugestões e selecionar
    cy.get('body').then(($body) => {
      if ($body.find(selectors.employeeNameHint).length > 0) {
        cy.get(selectors.employeeNameHint).first().click();
      } else {
        // Tentar com busca alternativa
        cy.get(selectors.employeeNameInput).clear().type('Paul');
        cy.wait(3000);
        
        if ($body.find(selectors.employeeNameHint).length > 0) {
          cy.get(selectors.employeeNameHint).first().click();
        } else {
          // Como fallback, apenas limpar o campo e prosseguir
          cy.get(selectors.employeeNameInput).clear();
        }
      }
    });

    cy.get(selectors.submitButton).click();

    // Verificar sucesso ou redirecionamento
    cy.get('body').then(($body) => {
      // Aguardar mensagem de sucesso ou redirecionamento
      cy.url({ timeout: 15000 }).should('not.include', '/addUser');
      
      // Verificar se voltou para a lista de usuários
      cy.get(selectors.topbarHeader, { timeout: 10000 })
        .should('be.visible')
        .and('contain.text', 'Admin');
        
      // Verificar se há toast ou se foi redirecionado com sucesso
      if ($body.find(selectors.toastMessage).length > 0) {
        cy.get(selectors.toastMessage)
          .should('be.visible')
          .and('contain.text', 'Success');
      } else {
        // Se não há toast, verificar se está na página correta
        cy.url().should('include', '/admin');
      }
    });
  });
});