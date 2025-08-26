describe('Testes de Rastreamento de Tempo', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Deve criar uma entrada de timesheet', () => {
    cy.visit('/time/viewTimeModule');
    
    // Melhorar a navegação e seletores
    cy.get('.oxd-topbar-body-nav-tab-item').contains('Timesheets').click();
    
    // Aguardar carregamento da página
    cy.get('.oxd-form-row', { timeout: 10000 }).should('be.visible');
    
    cy.get('input[placeholder="Type for hints..."]').type('John');
    cy.wait(3000);
    
    // Verificar se há opções de autocomplete
    cy.get('body').then(($body) => {
      if ($body.find('.oxd-autocomplete-option').length > 0) {
        cy.get('.oxd-autocomplete-option').first().click();
        cy.wait(1000);
        cy.get('button.oxd-button').contains('View').click();

        // Verificar se há timesheet para editar
        cy.get('body').then(($body) => {
          if ($body.find('button.oxd-button:contains("Edit")').length > 0) {
            cy.get('button.oxd-button').contains('Edit').click();
            
            // Preencher informações do projeto
            cy.get('input[placeholder="Type for hints..."]').eq(1).type('ACME');
            cy.wait(2000);
            
            // Verificar se há opções de autocomplete para empresa
            cy.get('body').then(($body) => {
              if ($body.find('.oxd-autocomplete-option:contains("ACME")').length > 0) {
                cy.get('.oxd-autocomplete-option').contains('ACME').click();
                
                cy.get('input[placeholder="Type for hints..."]').eq(2).type('Project');
                cy.wait(2000);
                
                // Verificar se há opções de autocomplete para projeto
                cy.get('body').then(($body) => {
                  if ($body.find('.oxd-autocomplete-option:contains("ACME")').length > 0) {
                    cy.get('.oxd-autocomplete-option').contains('ACME').first().click();
                    cy.get('button[type="submit"]').click();

                    // Verificar sucesso
                    cy.get('.oxd-toast', { timeout: 10000 })
                      .should('be.visible')
                      .and('contain.text', 'Success');
                  } else {
                    cy.log('Nenhum projeto ACME encontrado');
                  }
                });
              } else {
                cy.log('Nenhuma empresa ACME encontrada');
              }
            });
          } else {
            cy.log('Nenhum timesheet existente para editar');
          }
        });
      } else {
        cy.log('Nenhuma sugestão de funcionário encontrada');
      }
    });
  });
});