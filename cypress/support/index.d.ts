declare namespace Cypress {
  interface Chainable<Subject = any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    /**
     * Custom command to check if an element is visible on the screen.
     * @example cy.checkVisibilityOfText('text')
     */
    checkVisibilityOfText(text: string): Chainable<Subject>;
    checkVisibilityOfElement(selector: string): Chainable<Subject>;
  }
}
