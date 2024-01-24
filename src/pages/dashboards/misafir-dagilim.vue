<script setup>
import OdaTipiDagilim from "@/views/dashboards/misafirDagilim/OdaTipiDagilimi.vue"
import UlkeDagilim from "@/views/dashboards/misafirDagilim/UlkeDagilim.vue"
import YatakDagilim from "@/views/dashboards/misafirDagilim/YatakDagilim.vue"
import GecelemeDagilim from "@/views/dashboards/misafirDagilim/gecelemeDagilim.vue"

// const showHotel = computed(()=>{
//   let chosenHotel = store.state.selectedHotels
//   let dateTime = store.state.dateRange
//   let startDate = dateTime.split(' to ')[0]
//   let endDate = dateTime.split(' to ')[1]
//   console.log(startDate)
//   console.log(endDate)
//   console.log(chosenHotel)
//   console.log(chosenHotel.length)
//   console.log(chosenHotel[0])
//   let resDate = dateTime
//   let selectHotel = ''
//   let hotels = {
//     '22964': 'Aya',
//     '22966': 'Des',
//   }
//   if(chosenHotel.length > 1){
//     console.log(Object.values(hotels).toString())
//     selectHotel = Object.values(hotels).toString()
//   } else{
//     console.log(hotels[chosenHotel])
//   }

//   if(chosenHotel[0] == "22964"){
//     console.log("Ayasofya")
//   }else if(chosenHotel[0] == "22966"){
//     console.log("Design")
//   }else if(chosenHotel[0] == "No Hotel"){
//     console.log("No Hotel")
//   }
//   return { selectHotel,
//     resDate  }
// })
</script>

<template>
  <VRow class="match-height">
    <!-- Kişi Sayısına Göre Yatak Dağılımı -->
    <VCol
      cols="12"
      md="7"
      lg="6"
    >
      <YatakDagilim class="h-100" />
    </VCol>
    <!-- Geceleme Sayısına Göre Dağılım -->
    <VCol
      cols="12"
      md="7"
      lg="6"
    >
      <GecelemeDagilim class="h-100" />
    </VCol>
    <!-- Ülke Dağılımı -->
    <VCol
      cols="12"
      sm="6"
      lg="6"
    >
      <UlkeDagilim class="h-100" />
    </VCol>
    <!-- Oda Tipi Dağılımı -->
    <VCol
      cols="12"
      sm="6"
      lg="6"
    >
      <OdaTipiDagilim />
    </VCol>
  </VRow>
</template>