<template>
  <div class="clients-label">
    <b-container>
        <b-row>
            <b-col cols="8">
                 <b-form-input style="margin-top:6%"  v-model="search" placeholder="Search"></b-form-input>
            </b-col>
            <b-col cols='4'>
               <b-button variant="warning"  style="margin-top:12%" @click="showModal('add-modal')" >Add New Client</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols= "8">
                <b-table 

                    ref="selectableTable"
                    selectable
                    select-mode="single"
                    :items="filteredItems"
                    :fields="fields"
                    @row-selected="onRowSelected"
                    responsive="sm"
                    sticky-header
                    >
      <!-- Example scoped slot for select state illustrative purposes -->
      <template v-slot:cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>

            </b-col>
            <b-col cols="4">
                <b-collapse id="my-collapse" :visible="visibleCollapse">
                  <b-card v-if="visibleCollapse">
                  <b-form @submit="onSubmit" >
                      <b-form-group
                    id="input-group-1"
                    label="First name:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      v-model="selected.name"
                      placeholder="Enter name"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-2" label="Last name:" label-for="input-2">
                    <b-form-input
                      id="input-2"
                      v-model="selected.lastName"
                      required
                      placeholder="Enter last name"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-3" label="Email:" label-for="input-3">
                    <b-form-input
                      id="input-3"
                      v-model="selected.email"
                      required
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-group-4" label="Phone number:" label-for="input-4">
                    <b-form-input
                      id="input-4"
                      v-model="selected.phoneNumber"
                      required
                    ></b-form-input>
                  </b-form-group>

                  <div style="margin-left: 30%">
                  <b-button type="submit" variant="secondary">Save</b-button>
                  <b-button  @click="showModal('delete-modal')" style="margin-left: 1%" variant="warning">Delete</b-button>
                  </div>
                </b-form>
                  </b-card>
               </b-collapse>
            </b-col>
        </b-row>
         <b-modal ref="delete-modal" v-if="visibleCollapse" hide-footer title="Delete">
      <div class="d-block text-center">
        <h3>Are you sure to delete account of {{selected.first_name}} {{selected.last_name}}?</h3>
      </div>
      <div style="margin-left: 30%">
      <b-button  variant="secondary"  @click="hideModal('delete-modal')">Cancel</b-button>
      <b-button  variant="warning" style="margin-left:1%" @click="deleteItem">Delete</b-button>
      </div>
    </b-modal>
    <b-modal ref="add-modal" hide-footer title="Add new client">
      <div class="d-block text-center">
        <b-form  >
                      <b-form-group
                    id="input-group-1"
                    label="First name:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      v-model="newClient.first_name"
                      placeholder="Enter first name"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-2" label="Last name:" label-for="input-2">
                    <b-form-input
                      id="input-2"
                      v-model="newClient.last_name"
                      required
                      placeholder="Enter last name"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-3" label="Age:" label-for="input-3">
                    <b-form-input
                      id="input-3"
                      v-model="newClient.age"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-form>
      </div>
      <div style="margin-left: 30%">
      <b-button  variant="secondary"  @click="hideModal('add-modal')">Cancel</b-button>
      <b-button  variant="warning" @click="addNewClient" style="margin-left:1%">Add</b-button>
       </div>
    </b-modal>
    </b-container>
  </div>
</template>

<script>
import { BContainer, BCol, BRow, BFormInput, BTable} from 'bootstrap-vue'
import {mapState, mapActions} from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
    data() {
      return {
       search : "",
        fields: [ 'name', 'lastName', 'phoneNumber', 'email'],
        selected: undefined,
        newClient: {
          phoneNumber: "",
          name: "",
          lastName: "",
          email: ""
        }
      }
    },
    computed: {
      ...mapState({
    // arrow functions can make the code very succinct!
    items: state => state.clients.clients
    }),
      filteredItems(){
        if(this.search == "")
          return this.items
        else{
        return this.items.filter(element => {
            if(element.name.toLowerCase().search(this.search.toLowerCase())>=0 ||element.lastName.toLowerCase().search(this.search.toLowerCase())>=0)
                return element;
          });
        }


      },
       visibleCollapse(){
         return this.selected ? true: false
       }
    },
     components: {
    BContainer,
    BCol,BRow,BFormInput, BTable
  },
  beforeMount() {
    this.getClients(0);
  },
   methods: {
     ...mapActions({
        addClient: 'clients/addClient',
        deleteClient: 'clients/deleteClient',
        updateClient: 'clients/updateClient',
        getClients: 'clients/getClients'
     }),
      onRowSelected(items) {
        this.selected = items[0]
      },
      clearSelected() {
        this.$refs.selectableTable.clearSelected()
      },
      deleteItem(){
        this.deleteClient(this.selected)
      },
      onSubmit(){
    
        this.updateClient(this.selected)
      },
      showModal(name) {
        this.hideModal('add-modal');
        this.$refs[name].show()
      },
      hideModal(name) {
        this.$refs[name].hide()
        if(name == 'add-modal'){
          this.newClient.name = ""
          this.newClient.lastName = ""
          this.newClient.email = ""
          this.newClient.phoneNumber = ""
        }
      },
      addNewClient(event){
        event.preventDefault()
        this.addClient(this.newClient)
        this.hideModal('add-modal')
        
      }
    }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clients-label{
    background-color: grey;
    height: 92vh;
}
</style>
<style>
.form-control, .form-control:hover, .form-control:link, .form-control:focus{
    border-color: #ffc107;
    box-shadow: 0 0 0 0.2rem rgba(255,193,7,0.25);
    margin-bottom: 2%

}
.table{

    background: white;
    border: 0 0 0 0.2rem rgba(255,193,7,1);
}
.table.b-table > tbody > .table-active, .table.b-table > tbody > .table-active > th, .table.b-table > tbody > .table-active > td{
    border: 0 0 0 0.2rem rgba(255,193,7,1);
}
.b-table-sticky-header {
    overflow-y: auto;
    max-height: 75vh;
}
</style>
