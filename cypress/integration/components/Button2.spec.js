/* global cy */
/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Button tests', () => {
  it('should check for counter update in counter button', () => {
    cy.visit('http://localhost:6006/iframe.html?id=composite-components-button2--watch-counter-button&viewMode=story')
    cy.wait(4000)
    const watchButton = cy.get(':nth-child(1) > button')
    watchButton.click()
    watchButton.find('[data-component="ButtonCounter"]').contains('1')
  })
})
