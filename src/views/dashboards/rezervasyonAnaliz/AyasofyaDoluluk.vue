<script setup>
import { ref } from 'vue'
import DolulukOrani from '../stats/DolulukOrani.vue'


let name = ref('Geceleme Miktarı')
let color = ref('#512DA8')
let nightcount = computed(() => {
  let geceCount = 120
  let oran = [30]

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
