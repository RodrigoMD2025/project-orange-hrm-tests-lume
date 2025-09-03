# 🔄 CI/CD Setup - GitHub Actions

## 📋 Visão Geral

Este projeto utiliza GitHub Actions para automatizar a execução dos testes Cypress em diferentes browsers e gerar relatórios automáticos.

## 🎯 Workflows Configurados

### 1. 🧪 Cypress E2E Tests (`cypress-tests.yml`)

**Triggers:**
- ✅ Push para `master`, `main`, `develop`
- ✅ Pull Requests para `master`, `main`
- ✅ Execução manual (`workflow_dispatch`)
- ✅ Execução agendada (2h, segunda a sexta)

**Features:**
- 🌐 **Multi-browser**: Chrome e Firefox
- ⚡ **Execução Paralela**: Otimização de tempo
- 📊 **Cypress Cloud**: Recording e analytics
- 📁 **Artifacts**: Relatórios, vídeos e screenshots
- ⏱️ **Timeout**: 15 minutos máximo

### 2. 🔍 Code Quality Check (`code-quality.yml`)

**Validações:**
- ✅ Estrutura de arquivos de teste
- ✅ Configuração do Cypress
- ✅ Verificação de dependências
- ✅ Lint (quando disponível)

## ⚙️ Configuração Necessária

### 1. Secrets do GitHub

Adicione os seguintes secrets no repositório (`Settings > Secrets and variables > Actions`):

```bash
CYPRESS_RECORD_KEY=your_cypress_cloud_record_key_here
```

### 2. Cypress Cloud (Opcional)

1. Crie uma conta em [https://cloud.cypress.io](https://cloud.cypress.io)
2. Configure o projeto
3. Obtenha o Record Key
4. Adicione como secret no GitHub

## 🚀 Scripts NPM Disponíveis

```bash
# Executar todos os testes
npm test

# Testes específicos por browser
npm run test:chrome
npm run test:firefox

# Modo CI (com recording)
npm run test:ci

# Abrir interface gráfica
npm run test:open

# Verificar instalação
npm run cypress:verify
npm run cypress:info

# Gerenciar relatórios
npm run reports:clean
npm run reports:open
```

## 📊 Artifacts Gerados

### 📈 Relatórios HTML
- **Localização**: `cypress/reports/html/`
- **Retenção**: 30 dias
- **Conteúdo**: Relatórios interativos com métricas detalhadas

### 🎥 Vídeos
- **Localização**: `cypress/videos/`
- **Retenção**: 7 dias
- **Conteúdo**: Gravação completa da execução dos testes

### 📸 Screenshots
- **Localização**: `cypress/screenshots/`
- **Retenção**: 14 dias
- **Conteúdo**: Capturas em caso de falha

## 🔧 Configurações Avançadas

### Matrix Strategy

O workflow executa em múltiplos browsers simultaneamente:

```yaml
strategy:
  fail-fast: false
  matrix:
    browser: [chrome, firefox]
```

### Retry Configuration

Configurado para retry automático em caso de falhas intermitentes:

```javascript
retries: {
  runMode: 2,    // CI: 2 tentativas
  openMode: 0    // Local: sem retry
}
```

### Environment Variables

```yaml
env:
  NODE_VERSION: '22'
  COMMIT_INFO_BRANCH: ${{ github.head_ref || github.ref_name }}
  COMMIT_INFO_SHA: ${{ github.sha }}
```

## 🚨 Troubleshooting

### Problema: Testes falhando no CI mas passando localmente

**Soluções:**
1. Verificar diferenças de resolução (CI: 1920x1080)
2. Adicionar waits explícitos para elementos
3. Usar `cy.wait()` para APIs lentas
4. Verificar timeouts específicos

### Problema: Artifacts não sendo gerados

**Soluções:**
1. Verificar se os diretórios existem
2. Conferir permissões de escrita
3. Validar configuração de paths

### Problema: Cypress Cloud não recording

**Soluções:**
1. Verificar se `CYPRESS_RECORD_KEY` está configurado
2. Confirmar que o projeto existe no Cypress Cloud
3. Validar permissões da chave

## 📈 Métricas e Monitoramento

### Status Badges

Adicione ao README.md:

```markdown
![Cypress Tests](https://github.com/your-username/project-orange-hrm-tests-lume/workflows/Cypress%20Tests/badge.svg)
```

### Cypress Cloud Dashboard

- Acompanhe execuções em tempo real
- Histórico de execuções
- Métricas de performance
- Análise de flaky tests

## 🎯 Melhores Práticas CI/CD

### ✅ Implementadas:

1. **Multi-browser Testing**: Chrome + Firefox
2. **Artifact Management**: Retenção otimizada
3. **Fail-fast Prevention**: Continua execução mesmo com falhas
4. **Timeout Protection**: Evita execuções infinitas
5. **Cache de Dependências**: NPM cache para performance
6. **Summary Reports**: Relatórios automáticos no GitHub

### 🔄 Recomendações Futuras:

- [ ] Integração com Slack/Teams para notificações
- [ ] Testes de performance com Lighthouse CI
- [ ] Deploy preview para PRs
- [ ] Integração com SonarQube
- [ ] Testes de acessibilidade automatizados

## 📞 Suporte

Para problemas relacionados ao CI/CD:

1. Verifique os logs do GitHub Actions
2. Consulte a documentação do Cypress Cloud
3. Valide a configuração local com `npm run cypress:info`
