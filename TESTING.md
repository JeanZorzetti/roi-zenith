# 🧪 ROI Zenith - Testing Documentation

Este documento descreve a configuração completa de testes implementada no projeto ROI Zenith.

## 📋 Visão Geral das Ferramentas

### 1. **Jest (Backend)** 🔧
- **O que faz**: Framework de testes para Node.js e JavaScript
- **Onde usa**: Backend API (testes unitários e de integração)
- **Recursos**: Mocking, assertions, coverage, watch mode
- **Arquivos**: `backend/tests/`, `backend/jest.config.js`

### 2. **React Testing Library (Frontend)** ⚛️
- **O que faz**: Biblioteca para testar componentes React de forma que simula o comportamento do usuário
- **Onde usa**: Frontend React (testes de componentes e páginas)
- **Recursos**: Renderização de componentes, simulação de eventos, queries baseadas em acessibilidade
- **Arquivos**: `frontend/src/**/__tests__/`, `frontend/vitest.config.ts`

### 3. **Cypress (E2E)** 🌐
- **O que faz**: Framework para testes end-to-end que simula interações reais do usuário no browser
- **Onde usa**: Aplicação completa (fluxos completos de usuário)
- **Recursos**: Debugging visual, time-travel, network stubbing, real browser testing
- **Arquivos**: `frontend/cypress/`, `frontend/cypress.config.ts`

### 4. **Coverage Reports** 📊
- **O que faz**: Mede a porcentagem do código que está sendo testada
- **Onde usa**: Backend (Jest) e Frontend (Vitest)
- **Recursos**: Relatórios HTML, linha por linha, branch coverage
- **Arquivos**: `*/coverage/`, workflows CI/CD

## 🚀 Como Executar os Testes

### Backend (Jest)
```bash
# Executar todos os testes
cd backend && npm test

# Modo watch (re-executa quando arquivos mudam)
cd backend && npm run test:watch

# Gerar relatório de cobertura
cd backend && npm run test:coverage

# Testes para CI/CD
cd backend && npm run test:ci
```

### Frontend (React Testing Library + Vitest)
```bash
# Executar todos os testes
cd frontend && npm test

# Modo watch
cd frontend && npm run test:watch

# Interface visual
cd frontend && npm run test:ui

# Gerar relatório de cobertura
cd frontend && npm run test:coverage
```

### E2E Tests (Cypress)
```bash
# Executar testes E2E (headless)
cd frontend && npm run e2e

# Abrir interface do Cypress
cd frontend && npm run e2e:open

# Ou pelo Cypress diretamente
cd frontend && npx cypress open
```

### Todos os Testes (Root)
```bash
# Instalar todas as dependências
npm run install:all

# Executar backend + frontend
npm test

# Executar tudo incluindo E2E
npm run test:all

# Gerar relatórios de cobertura
npm run coverage:report

# Modo watch para desenvolvimento
npm run test:watch
```

## 📁 Estrutura de Arquivos

```
roi-zenith/
├── backend/
│   ├── tests/
│   │   ├── setup.ts                    # Configuração global
│   │   └── controllers/
│   │       ├── authController.test.ts  # Testes do auth
│   │       └── leadController.test.ts  # Testes dos leads
│   ├── jest.config.js                  # Configuração Jest
│   └── coverage/                       # Relatórios de cobertura
├── frontend/
│   ├── src/
│   │   ├── test/
│   │   │   └── setup.ts               # Configuração global
│   │   ├── components/__tests__/
│   │   │   └── Button.test.tsx        # Testes de componentes
│   │   └── pages/__tests__/
│   │       └── TasksPage.test.tsx     # Testes de páginas
│   ├── cypress/
│   │   ├── e2e/
│   │   │   ├── tasks.cy.ts           # Testes E2E do organizador
│   │   │   └── auth.cy.ts            # Testes E2E de autenticação
│   │   └── support/
│   │       ├── commands.ts           # Comandos customizados
│   │       ├── e2e.ts               # Setup E2E
│   │       └── component.ts         # Setup componentes
│   ├── vitest.config.ts             # Configuração Vitest
│   ├── cypress.config.ts            # Configuração Cypress
│   └── coverage/                    # Relatórios de cobertura
└── .github/workflows/test.yml       # CI/CD automatizado
```

