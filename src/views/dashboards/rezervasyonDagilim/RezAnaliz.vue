<script setup>
import { store } from "@/store/index";
import Bar from "../stats/Bar.vue"


const statistics = computed(()=>{
  let chosenHotels = store.state.selectedHotels
  const today = new Date();
  let rezData = store.state.rezAnaliz.length == 0 ? JSON.parse(localStorage.getItem("rezAnaliz")) : store.state.rezAnaliz
  // bugün ve daha büyük tarihli veriler nigti 0 alınıyor çünkü folyoda yoktur. Average tutturmak amacı ile
  let previous = rezData.filter(item => (new Date(item.DATE)) <= today)
  let current = rezData.filter(item => (new Date(item.DATE)) > today && item.NIGHT != 0)
  rezData = previous.concat(current)
  let statData = rezData.filter(item => chosenHotels.includes(item.HOTELID))
  let rezAdet = [...new Set(statData.filter(item => item.NIGHT != 0).map(item => item.RESID))]
  let dolulukAdet = statData.map(item => item.NIGHT).reduce((f, s) => f + s, 0)
  let toplam = statData.map(item => item.DAILYRATE != 'nan' ? Number(item.DAILYRATE): 0).reduce((f,s)=>f+s,0).toFixed(0)
  return [
  {
    title: 'Adet',
    stats: rezAdet.length,
    icon: 'tabler-book',
    color: 'primary',
  },
  {
    title: 'Geceleme',
    stats: dolulukAdet,
    icon: 'tabler-moon',
    color: 'primary',
  },
  {
    title: 'Oran',
    stats: Number(dolulukAdet/rezAdet.length).toFixed(2),
    icon: 'tabler-divide',
    color: 'primary',
  },
  {
    title: 'Gelir',
    stats: toplam,
    icon: 'tabler-arrow-badge-up',
    color: 'primary',
  },
]
})
 
</script>

<template>
  <Bar
    :data="statistics"
    title="Doluluk Analiz"
    :loader="store.state.rezAnalizLoader"
  />
</template>