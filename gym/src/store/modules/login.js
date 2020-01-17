import axios from 'axios'
const realUsers = [
  {login: "r-majka",
  password: "r-majka1234",
  id: "1",
  type: "client",
},
  {login: "j-nowak",
  password: "j-nowak1234",
id: "1",
type: "employee"}

]
const url = "http://lipol.me:8081/api/"
const state = {
    user: null,
    type: "worker",
    loading: false,
    error: null,
    gym: null,
    page: null,
    info: false
  }
  
  // getters
  const getters = {
   
  }
  
  // actions
  const actions = {
    login ({ commit,dispatch}, userData) {
     const idx = realUsers.findIndex(el => {return (el.login == userData.email && el.password == userData.password)})
     if(idx>=0 ){
    dispatch('getUserData',realUsers[idx])
    commit('setUserType',realUsers[idx].type)
     }
     else{
     commit('setError', true)
     }
  
    },
    changeProfile({commit}){
      axios.patch(state.user._links.self.href, {
        name: state.user.name,
        lastName: state.user.lastName,
        phoneNumber: state.user.phoneNumber,
        email: state.user.email,
      }, {
        headers:{
          
          "Access-Control-Allow-Origin": "*",
          contentType: 'application/json'
        },
        
      })
      .then(function (response) {
        commit('changeProfile')
        console.log(response)
      })
    
      
    },
    logout({commit}) {
        commit('logout');
    },
    getGymInfo({commit}){
      axios.get(url+"gyms", {
        headers:{
          
          "Access-Control-Allow-Origin": "*",
          contentType: 'application/json'
        }
      })
      .then(function (response) {
        //const clients = response.data._embedded
        const link = response.data._embedded.gyms[0]._links.address.href
       let data = response.data._embedded.gyms[0]
        axios.get(link, {
          headers:{
            
            "Access-Control-Allow-Origin": "*",
            contentType: 'application/json'
          }
        })
        .then(function(response){
          data = {...data, "address": response.data}
          commit('setGymInfo',data)
        })
       
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    getUserData({commit}, userData){
      const type = userData.type
      const id = userData.id.toString()
      axios.get(url+type+'s/'+id, {
        headers:{
          
          "Access-Control-Allow-Origin": "*",
          contentType: 'application/json'
        }
      })
      .then(function (response) {
        //const clients = response.data._embedded
        commit('setUserData',response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    setPage({commit}, name){
      commit('setPage', name)
    },
    resetPage({commit}){
      commit('resetPage')
    }
  }
  
  // mutations
  const mutations = {
    setUserData (state, data) {
      state.user = data
    },
    setGymInfo(state, data) {
      state.gym = data
    },
    setPage(state, data){
      state.info = false
      state.page = data
    },
    resetPage(state){
      state.page = null
    },
  
    setUserType (state, data) {
     state.type = data
    },
    setError(state, data){
      state.error = data
    },
    logout (state) {
      state.user = null;
      state.type = null;
      state.error = null;
    },
  
    setLoadingStatus (state, status) {
      state.loading = status
    },
    changeProfile(){
      state.info = true
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }