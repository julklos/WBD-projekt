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
    error: null
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
    logout({commit}) {
        commit('logout');
    },
    getUserData({commit}, userData){
      const type = userData.type
      const id = userData.id.toString()
      console.log(type, id)
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
    }
  }
  
  // mutations
  const mutations = {
    setUserData (state, data) {
      state.user = data
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
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }