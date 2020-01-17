<template>
  <div style="background-color: grey;">
   <user-label></user-label>
  <profile-page v-if="page=='profile'"></profile-page>
   <workouts-page v-else></workouts-page>
    </div>
</template>

<script>
import UserLabel from "./UserLabel"
import {mapState} from "vuex";
import WorkoutsPage from "./WorkoutsPage"
import ProfilePage from "./ProfilePage"
// import { BContainer, BCol, BRow} from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import {BCarousel, BCarouselSlide} from 'bootstrap-vue'
export default {
  name: "UserPage",
  components: {
    UserLabel,
    WorkoutsPage,
    ProfilePage
 
  },
  computed: mapState({
   type: state => state.login.type,
   page: state =>state.login.page
  }),
  data() {
      return {
        slide: 0,
      }
    },
    methods: {
      
} 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
