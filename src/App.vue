<template>
  <BaseISI></BaseISI>
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
  width: 100%;
  height: 100%;

  overflow: hidden;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

:root {
  --font-family: var(--bms-brand-font-family, "arial");
  --main-color: var(--bms-brand-main-color, #27649f);
  --secondary-color: var(--bms-brand-secondary-color, #ffffff);

  --button-background-color: var(
    --bms-brand-button-background-color,
    var(--main-color)
  );
  --button-font-color: var(--isi-tray-button-font-color, var(--main-color));
  --button-font-size: var(--isi-tray-button-font-size, 12px);
  --button-disabled-background-color: var(
    --isi-tray-button-disabled-background-color,
    #9e9e9e
  );
  --button-disabled-font-color: var(
    --isi-tray-button-disabled-font-color,
    #9e9e9e
  );

  --isi-tray-logo: var(--logo);
}

*::-webkit-scrollbar {
  width: 8px;
  background-color: var(--bms-scroll-bg, #e3e7eb);
}

*::-webkit-scrollbar-thumb {
  background-color: var(--bms-scroll-thumb, #44484a);
}

*::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
