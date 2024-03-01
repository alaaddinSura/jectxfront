<script setup>
import { store } from "@/store/index"
import * as dates from '@/views/dashboards/functions/dates'
import CompareBar from '../stats/CompareBar.vue'

//Burayı Kopyala
const series = computed(() => {
  let chosenHotels = store.state.selectedHotels
  let rezData = store.state.gecmisRezervasyonlar == 0 ? JSON.parse(localStorage.getItem("gecmisRezervs")) : store.state.gecmisRezervasyonlar
  let statData = rezData.filter(item => chosenHotels.includes(item.HOTELID))
  let dateRange = [...new Set(statData.map(item => item.DATE))].sort()
  let successData = statData.filter(item => item.SUCCESS)
  successData = dateRange.map(item => successData.filter(j => j.DATE == item).map(j => Number(j.COUNT)).reduce((f,s) => f+s,0))
  let maxCount = Math.max(...successData)
  let cancelData = statData.filter(item => !item.SUCCESS)
  cancelData = dateRange.map(item => cancelData.filter(j => j.DATE == item).map(j => Number(j.COUNT)).reduce((f,s) => f+s,0))
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
    categories: dateRange.sort(),
    max:  Math.round(maxCount * 1.002),
    min: Math.round(minCount * 1.002),
  }
})
</script>

<template>
  <CompareBar :series="series" :loader="store.state.gecmisRezervasyonlarLoader"/>
</template>
