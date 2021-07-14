<template>
  <div>
    <v-card
      v-for="(todo, k) in data"
      :key="k"
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
        contenteditable
        v-text="todo.name"
      />
      <v-btn
        elevation="2"
        color="error"
        class="mr-4"
      >
        Delete
      </v-btn>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['data']
})
</script>
