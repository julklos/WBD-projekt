<template>
   <b-navbar toggleable="lg" type="dark" variant="warning">
    <b-navbar-brand href="#">
      <img style="height:40px" src="../assets/logo1.png"/>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item @click='setNewPage("workouts")' >Workouts</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item @click='setNewPage("profile")'>Profile</b-dropdown-item>
          <b-dropdown-item href="#" @click="logOut">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "UserLabel",
 methods:{
    ...mapActions({
      logout: "login/logout",
      setPage: "login/setPage"
    }),
    logOut(){
      this.logout()
    },
    setNewPage(name){
      this.setPage(name)
    }
 }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

   .navbar-dark .navbar-nav .nav-link{
      color:black
    }
    .navbar-dark .navbar-nav .nav-link:hover, .navbar-dark .navbar-nav .nav-link:focus {
    color: white;
}
</style>