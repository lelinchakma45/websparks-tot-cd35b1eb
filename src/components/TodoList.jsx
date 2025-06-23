import React from 'react'
import TodoItem from './TodoItem'

function TodoList({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) {
  if (todos.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <TodoItem
            todo={todo}
            onToggle={() => onToggleTodo(todo.id)}
            onDelete={() => onDeleteTodo(todo.id)}
            onEdit={(newText) => onEditTodo(todo.id, newText)}
          />
        </div>
      ))}
    </div>
  )
}

export default TodoList
