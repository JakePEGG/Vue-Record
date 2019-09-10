<template>
  <div class="main-container">
    <p>
      IMPORTANT SAFETY INFORMATION
      <br />
      <br />Subhead 1
      <br />
      <br />Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
      <br />
      <br />IMPORTANT SAFETY INFORMATION
      <br />
      <br />Subhead 2
      <br />
      <br />Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
      IMPORTANT SAFETY INFORMATION
      <br />
      <br />Subhead 3
      <br />
      <br />Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
      IMPORTANT SAFETY INFORMATION
      <br />
      <br />Subhead 4
      <br />
      <br />Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
      IMPORTANT SAFETY INFORMATION
      <br />
      <br />Subhead 5
      <br />
      <br />Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
      IMPORTANT SAFETY INFORMATION
      <br />
      <br />Subhead 6
      <br />
      <br />Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
      IMPORTANT SAFETY INFORMATION
      <br />
      <br />Subhead 7
      <br />
      <br />Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
      IMPORTANT SAFETY INFORMATION
      <br />
      <br />Subhead 8
      <br />
      <br />Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
    </p>
    <div class="placeholder">
      <img :src="require('../../public/image-placeholder.jpg')" />
    </div>
    <button class="Full-Prescribing-Information">Full Prescribing Information</button>

    <button v-on:click="expandUp(), hideExpand(), showCollapse()" class="expand">Expand</button>
    <div class="collapse"></div>
  </div>
</template>


<script>
export default {
  name: "SafetyArea",

  methods: {
    expandUp() {
      const container = document.querySelector("div .main-container");
      container.setAttribute("maximise", "maximised");
      container.style = "top: 50px";
    },

    collapse() {
      const container = document.querySelector("div .main-container");
      container.setAttribute("minimised", "minimised");
      container.style = "top: 850px";
    },

    hideExpand() {
      const expand = document.querySelector(".expand");
      expand.setAttribute("hidden", "hidden");
      expand.style = "display: none";
    },

    showCollapse() {
      const container = document.querySelector(".collapse");
      let collapse = "<button class='collapse'>Collapse</button>";
      container.innerHTML = collapse;
    }
  }
};
</script>

<style scoped>
.main-container {
  background-color: transparent;
  color: darkblue;
  border-color: darkblue;
  border-left: 1px solid;
  padding-left: 10px;
  overflow-x: visible;
  width: 90%;
  height: 120px;
  overflow-y: visible;
  top: auto;
  right: 0px;
  top: 850px;
  position: absolute;
  transition: top 1s linear;
}

.collapse {
  font-size: 24px;
  position: absolute;
  top: -25px;
  right: 10px;
  background-color: blue;
  color: white;
  font-size: 16px;
}

.placeholder {
  top: 0px;
  left: -180px;
  position: absolute;
  border-left: none;
}

.Full-Prescribing-Information {
  position: absolute;
  right: 200px;
  bottom: 120px;
  background: blue;
  color: white;
  height: 30px;
}

.expand {
  position: absolute;
  right: 80px;
  bottom: 122px;
  background-color: blue;
  color: white;
  font-size: 16px;
}
</style>