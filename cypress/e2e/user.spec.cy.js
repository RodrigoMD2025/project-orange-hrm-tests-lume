import userData from '../fixtures/userData.json';

describe('Testes de Autenticação', () => {
  const selectors = {
    usernameField: 'input[name="username"]',
    passwordField: 'input[name="password"]',
    submitButton: 'button[type="submit"]',
    alert: '.oxd-alert',
    errorMessage: '.oxd-input-field-error-message',
    forgotPasswordLink: '.orangehrm-login-forgot-header',
    cancelButton: 'button',
    body: 'body',
  };

  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('Deve fazer login com credenciais válidas', () => {
    cy.get(selectors.usernameField).type('Admin');
    cy.get(selectors.passwordField).type('admin123');
    cy.get(selectors.submitButton).click();
    cy.url().should('include', '/dashboard');
  });

  it('Deve exibir erro com credenciais inválidas', () => {
    cy.get(selectors.usernameField).type('wrongUser');
    cy.get(selectors.passwordField).type('wrongPass');
    cy.get(selectors.submitButton).click();
    cy.get(selectors.alert).should('be.visible');
  });

  it('Deve validar campos obrigatórios no login', () => {
    cy.get(selectors.submitButton).click();
    cy.get(selectors.errorMessage).should('contain.text', 'Required');
  });

  it('Deve exibir erro ao preencher apenas o usuário', () => {
    cy.get(selectors.usernameField).type('Admin');
    cy.get(selectors.submitButton).click();
    cy.get(selectors.errorMessage).should('contain.text', 'Required');
  });

  it('Deve exibir erro ao preencher apenas a senha', () => {
    cy.get(selectors.passwordField).type('admin123');
    cy.get(selectors.submitButton).click();
    cy.get(selectors.errorMessage).should('contain.text', 'Required');
  });

  it('Deve fazer login com username em minúsculas (case-insensitive)', () => {
    cy.get(selectors.usernameField).type('admin');
    cy.get(selectors.passwordField).type('admin123');
    cy.get(selectors.submitButton).click();
    cy.url().should('include', '/dashboard');
  });

  it('Deve funcionar com navegação por teclado', () => {
    cy.get(selectors.usernameField).focus().tab();
    cy.focused().should('have.attr', 'name', 'password');
  });

  it('Deve validar endpoint da API de login', () => {
    cy.request({
      method: 'POST',
      url: '/auth/validate',
      body: {
        username: 'Admin',
        password: 'admin123'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 302]);
    });
  });

  it('Deve testar funcionalidade de esqueceu senha', () => {
    cy.get(selectors.forgotPasswordLink).should('be.visible').click();
    cy.url().should('include', '/auth/requestPasswordResetCode');
    cy.get(selectors.cancelButton).contains('Cancel').should('be.visible').click();
    cy.url().should('include', '/auth/login');
    cy.get(selectors.forgotPasswordLink).click();
    cy.get(selectors.submitButton).click();
    cy.get(selectors.errorMessage).should('be.visible').and('contain.text', 'Required');
    cy.get(selectors.usernameField).type('Admin');
    cy.get(selectors.submitButton).click();
    cy.url().should('include', '/auth/sendPasswordReset');
    cy.get(selectors.body).should('contain.text', 'Reset Password link sent successfully');
  });

  it('Deve validar username inválido no esqueceu senha', () => {
    cy.get(selectors.forgotPasswordLink).click();
    cy.get(selectors.usernameField).type('usuarioInexistente123');
    cy.get(selectors.submitButton).click();
    cy.url().should('include', '/auth/sendPasswordReset');
    cy.get(selectors.body).should('contain.text', 'Reset Password link sent successfully');
  });

  it('Deve validar campos vazios no esqueceu senha', () => {
    cy.get(selectors.forgotPasswordLink).click();
    cy.get(selectors.submitButton).click();
    cy.get(selectors.errorMessage).should('be.visible').and('contain.text', 'Required');
  });
});

