# Testes Automatizados - OrangeHRM com Cypress

## 📋 Sobre o Projeto

Este projeto contém uma suíte de testes automatizados desenvolvida com Cypress para validar funcionalidades críticas da aplicação web OrangeHRM, com foco em autenticação e gerenciamento de perfil de usuário.

## 🎯 Objetivos

- Validar o processo de login com credenciais válidas
- Validar tratamento de erros para credenciais inválidas
- Garantir a qualidade das funcionalidades através de testes automatizados
- (Futuro) Validar atualização de informações do perfil do usuário

## ⚙️ Tecnologias Utilizadas

- **Cypress**: Framework de testes E2E
- **JavaScript**: Linguagem de programação
- **Page Object Model (POM)**: Padrão de design para organização dos testes
- **JSON**: Gerenciamento de dados de teste

## 🏗️ Estrutura do Projeto

```
cypress/
├── e2e/
│   └── login.cy.js              # Testes de login
├── fixtures/
│   └── userData.json            # Dados de teste
├── pages/
│   └── loginPage.js             # Page Object para login
└── support/
    ├── commands.js              # Comandos customizados
    └── e2e.js                   # Configurações globais
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd cypress-orangehrm-tests

# Instale as dependências
npm install
```

### Executando os Testes

```bash
# Abrir o Cypress Test Runner
npx cypress open

# Executar testes em modo headless
npx cypress run

# Executar testes específicos
npx cypress run --spec "cypress/e2e/login.cy.js"
```

## 🧪 Cenários de Teste

### ✅ Funcionalidades Implementadas

| Cenário | Descrição | Status |
|---------|-----------|--------|
| **Login Válido** | Testa login com credenciais corretas (Admin/admin123) | ✅ Implementado |
| **Login Inválido** | Testa login com credenciais incorretas e valida mensagem de erro | ✅ Implementado |

### 🚧 Funcionalidades Planejadas

| Cenário | Descrição | Status |
|---------|-----------|--------|
| **Atualização de Perfil** | Testa atualização de informações pessoais do usuário | 🚧 Em desenvolvimento |

## 📝 Casos de Teste Detalhados

### TC-001: Login Bem-Sucedido
- **Objetivo**: Verificar se usuário consegue fazer login com credenciais válidas
- **Passos**:
  1. Navegar para `/auth/login`
  2. Inserir credenciais válidas
  3. Clicar em "Login"
- **Resultado Esperado**: Redirecionamento para dashboard

### TC-002: Login com Credenciais Inválidas
- **Objetivo**: Verificar tratamento de erro para credenciais incorretas
- **Passos**:
  1. Navegar para `/auth/login`
  2. Inserir credenciais inválidas
  3. Clicar em "Login"
- **Resultado Esperado**: Exibição da mensagem "Invalid credentials"

## 🔧 Configuração

### Dados de Teste

Os dados de teste são gerenciados através do arquivo `cypress/fixtures/userData.json`:

```json
{
  "validUser": {
    "username": "Admin",
    "password": "admin123"
  },
  "invalidUser": {
    "username": "invalid",
    "password": "invalid"
  }
}
```

### Configurações do Cypress

As configurações principais estão no arquivo `cypress.config.js`:

- **Base URL**: Configurada para o ambiente de teste do OrangeHRM
- **Timeouts**: Configurados para aguardar elementos da página
- **Viewport**: Definido para resolução padrão de testes

## 📊 Relatórios

Os relatórios de execução são gerados automaticamente pelo Cypress e incluem:
- Screenshots de falhas
- Vídeos das execuções
- Logs detalhados de cada teste

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📋 To-Do

- [ ] Implementar testes para atualização de informações pessoais
- [ ] Adicionar testes para outros módulos do OrangeHRM
- [ ] Configurar CI/CD pipeline
- [ ] Adicionar relatórios customizados
- [ ] Implementar testes de API

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

## 📞 Contato

Para dúvidas ou sugestões, entre em contato:
- **Email**: [seu-email@exemplo.com]
- **LinkedIn**: [seu-perfil-linkedin]

---

**Nota**: Este projeto é destinado apenas para fins de teste e aprendizado. Certifique-se de ter as devidas permissões antes de executar testes em qualquer ambiente.