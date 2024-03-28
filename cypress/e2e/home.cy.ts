describe('homepage', () => {
  it('renders heading in page', () => {
    cy.visit('/')
    cy.get('h1').should('exist').should('have.text', 'Heading')
  })
})
