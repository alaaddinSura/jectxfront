<script setup>
import { store } from "@/store/index";
import Bar from "../stats/Bar.vue";

const statistics = computed(()=>{
  let chosenHotels = store.state.selectedHotels

  let rezData = store.state.iptalAnaliz == 0 ? JSON.parse(localStorage.getItem("iptalAnaliz")) : store.state.iptalAnaliz
  let statData = rezData.filter(item => chosenHotels.includes(item.HOTELID) && item.NIGHT != 0)
  let rezAdet = [...new Set(statData.filter(item => item.NIGHT != 0).map(item => item.RESID))]
  let dolulukAdet = statData.map(item => item.NIGHT).reduce((f, s) => f + s, 0)
  let toplam = statData.map(item => item.DAILYRATE != 'nan' ? Number(item.DAILYRATE) : 0).reduce((f, s) => f + s, 0).toFixed(1)
  
  return [
  {
    title: 'Adet',
    stats: rezAdet.length,
    icon: 'tabler-circle-letter-x',
    color: 'error',
  },
  {
    title: 'Geceleme',
    stats: dolulukAdet,
    icon: 'tabler-moon',
    color: 'error',
  },
  {
    title: 'Oran',
    stats: Number(dolulukAdet/rezAdet.length).toFixed(2),
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
    subtitle
    :loader="store.state.iptalAnalizLoader"
  />
</template>