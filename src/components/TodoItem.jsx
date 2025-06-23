import React, { useState } from 'react'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(editText)
    }
    setIsEditing(false)
    setEditText(todo.text)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditText(todo.text)
    }
  }

  return (
    <div className={`todo-card p-4 ${todo.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-200 ${
            todo.completed
              ? 'bg-primary-600 border-primary-600 text-white'
              : 'border-gray-300 hover:border-primary-400'
          }`}
        >
          {todo.completed && (
            <i className="bi bi-check text-xs"></i>
          )}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleEdit}
              onKeyDown={handleKeyPress}
              className="w-full px-2 py-1 text-gray-900 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoFocus
              maxLength={200}
            />
          ) : (
            <div
              className={`cursor-pointer ${
                todo.completed
                  ? 'text-gray-500 line-through'
                  : 'text-gray-900'
              }`}
              onClick={() => !todo.completed && setIsEditing(true)}
            >
              <p className="break-words">{todo.text}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(todo.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {!isEditing && !todo.completed && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-secondary"
              title="Edit todo"
            >
              <i className="bi bi-pencil text-sm"></i>
            </button>
          )}
          <button
            onClick={onDelete}
            className="btn-secondary text-red-600 hover:text-red-700 hover:bg-red-50"
            title="Delete todo"
          >
            <i className="bi bi-trash text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoItem
