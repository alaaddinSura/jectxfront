<script setup>
import { store } from '@/store/index'
import CompareBar from '../stats/CompareBar.vue'
import * as dates from "@/views/dashboards/functions/dates"



const series = computed(() => {
  let chosenHotels = store.state.selectedHotels

  let rezData = store.state.gelecekDoluluk == 0 ? JSON.parse(localStorage.getItem("dolulukGelecekRez")): store.state.gelecekDoluluk
  let statData = rezData.filter(item => chosenHotels.includes(item.HOTELID))
  let dates = [...new Set(statData.map(item => item.DATE))].sort()
  
  let successData = statData.filter(item => item.SUCCESS)
  successData = dates.map(item => successData.filter(i => i.DATE == item).map(j=> j.COUNT).reduce((f,s)=>f+s,0))
  
  let cancelData = statData.filter(item => !item.SUCCESS)
  cancelData = dates.map(item => cancelData.filter(i => i.DATE == item).map(j=> j.COUNT).reduce((f,s)=>f+s,0))
  cancelData = cancelData.map(item => -item)
  
  let maxCount = Math.max(...successData)
  let minCount = Math.min(...cancelData)
  
  return {
    bar: [
      {
        name: 'Rezervasyonlar',
        data: successData,
      },
      {
        name: 'İptaller',
        data: cancelData,
      },
    ],
    title: 'Gelecek Doluluk',
    categories: dates.sort(),
    max: maxCount,
    min: minCount,
  }

})
</script>

<template>
  <CompareBar :series="series" />
</template>
