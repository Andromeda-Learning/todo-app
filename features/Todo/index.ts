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

class TodoClient implements ITodoClient {
  private list: TodoList = []
  emptyTodoItem: TodoItem = { id: '', name: '' }

  create (name: TodoItem['name']) {
    const newItem = {
      id: generateRandomId(),
      name
    }
    this.list.push(newItem)
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
      return todoResponse(true, targetItem)
    }

    return todoResponse(false, this.emptyTodoItem)
  }

  delete (id: TodoItem['id']) {
    const targetIndex = this.list.findIndex(item => item.id === id)
    if (targetIndex > -1) {
      const deletedItem = this.list.splice(targetIndex, 1)[0]
      return todoResponse(true, deletedItem)
    }

    return todoResponse(false, this.emptyTodoItem)
  }
}

export default TodoClient
