<script setup>
import { ref } from 'vue'
import DolulukOrani from '../stats/DolulukOrani.vue'


let name = ref('Gece Son Hafta')
let color = ref('#1A237E')
let nightcount = computed(() => {
  let geceCount = 220
  let oran = [40]

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
