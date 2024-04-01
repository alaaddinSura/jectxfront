<!-- eslint-disable indent -->
<script setup>
import * as dates from "@/views/dashboards/functions/dates";
import { computed, ref, watch } from "vue";
import * as fetchData from "@/views/dashboards/functions/fetchData";
import { store } from "@/store/index";

const props = defineProps({
  nextDate: Boolean,
});

const datePickerOpen = ref(false);

let dateRange = ref(
  props.nextDate
    ? dates.findYesterdayDate() + " to " + dates.findYesterdayDate()
    : store.state.dateCount >= 1
    ? store.state.dateRange
    : dates.findYesterdayDate() + " to " + dates.findYesterdayDate()
);

let lastDateRange = ref(
  props.nextDate
    ? dates.findYesterdayDate() + " to " + dates.findYesterdayDate()
    : store.state.dateCount >= 1
    ? store.state.dateRange
    : dates.findYesterdayDate() + " to " + dates.findYesterdayDate()
);

let date = ref(dateRange.value + "to" + lastDateRange.value);

let isPersistent = ref(true);

let today = dates.findYesterdayDate();
const minAllowedDate = today;
const maxAllowedDate = today;

let startDate = ref("2024-03-04");


const handleUpdateDate = (newValue) => {
  datePickerOpen.value = false;
  let hotelids = [22964, 22966];
  let d_range = newValue.includes("to")
    ? dates.findBetweenDates(
        dateRange.value.split(" to ")[0],
        lastDateRange.value.split(" to ")[0]
      )
    : [newValue.split("to")[0]];
  console.log("d_range burası raporlaya tıklayınca geliyor ==> ", d_range);
  // D_range Uzunluk sayısı verilerin oranlarında kullanılıyor
  store.commit("changeDateRange", dateRange.value);
  store.commit("changeDateCount", d_range.length);

  let endDate = d_range.sort()[d_range.length - 1];

  // Yatak Dağılım
  fetchData.callYatakDagilim(d_range, hotelids);

  //Geceleme Dağılım
  fetchData.callGecelemeDagilim(d_range, hotelids);

  // Genel Rezerv (Rezerv Miktarı)
  fetchData.callRezervMiktari(d_range, hotelids);

  //Rezervasyon Analiz - Genel Rezerv (Rezerv Miktarı) Oran
  fetchData.rezervMikariOran(d_range, hotelids);

  // Kanallara Rezervasyon Dağılımı
  fetchData.callKanalRezDagilim(d_range, hotelids);

  // Online Rezerv Miktarı
  fetchData.callOnlineRezMiktari(d_range, hotelids);

  //Rezervasyon Analiz - Online Rezerv Miktarı Yüzdelik oran
  fetchData.lastMonthOnlineRezMiktari(d_range, hotelids);

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

  //Rezervasyon Analiz - Rez Analiz
  fetchData.rezMiktarAnaliz(d_range, hotelids);

  //Rezervasyon Analiz - İptal Analiz
  fetchData.rezMiktarIptalAnaliz(d_range, hotelids);

  // if (!newValue.includes('to')) {
  //   // dateRange'i iki kez aynı tarih olarak güncelle
  //   dateRange.value = newValue + " to " + newValue;
  //   newValue += " to " + newValue;
  //   // d_range'i de güncelle, bu durumda bir dizi içinde aynı tarih olacak
  //   d_range = [newValue, newValue];
  //   console.log("Tek Seçili ==> ", d_range)
  //   console.log("Tek Seçili newValue ==> ", newValue  )
  // }
  // console.log(d_range)
  // console.log("Tek Seçili if dışı newValue ==> ", newValue  )
};



// watch([dateRange, lastDateRange], ([newValue, newLastDateRange]) => {
//   console.log("Watch'a girdi")
//   date.value = newValue === newLastDateRange ? `${newValue}`:`${newValue} to ${newLastDateRange}`;
//   let newDate = newValue === newLastDateRange ? `${newValue}`:`${newValue} to ${newLastDateRange}`;
//   startDate = ''
//   startDate = date.value.split(' to ')[0]
//   console.log("startDate ==> ", startDate)
//   //let findNextWeek = dates.getNextDatesFromDate(newValue, 7)[6]
//   //lastDateRange.value = findNextWeek
//   console.log("newDateeee ==> ", newDate.includes("to"))
//   let hotelids = [22964, 22966];
//   let d_range = newValue.includes("to")
//     ? dates.findBetweenDates(
//         newValue.split(" to ")[0],
//         newLastDateRange.split(" to ")[0]
//       )
//     : [newValue];
//   // console.log('watch --> ' ,dateRange)
//   console.log("d_range ==> ", d_range)
//   console.log("d_range altında startDate ==> ", startDate)
//   console.log("to ile gelmesi", dates.findBetweenDates(
//         newValue.split(" to ")[0],
//         newLastDateRange.split(" to ")[0]
//       ))
// });



