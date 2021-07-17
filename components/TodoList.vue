<template>
  <div>
    <todo-list-item
      v-for="(todo, k) in data"
      :key="k"
      :todo="todo"
      :trigger-update="triggerUpdate"
      :trigger-delete="triggerDelete"
      :handle-deleted="handleDeleted"
      :handle-edited="handleEdited"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TodoListItem from '~/components/TodoListItem.vue'

export default Vue.extend({
  components: {
    TodoListItem
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    triggerUpdate: {
      type: Function,
      required: true
    },
    triggerDelete: {
      type: Function,
      required: true
    },
    handleDeleted: {
      type: Function,
      required: true
    },
    handleEdited: {
      type: Function,
      required: true
    }
  }
})
</script>
