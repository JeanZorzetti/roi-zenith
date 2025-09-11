describe('Task Organizer E2E Tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/dashboard/tasks')
  })

  it('should display the task organizer page', () => {
    cy.contains('Organizador de Tarefas').should('be.visible')
    cy.contains('Nenhum quadro encontrado').should('be.visible')
  })

  it('should create a new board', () => {
    cy.get('button').contains('Novo Quadro').click()
    
    cy.get('input[placeholder*="Título"]').type('Meu Primeiro Quadro')
    cy.get('textarea[placeholder*="Descrição"]').type('Descrição do quadro de teste')
    
    cy.get('button').contains('Criar Quadro').click()
    
    cy.contains('Meu Primeiro Quadro').should('be.visible')
    cy.contains('Descrição do quadro de teste').should('be.visible')
  })

  it('should create a new task in a column', () => {
    // First create a board
    cy.get('button').contains('Novo Quadro').click()
    cy.get('input[placeholder*="Título"]').type('Test Board')
    cy.get('button').contains('Criar Quadro').click()
    
    // Add a task to "Para Fazer" column
    cy.get('[data-column="todo"]').within(() => {
      cy.get('button').contains('+').click()
    })
    
    cy.get('input[placeholder*="título"]').type('Minha primeira tarefa')
    cy.get('textarea[placeholder*="Descrição"]').type('Descrição da tarefa')
    cy.get('button').contains('Criar Tarefa').click()
    
    cy.contains('Minha primeira tarefa').should('be.visible')
  })

  it('should test horizontal scrolling functionality', () => {
    // Create a board first
    cy.get('button').contains('Novo Quadro').click()
    cy.get('input[placeholder*="Título"]').type('Scroll Test Board')
    cy.get('button').contains('Criar Quadro').click()
    
    // Test that we can scroll horizontally on the kanban container
    cy.get('.kanban-container').should('be.visible')
    
    // Simulate horizontal drag
    cy.get('.kanban-container')
      .trigger('mousedown', { which: 1, pageX: 100, pageY: 100 })
      .trigger('mousemove', { which: 1, pageX: 200, pageY: 100 })
      .trigger('mouseup')
  })

  it('should open task details when clicking on a card', () => {
    // First create a board and task
    cy.get('button').contains('Novo Quadro').click()
    cy.get('input[placeholder*="Título"]').type('Click Test Board')
    cy.get('button').contains('Criar Quadro').click()
    
    cy.get('[data-column="todo"]').within(() => {
      cy.get('button').contains('+').click()
    })
    
    cy.get('input[placeholder*="título"]').type('Clickable Task')
    cy.get('button').contains('Criar Tarefa').click()
    
    // Click on the task card
    cy.contains('Clickable Task').click()
    
    // Should open edit modal
    cy.contains('Editar Tarefa').should('be.visible')
  })

  it('should display visual tags with colors', () => {
    // Create board and task with tags
    cy.get('button').contains('Novo Quadro').click()
    cy.get('input[placeholder*="Título"]').type('Tag Test Board')
    cy.get('button').contains('Criar Quadro').click()
    
    cy.get('[data-column="todo"]').within(() => {
      cy.get('button').contains('+').click()
    })
    
    cy.get('input[placeholder*="título"]').type('Task with Tags')
    cy.get('input[placeholder*="Tags"]').type('crítico,frontend,urgente')
    cy.get('button').contains('Criar Tarefa').click()
    
    // Check that tags are visible with colors
    cy.contains('crítico').should('be.visible').should('have.class', 'bg-red-500/20')
    cy.contains('frontend').should('be.visible').should('have.class', 'bg-purple-500/20')
    cy.contains('urgente').should('be.visible').should('have.class', 'bg-orange-500/20')
  })

  it('should switch between different boards', () => {
    // Create first board
    cy.get('button').contains('Novo Quadro').click()
    cy.get('input[placeholder*="Título"]').type('First Board')
    cy.get('button').contains('Criar Quadro').click()
    
    // Create second board
    cy.get('button').contains('Novo Quadro').click()
    cy.get('input[placeholder*="Título"]').type('Second Board')
    cy.get('button').contains('Criar Quadro').click()
    
    // Should be able to switch between boards
    cy.get('select').select('First Board')
    cy.contains('First Board').should('be.visible')
    
    cy.get('select').select('Second Board')
    cy.contains('Second Board').should('be.visible')
  })
})