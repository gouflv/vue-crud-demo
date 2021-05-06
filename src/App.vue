<template>
  <div id="app">
    <Example />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Example from './views/example/index.vue'

export default Vue.extend({
  name: 'App',
  components: {
    Example
  }
})
</script>
