<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/primer_full.png" style="height:200px margin-bottom:35px">
    <PrimerStore/>
  </div>
</template>

<script>
import PrimerStore from '@/components/PrimerStore.vue'

export default {
  name: 'Home',
  components: {
    PrimerStore
  }
}
</script>
