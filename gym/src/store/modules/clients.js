
 const url = "http://lipol.me:8081/api/"
 const gym = "http://lipol.me:8081/api/gyms/0"
 import axios from 'axios'
// initial state
// shape: [{ id, quantity }]
const state = {
  clients: null,
  loading: false
}

// getters
const getters = {
}

// actions
const actions = {
  
 
  getClients({commit,dispatch}, page){
    commit('startLoading')
    axios.get(url+"clients/", {
      headers:{
        
        "Access-Control-Allow-Origin": "*",
        contentType: 'application/json'
      },
      params: {
        page
      }
    })
    .then(function (response) {
      const clients = response.data._embedded.clients
      const self = response.data.page.number
      const total = response.data.page.totalPages
      commit('setClients',{clients,page})
      console.log(state)
      if(self+1 < total)
        dispatch('getClients', self+1)
    })
    .catch(function (error) {
      console.log(error);
    })
  },
  addClient({commit}, client){
    console.log(client)
    axios.post(url+"clients", client,{
      headers:{
        
        "Access-Control-Allow-Origin": "*",
        contentType: 'application/json'
      },
      
    })
    .then(function (response) {
      console.log(response)
      commit('addClient',client)
     
    })
    .catch(function (error) {
      console.log(error);
    })

  },
  addAddress ({dispatch}, {client, address}) {

    const year = client.year.toString()
    let month = client.month.toString()
    let day = client.day.toString()
    if(day.length== 1)
          day = "0"+day
    if(month.length== 1)
          month = "0"+month
    let newClient = {
      phoneNumber: client.phoneNumber,
          name: client.name,
          lastName: client.lastName,
          email: client.email,
          sex : client.sex,
          pesel : client.pesel,
          birthDate : year+'-'+month+'-'+day
    }

    axios.post(url+"addresses/", address,{
      headers:{
        
        "Access-Control-Allow-Origin": "*",
        contentType: 'application/json'
      },
      
    })
    .then(function (response) {
      const addres = response.data._links.address.href
      newClient = {...newClient, address: addres, gym}
      dispatch('addClient',newClient)
     
    })
    .catch(function (error) {
      console.log(error);
    })
  },
  updateClient({commit, dispatch}, client){

    axios.patch(client._links.client.href, {
      name: client.name,
      lastName: client.lastName,
      birthDate: client.birthDate,
      sex: client.sex,
      phoneNumber: client.phoneNumber,
      email: client.email,
      pesel: client.pesel
    }, {
      headers:{
        
        "Access-Control-Allow-Origin": "*",
        contentType: 'application/json'
      },
      
    })
    .then(function (response) {
      commit('updateClient', client)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
      dispatch('getClients',0)
    })
   
  },
  deleteClient({commit}, client){
    axios.delete(client._links.client.href, {
      headers:{
        
        "Access-Control-Allow-Origin": "*",
        contentType: 'application/json'
      }
    })
    .then(function () {
      commit('deleteClient', client)
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

// mutations
const mutations = {
     addClient( state, newClient){
      
       state.clients.push({
         ...newClient,
         
       })
     },
     startLoading(state){
      state.loading = true;
     },
     updateClient(state, client){
       let idx = state.clients.findIndex(el=> {return el._links.self.href == client._links.self.href})
       console.log('here',client)
       state.clients[idx] = client;

     },
     deleteClient(state, client){
      let idx = state.clients.findIndex(el=> {return el._links.self.href == client._links.self.href})
      state.clients.splice(idx, 1);
     },
     setClients(state, data){
       if(data.page == 0){
       state.clients =data.clients
       }
       else{
         const clients = data.clients
       state.clients = state.clients.concat(clients)
       }
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