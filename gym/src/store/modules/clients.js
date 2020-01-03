

// initial state
// shape: [{ id, quantity }]
const state = {
  clients: [ { id: 1, isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
  { id: 2, isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  { id: 3, isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
  { id: 4, isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
   { id: 5, isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
  { id: 6, isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  { id: 7,isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
  { id: 8, isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
   {id: 9, isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
  { id: 10,  isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  { id: 11, isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
  { id: 12,isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }],
  loading: false
}

// getters
const getters = {
  // cartProducts: (state, getters, rootState) => {
  //   return state.items.map(({ id, quantity }) => {
  //     const product = rootState.products.all.find(product => product.id === id)
  //     return {
  //       title: product.title,
  //       price: product.price,
  //       quantity
  //     }
  //   })
  // },

  // cartTotalPrice: (state, getters) => {
  //   return getters.cartProducts.reduce((total, product) => {
  //     return total + product.price * product.quantity
  //   }, 0)
  // }
}

// actions
const actions = {
  // checkout ({ commit, state }, products) {
  //   const savedCartItems = [...state.items]
  //   commit('setCheckoutStatus', null)
  //   // empty cart
  //   commit('setCartItems', { items: [] })
  //   shop.buyProducts(
  //     products,
  //     () => commit('setCheckoutStatus', 'successful'),
  //     () => {
  //       commit('setCheckoutStatus', 'failed')
  //       // rollback to the cart saved before sending the request
  //       commit('setCartItems', { items: savedCartItems })
  //     }
  //   )
  // },

  // addProductToCart ({ state, commit }, product) {
  //   commit('setCheckoutStatus', null)
  //   if (product.inventory > 0) {
  //     const cartItem = state.items.find(item => item.id === product.id)
  //     if (!cartItem) {
  //       commit('pushProductToCart', { id: product.id })
  //     } else {
  //       commit('incrementItemQuantity', cartItem)
  //     }
  //     // remove 1 item from stock
  //     commit('products/decrementProductInventory', { id: product.id }, { root: true })
  //   }
  // }
  addClient ({commit}, newClient) {
  
    commit('addClient', newClient)
  },
  updateClient({commit}, client){
    commit('updateClient', client)
  },
  deleteClient({commit}, client){
    commit('deleteClient', client)
  }
}

// mutations
const mutations = {
     addClient( state, newClient){
       let indx = state.clients.map(el=> {return el.id})
       console.log(indx, newClient)
       state.clients.push({
         ...newClient,
         id: Math.max(indx)+1
       })
     },
     updateClient(state, client){
       let idx = state.clients.findIndex(el=> {return el.id == client.id})
       console.log(idx)
       state.clients[idx] = client;

     },
     deleteClient(state, client){
      let idx = state.clients.findIndex(el=> {return el.id == client.id})
      console.log(idx)
      state.clients.splice(idx, 1);
     }
  // pushProductToCart (state, { id }) {
  //   state.items.push({
  //     id,
  //     quantity: 1
  //   })
  // },

  // incrementItemQuantity (state, { id }) {
  //   const cartItem = state.items.find(item => item.id === id)
  //   cartItem.quantity++
  // },

  // setCartItems (state, { items }) {
  //   state.items = items
  // },

  // setCheckoutStatus (state, status) {
  //   state.checkoutStatus = status
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}