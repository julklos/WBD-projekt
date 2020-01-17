<template>
 <div style=" background-color: grey">
    <main-label></main-label>

<b-container class="main-page">

  <b-row style="width:100%;height:100%">
    <b-col cols="8" style="backgroundColor: grey">

  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000;   margin-top: 1.5%;"
    fade
    indicators
    img-width="1024"
    img-height="480"
  >
   <b-carousel-slide

      img-src="https://smartgym.club/content/uploads/2016/12/smartgym-gliwice5.jpg"
    ></b-carousel-slide>
     <b-carousel-slide
      img-src="http://smartgym.club/content/uploads/2016/12/smartgym-gliwice4.jpg"
    ></b-carousel-slide>
    <b-carousel-slide
     
      img-src="https://familycenter.com.pl/wp-content/uploads/2019/10/Home-Ania-1.jpg"
    ></b-carousel-slide>
   
   
  </b-carousel>

    </b-col>
    <b-col col="2" style="backgroundColor: grey">
      <img class="logo" src="../assets/logo.png">
       <b-card  v-if= gym.address class= "gym-card" :title= title>
      <b-card-text >
             {{gym.address.zipCode}}, {{gym.address.city}}
      </b-card-text>
       </b-card>
    </b-col>
  </b-row>
</b-container>
 </div>
</template>

<script>
import MainLabel from "./MainLabel";
import {mapState, mapActions} from "vuex";
import { BContainer, BCol, BRow} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {BCarousel, BCarouselSlide} from 'bootstrap-vue'
export default {
  name: "MainPage",
  components: {
   MainLabel,
    BContainer,
    BCol,BRow,
    BCarousel,BCarouselSlide
  },
  computed: {...mapState({
   type: state => state.login.type,
   gym : state => state.login.gym
  }),
  title() {
    return  this.gym.address.street + " "+ this.gym.address.propertyNumber
  }},

  beforeMount() {
    this.getGymInfo();
    console.log(this.gym)
  },
  data() {
      return {
        slide: 0,
      }
    },
    methods: {
      ...mapActions({
      getGymInfo: "login/getGymInfo"
    })
      
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-page{
  background-color: gray;
max-width: 100%;
height: 90vh;
  }
  .logo{
  
    width: 60%;
    margin-top:10%;
    margin-left: 20%;
    }
    .gym-card {
      margin-top: 10%;
      width: 60%;
       margin-left: 20%;
           color: white;
           background-color: grey;

    }
  
</style>
