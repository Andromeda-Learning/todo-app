<template>
  <v-container>
    <todo-add
      :trigger-create="addTodo"
      :handle-created="handleCreated"
    />
    <todo-list
      :data="todoList"
      :trigger-update="editTodo"
      :trigger-delete="deleteTodo"
      :handle-deleted="handleDeleted"
      :handle-edited="handleEdited"
    />
    <todo-notification
      :text="snackbar.text"
      :is-visible.sync="snackbar.isVisible"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Todo, { TodoList as TodoListType } from '~/features/Todo'
import TodoAdd from '~/components/TodoAdd.vue'
import TodoList from '~/components/TodoList.vue'
import TodoNotification from '~/components/TodoNotification.vue'

const todo = new Todo({
  onPersistentDataInitError () {
    setTimeout(() => {
      window.postMessage({
        name: 'todo-persistent-data-init-error',
        type: 'error',
        payload: {
          text: 'Failed to load persistent data. Don\'t worry we will fix that'
        }
      }, window.origin)
    }, 0)
  }
})
// window.todo = todo

export default Vue.extend({
  components: {
    TodoAdd,
    TodoList,
    TodoNotification
  },
  data: () => ({
    todoList: [] as TodoListType,
    snackbar: {
      text: '',
      isVisible: false
    }
  }),
  created () {
    const response = todo.read()
    if (!response.success) {
      return
    }
    this.todoList = response.data
  },
  mounted () {
    const listener = (event: any) => {
      if (event.origin !== window.origin) {
        return
      }
      if (event.data.name !== 'todo-persistent-data-init-error') {
        return
      }
      this.snackbar = {
        text: event.data.payload.text,
        isVisible: true
      }
    }
    const event = 'message'
    window.addEventListener(event, listener)
    this.$once('hook:destroyed', () => {
      window.removeEventListener(event, listener)
    })
  },
  methods: {
    addTodo: todo.create.bind(todo),
    editTodo: todo.update.bind(todo),
    deleteTodo: todo.delete.bind(todo),
    handleCreated () {
      this.snackbar.isVisible = false
      setTimeout(() => {
        this.snackbar = {
          text: 'Todo has been created',
          isVisible: true
        }
      }, 300)
    },
    handleEdited () {
      this.snackbar.isVisible = false
      setTimeout(() => {
        this.snackbar = {
          text: 'Todo has been edited',
          isVisible: true
        }
      }, 300)
    },
    handleDeleted () {
      this.snackbar.isVisible = false
      setTimeout(() => {
        this.snackbar = {
          text: 'Todo has been deleted',
          isVisible: true
        }
      }, 300)
    }
  }
})
</script>
