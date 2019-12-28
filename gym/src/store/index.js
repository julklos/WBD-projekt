import Vue from 'vue';
import Vuex from 'vuex';
import clients from './modules/clients';
import trainers from './modules/trainers';
import workouts from './modules/workouts';
import login from './modules/login';

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    clients,
    trainers,
    workouts,
    login
  },
})