## 🎯 Exemplos de Testes

### Backend (Jest + Supertest)
```typescript
// tests/controllers/authController.test.ts
describe('Auth Controller', () => {
  it('should return 400 for missing credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({});

    expect(response.status).toBe(400);
  });
});
```

### Frontend (React Testing Library)
```typescript
// src/components/__tests__/Button.test.tsx
describe('Button Component', () => {
  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
});
```

### E2E (Cypress)
```typescript
// cypress/e2e/tasks.cy.ts
describe('Task Organizer E2E Tests', () => {
  it('should create a new board', () => {
    cy.visit('/dashboard/tasks')
    cy.get('button').contains('Novo Quadro').click()
    cy.get('input[placeholder*="Título"]').type('Meu Primeiro Quadro')
    cy.get('button').contains('Criar Quadro').click()
    cy.contains('Meu Primeiro Quadro').should('be.visible')
  })
});
```

## 📊 Coverage Reports

### Onde encontrar os relatórios:
- **Backend**: `backend/coverage/index.html`
- **Frontend**: `frontend/coverage/index.html`
- **CI/CD**: Enviados automaticamente para CodeCov

### Métricas importantes:
- **Lines**: % de linhas de código testadas
- **Statements**: % de declarações testadas
- **Functions**: % de funções testadas
- **Branches**: % de condicionais testadas

## 🔄 CI/CD Automatizado

O arquivo `.github/workflows/test.yml` executa automaticamente:

1. **Backend Tests**: Jest com PostgreSQL
2. **Frontend Tests**: Vitest com coverage
3. **E2E Tests**: Cypress com aplicação completa
4. **Coverage Upload**: Para CodeCov

### Triggers:
- Push para `main` ou `develop`
- Pull Requests para `main`

## 🛠️ Comandos Customizados (Cypress)

```typescript
// cypress/support/commands.ts
cy.createBoard('Test Board', 'Description')
cy.createTask('board-id', 'column-id', 'Task title')
cy.clearLocalStorage()
```

## 📝 Melhores Práticas

### 1. Backend (Jest)
- Mock do PrismaClient para isolamento
- Testes de validação de entrada
- Testes de casos de erro
- Setup e teardown adequados

### 2. Frontend (RTL)
- Testes baseados em comportamento do usuário
- Queries por acessibilidade
- Mock de dependências externas
- Testes de interação

### 3. E2E (Cypress)
- Testes de fluxos completos
- Comandos customizados reutilizáveis
- Limpeza de estado entre testes
- Assertions visuais

### 4. Coverage
- Meta mínima: 70% de cobertura
- Focar em funções críticas
- Não apenas quantidade, mas qualidade
- Revisar relatórios regularmente

## ⚡ Performance

### Otimizações implementadas:
- **Parallel execution** no CI/CD
- **Watch mode** para desenvolvimento
- **Mocking** para testes isolados
- **Caching** de dependências
- **Selective testing** com changed files

## 🐛 Debug e Troubleshooting

### Problemas comuns:

1. **Cypress não abre**: Verificar se há processos rodando
2. **Testes lentos**: Revisar timeouts e mocks
3. **Coverage baixo**: Adicionar testes para funções não cobertas
4. **CI/CD falha**: Verificar logs e dependências

### Como debuggar:
```bash
# Debug modo verbose
npm run test -- --verbose

# Debug específico
npm run test -- --testNamePattern="Auth"

# Debug Cypress
npm run e2e:open
```

---

## 📚 Recursos Adicionais

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress Documentation](https://docs.cypress.io/)
- [Vitest Documentation](https://vitest.dev/)

**Configuração completa implementada! 🎉**