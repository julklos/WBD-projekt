<template>
 

<user-page v-if="type==='client'"></user-page>
<worker-page v-else-if="type==='worker'"></worker-page>
<main-page v-else></main-page>

</template>

<script>
import MainPage from "./MainPage.vue";
import UserPage from "./UserPage.vue";
import WorkerPage from "./WorkerPage.vue";
import { mapState } from "vuex";
export default {
  name: "app",
  components: {
    MainPage,
    UserPage,
    WorkerPage,
  },
  computed: mapState({
   type: state => state.login.type
  }),
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: grey;
  margin-top: 60px;
}
</style>
