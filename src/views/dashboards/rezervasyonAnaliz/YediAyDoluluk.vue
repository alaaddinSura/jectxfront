<script setup>
import { ref } from 'vue'
import DolulukOrani from '../stats/DolulukOrani.vue'


let name = ref('Gece Son Ay')
let color = ref('#C2185B')
let nightcount = computed(() => {
  let geceCount = 9300
  let oran = [93]

  return {
    geceCount, oran,
  }
})
</script>

<template>
  <DolulukOrani
    :name="name"
    :color="color"
    :nightcount="nightcount.geceCount"
    :oran="nightcount.oran"
  /> 
</template>
