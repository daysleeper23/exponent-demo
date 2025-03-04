beforeEach(() => {
    cy.visit("/");
  });

describe('Task List View - Initial Render', () => {
  

  it('should render the header with sort options', () => {
    cy.get('[data-testid="task-list-view-header"]')
      .should('be.visible')
      .within(() => {
        cy.contains('Task');
        cy.contains('Title');
        cy.contains('Status');
        cy.contains('Priority');
      });
  });

  it('should render the scrollable container', () => {
    cy.get('[data-testid="task-list-view"]')
      .should('be.visible')
      .and('have.css', 'overflow-y', 'auto')
      .and('have.css', 'position', 'relative');
  });
});

describe('Task List View - Scrolling', () => {
  
  it('should render new tasks when scrolling down', () => {

    // capture initial rendered first task text
    cy.get('[data-testid="task-list-row"]')
      .first()
      .invoke('text')
      .then(initialFirstTask => {
        cy.get('[data-testid="task-list-view"]').scrollTo(0, 500);

        // allow time for virtualization to update
        cy.wait(500);

        // check that the first task row has updated (or the list includes tasks not in initial set)
        cy.get('[data-testid="task-list-row"]')
          .first()
          .invoke('text')
          .should('not.eq', initialFirstTask);
        });
  });
});

describe('Task List View - Virtualization', () => {

  it('should render only the visible task items with overscan', () => {
    cy.get('[data-testid="task-list-row"]').then($rows => {
      const visibleCount = $rows.length;
      expect(visibleCount).to.be.lessThan(30);
    });
  });
});

describe('Task List View - Sorting', () => {
  
  it('should reorder tasks when a sort option is clicked', () => {

    cy.get('[data-testid="task-list-row"]')
      .then($rowsBefore => {
        const tasksBefore = [...$rowsBefore].map(row => row.innerText);

        cy.get('[data-testid="task-list-view-header-title"]').click();

        // wait for sorting to complete (adjust wait time if necessary)
        cy.wait(500);

        // capture the order of tasks after sorting
        cy.get('[data-testid="task-list-row"]')
          .then($rowsAfter => {
            const tasksAfter = [...$rowsAfter].map(row => row.innerText);
            expect(tasksAfter).to.not.deep.equal(tasksBefore);
          });
      });
  });

  it('should sort by Status when Status is clicked', () => {
    // sort by status ASC
    cy.get('[data-testid="task-list-view-header-status"]').click();

    // wait for sorting to complete
    cy.wait(500);

    // check if the first task is Backlog
    cy.get('[data-testid="task-list-row"]').first().invoke('text').should('contain', 'Backlog');

    // sort by status DESC
    cy.get('[data-testid="task-list-view-header-status"]').click();

    // wait for re-sorting to complete
    cy.wait(500);

    // check if the first task is Canceled
    cy.get('[data-testid="task-list-row"]').first().invoke('text').should('contain', 'Canceled');
  });

  it('should sort by Priority when Priority is clicked', () => {
    // sort by priority ASC
    cy.get('[data-testid="task-list-view-header-priority"]').click();

    // wait for sorting to complete
    cy.wait(500);

    // check if the first task is No priority
    cy.get('[data-testid="task-list-row"]').first().invoke('text').should('contain', 'No priority');

    // sort by priority DESC
    cy.get('[data-testid="task-list-view-header-priority"]').click();

    // wait for re-sorting to complete
    cy.wait(500);

    // check if the first task is Urgent
    cy.get('[data-testid="task-list-row"]').first().invoke('text').should('contain', 'Urgent');
  });
  
  it('should sort by Task Number when Task is clicked', () => {
    // check if the first task is EXP-1
    cy.get('[data-testid="task-list-row"]').first().invoke('text').should('contain', 'EXP-1');

    // sort by number DESC
    cy.get('[data-testid="task-list-view-header-number"]').click();

    // wait for sorting to complete
    cy.wait(500);

    // check if the first task is No priority
    cy.get('[data-testid="task-list-row"]').first().invoke('text').should('contain', 'EXP-1000');

    // sort by priority ASC
    cy.get('[data-testid="task-list-view-header-number"]').click();

    // wait for re-sorting to complete
    cy.wait(500);

    // check if the first task is Urgent
    cy.get('[data-testid="task-list-row"]').first().invoke('text').should('contain', 'EXP-1');
  });
});


