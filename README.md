# Testes Automatizados - OrangeHRM com Cypress

## 📋 Sobre o Projeto

Este projeto contém uma suíte completa de testes automatizados desenvolvida com Cypress para validar funcionalidades críticas da aplicação web OrangeHRM, incluindo autenticação, gerenciamento de usuários, administração e controle de ponto.

## 🎯 Objetivos

- Validar o processo de autenticação completo (login, logout e recuperação de senha)
- Garantir funcionalidades de gerenciamento de perfil e funcionários
- Validar módulos administrativos e de controle de ponto
- Assegurar a qualidade através de testes automatizados abrangentes

## ⚙️ Tecnologias Utilizadas

- **Cypress 13.17.0**: Framework de testes E2E
- **JavaScript**: Linguagem de programação
- **Node.js v22.18.0**: Runtime JavaScript
- **Electron 118**: Browser para execução headless
- **Mochawesome**: Gerador de relatórios HTML

## 🏗️ Estrutura do Projeto

```
project-orange-hrm-tests-lume1/
├── cypress/
│   ├── e2e/
│   │   ├── admin.spec.cy.js         # Testes do módulo administrativo
│   │   ├── timesheet.spec.cy.js     # Testes de controle de ponto
│   │   └── user.spec.cy.js          # Testes de autenticação e usuários
│   ├── reports/
│   │   └── html/                    # Relatórios HTML gerados
│   ├── videos/                      # Gravações das execuções
│   └── support/
│       ├── commands.js              # Comandos customizados
│       └── e2e.js                   # Configurações globais
└── cypress.config.js                # Configuração principal
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd project-orange-hrm-tests-lume1

# Instale as dependências
npm install
```

### Executando os Testes

```bash
# Abrir o Cypress Test Runner
npx cypress open

# Executar todos os testes em modo headless
npx cypress run

# Executar teste específico
npx cypress run --spec "cypress/e2e/user.spec.cy.js"
```

## 📊 Resultados dos Testes

### ✅ Status Atual: Todos os Testes Passando

**Última Execução**: 19 testes executados com 100% de sucesso

| Arquivo | Testes | Aprovados | Falharam | Duração |
|---------|--------|-----------|----------|---------|
| `admin.spec.cy.js` | 1 | ✅ 1 | ❌ 0 | 13s |
| `timesheet.spec.cy.js` | 1 | ✅ 1 | ❌ 0 | 10s |
| `user.spec.cy.js` | 17 | ✅ 17 | ❌ 0 | ~1m 48s |

**Total**: 19/19 testes aprovados (100% de taxa de sucesso)

## 🧪 Cenários de Teste

### 🔐 Testes de Autenticação

| Cenário | Descrição | Status |
|---------|-----------|--------|
| **Login Válido** | Testa login com credenciais corretas (Admin/admin123) | ✅ Aprovado |
| **Login Inválido** | Testa login com credenciais incorretas e valida mensagem de erro | ✅ Aprovado |
| **Campos Obrigatórios** | Valida mensagens de erro para campos não preenchidos | ✅ Aprovado |
| **Login Apenas com Usuário** | Valida erro ao submeter apenas com o campo de usuário | ✅ Aprovado |
| **Login Apenas com Senha** | Valida erro ao submeter apenas com o campo de senha | ✅ Aprovado |
| **Login Case-Insensitive** | Testa que o login é bem-sucedido com username em minúsculas | ✅ Aprovado |
| **Navegação por Teclado** | Testa funcionalidade de navegação usando Tab | ✅ Aprovado |
| **API de Login** | Valida endpoint de autenticação via requisição HTTP | ✅ Aprovado |
| **Esqueceu Senha** | Testa fluxo completo de recuperação de senha | ✅ Aprovado |
| **Username Inválido (Reset)** | Valida comportamento com usuário inexistente no reset | ✅ Aprovado |
| **Campos Vazios (Reset)** | Valida campos obrigatórios na recuperação de senha | ✅ Aprovado |

### 👤 Testes de Funcionalidade do Usuário

