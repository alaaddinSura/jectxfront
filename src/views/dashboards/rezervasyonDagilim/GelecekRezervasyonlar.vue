<script setup>
import { store } from '@/store/index'
import CompareBar from '../stats/CompareBar.vue'
import * as dates from "@/views/dashboards/functions/dates"



const series = computed(() => {
  let chosenHotels = store.state.selectedHotels
  let dateRange = store.state.dateRange
  
  /*
  let rezData = store.state.gelecekDoluluk == 0 ? JSON.parse(localStorage.getItem("dolulukGelecekRez")) : store.state.gelecekDoluluk
  let statData = rezData.filter(item => chosenHotels.includes(item.HOTELID))
  */

  let rezData = JSON.parse(localStorage.getItem("dolulukGelecekRez"))
  let statData = rezData.filter(item => chosenHotels.includes(item.HOTELID))
  console.log(rezData)

  console.log("Stat Data veri")
  console.log(statData)
  let dates = [...new Set(statData.map(item => item.DATE))].sort()
  console.log("Tekli Tarih")
  console.log(dates)





  let successData = statData.filter(item => item.SUCCESS)
  successData = dates.map(item => successData.filter(i => i.DATE == item).map(j=> j.COUNT).reduce((f,s)=>f+s,0))
  
  console.log(successData)
  


  /*
   let roomsName = [...new Set(statData.map(item=> item.roomType))]
  let gecelemeHepsi = statData.map(item => item.count != 'nan' ? Number(item.count): 0).reduce((f,s)=>f+s,0)
  let roomData = roomsName.map(item =>({
    roomName: item,
    geceleme: statData.filter(i => i.roomType == item).map(k=> k.count != 'nan' ? Number(k.count): 0).reduce((f,s)=>f+s,0),
    oran: Math.round((statData.filter(k=> k.roomType == item).map(k=> k.count != 'nan' ? Number(k.count):0).reduce((f,s)=>f+s,0)/ gecelemeHepsi)*1000) / 10,
  }))
  */

  
  let cancelData = statData.filter(item => !item.SUCCESS)
  cancelData = dates.map(item => cancelData.filter(i => i.DATE == item).map(j=> j.COUNT).reduce((f,s)=>f+s,0))

  cancelData = cancelData.map(item => -item)



  let totalSuccessData = successData.map(item=> item.COUNT != 'nan' ? Number(item.COUNT):0)
  let totalCancelData = cancelData.map(item => item.COUNT != 'nan' ? Number(item.COUNT):0)
  totalCancelData = totalCancelData.map(item => -item)
  // let totalSuccesData = successData.map(item => item.map(j=> j.COUNT != 'nan' ? Number(j.COUNT):0)).reduce((f,s)=>f+s,0)

  let maxCount = Math.max(...totalSuccessData)
  let minCount = Math.min(...totalCancelData)

  return {
    bar: [
      {
        name: 'Rezervasyonlar',
        data: successData,
      },
      {
        name: 'İptaller',
        data: cancelData,
      },
    ],
    title: 'Gelecek Doluluk',
    categories: dates.sort(),
    max: Math.round(maxCount * 1.2),
    min: Math.round(minCount * 1.2),
  }

})
</script>

<template>
  <CompareBar :series="series" />
</template>
