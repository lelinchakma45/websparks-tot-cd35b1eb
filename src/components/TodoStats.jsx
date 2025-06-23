import React from 'react'

function TodoStats({ todos, filter, onFilterChange, onClearCompleted }) {
  const totalTodos = todos.length
  const completedTodos = todos.filter(todo => todo.completed).length
  const activeTodos = totalTodos - completedTodos

  const filters = [
    { key: 'all', label: 'All', count: totalTodos },
    { key: 'active', label: 'Active', count: activeTodos },
    { key: 'completed', label: 'Completed', count: completedTodos }
  ]

  if (totalTodos === 0) return null

  return (
    <div className="todo-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{activeTodos}</span> of{' '}
          <span className="font-medium">{totalTodos}</span> tasks remaining
        </div>
        {completedTodos > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
          >
            Clear completed
          </button>
        )}
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              filter === key
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {label}
            {count > 0 && (
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                filter === key
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {totalTodos > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round((completedTodos / totalTodos) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(completedTodos / totalTodos) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoStats
