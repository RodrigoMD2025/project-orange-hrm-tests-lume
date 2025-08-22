import userData from '../fixtures/userData.json'
import LoginPage from '../pages/loginPage.js'  

const loginPage = new LoginPage()

describe('Orange HRM Tests', () => {

  const SelectorsList = {
    sectionTitleTopBar: ".oxd-topbar-header-breadcrumb-module",
    dashboardGrid: ".orangehrm-dashboard-grid",
    myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
    firstNameField: "[name='firstName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    dateField: "[placeholder='yyyy-dd-mm']",
    dateCloseButton: ".--close",
    submitButton: "[type='submit']",
    bloodSelec: "[tabindex='0']",
    testFiel: "[options='']",
    submitbuttonSecond: "[type='submit']",
    
  }

  it.only(' User info Update with Success', () => {
    loginPage.accessLoginPage();
    loginPage.loginWithUser(userData.valid.username, userData.valid.password);   
   
    /* cy.visit('/auth/login')
    cy.get(SelectorsList.usernameField).type(userData.valid.username)
    cy.get(SelectorsList.passwordField).type(userData.valid.password)
    cy.get(SelectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(SelectorsList.dashboardGrid)
    cy.get(SelectorsList.myInfoButton).click()
    cy.get(SelectorsList.firstNameField).type('Name')
    cy.get(SelectorsList.lastNameField).type('Last Name')
    cy.get(SelectorsList.genericField).eq(3).clear().type('work')
    cy.get(SelectorsList.genericField).eq(4).clear().type('Other')
    cy.get(SelectorsList.genericField).eq(5).clear().type('LicenseNumber')
    cy.get(SelectorsList.genericField).eq(7).clear().type('1990-10-10')
    cy.get(SelectorsList.dateCloseButton).click()
    cy.get(SelectorsList.submitButton).eq(0).click()
    cy.get(SelectorsList.bloodSelec).eq(2).click()
    cy.get('.oxd-select-dropdown').should('be.visible').contains('B+').click()
    cy.get(SelectorsList.testFiel).clear().type('Test')
    cy.get(SelectorsList.submitbuttonSecond).eq(1).click()*/

  })
    it('Login with Fail', () => {
    cy.visit('/auth/login')
    cy.get(SelectorsList.usernameField).type(userData.invalid.username)
    cy.get(SelectorsList.passwordField).type(userData.invalid.password)
    cy.get(SelectorsList.loginButton).click()
    cy.get(SelectorsList.wrongCredentialAlert).contains('Invalid credentials')
  })
})   