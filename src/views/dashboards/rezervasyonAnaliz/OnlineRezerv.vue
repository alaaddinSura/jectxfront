<script setup>
import { store } from "@/store/index"
import { hexToRgb } from '@layouts/utils'
import {
  useDisplay,
  useTheme,
} from 'vuetify'
import RezervasyonRaporu from '../stats/RezervasyonRaporu.vue'


const vuetifyTheme = useTheme()
const display = useDisplay()

let data = computed(() => {
let chosenHotels= store.state.selectedHotels
let onlRezData = store.state.onlineRezMiktari.length == 0 ? JSON.parse(localStorage.getItem('onlineRez')) : store.state.onlineRezMiktari
let statData = onlRezData.filter(item => chosenHotels.includes(item.hotelId))
let rezAdet = statData.map(item => item.count != 'nan' ? Number(item.count): 0).reduce((f,s)=>f+s,0)
let agodaData = statData.filter(item => item.altKanal == 'AGODA').map(item=>item.gece != 'nan' ? Number(item.gece): 0).reduce((f,s)=>f+s,0)
let bookingData = statData.filter(item => item.altKanal == 'BOOKING').map(item=>item.gece != 'nan' ? Number(item.gece): 0).reduce((f,s)=>f+s,0)
let expediaData = statData.filter(item => item.altKanal == 'EXPEDIA').map(item=>item.gece != 'nan' ? Number(item.gece): 0).reduce((f,s)=>f+s,0)
let webData = statData.filter(item => item.altKanal == 'WEB').map(item=>item.gece != 'nan' ? Number(item.gece): 0).reduce((f,s)=>f+s,0)
let digerData = statData.filter(item => item.altKanal == 'ONLDIGER').map(item=>item.gece != 'nan' ? Number(item.gece): 0).reduce((f,s)=>f+s,0)

  let rezPercentData = store.state.lastMonthOnlineRez.length == 0 ? JSON.parse(localStorage.getItem('lastMonthOnlineRez')) : store.state.lastMonthOnlineRez
   let statPercentData = rezPercentData.filter(item => chosenHotels.includes(item.hotelId))
   let totalPercent = statPercentData.map(item => item.count).reduce((f,s)=>f+s,0)
   let lastMonthPercent = rezPercentData.length === 0 ? 0 : ( rezAdet - totalPercent ) / totalPercent
  return {
    totalNight: rezAdet,
    percentage: Math.round(lastMonthPercent *100),
    totalAmountNight: agodaData + bookingData + expediaData + webData + digerData,
    labels: ['AGODA', 'BOOKING', 'EXPEDIA', 'WEB', 'DIGER'],
    series: [
      agodaData, bookingData, expediaData, webData, digerData,
    ],
    name: 'Onl Rezerv',
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
  <RezervasyonRaporu :data="data" :loader="store.state.onlineRezMiktariLoader"/>
</template>