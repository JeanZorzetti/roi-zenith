// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to create a new board in the task organizer
       * @example cy.createBoard('Test Board', 'Test description')
       */
      createBoard(title: string, description?: string): Chainable<void>
      
      /**
       * Custom command to create a new task
       * @example cy.createTask('board-id', 'column-id', 'Task title')
       */
      createTask(boardId: string, columnId: string, title: string): Chainable<void>

      /**
       * Custom command to reset app state
       * @example cy.resetAppState()
       */
      resetAppState(): Chainable<void>
    }
  }
}

Cypress.Commands.add('createBoard', (title: string, description?: string) => {
  cy.get('[data-testid="new-board-button"]').click()
  cy.get('[data-testid="board-title-input"]').type(title)
  if (description) {
    cy.get('[data-testid="board-description-input"]').type(description)
  }
  cy.get('[data-testid="create-board-submit"]').click()
})

Cypress.Commands.add('createTask', (boardId: string, columnId: string, title: string) => {
  cy.get(`[data-testid="add-task-${columnId}"]`).click()
  cy.get('[data-testid="task-title-input"]').type(title)
  cy.get('[data-testid="create-task-submit"]').click()
})

Cypress.Commands.add('resetAppState', () => {
  cy.window().then((win) => {
    win.localStorage.clear()
  })
})

export {}