import Vue from 'vue'
import App from './App.vue'
// import FontAwesome from 'font-awesome/css/font-awesome.css'


// import {
//   library
// } from '@fortawesome/fontawesome-svg-core'
// import {
//   faPlusCircle
// } from '@fortawesome/free-solid-svg-icons'

// import {
//   FontAwesomeIcon
// } from '@fortawesome/vue-fontawesome'

// library.add(faPlusCircle)

// Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')