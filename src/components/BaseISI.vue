<template>
  <div
    class="main-container"
    v-bind:class="{ maximised: state == 'maximised',  minimised: state == 'minimised', closed: state == 'closed'}"
  >
    <div class="sidebar">
      <div class="placeholder"></div>
      <div class="subheadings">
        <div v-for="(isiDoc, index) in manifest.isiDocuments">
          <div class="subheading-title accordian" v-on:click="toggleClass(index)">{{isiDoc.title}}</div>
          <div class="panel" ref="panel">
            <div
              ref="subheading-buttons"
              v-for="label in isiDoc.labels"
              v-on:click="showSection(isiDoc.filePath, label), toggleClass(index)"
            >{{label}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="buttonBar">
        <div class="brandButtons" v-bind:class="{visible:showBrandButtons}">
          <button v-for="(brand, index) in manifest.brands" class="brandBtn">{{brand.name}}</button>
        </div>

        <!-- v-on:click="toggleMenu(this) , "
        <button v-on:click="state = 'maximised'" class="expand" ref="expand">Expand</button>-->

        <RoundButton
          label="EXPAND"
          icon="plus.png"
          @click.native="state = 'maximised'"
          class="expand"
          v-on:click="accordianlogic()"
        ></RoundButton>

        <!-- <button v-on:click="state = 'minimised'" class="collapse" ref="collapse">Collapse</button> -->

        <RoundButton
          label="COLLAPSE"
          icon="plus.png"
          @click.native="state = 'minimised'"
          class="collapse active"
        ></RoundButton>

        <!-- <button v-on:click="state = 'closed'" class="closed">Closes</button> -->

        <button
          class="Full-Prescribing-Information"
          v-on:click="brandCheck()"
        >Full Prescribing Information</button>
      </div>

      <div class="isiDocuments">
        <iframe
          class="iframe"
          v-for="(isi, index) in manifest.isiDocuments"
          v-bind:src="isi.filePath"
          v-bind:class="{active: currentISI == isi.filePath, maximised: state == 'maximised', minimised: state == 'minimised', closed: state == 'closed'}"
          v-on:load="loopSubheading(index, $event)"
          v-bind:name="isi.filePath"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RoundButton from "./RoundButton";

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

  components: {
    RoundButton
  },

  data() {
    return {
      labels: [],
      state: "minimised",
      showBrandButtons: false,
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

    toggleClass(index) {
      this.$refs.panel[index].classList.toggle("topple");
    },
    showSection(isiFilePath, section) {
      this.currentISI = isiFilePath;
      document
        .querySelector(`iframe[name="${isiFilePath}"]`)
        .setAttribute("src", isiFilePath + "#" + section);
    },

    // test() {
    //   console.log(this.manifest.brands[0].piDocuments.length);
    // },

    showBrands() {
      this.showBrandButtons = !this.showBrandButtons;
    },

    // Need help implementing
    accordianLogic() {
      var acc = document.getElementsByClassName("subheadings");
      var i;

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        });
      }
    },

    brandCheck() {
      let brands = this.manifest.brands;
      if (brands.length == 1) {
        return;
        this.manifest.brands[0].piDocuments[0].filePath;
      }
      if (brands.length > 1) {
        this.showBrands();
      }
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
  border: none;
}

div.subheadings * {
  margin-bottom: 15px;
}
.content {
  width: 836px;
}
.wrapper,
html,
body {
  height: 100%;
}

/* .panel {
  padding: 0 18px;
  background-color: white;
  color: var(--main-color);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
} */

.panel {
  overflow: hidden;
  background-color: white;
  max-height: 1000px;
}

.panel.topple {
  max-height: 0px;
  transition: max-height 0.2s ease-out;
}

.buttonBar {
  position: absolute;
  right: 15px;
  top: -10px;
}

.isiDocuments {
  left: 50px;
}

.brandBtn {
  position: relative;
  background-color: transparent;
  color: var(--main-color);
  font-family: var(--font-family);
  top: -20px;
  left: 60px;
  font-size: 12px;
  text-transform: uppercase;
  margin-left: 25px;
  margin-right: 25px;
  border: none;
}
.brandButtons {
  display: none;
  position: relative;
  right: 190px;
  background-color: transparent;
  color: var(--main-color);
  padding-bottom: 20px;
  font-size: 15px;
}

.sidebar {
  position: relative;
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
  position: relative;
  font-family: var(--font-family);
  display: block;
  width: 130px;
  display: block;
  left: 9px;
  overflow-y: scroll;
  margin: 2px;
  height: 435px;
}

.Full-Prescribing-Information {
  position: absolute;
  right: 150px;
  top: 0px;
  width: 200px;
  background: var(--main-color);
  color: white;
  height: 30px;
}

.expand {
  position: absolute;
  right: 0px;
  top: 10px;
  font-size: 16px;
}

.collapse {
  position: absolute;
  right: 0px;
  top: 10px;
  font-size: 16px;
}

.placeholder {
  position: relative;
  border-left: none;
  transition: all 0.5s ease;
  margin-left: 8px;
  margin-right: 8px;
  width: 172px;
  height: 100px;
  margin-bottom: 25px;
  background-image: url("../../public/image-placeholder.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center top;
}
/* Class Styles for State */

.maximised {
  top: 185px;
}

.closed .placeholder {
  bottom: 80px;
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

.closed .collapse {
  display: none;
}

.active {
  display: block;
}

.visible {
  display: unset;
}

.topple {
  max-height: 1000px;
}
</style>