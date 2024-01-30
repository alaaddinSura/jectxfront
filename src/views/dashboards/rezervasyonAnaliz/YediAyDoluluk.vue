<script setup>
import { store } from "@/store/index"
import { ref } from 'vue'
import DolulukOrani from '../stats/DolulukOrani.vue'


let name = ref('Son 7 Ay')
let color = ref('#C2185B')
let nightcount = computed(() => {
  let chosenHotels = store.state.selectedHotels
  let roomCounts = [
    {
      hotelId: 22966,
      count: 60 * 210
    },
    {
      hotelId: 22964,
      count: 220 * 210
    }
  ]

  let rezData = store.state.sonYediAyDoluluk == 0 ? JSON.parse(localStorage.getItem('gecelemeDagilimSon7Ay')) : store.state.sonYediAyDoluluk
  let statData = rezData.filter(item => chosenHotels.includes(item.hotelId))

  roomCounts = roomCounts.filter((item => chosenHotels.includes(item.hotelId)))
  roomCounts = roomCounts.map(item => item.count).reduce((f,s) => f+s, 0)

  let geceCount = statData.map(item => item.count != 'nan' ? Number(item.count): 0).reduce((f,s)=>f+s,0)
  
  let oran = [((geceCount / roomCounts * 100).toFixed(2))]
  console.log("Son Yedi Ay oranı " + oran)

 

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
