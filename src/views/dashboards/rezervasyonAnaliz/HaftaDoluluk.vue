<script setup>
import { ref } from 'vue'
import DolulukOrani from '../stats/DolulukOrani.vue'
import { store } from '@/store/index'

let name = ref('Gece Son Hafta')
let color = ref('#1A237E')
let nightcount = computed(() => {
  let chosenDate = store.state.dateRange
  let chosenHotels = store.state.selectedHotels
  let startDate = chosenDate.split(' to ')[0]
  let endDate = chosenDate.split(' to ')[1]
  let roomCounts = [
    {
      hotelId: 22966,
      count: 60
    },
    {
      hotelId: 22964,
      count: 220
    }
   ]
  let rezData = JSON.parse(localStorage.getItem("nightAmount"))
  let statData = rezData.filter(item => chosenHotels.includes(item.hotelId))
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
