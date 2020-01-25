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
        <b-card-body style="padding: 0">
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
    <b-card
    style="margin-top: 7%"
    v-if="selectedWorkout"
      :header="selectedWorkout.date"
     header-tag="selectedWorkout.activity.name"
      :footer="'Instruktor: '+setEmployee()"
      footer-tag="footer"
      :title="selectedWorkout.activity.name"
    >
      <b-card-text>{{selectedWorkout.activity.description}}.
          <br>
          <b> Room: {{selectedWorkout.room.name}}</b> <br/>
          <b> Free seats: {{selectedWorkout.activity.capacity -selectedWorkout.clients.length}}/{{selectedWorkout.activity.capacity}}</b>
      </b-card-text>
      <b-button v-if="type=='client'" :disabled="disabledButton" @click="signClientUp()" variant="warning">{{buttonText()}}</b-button>
    </b-card>
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
      selectedWorkout: null,
      disabledButton: false
    }
  },
  computed: {...mapState({
   workouts: state => state.workouts.workouts,
   loading: state => state.workouts.loading,
   type: state =>state.login.type,
   user: state=>state.login.user,
  }),
  workoutsDates(){
      let dates = this.workouts.map(el => moment(el.date).format("Do MMMM"))
    return [...new Set(dates)]
  }},
 
  methods: {
    ...mapActions({
        getWorkouts: 'workouts/getWorkouts',
        signUp: 'workouts/signUp'
    }),
    signClientUp(){
        this.signUp({workout: this.selectedWorkout, user: this.user})

    },
    buttonText(){
        const status = this.selectedWorkout.clients.find(el=> {
         return el._links.self.href === this.user._links.self.href})
         console.log(status, this.selectedWorkout)
         if(!status){
             this.disabledButton= false
         return "Sign up"
         }
         else{
             this.disabledButton= true
             return "Already signed up"
         }
        
    },
    setEmployee(){
        if(this.selectedWorkout.employee.name)
         return this.selectedWorkout.employee[0].name +' '+ this.selectedWorkout.employee[0].lastName
        else
        return "ZASTĘPSTWO"
    },
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