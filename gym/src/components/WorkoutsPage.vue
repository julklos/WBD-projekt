<template>
  <div class="main-label">
    <b-row>
      <b-col cols="7">
    <b-card class="workouts-card" title="Workouts">
    <b-card-text>

    <div class="datepicker-trigger">
      <input
        class= "input-date"
        type="text"
        id="datepicker-trigger"
        placeholder="Select dates"
        :value="formatDates(dateOne, dateTwo)"
      >

      <AirbnbStyleDatepicker
        :trigger-element-id="'datepicker-trigger'"
        :mode="'range'"
        @apply="selectedDates()"
        @cancelled="cancelDates()"
        :fullscreen-mobile="true"
        :date-one="dateOne"
        :date-two="dateTwo"
        @date-one-selected="val => { dateOne = val }"
        @date-two-selected="val => { dateTwo = val }"
      />
      <b-button style="margin-left: 20%" @click="search">Search</b-button>
          </div>
          
    </b-card-text>
    <div v-if="show">
     <b-list-group-item v-for="day in workoutsDates" :key="day">
        <b-card
        border-variant="warning"
        :header="day"
        header-bg-variant="transparent"
        align="center"
      >
        <b-card-body>
            <b-list-group>
      <b-list-group-item style="padding: 0" button @click="selectWorkout(workout)" v-for="workout in getDescription(day)" :key="workout.activity.name">
          {{getHour(workout.date)}}
          {{workout.activity.name}}
      </b-list-group-item>
      
    </b-list-group>
        </b-card-body>
      </b-card>
     </b-list-group-item>
    </div>
    <!-- <b-spinner
        v-if="!loading"
     variant="secondary"
      ></b-spinner> -->
    <b-list-group>
    </b-list-group>
  </b-card>
  </b-col>
  <b-col cols ="3">
    OPIS
  </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from 'moment'
import {mapActions, mapState} from 'vuex'
export default {
   data () {
    return {
      dateOne: '',
      dateTwo: '',
      show: false,
      selectedWorkout: null
    }
  },
  computed: {...mapState({
   workouts: state => state.workouts.workouts,
   loading: state => state.workouts.loading
  }),
  workoutsDates(){
      let dates = this.workouts.map(el => moment(el.date).format("Do MMMM"))
    return [...new Set(dates)]
  }},
 
  methods: {
    ...mapActions({
        getWorkouts: 'workouts/getWorkouts',
    }),
    selectWorkout(workout){
        this.selectedWorkout = workout
    },
    getHour(date){
        return moment(date).format('h:mm')
    },
    getDescription(date){
     return this.workouts.filter(work=> {
     return date===moment(work.date).format("Do MMMM")})
     },
     search(){
         console.log('clicked')
         this.show = true
     },
    formatDates(dateOne, dateTwo) {
      let formattedDates = ''
      if (dateOne) {
        formattedDates = moment(String(dateOne)).format('DD/MM/YYYY')
      }
      if (dateTwo) {
        formattedDates += ' - ' +  moment(String(dateTwo)).format('DD/MM/YYYY')
      }
      return formattedDates
    },
    selectedDates(){
      var second_date = moment(this.dateTwo).add(1, 'days').format('YYYY-MM-DD')
      this.getWorkouts({from: this.dateOne, to: second_date})

    },
    cancelDates(){
      this.dateOne = ''
      this.dateTwo = ''
    }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-label{
  height: 100vh;
}
.workout-class{
  margin: 5%;
  margin-left: 7%;
}
.input-date{
    background-color: #ffc107;
    height: 6vh;
    padding: 1%;
    border-width: 0;
    margin-top: 3%;
}
.workouts-card{
  margin: 3%;
}
</style>