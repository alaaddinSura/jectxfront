<!-- eslint-disable indent -->
<script setup>
import * as dates from "@/views/dashboards/functions/dates";
import { ref, watch } from "vue";
import * as fetchData from "@/views/dashboards/functions/fetchData";
import { store } from "@/store/index";

const datePickerOpen = ref(false);

let dateRange = ref(
  dates.findYesterdayDate() + " to " + dates.findYesterdayDate()
);
let isPersistent = ref(true);

const handleUpdateDate = (newValue) => {
  datePickerOpen.value = false;

  let hotelids = [22964, 22966];
  let d_range = newValue.includes("to")
    ? dates.findBetweenDates(
        dateRange.value.split(" to ")[0],
        dateRange.value.split(" to ")[1]
      )
    : [newValue];

  // D_range Uzunluk sayısı verilerin oranlarında kullanılıyor
  store.commit("changeDateCount", d_range.length);

  let endDate = dateRange.value.split(" to ")[1];
  console.log(endDate);

  // Yatak Dağılım
  fetchData.callYatakDagilim(d_range, hotelids);

  //Geceleme Dağılım
  fetchData.callGecelemeDagilim(d_range, hotelids);

  // Genel Rezerv (Rezerv Miktarı)
  fetchData.callRezervMiktari(d_range, hotelids);

  // Kanallara Rezervasyon Dağılımı
  fetchData.callKanalRezDagilim(d_range, hotelids);

  // Online Rezerv Miktarı
  fetchData.callOnlineRezMiktari(d_range, hotelids);

  // Doluluk
  fetchData.callGecelemeMiktari(d_range, hotelids);

  //Ay Doluluk
  fetchData.callAyDoluluk(endDate, hotelids);

  //Hafta Doluluk
  fetchData.callHaftaDoluluk(endDate, hotelids);

  //Son 7 ay doluluk
  fetchData.callSonYediAyDoluluk(endDate, hotelids);

  //Geçmiş Rezervasyonlar
  fetchData.callGecmisRez(endDate, d_range.length, hotelids);

  //Rez Analiz
  fetchData.callRezAnaliz(d_range, hotelids);

  //İptal Analiz
  fetchData.callIptalAnaliz(d_range, hotelids);

  //İptal Edebilir Analiz
  fetchData.callIptalEdebilirAnaliz(d_range, hotelids);

  //İptal Edebilir Analiz Günlük
  fetchData.callIptalEdebilirAnalizGunluk(d_range, hotelids);

  //Ülke Dağılım
  fetchData.callUlkeDagilim(d_range, hotelids);

  //Doluluk Geçmiş
  fetchData.callGecmisRezervasyonDagilim(endDate, d_range.length, hotelids);

  //Gelecek Doluluk
  fetchData.callDolulukGelecekRez(d_range[0], hotelids);

  //Oda tipi dağılım
  fetchData.callOdatipiDagilim(d_range, hotelids);

  //channell tablo
  fetchData.callChannelTable(d_range, hotelids);

  //raw data
  fetchData.callRawData(d_range, hotelids);
};

watch(dateRange, (newValue, oldValue) => {
  let hotelids = [22964, 22966];
  let d_range = newValue.includes("to")
    ? dates.findBetweenDates(
        dateRange.value.split(" to ")[0],
        dateRange.value.split(" to ")[1]
      )
    : [newValue];
});

const toggleDatePicker = () => {
  datePickerOpen.value = !datePickerOpen.value;
};
</script>

<template>
  <div>
    <IconBtn @click="toggleDatePicker">
      <!-- <VIcon icon="tabler-calendar-down" /> -->
    </IconBtn>
    <VMenu
      :close-on-content-click="false"
      offset-y
      :persistent="isPersistent"
      v-model="datePickerOpen"
    >
      <template #activator="{ props }">
        <IconBtn v-bind="props">
          <VIcon icon="tabler-calendar-down" />
        </IconBtn>
      </template>
      <VCard width="300" v-show="datePickerOpen">
        <VCardText>
          <VBtn class="p-2 my-2 w-100" @click="handleUpdateDate(dateRange)">
            Raporla
          </VBtn>
          <AppDateTimePicker
            v-model="dateRange"
            :config="{ mode: 'range' }"
            placeholder="Tarih Seçiniz"
          />
        </VCardText>
      </VCard>
    </VMenu>
  </div>
</template>
