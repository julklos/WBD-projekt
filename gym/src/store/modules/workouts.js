
 const url = "http://lipol.me:8081/api/"
 import axios from 'axios'

// initial state
// shape: [{ id, quantity }]
const state = {
    workouts: [],
    loading: false,
    info: ""
  }
  
  // getters
  const getters = {
   
  }
  
  // actions
  const actions = {
    signUp({commit} ,info){
        commit('setLoading', false)
        axios.post(info.user._links.self.href+'/classes',info.workout._links.self.href,{
            headers:{
              
              "Access-Control-Allow-Origin": "*",
              "Content-Type": 'text/uri-list'
            },
            
          })
          .then(function () {
            commit('signedToActivity',info)
           
          })
          .catch(function (error) {
            console.log(error);
          })
    },
    checkOutOfClass({commit} ,info){
        console.log(info)
        const id = info.workout._links.self.href.split('/').pop()
        console.log(id)
        axios.delete(info.user._links.self.href+'/classes/'+id,{
            headers:{
              
              "Access-Control-Allow-Origin": "*",
              "Content-Type": 'text/uri-list'
            },
            
          })
          .then(function () {
            commit('checkedOutOfActivity',info)
           
          })
          .catch(function (error) {
            console.log(error);
          })

    },
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

  },
  signedToActivity(state, data){
    const idx = state.workouts.findIndex(workout=> {return workout._links.self.href == data.workout._links.self.href})
    state.workouts[idx].clients.push(data.user)
  },
  checkedOutOfActivity(state, data){
    const idx = state.workouts.findIndex(workout=> {return workout._links.self.href == data.workout._links.self.href})
    const ide = state.workouts[idx].clients.findIndex(client=> {return client._links.self.href == data.user._links.self.href})
    state.workouts[idx].clients.splice(ide, 1)
  }
  
}
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }