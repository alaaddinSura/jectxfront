<!-- eslint-disable indent -->
<script setup>
import * as dates from '@/views/dashboards/functions/dates'
import { ref, watch } from 'vue'
import * as fetchData from "@/views/dashboards/functions/fetchData"

let dateRange = ref(dates.findYesterdayDate() + " to " + dates.findYesterdayDate())
let isPersistent = ref(true)


watch(dateRange, (newValue, oldValue) => {
  console.log('new --> ',newValue)
  console.log('old -->', oldValue)
  let hotelids = [22964, 22966]
  let d_range = newValue.includes('to')
    ? dates.findBetweenDates(dateRange.value.split(' to ')[0], dateRange.value.split(' to ')[1])
    : [newValue]

  let endDate = dateRange.value.split(' to ')[1]

  // Yatak Dağılım
  fetchData.callYatakDagilim(d_range, hotelids)

  //Geceleme Dağılım
  fetchData.callGecelemeDagilim(d_range, hotelids)

  // Genel Rezerv (Rezerv Miktarı)
  fetchData.callRezervMiktari(d_range, hotelids)

  // Kanallara Rezervasyon Dağılımı
  fetchData.callKanalRezDagilim(d_range, hotelids)

  // Online Rezerv Miktarı
  fetchData.callOnlineRezMiktari(d_range, hotelids)

  // Doluluk
  fetchData.callGecelemeMiktari(d_range, hotelids)

  //Ay Doluluk
  fetchData.callAyDoluluk(endDate, hotelids)

  //Hafta Doluluk
  fetchData.callHaftaDoluluk(endDate, hotelids)

  //Son 7 ay doluluk
  fetchData.callSonYediAyDoluluk(endDate, hotelids)

  //Geçmiş Rezervasyonlar
  fetchData.callGecmisRez(endDate, d_range.length, hotelids)

  //Rez Analiz
  fetchData.callRezAnaliz(d_range, hotelids)

  //İptal Analiz
  fetchData.callIptalAnaliz(d_range, hotelids)

  //İptal Edebilir Analiz
  fetchData.callIptalEdebilirAnaliz(d_range, hotelids)

  //İptal Edebilir Analiz Günlük
  fetchData.callIptalEdebilirAnalizGunluk(d_range, hotelids)

  //Ülke Dağılım
  fetchData.callUlkeDagilim(d_range, hotelids)

  //Doluluk Geçmiş
  fetchData.callGecmisRezervasyonDagilim(endDate, d_range.length, hotelids)

  //Gelecek Doluluk
  fetchData.callDolulukGelecekRez(d_range[0], hotelids)

  //Oda tipi dağılım
  fetchData.callOdatipiDagilim(d_range, hotelids)

  //channell tablo
  fetchData.callChannelTable(d_range, hotelids)

  //raw data
  fetchData.callRawData(d_range, hotelids)

})
</script>


<template>
  <VMenu :close-on-content-click="false" offset-y :persistent="isPersistent">
    <template #activator="{ props }">
      <IconBtn v-bind="props">
        <VIcon icon="tabler-calendar-down" />
      </IconBtn>
    </template>
    <VCard width="300">
      <VCardText>
        <AppDateTimePicker v-model="dateRange" :config="{ mode: 'range' }" placeholder="Tarih Seçiniz" />
      </VCardText>
    </VCard>
  </VMenu>
</template>
