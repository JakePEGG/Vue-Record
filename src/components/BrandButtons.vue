<template>
  <div class="content">
    <div class="buttonBar">
      <div class="brandButtons" v-bind:class="{visible:showBrandButtons}">
        <button
          v-for="(brand, index) in manifest.brands"
          class="brandBtn"
          v-on:click="openPDFs()"
          img
          src="public/assets/icons/isitray_files/referenceIcon.png"
        >{{brand.name}}</button>
      </div>
    </div>
  </div>
</template> 

<script>
import ida from "../models/ida";

export default {
  name: "BrandButtons"
};
</script>