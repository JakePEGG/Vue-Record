<template>
  <div class="main-container">
    <iframe name="isiContent" src="safetyInformation.html"></iframe>
    <div class="placeholder">
      <img :src="require('../../public/image-placeholder.jpg')" />
    </div>
    <button class="Full-Prescribing-Information">Full Prescribing Information</button>

    <button v-on:click="expandUp(), loopSubheading()" class="expand">Expand</button>
    <div v-on:click="collapse()" class="collapse"></div>
    <!-- <button class="collapse">Collapse</button> -->

    <div class="subheadings">
      <div v-for="label in labels">
        <a v-bind:href="'safetyInformation.html#' + label" v-bind:key target="isiContent">{{label}}</a>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "SafetyArea",
  data() {
    return {
      labels: []
      // state: {}
    };
  },

  methods: {
    expandUp() {
      const container = document.querySelector("div .main-container");
      container.classList.add("maximised");
      container.classList.remove("minimised");

      const expandBTN = document.querySelector(".expand");
      expandBTN.classList.add("hidden");

      const collapseBTN = document.querySelector(".collapse");
      collapseBTN.classList.add("show");

      const grid = document.querySelector(".collapse");
      let collapse = "<button class='collapse'>Collapse</button>";
      grid.innerHTML = collapse;
      grid.classList.add("show");
    },

    collapse() {
      const container = document.querySelector("div .main-container");
      container.classList.add("minimised");
      container.classList.remove("maximised");

      const expandBTN = document.querySelector(".expand");
      expandBTN.classList.remove("hidden");

      const collapseBTN = document.querySelector(".collapse");
      collapseBTN.classList.remove("show");
    },

    loopSubheading() {
      const subheadings = document
        .querySelector("iframe")
        .contentWindow.document.querySelectorAll("h3");
      let heading = subheadings.forEach(item => {
        item.setAttribute("id", item.innerText);
        this.labels.push(item.innerText);
        return this.labels;
      });
    }
  }
};
</script>

<style scoped>
/* General Styles */
iframe {
  width: 100%;
  overflow-y: visible;
  height: 2000px;
  font-family: arial;
}

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
  left: -200px;
  top: 200px;
  border: 1px blue solid;
  display: block;
  width: 130px;
  display: block;
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

.collapse {
  display: none;
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

/* Class Styles for State */

.maximised {
  top: 50px;
}

.minimised {
  top: 850px;
}

.closed {
  top: 950px;
}

.hidden {
  display: none;
}

.show {
  display: unset;
}
</style>