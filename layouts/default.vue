<template>
  <v-app>
    <navigation>
      <Nuxt />
    </navigation>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Navigation from '~/components/Navigation.vue'

export default Vue.extend({
  components: {
    Navigation
  }
})
</script>
