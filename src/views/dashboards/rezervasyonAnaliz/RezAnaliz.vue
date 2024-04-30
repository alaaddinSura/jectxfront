<script setup>
import { store } from "@/store/index";
import Bar from "../stats/Bar.vue"


const statistics = computed(()=>{
  let chosenHotels = store.state.selectedHotels
  let rezData2 = store.state.rezMiktarAnaliz.length == 0 ? JSON.parse(localStorage.getItem('rezMiktarAnaliz')) : store.state.rezMiktarAnaliz
  
  let statData2 = rezData2.filter(item => chosenHotels.includes(item.hotelId))
  let rezCountTotal = statData2.map(item=> item.count).reduce((f,s)=>f+s,0)
  let rezNightTotal = statData2.map(item => item.night).reduce((f,s)=>f+s,0)
  let totalIncome = statData2.map(item => item.TOTALPRICE).reduce((f,s)=>f+s,0)
  return [
  {
    title: 'Adet',
    stats: rezCountTotal,
    icon: 'tabler-book',
    color: 'primary',
  },
  {
    title: 'Geceleme',
    stats: rezNightTotal,
    icon: 'tabler-moon',
    color: 'primary',
  },
  {
    title: 'Oran',
    stats: Number(rezNightTotal/rezCountTotal).toFixed(2),
    icon: 'tabler-divide',
    color: 'primary',
  },
  {
    title: 'Gelir',
    stats: totalIncome,
    icon: 'tabler-arrow-badge-up',
    color: 'primary',
  },
]
})
 
</script>

<template>
  <Bar
    :data="statistics"
    title="Rez Analiz"
    :loader="store.state.rezAnalizLoader"
  />
</template>