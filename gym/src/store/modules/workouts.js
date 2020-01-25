
 const url = "http://lipol.me:8081/api/"
 import axios from 'axios'

// initial state
// shape: [{ id, quantity }]
const state = {
    workouts: [],
    loading: false
  }
  
  // getters
  const getters = {
   
  }
  
  // actions
  const actions = {
    getRoom({commit}, tempurl){
      axios.get(tempurl, {
        headers:{
          
          "Access-Control-Allow-Origin": "*",
          contentType: 'application/json'
        },
      })
      .then(function (response) {
          const data = {
            room: response.data,
            workout: response.config.url
          }
          commit('setRoom',data)
      })

    },
    getClients({commit}, tempurl){
        axios.get(tempurl, {
            headers:{
              
              "Access-Control-Allow-Origin": "*",
              contentType: 'application/json'
            },
          })
          .then(function (response) {
              const data = {
                clients: response.data,
                workout: response.config.url
              }
              commit('setClients',data)
          })
    },
    getEmployee({commit}, tempurl){
        axios.get(tempurl, {
            headers:{
              
              "Access-Control-Allow-Origin": "*",
              contentType: 'application/json'
            },
          })
          .then(function (response) {
              const data = {
                employee: response.data,
                workout: response.config.url
              }
              commit('setEmployee',data)
          })
    },
    getActivity({commit}, tempurl){
        axios.get(tempurl, {
            headers:{
              
              "Access-Control-Allow-Origin": "*",
              contentType: 'application/json'
            },
          })
          .then(function (response) {
              const data = {
                activity: response.data,
                workout: response.config.url
              }
              commit('setActivity',data)
             
          })
    },
    getWorkouts({commit, dispatch}, dates){
        commit('setLoading', true)
      axios.get(url+"classes/search/findByDateBetween", {
        params: {
            dateStart: dates.from,
            dateEnd: dates.to
          },
        headers:{
          
          "Access-Control-Allow-Origin": "*",
          contentType: 'application/json'
        },
      })
      .then(function (response) {
        const workouts = response.data._embedded.classes
        commit('getWorkouts',workouts)
        workouts.forEach(workout => {
          dispatch('getActivity', workout._links.activity.href)
          dispatch('getRoom', workout._links.room.href)
          dispatch('getClients', workout._links.clients.href)
          dispatch('getEmployee', workout._links.employees.href)
        })
        commit('setLoading', false);
        console.log(state)

      })
      .catch(function (error) {
        console.log(error);
      })
    }
    
  }
  
  // mutations
  const mutations = {
    setLoading(state, value){
        console.log('loading', value)
        state.loading = value
    },
   getWorkouts(state, workouts){
     state.workouts = workouts
   },
   setActivity(state, data){

    const self = data.workout.replace("/activity", "");
   const idx = state.workouts.findIndex(workout=> {return workout._links.self.href == self})
   state.workouts[idx] = {
     ...state.workouts[idx],
        activity: data.activity
       }

   },
   setRoom(state,data){

     const self = data.workout.replace("/room", "");
    const idx = state.workouts.findIndex(workout=> {return workout._links.self.href == self})
    state.workouts[idx] = {
      ...state.workouts[idx],
      room: data.room
      
    }

   },
   setClients(state, data){

    const self = data.workout.replace("/clients", "");
   const idx = state.workouts.findIndex(workout=> {return workout._links.self.href == self})
   state.workouts[idx] = {
     ...state.workouts[idx],
        clients: data.clients._embedded.clients
       }

    },
setEmployee(state, data){

    const self = data.workout.replace("/employees", "");
   const idx = state.workouts.findIndex(workout=> {return workout._links.self.href == self})
   state.workouts[idx] = {
     ...state.workouts[idx],
        employee: data.employee._embedded.employees
       }

  }
  
}
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }