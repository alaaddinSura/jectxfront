<!-- eslint-disable indent -->
<script setup>
import { store } from '@/store/index'
import * as dates from '@/views/dashboards/functions/dates'
import axios from '@axios'
import { ref, watch } from 'vue'
import * as fetchData from "@/views/dashboards/functions/fetchData"

let dateRange = ref(dates.findYesterdayDate() + " to " + dates.findYesterdayDate())
let isPersistent = ref(true)


watch(dateRange, (newValue, oldValue) => {

  let hotelids = [22964, 22966]

  if(newValue.includes('to')){
    store.commit('changeDateRange', newValue)
    let startDate = dateRange.value.split(' to ')[0]
    let endDate = dateRange.value.split(' to ')[1]
    let d_range = dates.findBetweenDates(startDate, endDate)
    let between = dates.findMidDate(d_range[0], d_range[d_range.length - 1])
    console.log(between);
    console.log(d_range[0])
    console.log(d_range[d_range.length - 1])
    store.commit("changeDateCount", d_range.length)
    
    
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
    fetchData.callIptalEdebilirAnaliz(endDate,d_range.length, hotelids)

    //Ülke Dağılım
    fetchData.callUlkeDagilim(d_range, hotelids)

    //Doluluk Geçmiş
    fetchData.callGecmisRezervasyonDagilim(endDate, d_range.length ,hotelids)

    //Oda tipi dağılım
    fetchData.callOdatipiDagilim(d_range,hotelids)
  }
  else{
    let d_range = [newValue]
    fetchData.callYatakDagilim(d_range, hotelids)
    fetchData.callGecelemeDagilim(d_range, hotelids)
    fetchData.callOnlineRezMiktari(d_range, hotelids)
    fetchData.callGecelemeMiktari(d_range, hotelids)
    fetchData.callRezervMiktari(d_range, hotelids)
    fetchData.callKanalRezDagilim(d_range, hotelids)
    fetchData.callAyDoluluk(newValue, hotelids)
    fetchData.callHaftaDoluluk(newValue, hotelids)
    fetchData.callSonYediAyDoluluk(newValue, hotelids)
    fetchData.callGecmisRez(d_range[0], d_range.length, hotelids)
    //Rez Analiz
    fetchData.callRezAnaliz(d_range, hotelids)
    //İptal Analiz
    fetchData.callIptalAnaliz(d_range,hotelids)
    //İptal Edebilir Analiz
    fetchData.callIptalEdebilirAnaliz(d_range,hotelids)
    //Ülke Dağılım
    fetchData.callUlkeDagilim(d_range, hotelids)
    //Doluluk Geçmiş
    fetchData.callGecmisRezervasyonDagilim(d_range[0],d_range.length,hotelids)

    //Oda Tipi Dağılım
    fetchData.callOdatipiDagilim(d_range,hotelids)
    store.commit("changeDateCount", 1)
  }
})
</script>


<template>
  <VMenu
    :close-on-content-click="false"
    offset-y
    :persistent="isPersistent"
  >
    <template #activator="{props}">
      <IconBtn v-bind="props">
        <VIcon icon="tabler-calendar-down" />
      </IconBtn>
    </template>
    <VCard width="300">
      <VCardText>
        <AppDateTimePicker
          v-model="dateRange"
          :config="{ mode: 'range' }"
          placeholder="Tarih Seçiniz"
        />
      </VCardText>
    </VCard>
  </VMenu>
</template>
