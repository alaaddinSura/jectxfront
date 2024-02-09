<script setup>
import { store } from "@/store/index"
import { ref } from 'vue'
import DolulukOrani from '../stats/DolulukOrani.vue'


 let name = ref('Geceleme')
 let color = ref('#512DA8')
 let nightcount = computed(() => {

   let chosenHotels = store.state.selectedHotels
   console.log("Day Count",store.state.dateCount)
   let roomCounts = [
    {
      hotelId: 22966,
      count: 60 * store.state.dateCount
    },
    {
      hotelId: 22964,
      count: 220 * store.state.dateCount
    }
   ]

   let rezData = store.state.doluluk.length == 0 ? JSON.parse(localStorage.getItem("gecelemeDagilim")) : store.state.doluluk
   console.log("Geceleme Dağılım")
   console.log(JSON.parse(localStorage.getItem("gecelemeDagilim")))
   console.log("Storedan Çekilmiş")
   console.log(store.state.doluluk)
   let statData = rezData.filter(item => chosenHotels.includes(item.hotelId))
   roomCounts = roomCounts.filter(item => chosenHotels.includes(item.hotelId))
   roomCounts = roomCounts.map(item => item.count).reduce((f,s) => f+s, 0)

   let nightCount = statData.map(item => item.count != 'nan' ? Number(item.count): 0).reduce((f,s)=>f+s,0)

   console.log("Night Count", nightCount)
   console.log("roomCounts", roomCounts)
   let oran = [(nightCount / roomCounts * 100).toFixed(0)]
  
  return {
    nightCount, oran,
  }
})
</script>

<template>
  <DolulukOrani
    :name="name"
    :color="color"
    :nightcount="nightcount.nightCount"
    :oran="nightcount.oran"
  /> 
</template>
