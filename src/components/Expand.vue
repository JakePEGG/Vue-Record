

<template>
  <div>
    <button v-on:click="expandUp()">Expand</button>
    <!-- <font-awesome-icon icon="plus-circle" /> -->
    <!-- <i class="fas fa-plus-circle"></i> -->
  </div>
</template>

<script>
// import FontAwesome from "font-awesome/css/font-awesome.css";

export default {
  methods: {
    // expandUp() {
    //   const expand = this.$refs.expand;
    //   expand.addAttribute(transform: translate(0px, -100px); )
    // }
  }
};
</script>

<style scoped>
div {
  position: absolute;
  right: 80px;
  bottom: 122px;
  color: blue;
  /* transform: translate(0px, -750px); */
  /* expand upwards */
  /* transform: translate(0px, 130px); */
  /* expand downwards */
}

button {
  background: blue;
  color: white;
  font-size: 18px;
  font-family: arial;
}
</style>