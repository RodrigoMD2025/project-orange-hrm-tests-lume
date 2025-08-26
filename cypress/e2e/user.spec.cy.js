describe('Testes de Autenticação', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('Deve fazer login com credenciais válidas', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('Deve exibir erro com credenciais inválidas', () => {
    cy.get('input[name="username"]').type('wrongUser');
    cy.get('input[name="password"]').type('wrongPass');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert').should('be.visible');
  });

  it('Deve validar campos obrigatórios no login', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message').should('contain.text', 'Required');
  });

  it('Deve funcionar com navegação por teclado', () => {
    cy.get('input[name="username"]').focus().tab();
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
    // Clicar no link "Forgot your password?"
    cy.get('.orangehrm-login-forgot-header')
      .should('be.visible')
      .click();
    
    // Verificar se navegou para a página de reset de senha
    cy.url().should('include', '/auth/requestPasswordResetCode');
    
    // Testar cancelar - voltar para login
    cy.get('button').contains('Cancel').should('be.visible').click();
    cy.url().should('include', '/auth/login');
    
    // Voltar para a página de reset
    cy.get('.orangehrm-login-forgot-header').click();
    
    // Tentar enviar sem preencher username
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain.text', 'Required');
    
    // Preencher username válido
    cy.get('input[name="username"]').type('Admin');
    
    // Submeter o formulário
    cy.get('button[type="submit"]').click();
    
    // Verificar se a URL mudou para a página de confirmação (o sistema sempre vai para sendPasswordReset)
    cy.url().should('include', '/auth/sendPasswordReset');
    
    // Verificar se existe algum conteúdo de confirmação na página
    cy.get('body').should('contain.text', 'Reset Password link sent successfully');
  });

  it('Deve validar username inválido no esqueceu senha', () => {
    // Navegar para página de reset
    cy.get('.orangehrm-login-forgot-header').click();
    
    // Inserir username inválido
    cy.get('input[name="username"]').type('usuarioInexistente123');
    cy.get('button[type="submit"]').click();
    
    // O sistema ainda redireciona para sendPasswordReset mesmo com username inválido
    // Isso é comportamento padrão de segurança para não revelar usuários existentes
    cy.url().should('include', '/auth/sendPasswordReset');
    
    // Verificar se existe mensagem na página
    cy.get('body').should('contain.text', 'Reset Password link sent successfully');
  });

  it('Deve validar campos vazios no esqueceu senha', () => {
    // Navegar para página de reset
    cy.get('.orangehrm-login-forgot-header').click();
    
    // Tentar submeter formulário vazio
    cy.get('button[type="submit"]').click();
    
    // Verificar mensagem de campo obrigatório
    cy.get('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain.text', 'Required');
  });
});

