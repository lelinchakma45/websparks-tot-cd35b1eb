import React, { useState } from 'react'

function TodoForm({ onAddTodo }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAddTodo(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="todo-card p-6 animate-slide-up">
      <div className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input flex-1"
          maxLength={200}
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <i className="bi bi-plus-lg mr-2"></i>
          Add
        </button>
      </div>
      {text.length > 180 && (
        <p className="text-sm text-gray-500 mt-2">
          {200 - text.length} characters remaining
        </p>
      )}
    </form>
  )
}

export default TodoForm
