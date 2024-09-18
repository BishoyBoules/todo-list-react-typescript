import { useState } from 'react'
import { Todo } from '../types'

interface TodoItemProps {
  todo: Todo
  onDelete: () => void
  onToggle: () => void
  onEdit: (newText: string) => void
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onToggle,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(editText)
      setIsEditing(false)
    }
  }

  const maxTextLength = 20

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <section>
        <input type='checkbox' checked={todo.completed} onChange={onToggle} />
      </section>
      {isEditing ? (
        <section>
          <input
            type='text'
            value={editText}
            onChange={e => setEditText(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)} className='cancel'>
            Cancel
          </button>
        </section>
      ) : (
        <section className='content'>
          <section>
            <title
              onClick={onToggle}
              className={`todo-text ${isExpanded ? 'expanded' : 'collapsed'}`}
            >
              {todo.text.length > maxTextLength && !isExpanded
                ? `${todo.text.slice(0, maxTextLength)}...`
                : todo.text}
            </title>
            {todo.text.length > maxTextLength && (
              <button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
            )}
          </section>
          <section>
            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            <button onClick={onDelete}>Delete</button>
          </section>
        </section>
      )}
    </li>
  )
}

export default TodoItem
