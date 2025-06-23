import React, { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import TodoStats from './TodoStats'
import { loadTodos, saveTodos } from '../utils/localStorage'

function TodoApp() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const savedTodos = loadTodos()
    setTodos(savedTodos)
  }, [])

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTodos(prev => [newTodo, ...prev])
  }

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const editTodo = (id, newText) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ))
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4 shadow-lg">
          <i className="bi bi-check2-square text-2xl text-white"></i>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo App</h1>
        <p className="text-gray-600">Stay organized and get things done</p>
      </div>

      <div className="space-y-6">
        <TodoForm onAddTodo={addTodo} />
        
        <TodoStats 
          todos={todos}
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
        />
        
        <TodoList
          todos={filteredTodos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />
        
        {todos.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="bi bi-clipboard text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No todos yet</h3>
            <p className="text-gray-500">Add your first todo to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoApp
