<template>
  <v-card
    class="overflow-hidden rounded-0"
    height="100%"
  >
    <v-app-bar
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="toggleDrawer" />

      <v-toolbar-title>Todo app</v-toolbar-title>
    </v-app-bar>

    <div>
      <slot />
    </div>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
        >
          <v-list-item
            v-for="(nav, index) in navigation"
            :key="index"
            :to="nav.href"
            @click.native="toggleDrawer"
          >
            <v-list-item-icon>
              <v-icon>{{ nav.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ nav.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      drawer: false,
      group: null,
      navigation: [
        {
          title: 'Home',
          href: '/',
          icon: 'mdi-home'
        },
        {
          title: 'About',
          href: '/about',
          icon: 'mdi-account'
        }
      ]
    }
  },
  methods: {
    toggleDrawer () {
      this.drawer = !this.drawer
    }
  }
})
</script>