// watch(dateRange, (newDate, oldDate)=>{
//   if(newDate > lastDateRange.value){
//     lastDateRange.value = newDate
//     //console.log("dateRange Kısmına girdim ==> ", dateRange)
//   }
// })

// watch(lastDateRange, (newDate, oldDate)=>{
//   if(newDate < dateRange.value){
//     dateRange.value = newDate
//     //console.log("lastDateRANGE Kısmına girmiş ==> ", lastDateRange)
//   }
// })

watch(dateRange, (newValue, oldValue) => {
  let hotelids = [22964, 22966];
  let d_range = newValue.includes("to")
    ? dates.findBetweenDates(
        dateRange.value.split(" to ")[0],
        dateRange.value.split(" to ")[1]
      )
    : [newValue];

//      if (!newValue.includes('to')) {
//      dateRange.value = newValue + " to " + newValue;
     
//      //d_range = [newValue];
//      console.log("Tek Seçili ==> ", d_range)
//      console.log("Tek Seçili newValue ==> ", newValue  )
//      console.log("old value ==> ", oldValue)
//    }
//    console.log(d_range)
//   console.log(newValue)
//   console.log("if dışında oldvalue ==>", oldValue)
 });


const disabledDates = computed(() => {
  if (!dateRange.value) return []; // Eğer başlangıç tarihi belirlenmediyse, hiçbir tarih devre dışı bırakılmaz

  // Başlangıç tarihinden önceki tarihleri döndür
  const disabledDatesArray = [];
  const startDate = new Date(dateRange.value);

  // Başlangıç tarihinden önceki tarihleri disabledDatesArray'e ekleyelim
  for (let date = new Date(minAllowedDate); date < startDate; date.setDate(date.getDate() + 1)) {
    disabledDatesArray.push(new Date(date));
  }

  return disabledDatesArray;
});


// const toggleDatePicker = () => {
//   datePickerOpen.value = !datePickerOpen.value;
// };

// const useClickOutside = (elementRef, handler) => {
//   const handleClick = (event) => {
//     if (elementRef.value && !elementRef.value.contains(event.target)) {
//       handler();
//     }
//   };

//   onMounted(() => {
//     document.addEventListener('click', handleClick);
//   });

//   onBeforeUnmount(() => {
//     document.removeEventListener('click', handleClick);
//   });
// };

// const datePickerRef = ref(null);
// useClickOutside(datePickerRef, () => {
//   datePickerOpen.value = false;
// });
</script>

<template>
  <div ref="datePickerRef">
    <IconBtn @click="toggleDatePicker">
      <!-- <VIcon icon="tabler-calendar-down" /> -->
    </IconBtn>
    <VMenu
      :close-on-content-click="false"
      offset-y
      :persistent="isPersistent"
      v-model="datePickerOpen"
      :nudge-top="true"
      style="z-index: 50"
    >
      <template #activator="{ props }">
        <IconBtn v-bind="props">
          <VIcon icon="tabler-calendar-down" />
        </IconBtn>
      </template>
      <VCard width="330" v-show="datePickerOpen">
        <VCardText>
          
          <AppDateTimePicker
            v-model="dateRange"
            :config="{ mode: 'range', maxDate: props.nextDate ? maxAllowedDate : '' }"
            placeholder="Tarih Seçiniz"
            style="z-index: 9999"
          />
          <VBtn class="p-2 my-2 w-100" @click="handleUpdateDate(dateRange)">
            Raporla
          </VBtn>
          <!-- <VRow>
            <VCol>
              <AppDateTimePicker
                label="Başlangıç Tarihi"
                v-model="dateRange"
                :config="{ maxDate: props.nextDate ? maxAllowedDate : '' }"
                placeholder="Tarih Seçiniz"
                style="z-index: 9999"
              />
            </VCol>
            <VCol>
              <AppDateTimePicker
                label="Bitiş Tarihi"
                v-model="lastDateRange"
                :config="{
                  maxDate: props.nextDate ? maxAllowedDate : '',
                }"
                :disabledDates="disabledDates"
                placeholder="Tarih Seçiniz"
              />
            </VCol>
            <VBtn class="p-2 my-2 w-100" @click="handleUpdateDate(date)">
              Raporla
            </VBtn>
          </VRow> -->
        </VCardText>
      </VCard>
    </VMenu>
  </div>
</template>

<style lang="scss" scoped></style>
