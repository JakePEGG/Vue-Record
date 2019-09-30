
<template>
  <div
    class="bg"
    v-bind:class="{maximised: state == 'maximised',  minimised: state == 'minimised', closed: state == 'closed'}"
  >
    <div class="main-container interactive" ref="mainContainer" v-bind:class="{ animate: animate }">
      <div class="sidebar">
        <div class="logo"></div>
        <div class="subheadings">
          <div v-for="(isiDoc, index) in manifest.isiDocuments">
            <div
              v-if="manifest.isiDocuments.length > 1"
              class="subheading-title accordian"
              v-on:click="toggleClass(index)"
            >{{isiDoc.title}}</div>
            <div class="panel" ref="panel">
              <div
                ref="subheading-buttons"
                v-for="label in isiDoc.labels"
                v-on:click="showSection(isiDoc.filePath, label)"
              >{{label}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="filler"></div>
        <div class="buttonBar">
          <div class="brandButtons" v-bind:class="{visible:showBrandButtons}">
            <div
              ref="brandButton"
              v-for="(brand, index) in manifest.brands"
              class="brandBtn"
              v-on:click="openPDFs(brand.piDocuments[0].filePath)"
            >
              <img src="assets/icons/isitray_files/reficon.png" />
              <span>{{brand.name}}</span>
            </div>
          </div>

          <div class="safetyInformationHeader">
            <h3>IMPORTANT SAFETY INFORMATION</h3>
          </div>

          <RoundButton
            label="EXPAND"
            icon="plus.png"
            @click.native="state = 'maximised', animate = true;"
            class="expand"
          ></RoundButton>

          <RoundButton
            label="COLLAPSE"
            icon="plus.png"
            @click.native="state = closedState"
            class="collapse active"
          ></RoundButton>

          <button
            class="Full-Prescribing-Information"
            v-on:click="brandCheck()"
          >Full Prescribing Information</button>
        </div>

        <div class="isiDocuments">
          <iframe
            class="iframe"
            v-for="(isi, index) in manifest.isiDocuments"
            v-bind:src="basePath + isi.filePath"
            v-bind:class="{active: currentISI == isi.filePath, maximised: state == 'maximised', minimised: state == 'minimised', closed: state == 'closed'}"
            v-on:load="iframeLoaded(index, $event)"
            v-bind:name="isi.filePath"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RoundButton from "./RoundButton";
import ida from "../models/ida";
// import brandButtons from "../components/BrandButtons";

export default {
  name: "SafetyArea",
  beforeCreate() {
    this.basePath = "../shared/presentation_viewer/presentations/default/";

    // TODO : this path needs to be adjusted when we are in veeva to be
    // ../shared/presentations/default/isiDocuments/manifest.json
    axios
      .get(this.basePath + "isiDocuments/manifest.json")

      .catch(error => {
        this.basePath = "../presentation_viewer/presentations/default/";
        return axios.get(this.basePath + "isiDocuments/manifest.json");
      })

      .then(response => {
        this.manifest = response.data;

        this.currentISI = this.manifest.isiDocuments[0].filePath;

        if (!ida.currentSlide.meta.bms.isi_section) {
          this.closedState = "closed";
        } else {
          this.closedState = "minimised";
        }
        this.state = this.closedState;
      });
  },

  components: {
    RoundButton
  },

  data() {
    return {
      labels: [],
      closedState: "",
      state: "",
      animate: false,
      showBrandButtons: false,
      loadediFrames: 0,
      manifest: {
        brands: [],
        isiDocuments: []
      },
      currentISI: 0
    };
  },

  updated() {},

  methods: {
    openPDFs(filePath) {
      // let buttonClicked = event.target;

      // const docName = ida.currentSlide.meta.bms.isi_document;
      // let doc = this.manifest.isiDocuments.find(doc => doc.title == docName);

      window.open(this.basePath + filePath);

      // console.log(filePath);
      // console.log(buttonClicked.dataset.file);
    },

    iframeLoaded(index, event) {
      this.loopSubheading(index, event);

      this.loadediFrames += 1;

      if (this.manifest.isiDocuments.length == this.loadediFrames) {
        this.showDefaultSection();
      }
    },

    showDefaultSection() {
      const docName = ida.currentSlide.meta.bms.isi_document;
      const section = ida.currentSlide.meta.bms.isi_section;

      if (section) {
        let doc = this.manifest.isiDocuments.find(doc => doc.title == docName);

        if (!doc) {
          doc = this.manifest.isiDocuments[0];
        }

        const docPath = doc.filePath;

        this.showSection(docPath, section);
      }
    },

    toggleClass(index) {
      this.$refs.panel[index].classList.toggle("topple");
    },

    showSection(isiFilePath, section) {
      this.currentISI = isiFilePath;

      // defer navigating the iframe as this doesnt work until the iframe is dispay:block
      // which setting currentISI will update
      this.$nextTick(() => {
        document
          .querySelector(`iframe[name="${isiFilePath}"]`)
          .setAttribute("src", this.basePath + isiFilePath + "#" + section);
      });
    },

    showBrands() {
      this.showBrandButtons = !this.showBrandButtons;
    },

    brandCheck() {
      let brands = this.manifest.brands;
      if (brands.length == 1) {
        this.openPDFs(this.manifest.brands[0].piDocuments[0].filePath);
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
  font-family: var(--font-family);
  color: var(--main-color);
  display: none;
  border: none;
}

.filler {
  display: flex;
  flex-grow: 1;
  background-color: rgba(0, 143, 80, 0.03);
  position: absolute;
  right: 0px;
  width: calc(100% - 1024px);
  height: 3000px;
}

.safetyInformationHeader {
  position: absolute;
  right: 215px;
  font-size: 12px;
  top: 0px;
  display: inline-block;
  width: 600px;
  margin-bottom: 20px;
  color: var(--main-color);
  font-family: var(--font-family);
  font-size: var(--main-font-size);
}

.content {
  width: 836px;
  background-color: rgba(0, 143, 80, 0.04);
}

.wrapper {
  height: 100%;
}

.panel {
  overflow: hidden;
  background-color: white;
  max-height: 1000px;
  transition: max-height 0.35s ease-in;
  background-color: rgba(0, 143, 80, 0.0001);
  margin-right: 10px;
}

.panel.topple {
  max-height: 0px;
  transition: max-height 0.35s ease-out;
}

.buttonBar {
  position: absolute;
  right: 15px;
  top: -10px;
}

.isiDocuments {
  margin-top: 50px;
}

.brandBtn {
  display: inline-block;
  position: relative;
  background-color: transparent;
  color: var(--bms-brand-qauaternary-color);
  font-family: var(--font-family);
  bottom: 25px;
  right: 11px;
  font-size: 14px;
  width: 93px;
  background-color: var(--bms-scroll-bg);
  text-transform: uppercase;
  border-right: 1px solid var(--bms-brand-qauaternary-color);
  border-top-left-radius: 5px;
  padding: 3px;
  padding-bottom: 7px;
  /* border-right: 0px; */
  padding-right: 0px;
}

.brandBtn:nth-child(2) {
  border-right: none;
  border-right: 5px;
  padding-right: 5px;
  border-top-right-radius: 5px;
  border-top-left-radius: 0px;
  /* border-left: 3px solid var(---bms-brand-qauaternary-color); */
  /* margin-left: */
}

.brandBtn img {
  margin-right: 5px;
  /* padding-left: 5px */
}

.brandBtn:nth-child(1) img {
  margin-left: 10px;
}

.label {
  color: var(--qauaternary-color);
}
.brandButtons {
  /* display: none; */
  opacity: 0;
  transition: opacity 0.5s ease;
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
  background-color: rgba(0, 143, 80, 0.04);
  border-right: #454545 solid 1px;
}

.main-container {
  background-color: #f7fcff;
  color: darkblue;
  border-color: darkblue;
  border-left: 1px solid;
  top: calc(100% - 150px);
  display: grid;
  position: absolute;
  grid-template-columns: 188px 806px;
  bottom: 0px;
  width: 100%;
}

.main-container.animate {
  transition: top 0.5s ease;
}

.subheadings {
  position: relative;
  font-family: var(--font-family);
  display: block;
  width: 140px;
  display: block;
  left: 9px;
  overflow-y: auto;
  margin: 2px;
  height: 435px;
}

div.subheadings * {
  margin-bottom: 32px;
  color: var(--bms-brand-qauaternary-color);
  margin-right: 2px;
}

.Full-Prescribing-Information {
  position: absolute;
  right: 200px;
  top: 0px;
  width: 200px;
  background: var(--bms-brand-qauaternary-color);
  color: white;
  height: 30px;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
}

.logo {
  position: relative;
  border-left: none;
  transition: all 0.5s ease;
  margin-left: 8px;
  margin-right: 8px;
  width: 172px;
  height: 100px;
  margin-bottom: 25px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center top;
  top: 10px;
}
/* Class Styles for State */

.expand {
  position: absolute;
  left: 160px;
  top: 20px;
  font-size: 16px;
}

.collapse {
  position: absolute;
  left: 160px;
  top: 20px;
  font-size: 16px;
}

.maximised .main-container {
  top: 185px;
}

.closed .main-container .logo {
  bottom: 80px;
  background-position: center bottom;
}

.minimised .logo {
  top: 20px;
}

.closed .main-container {
  top: calc(100% - 50px);
}
.maximised .main-container .expand {
  display: none;
}

.maximised .main-container .collapse {
  display: unset;
  transition: top 1s linear;
}

.bg {
  background-color: transparent;
  transition: background-color 0.5s ease;
  width: 100%;
  height: 100%;
}

.maximised.bg {
  background-color: var(--main-color);
}

.minimised .main-container {
  top: calc(100% - 120px);
}

.minimised .main-container .collapse {
  display: none;
}

/* .minimised .brandBtn {
  position: relative;
  left: -15px;
} */

.closed .main-container .collapse {
  display: none;
}

.active {
  display: block;
}

.visible {
  display: unset;
  opacity: 1;
}
</style>