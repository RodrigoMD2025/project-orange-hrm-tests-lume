# Análise do Projeto Cypress e PRD

## Resumo do Projeto
Este projeto Cypress é projetado para testar a aplicação web OrangeHRM. Especificamente, ele se concentra em:
*   **Funcionalidade de Login:** Testa tanto o login bem-sucedido com credenciais válidas quanto o login falho com credenciais inválidas.
*   **Atualização de Informações do Usuário (parcialmente implementado/comentado):** Há um caso de teste destinado a atualizar informações do usuário após um login bem-sucedido, embora a maioria de suas etapas esteja atualmente comentada.

## Fluxo da Aplicação (inferido dos testes)
1.  **Acessar Página de Login:** A aplicação começa navegando para a página de login do OrangeHRM (`/auth/login`).
2.  **Autenticação do Usuário:**
    *   **Login Bem-Sucedido:** Usuários podem fazer login com credenciais válidas (usuário: "Admin", senha: "admin123"). Após o login bem-sucedido, o usuário é redirecionado para o painel (`/web/index.php/dashboard/index`).
    *   **Login Falho:** Se credenciais inválidas forem fornecidas, um alerta "Invalid credentials" é exibido.
3.  **Gerenciamento de Informações do Usuário (potencial/futuro):** Após o login bem-sucedido, a aplicação *poderia* permitir que os usuários navegassem para a seção "Minhas Informações" e atualizassem detalhes pessoais (ex: nome, sobrenome, ID do funcionário, outros detalhes como tipo sanguíneo). Esta parte está atualmente comentada nos testes.

---

# Documento de Requisitos do Produto (PRD) - Aplicação de Teste OrangeHRM

## 1. Introdução
Este documento descreve os requisitos para uma aplicação de teste automatizado utilizando Cypress, focada na validação das funcionalidades de login e, potencialmente, de atualização de informações do usuário no sistema OrangeHRM. O objetivo principal é garantir a qualidade e a estabilidade dessas funcionalidades através de testes de QA automatizados.

## 2. Propósito
O propósito desta aplicação é fornecer um conjunto de testes automatizados para a plataforma OrangeHRM, garantindo que as funcionalidades críticas de autenticação e gerenciamento de perfil de usuário operem conforme o esperado.

## 3. Metas
*   Validar o processo de login bem-sucedido com credenciais válidas.
*   Validar o tratamento de erros para tentativas de login com credenciais inválidas.
*   (Potencialmente) Validar a capacidade de um usuário autenticado de atualizar suas informações de perfil.

## 4. Histórias de Usuário / Funcionalidades
*   **US-001: Login de Usuário Válido**
    *   Como um usuário registrado, desejo fazer login no sistema OrangeHRM com minhas credenciais válidas para acessar o painel.
*   **US-002: Login de Usuário Inválido**
    *   Como um usuário, desejo ser impedido de fazer login no sistema OrangeHRM com credenciais inválidas e receber uma mensagem de erro apropriada.
*   **US-003: Atualização de Informações do Perfil (Funcionalidade Futura/Potencial)**
    *   Como um usuário autenticado, desejo poder navegar até a seção "Minhas Informações" e atualizar meus detalhes pessoais (ex: nome, sobrenome, informações de contato, etc.).

## 5. Requisitos Funcionais
*   **RF-001: Acesso à Página de Login**
    *   A aplicação deve ser capaz de navegar para a URL da página de login do OrangeHRM (`/auth/login`).
*   **RF-002: Autenticação de Usuário**
    *   A aplicação deve permitir a inserção de nome de usuário e senha nos campos designados.
    *   A aplicação deve simular o clique no botão de login.
*   **RF-003: Validação de Login Bem-Sucedido**
    *   Após um login bem-sucedido com credenciais válidas, a aplicação deve verificar se o usuário é redirecionado para o painel (`/web/index.php/dashboard/index`).
*   **RF-004: Validação de Login Falho**
    *   Após uma tentativa de login com credenciais inválidas, a aplicação deve verificar se uma mensagem de alerta "Invalid credentials" é exibida.
*   **RF-005: Gerenciamento de Dados de Teste**
    *   A aplicação deve utilizar um arquivo de dados de teste (`userData.json`) para armazenar credenciais de login válidas e inválidas.
*   **RF-006: Abstração da Página de Login**
    *   A aplicação deve utilizar um Page Object Model (POM) para a página de login (`loginPage.js`), encapsulando seletores e ações relacionadas ao login.
*   **RF-007: Atualização de Informações Pessoais (Potencial)**
    *   A aplicação *poderá* incluir a capacidade de navegar para a seção "Minhas Informações" e interagir com campos de formulário para atualizar detalhes como nome, sobrenome, informações de contato, etc. (Atualmente comentado no código de teste).

## 6. Requisitos Não Funcionais (Inferidos)
*   **Desempenho:** Os testes devem ser executados de forma eficiente.
*   **Manutenibilidade:** O código de teste deve ser modular e fácil de manter.
*   **Confiabilidade:** Os testes devem ser consistentes e fornecer resultados confiáveis.

## 7. Premissas
*   O sistema OrangeHRM está acessível e funcionando corretamente na URL base configurada.
*   As credenciais de teste fornecidas em `userData.json` são válidas e permitem o login no ambiente de teste.
*   A estrutura HTML e os seletores dos elementos da página de login e do painel do OrangeHRM permanecem estáveis.

## 8. Fora do Escopo
*   Testes de outras funcionalidades do OrangeHRM além de login e atualização de informações do usuário.
*   Testes de integração com outros sistemas.
*   Testes de performance ou carga extensivos.
*   Criação de novos usuários ou gerenciamento de usuários através da interface de administração.
