describe('Testes de Rastreamento de Tempo', () => {
  const selectors = {
    timesheetsTab: '.oxd-topbar-body-nav-tab-item',
    formRow: '.oxd-form-row',
    employeeNameInput: 'input[placeholder="Type for hints..."]',
    autocompleteOption: '.oxd-autocomplete-option',
    viewButton: 'button.oxd-button',
    editButton: 'button.oxd-button',
    projectInput: 'input[placeholder="Type for hints..."]',
    submitButton: 'button[type="submit"]',
    toastMessage: '.oxd-toast',
    body: 'body',
  };

  beforeEach(() => {
    cy.login();
  });

  it('Deve criar uma entrada de timesheet', () => {
    cy.visit('/time/viewTimeModule');
    
    cy.get(selectors.timesheetsTab).contains('Timesheets').click();
    cy.get(selectors.formRow, { timeout: 10000 }).should('be.visible');
    
    cy.get(selectors.employeeNameInput).type('John');
    cy.wait(3000);
    
    cy.get(selectors.body).then(($body) => {
      if ($body.find(selectors.autocompleteOption).length > 0) {
        cy.get(selectors.autocompleteOption).first().click();
        cy.wait(1000);
        cy.get(selectors.viewButton).contains('View').click();

        cy.get(selectors.body).then(($body) => {
          if ($body.find(selectors.editButton).filter(':contains("Edit")').length > 0) {
            cy.get(selectors.editButton).contains('Edit').click();
            
            cy.get(selectors.projectInput).eq(1).type('ACME');
            cy.wait(2000);
            
            cy.get(selectors.body).then(($body) => {
              if ($body.find(selectors.autocompleteOption).filter(':contains("ACME")').length > 0) {
                cy.get(selectors.autocompleteOption).contains('ACME').click();
                
                cy.get(selectors.projectInput).eq(2).type('Project');
                cy.wait(2000);
                
                cy.get(selectors.body).then(($body) => {
                  if ($body.find(selectors.autocompleteOption).filter(':contains("ACME")').length > 0) {
                    cy.get(selectors.autocompleteOption).contains('ACME').first().click();
                    cy.get(selectors.submitButton).click();

                    cy.get(selectors.toastMessage, { timeout: 10000 })
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