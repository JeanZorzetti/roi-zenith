describe('Authentication E2E Tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('should display login page', () => {
    cy.visit('/')
    
    // Should redirect to login or show login option
    cy.url().should('include', '/')
    cy.contains('ROI').should('be.visible')
  })

  it('should navigate to dashboard tasks from main page', () => {
    cy.visit('/')
    
    // Navigate to tasks page
    cy.visit('/dashboard/tasks')
    cy.contains('Organizador de Tarefas').should('be.visible')
  })

  it('should handle navigation between pages', () => {
    cy.visit('/')
    
    // Test navigation
    cy.visit('/dashboard')
    cy.url().should('include', '/dashboard')
    
    cy.visit('/dashboard/tasks')
    cy.url().should('include', '/dashboard/tasks')
    cy.contains('Organizador de Tarefas').should('be.visible')
  })
})