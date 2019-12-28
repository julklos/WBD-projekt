

// initial state
// shape: [{ id, quantity }]
const state = {
    workouts: [],
    loading: false
  }
  
  // getters
  const getters = {
    cartProducts: (state, getters, rootState) => {
      
    },
  
    cartTotalPrice: (state, getters) => {
    }
  }
  
  // actions
  const actions = {
    checkout ({ commit, state }, products) {
    },
  
    addProductToCart ({ state, commit }, product) {
    }
  }
  
  // mutations
  const mutations = {
    pushProductToCart (state, { id }) {
      state.items.push({
        id,
        quantity: 1
      })
    },
  
    incrementItemQuantity (state, { id }) {
      const cartItem = state.items.find(item => item.id === id)
      cartItem.quantity++
    },
  
    setCartItems (state, { items }) {
      state.items = items
    },
  
    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }