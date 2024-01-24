<script setup>
import * as dates from '@/views/dashboards/functions/dates'
import CompareBar from '../stats/CompareBar.vue'


const series = computed(() => {


  return {
    bar: [
      {
        name: 'Rezervasyonlar',
        data: [120, 180, 160, 80],
      },
      {
        name: 'İptaller',
        data: [180, 120, 110, 60],
      },
    ],
    title: 'Geçmiş Rezervasyonlar',
    categories: ["2024-01", "2024-02", "2024-03", "2024-04"],
    max: 250,
    min: 50,
  }
})
</script>

<template>
  <CompareBar :series="series" />
</template>
