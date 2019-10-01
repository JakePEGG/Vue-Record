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
.disc {
  background-color: var(--bms-brand-qauaternary-color);
  color: white;
  width: 23px;
  height: 23px;
  border-radius: 100%;
  margin: auto;
  line-height: 33px;
  transition: background-color 0.2s ease;
}

.disc .icon {
  margin: auto;
  vertical-align: middle;
}
.round-button {
  width: 60px;
  top: 20px;
  transition: opacity 0.2s ease;
}

.round-button img {
  width: 20px;
  height: 20px;
  bottom: 5px;
  left: 2px;
  position: relative;
}

.round-button.active .icon {
  display: none;
}

.round-button .close {
  display: none;
  background-color: #f26322;
  width: 16px;
  height: 16px;
  top: 4px;
  left: 0.45px;
}
.round-button.active .close {
  display: block;
  background-color: transparent;
}

.round-button.active .disc {
  color: var(--main-color);
  background-color: white;
  box-shadow: 0px 0px 20px 0px #f26322;
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
  top: 4px;
  right: 50px;
  text-transform: uppercase;
  font-style: bold;
  color: var(--bms-brand-qauaternary-color);
  font-size: 16px;
  width: 100%;
  font-size: 16px;
  margin-top: 0px;
  margin-right: 5px;
  padding: 0px;
  font-family: var(--font-family);
  /* color: var(--button-font-color); */
}

/* .label:nth-child(2) {
  right: 70px;
} */
.round-button.active.collapse .label {
  right: 70px;
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
