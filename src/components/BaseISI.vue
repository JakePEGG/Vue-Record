<template>
  <div
    class="main-container"
    v-bind:class="{ maximised: state == 'maximised',  minimised: state == 'minimised', closed: state == 'closed'}"
  >
    <iframe
      v-for="(isi, index) in manifest.isiDocuments"
      v-bind:src="isi.filePath"
      v-bind:id="index"
      v-bind:class="{visible: index == currentISIDocument}"
    ></iframe>

    <div class="placeholder">
      <img :src="require('../../public/image-placeholder.jpg')" />
    </div>
    <button
      class="Full-Prescribing-Information"
      v-on:click="loadPrescribingInformation()"
    >Full Prescribing Information</button>

    <button v-on:click="state = 'maximised'" class="expand" ref="expand">Expand</button>
    <button v-on:click="state = 'minimised'" class="collapse" ref="collapse">Collapse</button>

    <div class="subheadings">
      <!-- <div v-for="label in labels"> -->
      <!-- <a v-bind:href="'safetyInformation.html#' + label">{{label}}</a> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SafetyArea",
  created() {
    axios.get("manifest.json").then(response => {
      this.manifest = response.data;
      console.log(this.manifest);
      console.log(this.manifest.isiDocuments);
    });
  },
  data() {
    return {
      labels: [],
      state: "minimised",
      manifest: {},
      currentISIDocument: 0
    };
  },

  methods: {
    closed() {
      state = "closed";
    },

    loadPrescribingInformation() {
      console.log("Axios will be here!");
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

img {
  position: sticky;
  top: 50px;
  z-index: 10;
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

.collapse {
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

.maximised .expand {
  display: none;
}

.maximised .collapse {
  display: unset;
}

.minimised {
  top: 850px;
}

.minimised .collapse {
  display: none;
}

.closed {
  top: 950px;
}

.closed .collapse {
  display: none;
}
</style>