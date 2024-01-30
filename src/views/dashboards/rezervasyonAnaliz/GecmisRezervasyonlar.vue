<script setup>
import { store } from "@/store/index"
import * as dates from '@/views/dashboards/functions/dates'
import CompareBar from '../stats/CompareBar.vue'


const series = computed(() => {
  let chosenHotels = store.state.selectedHotels

  let rezData = store.state.gecmisRezervasyonlar == 0 ? JSON.parse(localStorage.getItem("gecmisRezervs")) : store.state.gecmisRezervasyonlar
  let statData = rezData.filter(item => chosenHotels.includes(item.HOTELID))
  let dates = [...new Set(statData.map(item => item.DATE))]
  
  let successData = statData.filter(item => item.SUCCESS)
  successData = dates.map(item => successData.filter(j => j.DATE == item).map(j => j.COUNT).reduce((f,s) => f+s,0))
  
  let maxCount = Math.max(...successData)
  
  let cancelData = statData.filter(item => !item.SUCCESS)
  cancelData = dates.map(item => cancelData.filter(j => j.DATE == item).map(j => j.COUNT).reduce((f,s) => f+s,0))

  cancelData = cancelData.map(item => -item)
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
    title: 'Geçmiş Rezervasyonlar',
    categories: dates.sort(),
    max:  Math.round(maxCount * 1.2),
    min: Math.round(minCount * 1.2),
  }
})
</script>

<template>
  <CompareBar :series="series" />
</template>
