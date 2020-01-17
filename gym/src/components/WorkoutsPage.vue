<template>
  <div class="main-label">
   <v-daterange v-model="range"></v-daterange>
  </div>
</template>

<script>
import { VDaterange } from "vuetify-daterange-picker"
import "vuetify-daterange-picker/dist/vuetify-daterange-picker.css";
export default {
  components: { VDaterange },
   data () {
    return {
      range: {},
      selectedDate: {
        start: '',
        end: ''
      }
    }
  },
  methods: {
    onDateSelected: function (daterange) {
      this.selectedDate = daterange
      console.log(this.selectedDate)
    }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
