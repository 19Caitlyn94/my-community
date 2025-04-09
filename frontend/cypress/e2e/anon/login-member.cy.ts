describe('Login community member', function () {
  before(() => {
    cy.clearAllCookies();
    cy.visit('/login')
  })

  it('successfully logs member in via request', function () {
    cy.log(Cypress.env('user_admin')['email'])
    cy.request('POST', `${Cypress.env('api_url')}auth/login/`, {
      email: Cypress.env('user_admin')['email'],
      password: Cypress.env('user_admin')['password'],
    }).then((backendResponse) => {
      expect(backendResponse.status).to.eq(200)
    })
  })

  it('successfully logs admin in via request', function () {
    cy.request('POST', `${Cypress.env('api_url')}auth/login/`, {
      email: Cypress.env('user_admin')['email'],
      password: Cypress.env('user_admin')['password'],
    }).then((backendResponse) => {
      expect(backendResponse.status).to.eq(200)
    })
  })

  it('successfully logs member in via form submission', function () {

    cy.visit('/login')

    cy.get('[data-testid=email-field] input').type(`${Cypress.env('user_member')['email']}`)

    cy.get('[data-testid=password-field] input').type(`${Cypress.env('user_member')['password']}{enter}`)

    cy.url().should('not.include', '/login')

    cy.getCookie('authjs.session-token').should('exist')

    cy.get('[data-testid=new-post-greeting-message]').should('contain', Cypress.env('user_member')['first_name'])

  })

  it('successfully logs admin in via form submission', function () {
    cy.visit('/login')

    cy.get('[data-testid=email-field] input').type(`${Cypress.env('user_admin')['email']}`)

    cy.get('[data-testid=password-field] input').type(`${Cypress.env('user_admin')['password']}{enter}`)

    cy.get('[data-testid=new-post-greeting-message]').should('contain', Cypress.env('user_admin')['first_name'])
  })
})