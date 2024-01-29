<script setup>
import { store } from "@/store/index.js"
import { ref } from 'vue'
import DolulukOrani from '../stats/DolulukOrani.vue'


let name = ref('Gece Son Ay')
let color = ref('#C2185B')
let nightcount = computed(() => {
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

  let rezData = store.state.doluluk == 0 ? JSON.parse(localStorage.getItem("nightAmount")) : store.state.doluluk

  let statData = rezData.filter(item => chosenHotels.includes(item.hotelId))

  let geceCount = statData.map(item => item.count != 'nan' ? Number(item.count): 0).reduce((f,s)=>f+s,0)

  let designOdaSayisi = 220;
  let ayaOdaSayisi = 60;

  let potansiyelGeceleme = 0

  if(chosenHotels.includes('22964')){
    potansiyelGeceleme += ayaOdaSayisi * chosenHotels.length
  }
  if(chosenHotels.includes('22966')){
    potansiyelGeceleme += designOdaSayisi * chosenHotels.length
  }

  let oran = [Math.round((geceCount / potansiyelGeceleme)* 100)]

  let geceCountt = 180
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
