
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
    getWorkouts({commit, dispatch}, dates){
      console.log(dates);
      axios.get(url+"classes/", {
        headers:{
          
          "Access-Control-Allow-Origin": "*",
          contentType: 'application/json'
        },
      })
      .then(function (response) {
        const workouts = response.data._embedded.classes
        commit('getWorkouts',workouts)
        workouts.forEach(workout => {
          dispatch('getRoom', workout._links.room.href)
          // dispatch('getClients', workout._links.clients.href)
          // dispatch('getEmployee', workout._links.employees.href)
          // dispatch('getActivity', workout._links.activity.href)
        });

      })
      .catch(function (error) {
        console.log(error);
      })
    }
    
  }
  
  // mutations
  const mutations = {
   getWorkouts(state, workouts){
     state.workouts = workouts
   },
   setRoom(state,data){
     state.loading = true
     const self = data.workout.replace("/room", "");
    const idx = state.workouts.findIndex(workout=> {return workout._links.self.href == self})
    state.workouts[idx] = {
      ...state.workouts[idx],
      room: data.room
    }
     console.log(self, idx)
     console.log(data, state)

   }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }