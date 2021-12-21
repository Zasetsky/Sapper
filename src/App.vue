<template>
  <div id="app">
    <Sapper />
  </div>
</template>

<script>
import Sapper from './components/Sapper.vue';

export default {
  name: 'App',
  components: {
    Sapper,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
