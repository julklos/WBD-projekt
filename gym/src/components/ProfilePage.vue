<template>
  <div class="profile-page">
      <div class="profile-frame">
      <b-card title="Your profile" >
    <b-card-text class= "profile-card">
        <b-form @submit="onSubmit">
                      <b-form-group
                    id="input-group-1"
                    label="First name:"
                    label-for="input-1"
                    
                  >
                    <b-form-input
                      id="input-1"
                      v-model="user.name"
                      placeholder="Enter name"
                      size = "sm"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-2" label="Last name:" label-for="input-2">
                    <b-form-input
                      id="input-2"
                      v-model="user.lastName"
                      required
                      size = "sm"
                      placeholder="Enter last name"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-3" label="Email:" label-for="input-3">
                    <b-form-input
                      id="input-3"
                      v-model="user.email"
                      required
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-group-4" label="Phone number:" label-for="input-4">
                    <b-form-input
                      id="input-4"
                      v-model="user.phoneNumber"
                      required
                    ></b-form-input>
                  </b-form-group>

                  <div style="margin-left: 30%">
                  <b-button type="submit" variant="warning">Save changes</b-button>
                  </div>
        </b-form>
    </b-card-text>
  </b-card>
      </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {

    computed: {...mapState({
   type: state => state.login.type,
   user: state=>state.login.user

  })},
  methods: {
      ...mapActions({
         changeProfile: 'login/changeProfile',
      }),
      onSubmit(evt){
          evt.preventDefault()
          this.changeProfile()
      }
  }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile-page{
    background-color: grey;    
    height: 100vh;

}
.profile-card {
    width: 90%;
    margin-left: 5%;
    margin-top: 5%
}
.profile-frame{
    width: 50%;
    margin-top: 5%;
    margin-left: 25%
}
</style>
