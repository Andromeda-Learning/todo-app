<template>
  <v-container>
    <todo-add />
    <todo-list :data="todoList" />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import TodoAdd from '~/components/TodoAdd.vue'
import TodoList from '~/components/TodoList.vue'

export default Vue.extend({
  components: {
    TodoAdd,
    TodoList
  },
  data: () => ({
    todoList: [
      { id: 0, name: 'learn vue' },
      { id: 1, name: 'build vue' },
      { id: 2, name: 'build vue-demo' },
      { id: 3, name: 'build vue-demo' },
      { id: 4, name: 'build vue-demo' },
      { id: 5, name: 'build vue-demo' }
    ]
  })
})
</script>
