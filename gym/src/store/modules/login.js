

// initial state
// shape: [{ id, quantity }]
const state = {
    user: null,
    type: null,
    loading: false,
    error: null
  }
  
  // getters
  const getters = {
   
  }
  
  // actions
  const actions = {
    login ({ commit}, userData) {
    commit('setUserData',userData)
    commit('setUserType',"worker")
    },
    logout({commit}) {
        commit('logout');
    }
  }
  
  // mutations
  const mutations = {
    setUserData (state, data) {
        console.log(data)
      state.user = data
    },
  
    setUserType (state, data) {
        console.log(data)
     state.type = data
    },
  
    logout (state) {
      state.user = null;
      state.type = null;
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