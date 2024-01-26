<script setup>
import { computed } from "vue"
import Bar from "../stats/Bar.vue"
import { store } from '@/store/index'

const statistic = computed(()=>{
  let chosenDate = store.state.dateRange
  let chosenHotels = store.state.selectedHotels
  let startDate = chosenDate.split(' to ')[0]
  let endDate = chosenDate.split(' to ')[1]

  let nightScatter = JSON.parse(localStorage.getItem("gecelemeDagilim"))
  console.log(nightScatter)
  let statData = nightScatter.filter(item => chosenHotels.includes(item.hotelId))
  return [
  {
    title: 'Tek Kişi',
    stats: statData.filter(item=> item.nightType === 'Tek').map(item => Number(item.count)).reduce((f,s)=>f+s,0),
    icon: 'tabler-user',
    color: 'primary',
  },
  {
    title: 'Çift Kişi',
    stats: statData.filter(item=> item.nightType === '2-4').map(item => Number(item.count)).reduce((f,s)=>f+s,0),
    icon: 'tabler-users',
    color: 'primary',
  },
  {
    title: 'Aile',
    stats: statData.filter(item=> item.nightType === '5-10').map(item => Number(item.count)).reduce((f,s)=>f+s,0),
    icon: 'tabler-baby-carriage',
    color: 'primary',
  },
  {
    title: 'Grup',
    stats: statData.filter(item=> item.nightType === '+10').map(item => Number(item.count)).reduce((f,s)=>f+s,0),
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
  />
</template>
