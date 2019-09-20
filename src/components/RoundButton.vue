<template>
  <div class="round-button">
    <div class="disc">
      <img class="icon" :src="`./assets/icons/${icon}`" />
      <img class="icon close" :src="`./assets/icons/${activeIcon}`" />
    </div>
    <div class="label">{{label}}</div>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.round-button {
  width: 60px;
  transition: opacity 0.2s ease;
}

.round-button img {
  width: 16px;
  height: 16px;
  top: -1px;
  left: 8px;
  position: relative;
}

.round-button.active .icon {
  display: none;
}

.round-button .close {
  display: none;
  background-color: var(--button-background-color);
  width: 20px;
  height: 20px;
  top: 6px;
  left: 0px;
}
.round-button.active .close {
  display: block;
}

.disc {
  background-color: var(--button-background-color);
  color: white;
  width: 33px;
  height: 33px;
  border-radius: 100%;
  margin: auto;
  line-height: 33px;
  transition: background-color 0.2s ease;
}

.disc .icon {
  margin: auto;
  vertical-align: middle;
}

.round-button.active .disc {
  color: var(--main-color);
  background-color: white;
  box-shadow: 0px 0px 20px 0px var(--button-background-color);
  transition: background-color 0.2s ease;
  transition: box-shadow 0.2s ease;
}

.round-button.disabled .disc {
  background-color: var(--button-disabled-background-color);
}

.round-button.disabled {
  pointer-events: none;
}

.round-button.hidden {
  opacity: 0;
  pointer-events: none;
}

.label {
  position: absolute;
  top: 7px;
  right: 55px;
  text-transform: capitalize;
  color: var(--main-color);
  font-size: 16px;
  width: 100%;
  font-size: 16px;
  margin-top: 0px;
  margin-right: 5px;
  padding: 0px;
  font-family: var(--font-family);
  color: var(--button-font-color);
}

/* .label:nth-child(2) {
  right: 70px;
} */
.round-button.active.collapse .label {
  right: 75px;
}
.round-button.disabled .label {
  color: var(--button-disabled-font-color);
}
</style>

<script>
export default {
  name: "RoundButton",
  props: {
    label: String,
    icon: String,
    activeIcon: { type: String, default: "close.png" }
  }
};
</script>
