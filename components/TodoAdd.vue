<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="todo"
      label="Type todo"
      hide-details="auto"
    />
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['triggerCreate', 'handleCreated'],
  data: () => ({
    todo: ''
  }),
  methods: {
    handleSubmit () {
      const response = this.triggerCreate(this.todo)
      if (!response.success) {
        return
      }
      this.todo = ''
      this.handleCreated()
    }
  }
})
</script>
