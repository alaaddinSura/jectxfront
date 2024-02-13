<script setup>
import { store } from '@/store/index'
import TableWithChannelFilters from '../stats/TableWithChannelFilters.vue'
import Papa from 'papaparse'


const headers = [
  "RESID"
  , "HOTELID"
  , "CREATEDATE"
  , "NIGHT"
  , "CHECKINDATE"
  , "CHECKOUTDATE"
  , "AVERAGENIGHTPRICE"
  , "TOTALPRICE"
  , "RATETYPE"
  , "RESSTATE"
  , "ROOMTYPE"
  , "CANCELDATE"
  , "ANA KANAL"
  , "ALT KANAL"
  , "MARKET"
  , "AGENCY",
]


let rawTableHeaders = headers.map(item => ({
  title: item,
  key: item,
}))

let tableData = computed(() => {
  let rawDataApi = store.state.rawData
  console.log(rawDataApi)
  let data = rawDataApi.length == 0 ? JSON.parse(localStorage.getItem('rawData')) : [...rawDataApi] 

  data = data.map(item => ({
    "RESID": item.RESID
    , "HOTELID": item.HOTELID
    , "CREATEDATE": item.CREATEDATE
    , "NIGHT": item.NIGHT
    , "CHECKINDATE": item.CHECKINDATE
    , "CHECKOUTDATE": item.CHECKOUTDATE
    , "AVERAGENIGHTPRICE": item.AVERAGENIGHTPRICE
    , "TOTALPRICE": item.TOTALPRICE
    , "RATETYPE": item.RATETYPE
    , "RESSTATE": item.RESSTATE
    , "ROOMTYPE": item.ROOMTYPE
    , "CANCELDATE": item.CANCELDATE
    , "ANA KANAL": item.ANAKANAL
    , "ALT KANAL": item.ALTKANAL
    , "MARKET": item.MARKET
    , "AGENCY": item.AGENCY,
  }))

  return data
})

let downloadCsv = data => {

  const csvData = Papa.unparse({
    fields: rawTableHeaders.map(h => h.key),
    data,
  })


  // Create a Blob and trigger the download
  const blob = new Blob([csvData], { type: 'text/csv' })
  const link = document.createElement('a')

  link.href = window.URL.createObjectURL(blob)
  link.download = 'table-data.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <TableWithChannelFilters
        :header="rawTableHeaders"
        :data="tableData"
        :loader="store.state.rawDataLoader"
      />
    </VCol>
    <VCol>
      <VBtn @click="downloadCsv(tableData)">
        Download Csv
      </VBtn>
    </VCol>
  </VRow>
</template>
