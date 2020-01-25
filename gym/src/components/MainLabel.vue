<template>
  <b-navbar toggleable="lg" type="dark" variant="warning">
    
     
 <b-button size="sm" class="my-2 my-sm-0 login"   v-b-modal.modal-1  right>LOGIN</b-button>
      

 <b-modal id="modal-1"
  title="Login" 
  class="login-modal" 
  style="color: white;" 
  ok-variant="warning" 
  cancel-variant="secondary"
  @show="resetModal"
  @hidden="resetModal"
  @ok="handleOk">
     <b-form-input  v-model="email" type="email" placeholder="Enter your email"></b-form-input>
      <b-form-input  style="margin-top: 2%" v-model="password" type="password" placeholder="Enter your password"></b-form-input>
       <div v-if="nameState" style="color: red">Invalid data</div>
  </b-modal>
  </b-navbar>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    data() {
      return {
        email: '',
        submittedNames: [],
        password: ""
      }
    },
    computed: mapState({
    // arrow functions can make the code very succinct!
   nameState: state => state.login.error
    }),
    methods:{
    ...mapActions({
      login: 'login/login' 
    }),
  
        resetModal() {
        this.email = ''
        this.password =""
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.login({password: this.password,email:this.email})

       
      },
       
    }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
    margin-left: 95%
}
.login-modal{
    background-color: grey;
    color: white;

}
</style>
