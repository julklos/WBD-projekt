<template>
  <div class="main-label">
    <b-row>
      <b-col cols="9">
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
          </div>
    </b-card-text>

    <b-card-text>LIST.</b-card-text>
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
      dateTwo: ''
    }
  },
  computed: {...mapState({
   workouts: state => state.workouts.workouts,
  })},
  methods: {
    ...mapActions({
        getWorkouts: 'workouts/getWorkouts',
    }),
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
      console.log(this.dateOne)
      this.getWorkouts({from: this.dateOne, to: this.dateTwo})

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