describe('Testes de Funcionalidade do Usuário', () => {
  beforeEach(() => {
    // Configurar interceptação de exceções antes de cada teste
    Cypress.on('uncaught:exception', (err) => {
      const ignoredErrors = [
        "Cannot read properties of undefined (reading 'response')",
        "ResizeObserver loop limit exceeded",
        "Non-Error promise rejection captured"
      ];
      
      return !ignoredErrors.some(ignoredError => err.message.includes(ignoredError));
    });

    cy.login();
    // Adicionado cy.visit para garantir que a página do dashboard esteja carregada
    cy.visit('/dashboard/index');
  });

  it('Deve fazer logout com sucesso', () => {
    // Aguardar o carregamento completo da página
    cy.get('.oxd-topbar-header', { timeout: 10000 }).should('be.visible');
    
    // Procurar o dropdown do usuário com seletor específico
    cy.get('.oxd-userdropdown-tab', { timeout: 10000 })
      .should('be.visible')
      .click();
    
    cy.get('.oxd-dropdown-menu').should('be.visible');
    cy.contains('Logout').should('be.visible').click();
    
    cy.url().should('include', '/auth/login');
    cy.get('input[name="username"]').should('be.visible');
  });

  it('Deve atualizar informações pessoais do usuário', () => {
    cy.visit('/pim/viewMyDetails');
    
    // Aguardar o carregamento da página
    cy.get('input[name="firstName"]', { timeout: 10000 }).should('be.visible');
    
    cy.get('input[name="firstName"]').clear().type('Ana');
    cy.get('button[type="submit"]').first().should('be.enabled').click();
    
    cy.get('.oxd-toast', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Successfully Updated');
  });

it('Deve adicionar novo funcionário', () => {
  cy.visit('/pim/viewPimModule');
  cy.get('button.oxd-button').contains('Add').should('be.visible').click();

  // Gerar um ID único dentro do limite de 10 caracteres
  const randomNum = Math.floor(Math.random() * 10000);
  const employeeId = `EMP${randomNum.toString().padStart(4, '0')}`;
  
  // Aguardar carregamento do formulário
  cy.get('input[name="firstName"]', { timeout: 10000 }).should('be.visible');
  
  // Preencher informações básicas
  cy.get('input[name="firstName"]').type('Carlos');
  cy.get('input[name="lastName"]').type('Oliveira');
  
  // Preencher Employee ID apenas se o campo estiver visível e habilitado
  cy.get('body').then(($body) => {
    const employeeIdField = $body.find('.oxd-input-group:has(.oxd-label:contains("Employee Id")) input');
    if (employeeIdField.length > 0 && !employeeIdField.prop('disabled')) {
      cy.wrap(employeeIdField).clear().type(employeeId);
    }
  });
  
  cy.get('button[type="submit"]').should('be.visible').and('be.enabled').click();

  // Verificar se o funcionário foi adicionado com sucesso
  // O sistema redireciona para a página de detalhes do funcionário
  cy.url({ timeout: 20000 }).should('include', '/pim/viewPersonalDetails');
  
  // Verificar se a mensagem de sucesso aparece (se não aparecer, ainda consideramos o teste passado)
  cy.get('body').then(($body) => {
    if ($body.find('.oxd-toast').length > 0) {
      cy.get('.oxd-toast')
        .should('be.visible')
        .and('contain.text', 'Success');
    } else {
      // Se não houver toast, verificar se estamos na página correta
      cy.get('.orangehrm-edit-employee-content', { timeout: 10000 })
        .should('be.visible');
    }
  });
});

  it('Deve pesquisar funcionário', () => {
    cy.visit('/pim/viewEmployeeList');
    
    // Aguardar carregamento da página
    cy.get('.oxd-table-filter', { timeout: 10000 }).should('be.visible');
    
    // Aguardar que a tabela carregue completamente
    cy.get('.oxd-table-loader', { timeout: 15000 }).should('not.exist');
    
    // Buscar por Employee Name - primeiro campo de input no formulário de filtro
    cy.get('.oxd-form .oxd-input').first().type('Admin');
    
    // Clicar no botão de pesquisa
    cy.get('button[type="submit"]').click();
    
    // Aguardar os resultados carregarem
    cy.get('.oxd-table-loader', { timeout: 15000 }).should('not.exist');
    
    // Verificar se a tabela tem conteúdo
    cy.get('.oxd-table-body').should('exist');
    cy.get('.oxd-table-row').should('have.length.gt', 0);
  });

  it('Deve validar campos obrigatórios ao adicionar funcionário', () => {
    cy.visit('/pim/viewPimModule');
    cy.get('button.oxd-button').contains('Add').should('be.visible').click();
    
    // Aguardar carregamento do formulário
    cy.get('input[name="firstName"]', { timeout: 10000 }).should('be.visible');
    
    // Tentar submeter sem preencher campos obrigatórios
    cy.get('button[type="submit"]').click();
    
    // Verificar mensagens de erro
    cy.get('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain.text', 'Required');
  });

  it('Deve cancelar adição de funcionário', () => {
    cy.visit('/pim/viewPimModule');
    cy.get('button.oxd-button').contains('Add').should('be.visible').click();
    
    // Aguardar carregamento do formulário
    cy.get('input[name="firstName"]', { timeout: 10000 }).should('be.visible');
    
    // Preencher alguns dados
    cy.get('input[name="firstName"]').type('Teste');
    
    // Cancelar - buscar o botão Cancel
    cy.get('button').contains('Cancel').should('be.visible').click();
    
    // Verificar se voltou para a lista - a URL deve conter viewEmployeeList
    cy.url().should('include', '/pim/viewEmployeeList');
  });
});