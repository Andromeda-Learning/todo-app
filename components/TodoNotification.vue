<template>
  <v-snackbar
    v-model="snackbar"
    :multi-line="false"
  >
    {{ text }}

    <template #action="{ attrs }">
      <v-btn
        color="red"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    text: {
      type: String,
      required: true
    },
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      snackbar: this.isVisible
    }
  },
  watch: {
    isVisible (newValue) {
      this.snackbar = newValue
    },
    snackbar (newValue) {
      this.$emit('update:isVisible', newValue)
    }
  }
})
</script>
