import Todo from '~/features/Todo'

describe('Todo', () => {
  test('create', () => {
    const todo = new Todo()
    const todoName = 'Go to gym'
    const createdTodo = todo.create(todoName)

    // Check that the todo was created
    expect(createdTodo.success).toBeTruthy()
    expect(createdTodo.data.name).toEqual(todoName)

    // Check that the todo was added to the list
    const list = todo.read()
    expect(list.data.length).toEqual(1)
    expect(list.data[0].name).toEqual(todoName)
  })
  test('read', () => {
    const todo = new Todo()
    const todoName = 'Go to gym'
    todo.create(todoName)
    const list = todo.read()
    expect(list.success).toBeTruthy()
    expect(list.data.length).toEqual(1)
    expect(list.data[0].name).toEqual(todoName)
  })
  test('readById', () => {
    const todo = new Todo()
    const todoName = 'Go to gym'
    const id = todo.create(todoName).data.id
    const readTodo = todo.readById(id)
    expect(readTodo.data.name).toEqual(todoName)
  })
  test('update', () => {
    const todo = new Todo()
    const todoName = 'Go to gym'
    const id = todo.create(todoName).data.id
    const todoLengthAfterCreate = todo.read().data.length
    const updatedTodo = todo.update(id, 'Go to work')
    const todoLengthAfterUpdate = todo.read().data.length
    expect(todoLengthAfterCreate).toEqual(todoLengthAfterUpdate)
    expect(updatedTodo.success).toBeTruthy()
    expect(updatedTodo.data.name).toEqual('Go to work')
  })
  test('delete', () => {
    const todo = new Todo()
    const todoName = 'Go to gym'
    const id = todo.create(todoName).data.id
    const todoLengthAfterCreate = todo.read().data.length
    const deletedTodo = todo.delete(id)
    const todoLengthAfterDelete = todo.read().data.length
    expect(todoLengthAfterCreate).toEqual(todoLengthAfterDelete + 1)
    expect(deletedTodo.success).toBeTruthy()
    expect(deletedTodo.data.id).toEqual(id)
  })
})
