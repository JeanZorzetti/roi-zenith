import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import React from 'react'

// Simple component for testing
const HelloWorld = ({ name = 'World' }: { name?: string }) => {
  return <h1>Hello, {name}!</h1>
}

const Counter = ({ initialValue = 0 }: { initialValue?: number }) => {
  const [count, setCount] = React.useState(initialValue)
  
  return (
    <div>
      <span data-testid="count">Count: {count}</span>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

describe('Simple Component Tests', () => {
  describe('HelloWorld Component', () => {
    it('renders with default props', () => {
      render(<HelloWorld />)
      expect(screen.getByText('Hello, World!')).toBeInTheDocument()
    })

    it('renders with custom name', () => {
      render(<HelloWorld name="Vitest" />)
      expect(screen.getByText('Hello, Vitest!')).toBeInTheDocument()
    })
  })

  describe('Counter Component', () => {
    it('renders with initial count', () => {
      render(<Counter />)
      expect(screen.getByTestId('count')).toHaveTextContent('Count: 0')
    })

    it('renders with custom initial value', () => {
      render(<Counter initialValue={5} />)
      expect(screen.getByTestId('count')).toHaveTextContent('Count: 5')
    })

    it('increments count when button is clicked', async () => {
      const { user } = renderWithUser(<Counter />)
      
      const button = screen.getByRole('button', { name: /increment/i })
      await user.click(button)
      
      expect(screen.getByTestId('count')).toHaveTextContent('Count: 1')
    })
  })
})

// Helper function for user events
function renderWithUser(ui: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(ui),
  }
}