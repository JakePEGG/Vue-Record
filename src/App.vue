<template>
  <div>
    <BaseISI></BaseISI>
  </div>
</template>

<script>
import BaseISI from "./components/BaseISI.vue";

export default {
  name: "IsiTray",
  components: {
    BaseISI
  }
};
</script>

<style>
body,
html {
  margin: 0px;
  padding: 0px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
