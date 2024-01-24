<script setup>
import CompareBar from '../stats/CompareBar.vue'
import { store } from '@/store/index'
import * as dates from '@/views/dashboards/functions/dates'


const series = computed(() => {
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
    title: 'Geçmiş Rezervasyonlar',
    categories: ["2024-01-11", "2024-01-12", "2024-01-13", "2024-01-14", "2024-01-15", "2024-01-16", "2024-01-17"],
    max: 200,
    min: 2,
  }
})
</script>

<template>
  <CompareBar :series="series" />
</template>
