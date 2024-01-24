<script setup>
import { store } from '@/store/index'
import * as dates from '@/views/dashboards/functions/dates'
import { hexToRgb } from '@layouts/utils'
import {
  useDisplay,
  useTheme,
} from 'vuetify'
import RezervasyonRaporu from '../stats/RezervasyonRaporu.vue'


const vuetifyTheme = useTheme()
const display = useDisplay()

let data = computed(() => {



  return {
    totalNight: 5,
    totalAmountNight: 5,
    labels: ['Online', 'WH', 'AGT', 'IND'],
    series: [25, 25, 25, 25],
    percentage: 6,
    name: 'Rezerv Miktarı',
    colors: { series1: vuetifyTheme.current.value.colors.success,
      series2: '#28c76fb3',
      series3: '#28c76f80',
      series4: `rgba(${ hexToRgb(vuetifyTheme.current.value.colors.success) },0.2)` },
  }
})
</script>

<template>
  <RezervasyonRaporu :data="data" /> 
</template>

