<template>
  <div class="main-container">
    <p>IMPORTANT SAFETY INFORMATION</p>
    <h3>Subhead 1</h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
    of Lorem Ipsum.
    <br />

    <h3>Subhead 2</h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
    of Lorem Ipsum.
    <br />

    <h3>Subhead 3</h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
    of Lorem Ipsum.
    <br />

    <h3>Subhead 4</h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
    of Lorem Ipsum.
    <br />

    <h3>Subhead 5</h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
    of Lorem Ipsum.
    <br />

    <h3>Subhead 6</h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
    of Lorem Ipsum.
    <br />

    <h3>Subhead 7</h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
    of Lorem Ipsum.
    <br />

    <div class="placeholder">
      <img :src="require('../../public/image-placeholder.jpg')" />
    </div>
    <button class="Full-Prescribing-Information">Full Prescribing Information</button>

    <button
      v-on:click="expandUp(), hideExpand(), showCollapse(), loopSubheading()"
      class="expand"
    >Expand</button>
    <div v-on:click="collapse(), showExpand(), hideCollapse()" class="collapse"></div>

    <div class="subheadings"></div>
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

    showExpand() {
      const expand = document.querySelector(".expand");
      expand.setAttribute("hidden", "hidden");
      expand.style = "display: unset";
    },

    showCollapse() {
      const container = document.querySelector(".collapse");
      let collapse = "<button class='collapse'>Collapse</button>";
      container.innerHTML = collapse;
      container.style = "display: unset";
    },

    hideCollapse() {
      const container = document.querySelector(".collapse");
      container.style = "display: none";
    },

    loopSubheading() {
      const subheadings = document.querySelectorAll("h3");
      subheadings.forEach(item => {
        item.setAttribute("id", item.innerText);
        let heading = document.createElement("a");
        heading.innerHTML = item.innerHTML;
        document.querySelector(".subheadings").appendChild(heading);
      });
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
  width: 88%;
  height: 120px;
  overflow-y: visible;
  top: auto;
  right: 0px;
  top: 850px;
  position: absolute;
  transition: top 1s linear;
}

.subheadings {
  background: transparent;
  position: absolute;
  left: 0px;
  border: 1px blue solid;
}

.collapse {
  font-size: 24px;
  position: absolute;
  top: -25px;
  right: 10px;
  background: blue;
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