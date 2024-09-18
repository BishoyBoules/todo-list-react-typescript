import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TodoItem from '../components/TodoItem'
import { Todo } from '../types'

const ListPage = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  }

  const handleToggle = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  }

  const handleEdit = (id: number, newText: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    )
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  }

  return (
    <section className='list-page'>
      <h1>Todo List</h1>
      <Link to='/add' className='add-button'>
        Add Todo
      </Link>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => handleDelete(todo.id)}
            onToggle={() => handleToggle(todo.id)}
            onEdit={newText => handleEdit(todo.id, newText)}
          />
        ))}
      </ul>
    </section>
  )
}

export default ListPage
