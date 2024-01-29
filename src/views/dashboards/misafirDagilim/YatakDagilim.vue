<script setup>
import { computed } from "vue"
import Bar from "../stats/Bar.vue"
import { store } from '@/store/index'


const statistic = computed(()=>{
let chosenHotels = store.state.selectedHotels

// console.log('yatak dağılım')
// console.log(store.state.yatakDagilim)

let bedScatter = store.state.yatakDagilim.length == 0 ? JSON.parse(localStorage.getItem("yatakDagilim")) : store.state.yatakDagilim
let statData = bedScatter.filter(item => chosenHotels.includes(item.hotelId))

  return [
  {
    title: 'Tek Kişi',
    stats: statData.filter(item => item.guesttype === 'Tek').map(item => item.count != 'nan' ? Number(item.count): 0).reduce((f,s)=>f+s,0),
    icon: 'tabler-user',
    color: 'primary',
  },
  {
    title: 'Çift Kişi',
    stats: statData.filter(item => item.guesttype === 'Çift').map(item => item.count != 'nan' ? Number(item.count): 0).reduce((f,s)=>f+s,0),
    icon: 'tabler-users',
    color: 'primary',
  },
  {
    title: 'Aile',
    stats: statData.filter(item => item.guesttype === 'Aile').map(item => item.count != 'nan' ? Number(item.count): 0).reduce((f,s)=>f+s,0),
    icon: 'tabler-baby-carriage',
    color: 'primary',
  },
  {
    title: 'Grup',
    stats: statData.filter(item => item.guesttype === 'Grup').map(item => item.count != 'nan' ? Number(item.count): 0).reduce((f,s)=>f+s,0),
    icon: 'tabler-users-group',
    color: 'primary',
  },
]
})

 
</script>

<template>
  <Bar
    :data="statistic"
    title="Yatak Dağılım"
    subtitle
  />
</template>
