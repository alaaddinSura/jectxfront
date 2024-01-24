<script setup>
import { store } from '@/store/index'
import * as dates from '@/views/dashboards/functions/dates'
import axios from '@axios'
import TableWithChannelFilters from '../stats/TableWithChannelFilters.vue'

const apiData = ref([])

onMounted(async () => {
  const res = await axios.get('https://suraanaliz-05a6f1924519.herokuapp.com/rezinfo?datetype=CREATEDATE')

  apiData.value = res.data
})


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
  let dateRange = store.state.dateRange
  let chosenHotels = store.state.selectedHotels
  let startDate = dateRange.split(' to ')[0]
  let endDate = dateRange.split(' to ')[1]

  let rezData = apiData.value.map(item => ({
    ALTKANAL: item.ALTKANAL,
    ANAKANAL: item.ANAKANAL,
    DATE: item.DATE,
    DURUM: item.DURUM,
    GECELEME: item.GECELEME,
    HOTELID: item.HOTELID,
    RATETYPE: item.RATETYPE,
    RESADET: item.RESADET,
    TOTALPRICE: item.TOTALPRICE,
  }))
  let chosenDates = 
  [...new Set(dates.filterDatesByRange(rezData.map(item => item.DATE), startDate, endDate))]
    
  let statData = rezData.filter(item => chosenDates.includes(item.DATE))
  statData = statData.filter(item => chosenHotels.includes(item.HOTELID)) 

  let anaKanallar = [...new Set(statData.map(item => item.ANAKANAL))]
  let altKanallar = [...new Set(statData.map(item => item.ALTKANAL))]
  let returnData = []  

  let rezervData = statData.filter(item => item.DURUM == 'REZERV')
  let iptalData = statData.filter(item => item.DURUM == 'İPTAL')

  for(let ana of anaKanallar){
    for(let alt of altKanallar){
      let rezAdet = rezervData.filter(item => item.ANAKANAL == ana && item.ALTKANAL == alt).map(item => item.RESADET != 'nan' ? Number(item.RESADET) : 0).reduce((f, s) => f+s, 0)
      let geceleme= rezervData.filter(item => item.ANAKANAL == ana && item.ALTKANAL == alt).map(item => item.GECELEME != 'nan' ? Number(item.GECELEME) : 0).reduce((f, s) => f+s, 0)
      let revenue = rezervData.filter(item => item.ANAKANAL == ana && item.ALTKANAL == alt).map(item => item.TOTALPRICE != 'nan' ? Number(item.TOTALPRICE) : 0).reduce((f, s) => f+s, 0)
      revenue = Math.round((revenue/100)) * 100      
      
      let adr = (revenue != 0 & geceleme != 0) ? Math.round((revenue/geceleme)/100) * 100 : 0

      let temp = {
        "ANA KANAL": ana,
        "ALT KANAL": alt,
        "REZ ADET": rezAdet,
        "GECELEME": geceleme,
        "ADR": (revenue/geceleme).toFixed(2),
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
  />
</template>