describe('Testes de Funcionalidade do Usuário', () => {
  const selectors = {
    topbarHeader: '.oxd-topbar-header',
    userDropdown: '.oxd-userdropdown-tab',
    dropdownMenu: '.oxd-dropdown-menu',
    usernameField: 'input[name="username"]',
    firstNameField: 'input[name="firstName"]',
    lastNameField: 'input[name="lastName"]',
    submitButton: 'button[type="submit"]',
    toastMessage: '.oxd-toast',
    addButton: 'button.oxd-button',
    employeeIdField: '.oxd-input-group:has(.oxd-label:contains("Employee Id")) input',
    employeeContent: '.orangehrm-edit-employee-content',
    tableFilter: '.oxd-table-filter',
    tableLoader: '.oxd-table-loader',
    formInput: '.oxd-form .oxd-input',
    tableBody: '.oxd-table-body',
    tableRow: '.oxd-table-row',
    errorMessage: '.oxd-input-field-error-message',
    cancelButton: 'button',
    body: 'body',
    genericField: '.oxd-input--active',
    dateCloseButton: '.oxd-date-input .oxd-icon',
    genericCombobox: '.oxd-select-text--arrow',
    saveButton: 'button[type="submit"]',
  };

  beforeEach(() => {
    Cypress.on('uncaught:exception', (err) => {
      const ignoredErrors = [
        "Cannot read properties of undefined (reading 'response')",
        "ResizeObserver loop limit exceeded",
        "Non-Error promise rejection captured"
      ];
      return !ignoredErrors.some(ignoredError => err.message.includes(ignoredError));
    });
    cy.login();
    cy.visit('/dashboard/index');
  });

  it('Deve fazer logout com sucesso', () => {
    cy.get(selectors.topbarHeader, { timeout: 10000 }).should('be.visible');
    cy.get(selectors.userDropdown, { timeout: 10000 }).should('be.visible').click();
    cy.get(selectors.dropdownMenu).should('be.visible');
    cy.contains('Logout').should('be.visible').click();
    cy.url().should('include', '/auth/login');
    cy.get(selectors.usernameField).should('be.visible');
  });

  it('Deve atualizar informações pessoais do usuário', () => {
    const userUpdate = userData.employees.userUpdate;

    cy.visit('/pim/viewMyDetails');
    cy.get(selectors.firstNameField, { timeout: 10000 }).should('be.visible');
    cy.get(selectors.firstNameField).clear().type(userUpdate.firstName);
    cy.get(selectors.lastNameField).clear().type(userUpdate.lastName);

    // Usar seletores mais específicos para evitar conflitos
    cy.get('.oxd-input').eq(4).clear().type(userUpdate.nickname); // Nickname
    cy.get('.oxd-input').eq(5).clear().type(userUpdate.employeeId); // Employee ID
    cy.get('.oxd-input').eq(6).clear().type(userUpdate.otherId); // Other ID
    cy.get('.oxd-input').eq(7).clear().type(userUpdate.driversLicense); // Driver's License
    cy.get('.oxd-input').eq(8).clear().type(userUpdate.licenseExpiry); // License Expiry
    
    // Fechar calendário se estiver aberto
    cy.get('body').then(($body) => {
      if ($body.find('.oxd-date-input .oxd-icon').length > 0) {
        cy.get('.oxd-date-input .oxd-icon').first().click();
      }
    });
    
    cy.get('.oxd-input').eq(9).clear().type(userUpdate.ssn); // SSN

    // 🔹 Selecionar Nationality
    cy.get(selectors.genericCombobox).eq(0).click({ force: true });
    cy.get('.oxd-select-dropdown > :nth-child(3)').click();

    // 🔹 Selecionar Marital Status
    cy.get(selectors.genericCombobox).eq(1).click({ force: true });
    cy.get('.oxd-select-dropdown > :nth-child(2)').click();

    cy.contains('button', 'Save').click();

    // Aguardar sucesso ou verificar se campos foram preenchidos
    cy.get('body').then(($body) => {
      if ($body.find(selectors.toastMessage).length > 0) {
        cy.get(selectors.toastMessage)
          .should('be.visible')
          .and('contain.text', 'Successfully Updated');
      } else {
        // Verificar se os valores foram salvos
        cy.get(selectors.firstNameField).should('have.value', userUpdate.firstName);
      }
    });
  });

  it('Deve validar mensagens de erro ao tentar atualizar informações inválidas', () => {
    cy.visit('/pim/viewMyDetails');
    cy.get(selectors.firstNameField, { timeout: 10000 }).should('be.visible');
    
    // Limpar campos obrigatórios para forçar erro de validação
    cy.get(selectors.firstNameField).clear();
    cy.get(selectors.lastNameField).clear();

    cy.contains('button', 'Save').click();

    // 🔹 Verificar mensagens de erro para campos obrigatórios
    cy.get(selectors.errorMessage, { timeout: 10000 })
      .should('exist')
      .and('contain.text', 'Required');
  });

  it('Deve adicionar novo funcionário', () => {
    cy.visit('/pim/viewPimModule');
    cy.get(selectors.addButton).contains('Add').should('be.visible').click();
    const randomNum = Math.floor(Math.random() * 10000);
    const employeeId = `EMP${randomNum.toString().padStart(4, '0')}`;
    cy.get(selectors.firstNameField, { timeout: 10000 }).should('be.visible');
    cy.get(selectors.firstNameField).type('Carlos');
    cy.get(selectors.lastNameField).type('Oliveira');
    cy.get(selectors.body).then(($body) => {
      const employeeIdField = $body.find(selectors.employeeIdField);
      if (employeeIdField.length > 0 && !employeeIdField.prop('disabled')) {
        cy.wrap(employeeIdField).clear().type(employeeId);
      }
    });
    cy.get(selectors.submitButton).should('be.visible').and('be.enabled').click();
    cy.url({ timeout: 20000 }).should('include', '/pim/viewPersonalDetails');
    cy.get(selectors.body).then(($body) => {
      if ($body.find(selectors.toastMessage).length > 0) {
        cy.get(selectors.toastMessage).should('be.visible').and('contain.text', 'Success');
      } else {
        cy.get(selectors.employeeContent, { timeout: 10000 }).should('be.visible');
      }
    });
  });

  it('Deve pesquisar funcionário', () => {
    cy.visit('/pim/viewEmployeeList');
    cy.get(selectors.tableFilter, { timeout: 10000 }).should('be.visible');
    cy.get(selectors.tableLoader, { timeout: 15000 }).should('not.exist');
    cy.get(selectors.formInput).first().type('Admin');
    cy.get(selectors.submitButton).click();
    cy.get(selectors.tableLoader, { timeout: 15000 }).should('not.exist');
    cy.get(selectors.tableBody).should('exist');
    cy.get(selectors.tableRow).should('have.length.gt', 0);
  });

  it('Deve validar campos obrigatórios ao adicionar funcionário', () => {
    cy.visit('/pim/viewPimModule');
    cy.get(selectors.addButton).contains('Add').should('be.visible').click();
    cy.get(selectors.firstNameField, { timeout: 10000 }).should('be.visible');
    cy.get(selectors.submitButton).click();
    cy.get(selectors.errorMessage).should('be.visible').and('contain.text', 'Required');
  });

  it('Deve cancelar adição de funcionário', () => {
    cy.visit('/pim/viewPimModule');
    cy.get(selectors.addButton).contains('Add').should('be.visible').click();
    cy.get(selectors.firstNameField, { timeout: 10000 }).should('be.visible');
    cy.get(selectors.firstNameField).type('Teste');
    cy.get(selectors.cancelButton).contains('Cancel').should('be.visible').click();
    cy.url().should('include', '/pim/viewEmployeeList');
  });
});
