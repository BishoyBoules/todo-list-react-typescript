import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Todo } from '../types'

const AddPage = () => {
  const [text, setText] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!text.trim()) return

    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    }

    const savedTodos = localStorage.getItem('todos')
    const todos = savedTodos ? JSON.parse(savedTodos) : []
    todos.push(newTodo)
    localStorage.setItem('todos', JSON.stringify(todos))

    navigate('/')
  }

  return (
    <section className='add-page'>
      <h1>Add Todo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='Enter todo text'
        />
        <button type='submit'>Add Todo</button>
      </form>
    </section>
  )
}

export default AddPage
