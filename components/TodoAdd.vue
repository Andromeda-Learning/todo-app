<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field
      label="Type todo"
      hide-details="auto"
    />
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    handleSubmit () {
      alert()
    }
  }
})
</script>
