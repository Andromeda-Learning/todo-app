export type TodoItem = {
  id: string,
  name: string,
}

export type TodoList = Array<TodoItem>
interface ITodoResponse<T> {
  success: boolean,
  data: T,
}

interface ITodoClient {
  create (name: TodoItem['name']): ITodoResponse<TodoItem>,
  read: () => ITodoResponse<TodoList>,
  readById: (id: TodoItem['id']) => ITodoResponse<TodoItem>,
  update: (id: TodoItem['id'], name: TodoItem['name']) => ITodoResponse<TodoItem>,
  delete: (id: TodoItem['id']) => ITodoResponse<TodoItem>,
}

const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2)
}

function todoResponse<T> (success: boolean, data: ITodoResponse<T>['data']) {
  return {
    success,
    data
  }
}

interface ITodoCallbacks {
  onPersistentDataInitError? (): void,
}

class TodoClient implements ITodoClient {
  private list: TodoList = []
  private persistKey = 'todoList'
  emptyTodoItem: TodoItem = { id: '', name: '' }

  constructor (callbacks: ITodoCallbacks = {}) {
    const persistedListUnnormalized = localStorage.getItem(this.persistKey)
    if (!persistedListUnnormalized) {
      return
    }
    const persistedList = this.parsePersistentList(persistedListUnnormalized)
    if (persistedList && this.isListValid(persistedList)) {
      this.list = persistedList
      return
    }
    if (callbacks.onPersistentDataInitError) {
      callbacks.onPersistentDataInitError()
    }
    localStorage.setItem(this.persistKey, JSON.stringify([]))
  }

  create (name: TodoItem['name']) {
    const newItem = {
      id: generateRandomId(),
      name
    }
    this.list.push(newItem)
    this.updatePersistentStorage(this.list)
    return todoResponse(true, newItem)
  }

  read () {
    return todoResponse(true, this.list)
  }

  readById (id: TodoItem['id']) {
    const foundItem = this.list.find(item => item.id === id)
    if (foundItem) {
      return todoResponse(true, foundItem)
    }

    return todoResponse(false, this.emptyTodoItem)
  }

  update (id: TodoItem['id'], name: TodoItem['name']) {
    const targetItem = this.list.find(item => item.id === id)

    if (targetItem) {
      targetItem.name = name
      this.updatePersistentStorage(this.list)
      return todoResponse(true, targetItem)
    }

    return todoResponse(false, this.emptyTodoItem)
  }

  delete (id: TodoItem['id']) {
    const targetIndex = this.list.findIndex(item => item.id === id)
    if (targetIndex > -1) {
      const deletedItem = this.list.splice(targetIndex, 1)[0]
      this.updatePersistentStorage(this.list)
      return todoResponse(true, deletedItem)
    }

    return todoResponse(false, this.emptyTodoItem)
  }

  private updatePersistentStorage (list: TodoList) {
    localStorage.setItem(this.persistKey, JSON.stringify(list))
  }

  private isListValid (list: TodoList) {
    return Array.isArray(list)
  }

  private parsePersistentList (list: string) {
    try {
      return JSON.parse(list)
    } catch (error) {
      return false
    }
  }
}

export default TodoClient
