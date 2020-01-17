<template>
<div>
  <worker-label></worker-label>
  <workouts-page v-if="page=='workouts'"></workouts-page>
  <trainers-page v-else-if="page=='trainers'"></trainers-page>
  <profile-page v-else-if="page=='profile'"></profile-page>
  <clients-page v-else></clients-page>
</div>
</template>

<script>
import WorkerLabel from "./WorkerLabel.vue"
import ClientsPage from "./ClientsPage.vue"
import TrainersPage from "./TrainersPage.vue"
import WorkoutsPage from "./WorkoutsPage"
import ProfilePage from "./ProfilePage"
import {mapState} from "vuex"
export default {
    components: {
  WorkerLabel,
  ClientsPage,
  TrainersPage,
  WorkoutsPage,
  ProfilePage
  
  },
  computed :mapState({
   page: state => state.login.page
  }),
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