| Cenário | Descrição | Status |
|---------|-----------|--------|
| **Logout** | Testa processo de logout com sucesso | ✅ Aprovado |
| **Atualizar Perfil** | Testa atualização de informações pessoais | ✅ Aprovado |
| **Adicionar Funcionário** | Testa criação de novo funcionário | ✅ Aprovado |
| **Pesquisar Funcionário** | Testa funcionalidade de busca na lista de funcionários | ✅ Aprovado |
| **Validar Campos (Add)** | Valida campos obrigatórios ao adicionar funcionário | ✅ Aprovado |
| **Cancelar Adição** | Testa cancelamento do processo de adição | ✅ Aprovado |

### 🔧 Testes Administrativos

| Cenário | Descrição | Status |
|---------|-----------|--------|
| **Gerenciar Contas** | Testa funcionalidades de administração de usuários | ✅ Aprovado |

### ⏰ Testes de Controle de Ponto

| Cenário | Descrição | Status |
|---------|-----------|--------|
| **Criar Timesheet** | Testa criação de entrada de controle de ponto | ✅ Aprovado |

## 🎥 Documentação Visual

- **Vídeos**: Todas as execuções são gravadas automaticamente em `cypress/videos/`
- **Relatórios HTML**: Relatórios detalhados são gerados em `cypress/reports/html/`
- **Screenshots**: Capturas automáticas em caso de falhas

## 📝 Casos de Teste Detalhados

### TC-001: Fluxo Completo de Autenticação
- **Objetivo**: Verificar todo o processo de autenticação
- **Cobertura**: Login, logout, recuperação de senha, validações
- **Resultado**: 11/11 cenários aprovados

### TC-002: Gerenciamento de Funcionários
- **Objetivo**: Validar CRUD de funcionários
- **Cobertura**: Criação, pesquisa, validação de campos, cancelamento
- **Resultado**: 4/4 cenários aprovados

### TC-003: Funcionalidades Administrativas
- **Objetivo**: Testar módulo de administração
- **Cobertura**: Gerenciamento de contas de usuário
- **Resultado**: 1/1 cenário aprovado

### TC-004: Controle de Ponto
- **Objetivo**: Validar sistema de timesheet
- **Cobertura**: Criação de entradas de tempo
- **Resultado**: 1/1 cenário aprovado

## 🔧 Configuração

### Ambiente de Teste
- **URL Base**: `https://opensource-demo.orangehrmlive.com`
- **Browser**: Electron 118 (modo headless)
- **Resolução**: 1920x1080
- **Timeouts**: Configurados para aguardar elementos dinâmicos

### Tratamento de Erros
- Interceptação automática de exceções JavaScript não críticas
- Aguardas inteligentes para carregamento de páginas
- Retry automático para elementos temporariamente indisponíveis

## 📊 Relatórios e Métricas

### Cobertura de Testes
- **Módulos Testados**: 4 (Autenticação, Usuários, Admin, Timesheet)
- **Funcionalidades Cobertas**: 19 cenários críticos
- **Taxa de Sucesso**: 100%
- **Tempo Total de Execução**: ~2m 13s

### Qualidade dos Testes
- Uso de Page Object Model
- Comandos customizados reutilizáveis
- Dados de teste parametrizados
- Validações abrangentes (UI + API)

## 🚀 Melhorias Implementadas

- ✅ Maior cobertura de testes de login com casos de borda.
- ✅ Suporte completo à funcionalidade "Esqueceu Senha"
- ✅ Validações robustas para campos obrigatórios
- ✅ Testes de API integrados aos testes de UI
- ✅ Tratamento de exceções JavaScript
- ✅ Geração automática de relatórios HTML
- ✅ Gravação de vídeos das execuções

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 🎯 Próximos Passos

- [ ] Integração com CI/CD (GitHub Actions / Jenkins)
- [ ] Testes de performance com Lighthouse
- [ ] Testes de acessibilidade (a11y)
- [ ] Cobertura de mais módulos do OrangeHRM
- [ ] Testes cross-browser (Chrome, Firefox, Safari)
- [ ] Implementação de testes visuais (Percy/Applitools)

## 📞 Contato

Para dúvidas ou sugestões sobre os testes:
- **Issues**: Use a aba Issues do repositório
- **Documentação**: Consulte os comentários nos arquivos de teste

---

**Status do Projeto**: 🟢 Estável - Todos os testes passando
**Última Atualização**: Executado com sucesso em ambiente Cypress 13.17.0