<script setup>
import { store } from "@/store/index"
import { ref } from 'vue'
import DolulukOrani from '../stats/DolulukOrani.vue'


 let name = ref('Geceleme Miktarı')
 let color = ref('#512DA8')
 let nightcount = computed(() => {

   let chosenDate = store.state.dateRange
   let chosenHotels = store.state.selectedHotels
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
   let startDate = chosenDate.split(' to ')[0]
   let endDate = chosenDate.split(' to ')[1]

   let rezData = JSON.parse(localStorage.getItem("nightAmount"))
   //console.log(rezData)
   let statData = rezData.filter(item => chosenHotels.includes(item.hotelId))
   
   roomCounts = roomCounts.filter(item => chosenHotels.includes(item.hotelId))
  

  /*
  console.log('stat data is here ')
  console.log(statData)
  */

   let nightCount = statData.map(item => item.count != 'nan' ? item.count: 0).reduce((f,s)=>f+s,0)

   let roomCount = roomCounts.map(item => item.count).reduce((f,s) => f+s, 0)
   console.log(roomCount)
  /*
   let designRooms = roomCount.filter(item => item.hotelId == 22966 ? 'Design': 0)
   let ayaRooms = roomCount.filter(item=> item.hotelId == 22964 ? "Ayasofya": 0) 
  */
   

  let geceCount = 120
  let oran = [(nightCount / roomCount * 100).toFixed(2)]
  
  
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
