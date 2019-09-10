<template>
  <div>
    <BaseISI></BaseISI>
    <FullPrescribingInformation></FullPrescribingInformation>
    <Expand></Expand>
    <Logo></Logo>
  </div>
</template>

<script>
import BaseISI from "./components/BaseISI.vue";
import FullPrescribingInformation from "./components/FullPrescribingInformation.vue";
import Expand from "./components/Expand.vue";
import Logo from "./components/Logo.vue";

export default {
  name: "IsiTray",
  components: {
    BaseISI,
    FullPrescribingInformation,
    Expand,
    Logo
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
