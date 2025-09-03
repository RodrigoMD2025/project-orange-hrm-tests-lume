# 🔧 GitHub Repository Setup Guide

## 📋 Configuração do Repositório

### 1. 🏠 Configurações Iniciais

1. **Upload do Projeto**:
   ```bash
   git init
   git add .
   git commit -m "🎉 Inicial: Projeto Cypress OrangeHRM com CI/CD"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/project-orange-hrm-tests-lume.git
   git push -u origin main
   ```

2. **Proteção da Branch**:
   - Vá em `Settings > Branches`
   - Adicione regra para `main`:
     - ☑️ Require status checks to pass before merging
     - ☑️ Require branches to be up to date before merging
     - ☑️ Restrict pushes that create files larger than 100MB

### 2. 🔐 Secrets Configuration

**Acesse**: `Settings > Secrets and variables > Actions`

**Required Secrets:**
```
CYPRESS_RECORD_KEY
```

**Optional Secrets (para futuras integrações):**
```
SLACK_WEBHOOK_URL     # Para notificações
TEAMS_WEBHOOK_URL     # Para notificações Teams
SONAR_TOKEN          # Para análise de código
```

### 3. 🎯 Actions Permissions

**Configure em**: `Settings > Actions > General`

- ☑️ Allow all actions and reusable workflows
- ☑️ Allow actions created by GitHub
- ☑️ Allow actions by Marketplace verified creators

**Workflow permissions:**
- ☑️ Read and write permissions
- ☑️ Allow GitHub Actions to create and approve pull requests

### 4. 📊 GitHub Pages (para relatórios)

**Configure em**: `Settings > Pages`

- **Source**: Deploy from a branch
- **Branch**: `gh-pages` (criar se necessário)
- **Folder**: `/ (root)`

## 🏃‍♂️ Primeira Execução

### 1. Teste Manual do Workflow

1. Vá em `Actions` no seu repositório
2. Selecione `🧪 Cypress E2E Tests - OrangeHRM`
3. Clique em `Run workflow`
4. Aguarde a execução completa

### 2. Validação dos Resultados

**Verifique se foram gerados:**
- ✅ Relatórios de execução
- ✅ Artifacts (vídeos, screenshots)
- ✅ Summary no GitHub

## 🎨 Status Badges

Adicione ao seu README.md:

```markdown
![Cypress Tests](https://github.com/SEU-USUARIO/project-orange-hrm-tests-lume/workflows/🧪%20Cypress%20E2E%20Tests%20-%20OrangeHRM/badge.svg)
![Code Quality](https://github.com/SEU-USUARIO/project-orange-hrm-tests-lume/workflows/🔍%20Code%20Quality%20Check/badge.svg)
```

## 📱 Cypress Cloud Setup

### 1. Criar Projeto

1. Acesse [https://cloud.cypress.io](https://cloud.cypress.io)
2. Faça login com GitHub
3. Clique em "Create Project"
4. Selecione seu repositório

### 2. Configurar Recording

1. Copie o Project ID
2. Adicione ao `cypress.config.js`:
   ```javascript
   module.exports = defineConfig({
     projectId: "seu-project-id-aqui",
     // ... resto da configuração
   });
   ```

3. Configure o Record Key como secret no GitHub

### 3. Configurar Integrations

- **GitHub**: Conecte para comentários automáticos em PRs
- **Slack**: Para notificações de falhas/sucessos
- **Analytics**: Para métricas avançadas

## 🚀 Automated Workflows

### Triggers Configurados:

1. **Push Events**:
   - Branches: `master`, `main`, `develop`
   - Executa testes completos

2. **Pull Request Events**:
   - Target branches: `master`, `main`
   - Executa validação completa

3. **Scheduled Events**:
   - Segunda a sexta às 2h
   - Monitoramento contínuo

4. **Manual Dispatch**:
   - Execução sob demanda
   - Útil para debugging

## 📊 Monitoring e Alertas

### 1. GitHub Notifications

Configure em `Settings > Notifications`:
- ☑️ Actions workflow runs
- ☑️ Dependabot alerts
- ☑️ Security alerts

### 2. Cypress Cloud Notifications

- Email para falhas
- Slack integration
- Webhook customizados

## 🛠️ Troubleshooting

### Workflow não executa

**Verificar:**
1. Arquivo está em `.github/workflows/`
2. Sintaxe YAML válida
3. Permissions do repositório
4. Secrets configurados

### Testes falhando no CI

**Debug steps:**
1. Verificar logs detalhados
2. Baixar artifacts (videos/screenshots)
3. Comparar ambiente local vs CI
4. Validar timeouts e waits

### Artifacts não são gerados

**Soluções:**
1. Verificar paths nos workflows
2. Confirmar que diretórios existem
3. Validar permissions de escrita

## 🎉 Ready to Go!

Após seguir este guia:

✅ **Seu projeto terá:**
- CI/CD automático configurado
- Testes executando em múltiplos browsers
- Relatórios automáticos
- Monitoramento contínuo
- Artifacts organizados
- Documentação completa

🎯 **Próximo passo**: Faça um commit e push para ver o CI/CD em ação!
