describe('initial state', () => {
  it('show the form with correct fields & labels', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Create new task').click();
    
    cy.checkVisibilityOfText('Title');
    cy.checkVisibilityOfElement('[data-testid="form-task-create-title"]');

    cy.checkVisibilityOfText('Description');
    cy.checkVisibilityOfElement('[data-testid="form-task-create-description"]');

    cy.checkVisibilityOfText('Status');
    cy.checkVisibilityOfElement('[data-testid="form-task-create-status"]');

    cy.checkVisibilityOfText('Priority');
    cy.checkVisibilityOfElement('[data-testid="form-task-create-priority"]');

    cy.checkVisibilityOfText('Assignee');
    cy.checkVisibilityOfElement('[data-testid="form-task-create-assignee"]');

    cy.checkVisibilityOfText('Create task');
    cy.checkVisibilityOfElement('[data-testid="form-task-create-submit"]');
  })
})