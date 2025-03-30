import '../../support/commands';

describe('Navigation for anonymous users', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('root shows landing page if not logged in', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.get('[data-testid="welcome-text"]').should('be.visible')
  })

  it('redirects to login page when trying to access restricted content', () => {
    cy.visit('/community-123')
    cy.url().should('eq', Cypress.config().baseUrl + '/login')
  })

  it('navigates correctly to auth pages', () => {
    // Test Register button navigation
    cy.get('[data-testid="register-button"]').click()
    cy.url().should('include', '/register')

    // Go back to landing page
    cy.go('back')
    cy.url().should('eq', Cypress.config().baseUrl + '/')

    // Test Login button navigation
    cy.get('[data-testid="login-button"]').click()
    cy.url().should('include', '/login')
  })

  it('navigates to blog page', () => {
    cy.viewport('macbook-13');
    cy.get('[data-testid="navlink-blog"]').click()
    cy.url().should('include', '/blog')
  })

})