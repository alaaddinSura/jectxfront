<script setup>
import { store } from '@/store/index'
import CompareBar from '../stats/CompareBar.vue'



const series = computed(() => {

  let dateRange = store.state.dateRange
  let chosenHotels = store.state.selectedHotels
  let startDate = dateRange.split(' to ')[0]
  let endDate = dateRange.split(' to ')[1]


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
    title: 'Gelecek Rezervasyonlar',
    categories: ["2024-01-11", "2024-01-12", "2024-01-13", "2024-01-14", "2024-01-15", "2024-01-16", "2024-01-17"],
    max: 200,
    min: 2,
  }

})
</script>

<template>
  <CompareBar :series="series" />
</template>
