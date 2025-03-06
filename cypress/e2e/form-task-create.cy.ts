beforeEach(() => {
    cy.visit("/");
    cy.contains('Create new task').click();
  });

describe('Form Task Create - Initial Render', () => {
  
  it('show the form with correct fields & labels', () => {

    cy.checkVisibilityOfText('Title');
    cy.checkVisibilityOfElement('[data-testid="form-task-create-title"]');

    cy.checkVisibilityOfText('Description');
    cy.checkVisibilityOfElement('[data-testid="form-task-create-description"]');

    cy.checkVisibilityOfText('Status');
    cy.checkVisibilityOfElement('[data-testid="form-task-create-status"]');
    cy.get('[data-testid="form-task-create-status"]').contains('Backlog');

    cy.checkVisibilityOfText('Priority');
    cy.checkVisibilityOfElement('[data-testid="form-task-create-priority"]');
    cy.get('[data-testid="form-task-create-priority"]').contains('No priority');

    cy.checkVisibilityOfText('Assignee');
    cy.checkVisibilityOfElement('[data-testid="form-task-create-assignee"]');

    cy.checkVisibilityOfText('Create task');
    cy.checkVisibilityOfElement('[data-testid="form-task-create-submit"]');
  })
});

describe('Form Task Create - Input & Select Functionality', () => {
  it('should display the input & selected information', () => {
    
    cy.get('[data-testid="form-task-create-title"]').type('Test Task Title').should('have.value', 'Test Task Title');
    cy.get('[data-testid="form-task-create-description"]').type('Test Task Description').should('have.value', 'Test Task Description');

    // select the status as In Progress
    cy.get('[data-testid="form-task-create-status"]').click();
    cy.wait(500);
    cy.get('[data-slot="select-content"]').contains('In Progress').click();
    cy.get('[data-testid="form-task-create-status"]').should('contain', 'In Progress');

    // select the priority as High
    cy.get('[data-testid="form-task-create-priority"]').click();
    cy.wait(500);
    cy.get('[data-slot="select-content"]').contains('High').click();
    cy.get('[data-testid="form-task-create-priority"]').should('contain', 'High');

    // assign the task to Member 1
    cy.get('[data-testid="form-task-create-assignee"]').click();
    cy.wait(500);
    cy.get('[data-slot="select-content"]').contains('Member 1').click();
    cy.get('[data-testid="form-task-create-assignee"]').should('contain', 'Member 1');
  })
});

describe('Form Task Create - Form Validation & Error Message', () => {
  it('should display the error message if missing title', () => {
    
    cy.get('[data-testid="form-task-create-submit"]').click();
    cy.get('[data-slot="form-label"').contains('Title').should('have.class', 'data-[error=true]:text-destructive-foreground');
    cy.get('[data-testid="form-task-create-title"]').should('have.class', 'aria-invalid:border-destructive');
    cy.checkVisibilityOfText('Task title could not be empty.');
    cy.contains('Task title could not be empty.').should('have.class', 'text-destructive-foreground');

    // ensure that no changes are made to the other fields
    cy.get('[data-testid="form-task-create-status"]').contains('Backlog');
    cy.get('[data-testid="form-task-create-priority"]').contains('No priority');
  })
});

describe('Form Task Create - Form Submission', () => {

  it('should create the task with correct details on form submission', () => {

    cy.get('[data-testid="form-task-create-title"]').type('Test Task Title');
    cy.get('[data-testid="form-task-create-description"]').type('Test Task Description')
    
    // select the status as In Progress
    cy.get('[data-testid="form-task-create-status"]').click();
    cy.wait(500);
    cy.get('[data-slot="select-content"]').contains('In Progress').click();
    
    // select the priority as High
    cy.get('[data-testid="form-task-create-priority"]').click();
    cy.wait(500);
    cy.get('[data-slot="select-content"]').contains('High').click();

    // assign the task to Member 1
    cy.get('[data-testid="form-task-create-assignee"]').click();
    cy.wait(500);
    cy.get('[data-slot="select-content"]').contains('Member 1').click();

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Resort the tasks by number DESC
    cy.get('[data-testid="task-list-view-header-number"]').click();
    cy.wait(500);

    // Check the first task
    cy.get('[data-testid="task-list-row"]').first().invoke('text').should('contain', 'Test Task Title');
    cy.get('[data-testid="task-list-row"]').first().invoke('text').should('contain', 'In Progress');
    cy.get('[data-testid="task-list-row"]').first().invoke('text').should('contain', 'High');
  })
});