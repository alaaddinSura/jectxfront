<script setup>
import { computed } from "vue"
import Bar from "../stats/Bar.vue"
import { store } from '@/store/index'


const statistic = computed(()=>{
  let chosenHotels = store.state.selectedHotels

  let nightScatter = JSON.parse(localStorage.getItem("gecelemeDagilim"))
  let statData = store.state.gecelemeDagilim.length == 0 ? nightScatter : store.state.gecelemeDagilim
  statData = statData.filter(item=> chosenHotels.includes(item.hotelId))
  
  return [
  {
    title: 'Tek',
    stats: statData.filter(item=> item.nightType === 'Tek').map(item => Number(item.count)).reduce((f,s)=>f+s,0),
    icon: 'tabler-user',
    color: 'primary',
  },
  {
    title: '2-4',
    stats: statData.filter(item=> item.nightType === '2-4').map(item => Number(item.count)).reduce((f,s)=>f+s,0),
    icon: 'tabler-users',
    color: 'primary',
  },
  {
    title: '5-10',
    stats: statData.filter(item=> item.nightType === '5-10').map(item => Number(item.count)).reduce((f,s)=>f+s,0),
    icon: 'tabler-baby-carriage',
    color: 'primary',
  },
  {
    title: '10+',
    stats: statData.filter(item=> item.nightType === '10+').map(item => Number(item.count)).reduce((f,s)=>f+s,0),
    icon: 'tabler-users-group',
    color: 'primary',
  },
]
})
  
  
</script>

<template>
  <Bar
    :data="statistic"
    title="Geceleme Dağılım"
    subtitle
    :loader="store.state.gecelemeDagilimLoader"
  />
</template>
