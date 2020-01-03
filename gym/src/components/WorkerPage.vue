<template>
<div>
  <worker-label></worker-label>
  <clients-page></clients-page>
</div>
</template>

<script>
import WorkerLabel from "./WorkerLabel.vue"
import ClientsPage from "./ClientsPage.vue"
export default {
    components: {
  WorkerLabel,
  ClientsPage
  }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
