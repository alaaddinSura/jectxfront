<script setup>
import { ref } from 'vue'
import DolulukOrani from '../stats/DolulukOrani.vue'
import { store } from '@/store/index'

let name = ref('Son Hafta')
let color = ref('#1A237E')
let nightcount = computed(() => {
  let chosenHotels = store.state.selectedHotels
  let roomCounts = [
    {
      hotelId: 22966,
      count: 60 * 7
    },
    {
      hotelId: 22964,
      count: 220 * 7
    }
   ]
  let rezData = store.state.haftaDoluluk == 0 ? JSON.parse(localStorage.getItem("gecelemeDagilimSonHafta")) : store.state.haftaDoluluk
  let statData = rezData.filter(item => chosenHotels.includes(item.hotelId))
  
  roomCounts = roomCounts.filter((item => chosenHotels.includes(item.hotelId)))
  roomCounts = roomCounts.map(item => item.count).reduce((f,s) => f+s, 0)

  let geceCount = statData.map(item => item.count != 'nan' ? Number(item.count) : 0).reduce((f,s)=> f+s,0)

  let oran = [(geceCount / roomCounts * 100).toFixed(2)]

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
    :loader="store.state.haftaDolulukLoader"
  /> 
</template>
