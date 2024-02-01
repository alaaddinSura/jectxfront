<script setup>
import { store } from '@/store/index'
import CompareBar from '../stats/CompareBar.vue'



const series = computed(() => {
  let chosenHotels = store.state.selectedHotels
  let rezData = store.state.gelecekDoluluk == 0 ? JSON.parse(localStorage.getItem("gelecekDoluluk")) : store.state.gelecekDoluluk

  let statData = rezData.filter(item => chosenHotels.includes(item.HOTELID))

  let dates = [...new Set(statData.map(item => item.DATE))].sort()
  console.log(dates)

  
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
        data: [50, 60, 70, 80, 90, 100, 120],
      },
      {
        name: 'İptaller',
        data: [2, 3, 7, 5, 6, 9, 2],
      },
    ],
    title: 'Gelecek Doluluk',
    categories: ["2024-01-11", "2024-01-12", "2024-01-13", "2024-01-14", "2024-01-15", "2024-01-16", "2024-01-17"],
    max: 200,
    min: 2,
  }

})
</script>

<template>
  <CompareBar :series="series" />
</template>
