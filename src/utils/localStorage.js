const STORAGE_KEY = 'react-todo-app-todos'

export const loadTodos = () => {
  try {
    const savedTodos = localStorage.getItem(STORAGE_KEY)
    return savedTodos ? JSON.parse(savedTodos) : []
  } catch (error) {
    console.error('Error loading todos from localStorage:', error)
    return []
  }
}

export const saveTodos = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch (error) {
    console.error('Error saving todos to localStorage:', error)
  }
}
