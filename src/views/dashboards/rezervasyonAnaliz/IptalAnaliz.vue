<script setup>
import { store } from "@/store/index";
import Bar from "../stats/Bar.vue";

const statistics = computed(()=>{
  let chosenHotels = store.state.selectedHotels

  let rezData = store.state.rezMiktarIptalAnaliz == 0 ? JSON.parse(localStorage.getItem("rezMiktarIptalAnaliz")) : store.state.rezMiktarIptalAnaliz

  let statData = rezData.filter(item => chosenHotels.includes(item.HOTELID))

  let totalCount  = statData.map(item => item.COUNT).reduce((f,s)=>f+s,0)
  let totalNight = statData.map(item => item.NIGHT).reduce((f,s)=>f+s,0)
  let totalLoss = statData.map(item => item.TOTALPRICE).reduce((f,s)=>f+s,0)
  return [
  {
    title: 'Adet',
    stats: totalCount,
    icon: 'tabler-circle-letter-x',
    color: 'error',
  },
  {
    title: 'Geceleme',
    stats: totalNight,
    icon: 'tabler-moon',
    color: 'error',
  },
  {
    title: 'Oran',
    stats: Number(totalNight/totalCount).toFixed(2),
    icon: 'tabler-divide',
    color: 'error',
  },
  {
    title: 'Kayıp',
    stats: totalLoss,
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