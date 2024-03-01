<script setup>
import { store } from '@/store/index'
import * as dates from '@/views/dashboards/functions/dates'
import axios from '@axios'
import TableWithChannelFilters from '../stats/TableWithChannelFilters.vue'


let tableHeaders = [
  {
    title: 'Ana Kanal',
    key: 'ANA KANAL',
  },
  {
    title: 'Alt Kanal',
    key: 'ALT KANAL',
  },
  {
    title: 'Rez Adet',
    key: 'REZ ADET',
  },
  {
    title: 'Geceleme',
    key: 'GECELEME',
  },
  {
    title: 'ADR',
    key: 'ADR',
  },
  {
    title: 'Revenue',
    key: 'REVENUE',
  },
]

let tableData = computed(() => {

  let channelData = store.state.channelTable.length == 0 ? JSON.parse(localStorage.getItem('channelTable')) : store.state.channelTable 
  

  let chosenHotels = store.state.selectedHotels

  channelData = channelData.filter(item => chosenHotels.includes(item.HOTELID))

  let statData = channelData.map(item => ({
    ALTKANAL: item.ALTKANAL,
    ANAKANAL: item.ANAKANAL,
    DATE: item.CREATEDATE,
    DURUM: 'REZERV',
    GECELEME: item.TOPLAMGECE,
    HOTELID: item.HOTELID,
    RESADET: item.COUNT,
    TOTAL: item.TOTALREVENUE,
  }))

  let anaKanallar = [...new Set(statData.map(item => item.ANAKANAL))]
  let altKanallar = [...new Set(statData.map(item => item.ALTKANAL))]
  let returnData = []  

  let rezervData = statData.filter(item => item.DURUM == 'REZERV')

  for(let ana of anaKanallar){
    for(let alt of altKanallar){
      let rezAdet = rezervData.filter(item => item.ANAKANAL == ana && item.ALTKANAL == alt).map(item => item.RESADET != 'nan' ? Number(item.RESADET) : 0).reduce((f, s) => f+s, 0)
      let geceleme= rezervData.filter(item => item.ANAKANAL == ana && item.ALTKANAL == alt).map(item => item.GECELEME != 'nan' ? Number(item.GECELEME) : 0).reduce((f, s) => f+s, 0)
      let revenue = rezervData.filter(item => item.ANAKANAL == ana && item.ALTKANAL == alt).map(item => item.TOTAL != 'nan' ? Number(item.TOTAL) : 0).reduce((f, s) => f+s, 0)
      revenue = Math.round((revenue/100)) * 100      
      
      let adr = (revenue != 0 & geceleme != 0) ? Math.round((revenue/geceleme)/100) * 100 : 0

      let temp = {
        "ANA KANAL": ana,
        "ALT KANAL": alt,
        "REZ ADET": rezAdet,
        "GECELEME": geceleme,
        "ADR": !isNaN(revenue/geceleme) ? (revenue/geceleme).toFixed(2) : "0",
        "REVENUE": revenue,
      }

      if(rezAdet > 0){
        returnData.push(temp)
      }
      
    }
  }

  return returnData
})

</script>

<template>
  <TableWithChannelFilters
    :header="tableHeaders"
    :data="tableData"
    :loader="store.state.channelTableLoader"
  />
</template>
