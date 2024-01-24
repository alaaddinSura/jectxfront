<script setup>
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
    totalNight: 25,
    totalAmountNight: 50,
    labels: ['AGODA', 'BOOKING', 'EXPEDIA', 'WEB', 'DIGER'],
    series: [
      25, 25, 25, 25, 25,
    ],
    percentage: 32,
    name: 'Onl Rezerv Miktarı',
    colors: { series1: vuetifyTheme.current.value.colors.success,
      series2: '#28c76fb3',
      series3: '#28c76f80',
      series4: `rgba(${ hexToRgb(vuetifyTheme.current.value.colors.success) },0.2)`,
      series5: `rgba(${ hexToRgb(vuetifyTheme.current.value.colors.success) },0.4)` }
    ,
      
  }
})
</script>

<template>
  <RezervasyonRaporu :data="data" />
</template>