describe('initial state', () => {
  it('show the form for creating new task', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Create new task').click();
    cy.contains('Title').should('be.visible');
    cy.get('input[name="title"]').should('be.visible');

    cy.contains('Description').should('be.visible');
    cy.get('textarea[name="description"]').should('be.visible');

    // cy.contains('Status').should('be.visible');
    // cy.get('button[name="status"]').should('be.visible');

    // cy.contains('Priority').should('be.visible');
    // cy.contains('Create task').should('be.visible');

    // cy.get('button[type="submit"]').should('be.visible');
  })

  
})