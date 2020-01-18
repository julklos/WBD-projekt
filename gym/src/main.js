import Vue from "vue";
import App from "./components/App.vue";
import store from './store';
import BootstrapVue from 'bootstrap-vue'
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'

const datepickerOptions = {sundayFirst: false,
dateLabelFormat: 'dddd, MMMM D, YYYY',
days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
daysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
monthNames: [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
],
colors: {
  selected: '#ffc107',
  inRange: '#d3d3d3',
  selectedText: '#fff',
  text: '#565a5c',
  inRangeBorder: '#ffdc46',
  disabled: '#fff',
  hoveredInRange: '#d3d3d3'
},
showKeyboardShortcutsMenu: false,
texts: {
  apply: 'Apply',
  cancel: 'Cancel',
  keyboardShortcuts: 'Keyboard Shortcuts',
},
}

Vue.use(AirbnbStyleDatepicker, datepickerOptions)
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})