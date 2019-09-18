<template>
  <div
    class="main-container"
    v-bind:class="{ maximised: state == 'maximised',  minimised: state == 'minimised', closed: state == 'closed'}"
  >
    <div class="sidebar">
      <div class="subheadings">
        <div v-for="(isiDoc, index) in manifest.isiDocuments">
          <div>{{isiDoc.title}}</div>
          <div>
            <div v-for="label in isiDoc.labels">
              <div v-on:click="showSection(isiDoc.filePath, label)">{{label}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="placeholder"></div>
    </div>

    <div class="content">
      <div class="buttonBar">
        <div class="brandBTN">
          <button
            v-for="(brand, index) in manifest.brands"
            v-on:click="testing() == currentISI"
            class="brandButtons"
          >{{brand.name}}</button>
        </div>

        <button v-on:click="state = 'maximised', alteredLoop()" class="expand" ref="expand">Expand</button>
        <button v-on:click="state = 'minimised'" class="collapse" ref="collapse">Collapse</button>

        <button
          class="Full-Prescribing-Information"
          v-on:click="loadPrescribingInformation()"
        >Full Prescribing Information</button>
      </div>

      <div class="isiDocuments">
        <iframe
          v-for="(isi, index) in manifest.isiDocuments"
          v-bind:src="isi.filePath"
          v-bind:class="{active: currentISI == isi.filePath}"
          v-on:load="loopSubheading(index, $event)"
          v-bind:name="isi.filePath"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

// <!-- , this.currentISI == this.manifest.isiDocuments.filePath -->
// <!-- <div v-for="label in labels"> -->
// <!-- <a v-bind:href="'safetyInformation.html#' + label">{{label}}</a> -->
// <!-- </div> -->
// <!--   v-bind:class="{active : 'active'}"Z -->
// <!-- "currentISI == $event.target" -->

// <!-- v-bind:class="{active: active}"
// v-on:click="active = !active"-->

export default {
  name: "SafetyArea",
  beforeCreate() {
    axios.get("manifest.json").then(response => {
      this.manifest = response.data;
      this.currentISI = this.manifest.isiDocuments[0].filePath;
    });
  },

  created() {
    // loading ida
    /*


    ida.slide.meta.bms.isiDocument
    
    const docName = ida.slide.meta.bms.isiDocumnet || this.manifest.isiDocuments[0].title;

    cons doc = this.manifest.isiDocuments.find( doc => doc.title == docName )

    this.showSection(doc.filePath, ida.slide.meta.bms.isiHeading);
*/
  },

  data() {
    return {
      labels: [],
      state: "minimised",
      manifest: {
        brands: [],
        isiDocuments: []
      },
      currentISI: 0
    };
  },

  methods: {
    closed() {
      state = "closed";
    },

    showSection(isiFilePath, section) {
      this.currentISI = isiFilePath;
      document
        .querySelector(`iframe[name="${isiFilePath}"]`)
        .setAttribute("src", isiFilePath + "#" + section);
    },

    loadPrescribingInformation() {
      console.log("Axios will be here!");
    },

    testing() {
      const filepaths = [];
      const data = this.manifest.isiDocuments;
      data.map(function(data) {
        return data.filePath;
      });
    },

    loopSubheading(index, event) {
      const iframe = event.target;

      const labels = [];
      const subheadings = iframe.contentWindow.document.querySelectorAll("h3");
      subheadings.forEach(item => {
        item.setAttribute("id", item.innerText);
        labels.push(item.innerText);
      });

      this.manifest.isiDocuments[index].labels = labels;

      this.$forceUpdate();
    },

    alteredLoop() {
      // const labels = [];
      // const subheadings = document
      //   .querySelector("iframe")
      //   .contentWindow.document.querySelectorAll("h3");
      // console.log(subheadings);
      // let heading = subheadings.forEach(title => {
      //   this.manifest.isiDocuments.title(
      //     "Title",
      //     this.manifest.isiDocuments.innerText
      //   );
      //   this.labels.push(title.innertext);
      //   console.log("labels", this.labels);
      // });
    },
    fire(brand) {
      console.log(this.labels);
      console.log(brand);
      console.log(this.currentISI);
      console.log(event.target);
    }
  }
};
</script>

<style scoped>
/* General Styles */
iframe {
  width: 100%;
  overflow-y: visible;
  height: 560px;
  font-family: arial;
  display: none;
}

.content {
  width: 836px;
}
.wrapper,
html,
body {
  height: 100%;
}

.buttonBar {
  position: absolute;
  right: 15px;
  top: -10px;
}

.brandButtons {
  position: relative;
  top: -20px;
  right: 5px;
  padding-right: 5px;
}

.brandBTN {
  position: absolute;
  right: 20px;
}

.sidebar {
  width: 184px;
  margin-left: 4px;
  display: inline-block;
}
.main-container {
  background-color: transparent;
  color: darkblue;
  border-color: darkblue;
  border-left: 1px solid;
  top: calc(100% - 150px);
  display: grid;
  position: absolute;
  grid-template-columns: 188px 806px;
  transition: top 0.5s ease;
  bottom: 0px;
}

.subheadings {
  border: 1px blue solid;
  display: block;
  width: 130px;
  display: block;
}

.Full-Prescribing-Information {
  right: 200px;
  bottom: 120px;
  background: blue;
  color: white;
  height: 30px;
}

.expand {
  right: 80px;
  bottom: 122px;
  background-color: blue;
  color: white;
  font-size: 16px;
}

.collapse {
  right: 80px;
  bottom: 122px;
  background-color: blue;
  color: white;
  font-size: 16px;
}

/* Class Styles for State */

.maximised {
  top: 185px;
}

.placeholder {
  top: 0px;
  position: relative;
  border-left: none;
  transition: all 0.5s ease;
  margin-left: 8px;
  margin-right: 8px;
  width: 172px;
  height: 100px;
  background-image: url("../../public/image-placeholder.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center top;
}

.closed .placeholder {
  top: -100px;
  background-position: center bottom;
}

.minised .placeholder {
  top: calc(0 - 100%);
}

.closed {
  top: calc(100% - 50px);
}
.maximised .expand {
  display: none;
}

.maximised .collapse {
  display: unset;
  transition: top 1s linear;
}

.minimised {
  top: calc(100% - 120px);
}

.minimised .collapse {
  display: none;
}

/* .closed {
  top: calc(194% - 950px);
} */

.closed .collapse {
  display: none;
}

.active {
  display: block;
}
</style>