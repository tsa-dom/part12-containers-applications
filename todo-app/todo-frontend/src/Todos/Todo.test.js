import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('todo is rendered correctly', () => {
  const deleteTodo = jest.fn()
  const completeTodo = jest.fn()
  const todo = { id: 'thisisid', text: 'this is test todo', done: true }
  render(<Todo todo={todo} onClickDelete={deleteTodo} onClickComplete={completeTodo} />)
  const todoElement = screen.getByText(/this is test todo/i)
  expect(todoElement).toBeInTheDocument()
})