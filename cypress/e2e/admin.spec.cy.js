describe('Testes do Módulo de Administração', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Deve gerenciar contas de usuário', () => {
    cy.visit('/admin/viewAdminModule');
    cy.get('.oxd-topbar-header-breadcrumb h6', { timeout: 10000 }).should('contain.text', 'Admin');

    // Criar usuário novo
    cy.get('button.oxd-button').contains('Add').click();
    const uniqueId = Date.now();
    
    // Preencher informações do usuário
    cy.get('.oxd-input-group').contains('Username').parents('.oxd-input-group').find('input').type(`testuser${uniqueId}`);
    cy.get('input[type="password"]').first().type('Pass@1234');
    cy.get('input[type="password"]').last().type('Pass@1234');
    
    // Selecionar User Role
    cy.get('.oxd-select-wrapper').eq(0).click();
    cy.get('.oxd-select-option').contains('Admin').click();

    // Selecionar Status
    cy.get('.oxd-select-wrapper').eq(1).click();
    cy.get('.oxd-select-option').contains('Enabled').click();

    // Preencher nome do funcionário
    cy.get('input[placeholder="Type for hints..."]').type('a');
    cy.wait(3000);
    
    // Verificar se há sugestões e selecionar a primeira
    cy.get('body').then(($body) => {
      if ($body.find('.oxd-autocomplete-option').length > 0) {
        cy.get('.oxd-autocomplete-option').first().click();
      } else {
        // Tentar com outra letra se não houver sugestões
        cy.get('input[placeholder="Type for hints..."]').clear().type('John');
        cy.wait(3000);
        cy.get('.oxd-autocomplete-option').first().click();
      }
    });

    cy.get('button[type="submit"]').click();

    // Verificar sucesso
    cy.get('.oxd-toast', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Success');
  });
});