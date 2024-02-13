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
  let chosenHotels = store.state.selectedHotels.length == 0 ? [22966,22964] : store.state.selectedHotels
  //let chosenHotels = [22966]
  let anaKanallar = ['ONL','WH','AGT','IND']

  let rezData = store.state.rezervMiktar.length == 0 ? JSON.parse(localStorage.getItem('rezMiktar')) : store.state.rezervMiktar

  let statData = rezData.filter(item => chosenHotels.includes(item.hotelId))
  //console.log("stat Data")
  //console.log(statData.filter(item => item.anaKanal))
  //console.log(statData.filter(item => item.anaKanal == 'Ana Kanal //Tanımsız').map(k => k.night).reduce((f,s)=>f+s,0))
  
  let totalCount = statData.map(item => item.count).reduce((f,s) => f +s ,0)

  let kanallar = anaKanallar.map(item => statData.filter(f=>f.anaKanal == item))
  
  kanallar = kanallar.map(item => item.map(n=> n.night != 'NaN' ? Number(n.night) : 0))
  
  kanallar = kanallar.map(item=> item.reduce((f,s)=>f+s,0))
  //console.log(kanallar)
  

  let nightCount = statData.map(item => item.count != 'nan' ? Number(item.night): 0).reduce((f,s)=> f+s,0)
  //console.log("Burası toplam night count",nightCount)

  return {
    totalNight: totalCount,
    totalAmountNight: nightCount,
    labels: ['Online', 'WH', 'AGT', 'IND','Ana Kanal Tanımsız'],
    series: kanallar.length > 0 ? kanallar : [25, 25, 25, 25],
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
  <RezervasyonRaporu :data="data" :loader="store.state.rezervMiktarLoader"/> 
</template>

