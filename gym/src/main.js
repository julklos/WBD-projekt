import Vue from "vue";
import App from "./components/App.vue";
import store from './store';
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})