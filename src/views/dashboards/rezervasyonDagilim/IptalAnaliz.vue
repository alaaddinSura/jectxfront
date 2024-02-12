<script setup>
import { store } from "@/store/index";
import Bar from "../stats/Bar.vue";

const statistics = computed(()=>{
  let chosenHotels = store.state.selectedHotels

  let rezData = store.state.iptalAnaliz == 0 ? JSON.parse(localStorage.getItem("iptalAnaliz")) : store.state.iptalAnaliz
  let statData = rezData.filter(item=> chosenHotels.includes(item.HOTELID))
  let rezAdet = [...new Set(statData.map(item => item.RESID))]
  let toplam = statData.map(item => item.DAILYRATE != 'nan' ? Number(item.DAILYRATE): 0).reduce((f,s)=>f+s,0).toFixed(1)
  
  return [
  {
    title: 'Adet',
    stats: rezAdet.length,
    icon: 'tabler-circle-letter-x',
    color: 'error',
  },
  {
    title: 'Geceleme',
    stats: statData.length,
    icon: 'tabler-moon',
    color: 'error',
  },
  {
    title: 'Oran',
    stats: Number(statData.length/rezAdet.length).toFixed(2),
    icon: 'tabler-divide',
    color: 'error',
  },
  {
    title: 'Kayıp',
    stats: toplam,
    icon: 'tabler-arrow-badge-down',
    color: 'error',
  },
]
})

</script>

<template>
  <Bar
    :data="statistics"
    title="İptal Analiz"
    :loader="store.state.iptalAnalizLoader"
  />
</template>