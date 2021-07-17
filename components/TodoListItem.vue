<template>
  <v-card
    elevation="2"
    :class="[
      'mt-4',
      'd-flex',
      'align-items-center',
      'align-center',
      'justify-space-between',
    ]"
  >
    <v-card-title
      ref="todoName"
      contenteditable
      @blur="handleBlur(todo.id)"
      @keypress.enter="handleEnter"
      v-text="todo.name"
    />
    <v-btn
      elevation="2"
      color="error"
      class="mr-4"
      @click="handleDelete(todo.id)"
    >
      Delete
    </v-btn>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    todo: {
      type: Object,
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
  },
  methods: {
    handleDelete (id: string) {
      const response = this.triggerDelete(id)
      if (!response.success) {
        return
      }
      this.handleDeleted()
    },
    handleBlur (id: string) {
      if (!this.$refs.todoName) {
        throw new Error('todoName should not be defined')
      }
      const newVal: string = (this.$refs.todoName as HTMLInputElement).innerText
      const response = this.triggerUpdate(id, newVal)
      if (!response.success) {
        return
      }
      this.handleEdited()
    },
    handleEnter () {
      (this.$refs.todoName as HTMLInputElement).blur()
    }
  }
})
</script>
