<script setup>
import VueApexCharts from "vue3-apexcharts";
import { useTheme } from "vuetify";
import { hexToRgb } from "@layouts/utils";
import { store } from "@/store/index";
import { computed } from "vue";
import Loader from "../functions/loader.vue";
import * as dates from "@/views/dashboards/functions/dates";

const vuetifyTheme = useTheme();

const series = computed(() => {
  console.log("-------------------Yukarıdaki Bar İstatistik Çizgileri-----------------------------")
  let chosenHotels = store.state.selectedHotels;
  let rezData = JSON.parse(localStorage.getItem("kazancDurumu7AyGrafik"));
  console.log("7 aylık kazanç ham hali ==> ", rezData)

  rezData.forEach(item => {
    if(item.TOTALREVENUE == null){
      item.TOTALREVENUE = 0
    }
  })
  console.log("7 aylık kazanç Nulları 0'a getirme ==> ", rezData)

  let statData = rezData.filter((item) => chosenHotels.includes(item.HOTELID));
  console.log("Yukarıdaki İstatistik Çizgi otel belirleme(chosenHotel) ==> ", statData)
  let dates = [...new Set(statData.map(item => item.DATE))].sort()
  console.log("Yukarıdaki İstatistik Çizgi tarihleri getirme ==> ", dates)
  let data = dates.map(hotel => statData
  .filter(item => item.DATE == hotel)
  .map(item => item.TOTALREVENUE)
  .reduce((f,s) => f+s, 0))
  console.log("Yukarıdaki İstatistik Çizgi Verilerin listesi ==> ", data)
  console.log("----------------------------------------------------------------")
  return [
    {
      data
    },
  ];
});


const chartOptions = computed(() => {
  console.log("--------------------Yukarıdaki İstatistik Bar Tarih----------------------------")
  const currentTheme = vuetifyTheme.current.value.colors;
  const variableTheme = vuetifyTheme.current.value.variables;
  let rezData = JSON.parse(localStorage.getItem("kazancDurumu7AyGrafik"));
  console.log("Yukarıdaki İstatistik Tarih Bar Ham Hali ==> ", rezData)
  console.log("Yukarıdaki İstatistik Tarih Hali chosenHotels ==> ", [...new Set(rezData.map(item => item.DATE))].sort())
  console.log("------------------------------------------------")
  return {
    chart: {
      parentHeightOffset: 0,
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        barHeight: "60%",
        columnWidth: "55%",
        startingShape: "rounded",
        endingShape: "rounded",
        borderRadius: 4,
        distributed: true,
      },
    },
    grid: {
      show: false,
      padding: {
        top: -30,
        bottom: 0,
        left: -10,
        right: -10,
      },
    },
    colors: [
      `rgba(${hexToRgb(currentTheme.primary)},${
        variableTheme["pressed-opacity"]
      })`,
      `rgba(${hexToRgb(currentTheme.primary)},${
        variableTheme["pressed-opacity"]
      })`,
      `rgba(${hexToRgb(currentTheme.primary)},${
        variableTheme["pressed-opacity"]
      })`,
      `rgba(${hexToRgb(currentTheme.primary)},1`,
      `rgba(${hexToRgb(currentTheme.primary)}, ${variableTheme["pressed-opacity"]
      })`,
      `rgba(${hexToRgb(currentTheme.primary)},${
        variableTheme["pressed-opacity"]
      })`,
      `rgba(${hexToRgb(currentTheme.primary)},${
        variableTheme["pressed-opacity"]
      })`,
    ],
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: [...new Set(rezData.map(item => item.DATE))].sort(),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: `rgba(${hexToRgb(currentTheme["on-surface"])},${
            variableTheme["disabled-opacity"]
          })`,
          fontSize: "13px",
          fontFamily: "Public Sans",
        },
      },
    },
    yaxis: { labels: { show: false } },
    tooltip: { enabled: false },
    responsive: [
      {
        breakpoint: 1025,
        options: { chart: { height: 199 } },
      },
    ],
  };
});

const earningsReports = computed(() => {
  console.log("----------------------Verilerin Toplamı Aşağıdaki Rakam--------------------------")
  let data = JSON.parse(localStorage.getItem("aylikTakip"));
  console.log("Verilerin Rakamlı Hali Saf Hali ==> ", data)
  let chosenHotels = store.state.selectedHotels.length == 0 ? [22966, 22964] : store.state.selectedHotels
  data = data.filter(item => chosenHotels.includes(item.hotelId))
  console.log("Verilerin Rakamlı Hali chosenHotels ==> ", data)

  const statData =  store.state.getGoals.length == 0 ? JSON.parse(localStorage.getItem("getGoals")) : store.state.getGoals
  console.log("Rakamlı Verilerin Hedef Saf Hali ==> ", statData)
  let rezData = statData.filter(item => chosenHotels.includes(item.hotelId))
  console.log("Verilerin Rakamlı Hali Hedef ==> ", rezData)
  let todayDate;
  let monthData;
  if(rezData.filter(item => dates.findCurrentMonth().includes(item.date))){
    todayDate = rezData.filter(item => dates.findCurrentMonth().includes(item.date))
    monthData = todayDate.map(item => item.value).reduce((f,s)=> f+s,0)
  }else{
    monthData = 1000000
  }
  console.log("Verilerin Rakamlı Hali Hedeflerin Toplamı ==> ", monthData)
  console.log("Verilerin Rakamlı Hali Kazanç ==> ", data.map(item => item.gelir).reduce((f,s) => f+s, 0).toFixed(2))
  console.log("Verilerin Rakamlı Hali Kayıp ==> ", data.map(item => item.kayip).reduce((f, s) => f + s, 0).toFixed(2))
  console.log("----------------------------------------------------------------------------")
  return [
    {
      color: "primary",
      icon: "tabler-target-arrow",
      title: "Hedef",
      amount: monthData,
      progress: "55",
    },
    {
      color: "info",
      icon: "tabler-currency-euro",
      title: "Kazanç",
      amount: data.map(item => item.gelir).reduce((f,s) => f+s, 0).toFixed(2),
      progress: "25",
    },
    {
      color: "error",
      icon: "tabler-currency-euro-off",
      title: "Kayıp",
      amount: data.map(item => item.kayip).reduce((f, s) => f + s, 0).toFixed(2),
      progress: "65",
    },
  ];
});

const rezAdetMonth = computed(() => {
  console.log("---------------------Aylık Rezerve Miktarı---------------------------")
  let chosenHotels = store.state.selectedHotels;
  let rezData = JSON.parse(localStorage.getItem("kazancDurumuRezMiktar")); //Bu Gelmiyor
  console.log("Aylık Rezerve Ham Hali ==> ", rezData)
  let statData = rezData.filter((item) => chosenHotels.includes(item.hotelId));
  console.log("Aylık Rezerve Otel Seçmeli ==> ", rezData)
  let totalRez = statData.map((item) => item.count).reduce((f, s) => f + s, 0);
  console.log("Aylık Rezerve Toplam Rezerve ==> ", totalRez)
  console.log("------------------------------------------------")
  return totalRez;
});

const revenueChange = computed(() => {
  console.log("---------------------Oran Belirleme Yeri---------------------------")
  let chosenHotels = store.state.selectedHotels;
  let rezData = JSON.parse(localStorage.getItem("kazancDurumuOran"))
  console.log("Oran Verinin Ham Hali ==> ", rezData)
  let statData = rezData.filter(item => chosenHotels.includes(item.hotelId))
  console.log("Oran Verinin Hotel Seçmeli Hali ==> ", statData)
  let totalCount = statData.map(item => item.count).reduce((f,s)=> f+s,0)
  console.log("Oran Verinin Toplamının Hali ==> ", totalCount)
  let thisMonths = rezAdetMonth.value
  let changeRevenue = (thisMonths - totalCount) *100 / totalCount
  console.log("Oran Verinin Oranı Hali ==> ", changeRevenue)
  console.log("------------------------------------------------")

  return {
    oran: changeRevenue.toFixed(2),
    statu: changeRevenue > 0.99 ? "success" : "error",
  };
});

const successRate = computed(() => {
  console.log("---------------------Aşağıdaki Yeşil Dolma Yeri---------------------------")
  let data = JSON.parse(localStorage.getItem("aylikTakip"));
  console.log("Yeşil Bar Aylık Takip Ham Hali ==> ", data)
  let chosenHotels = store.state.selectedHotels.length == 0 ? [22966, 22964] : store.state.selectedHotels
  data = data.filter(item => chosenHotels.includes(item.hotelId))
  console.log("Yeşil Bar Aylık Takip Otel Belirleme ==> ", data)
  let dataMonth = data.map(item => item.gelir).reduce((f,s) => f+s, 0).toFixed(2)
  console.log("Yeşil Bar Aylık Takip Gelirin Toplamı ==> ", dataMonth)

  const statData =  store.state.getGoals.length == 0 ? JSON.parse(localStorage.getItem("getGoals")) : store.state.getGoals
  console.log("Yeşil Bar Aylık GetGoals Ham Hali ==> ", statData)
  let rezData = statData.filter(item => chosenHotels.includes(item.hotelId))
  console.log("Yeşil Bar Aylık GetGoals Otel Seçmeli ==> ", rezData)
  let todayDate;
  let monthData;
  if(rezData.filter(item => dates.findCurrentMonth().includes(item.date))){
    todayDate = rezData.filter(item => dates.findCurrentMonth().includes(item.date))
    console.log("Yeşil Bar Aylık GetGoals İf koşulunu sağlamış O ayki veri veriyi getirme ==> ", todayDate)
    monthData = todayDate.map(item => item.value).reduce((f,s)=> f+s,0)
    console.log("Yeşil Bar Aylık GetGoals O ay ki hedefin toplamı ==> ", monthData)
  }else{
    monthData = 1000000
    console.log("Yeşil Bar Aylık GetGoals Aylık Hedef Yok Else'ye geldi ==> ", monthData)
  }
  const monthCount = ( dataMonth / monthData) * 100
  console.log("Yeşil Bar Aylık GetGoals ve Aylık Takip Oran ==> ", monthCount)
  let statisticBar = monthCount.toFixed(0);
  console.log("Yeşil Bar Aylık GetGoals Barda Görüntülenmesi İçin Son Hali ==> ", statisticBar)
  console.log("-----------------------------------------------------------------------")
  return {
    bar: statisticBar,
  };
});
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

</script>

<template>
  <VCard>
    <VCardItem class="pb-sm-0">
      <VCardTitle>Aylık Kazanç Durumu</VCardTitle>
    </VCardItem>

    <VCardText class="mt-sm-n6">
      <VRow>
        <VCol cols="12" sm="5" class="d-flex flex-column align-self-end">
          <div class="d-flex align-center gap-2 mb-2 pb-1 flex-wrap" v-if="store.state.selectedHotels != 'No Hotel'">
            <h4 class="text-4xl font-weight-medium">
              {{ rezAdetMonth }}
            </h4>
            <VChip label :color="revenueChange.statu">
              {{ revenueChange.oran }}%
            </VChip>
          </div>
          <div class="d-flex align-center gap-2 my-5 pb-1 flex-wrap" v-if="store.state.selectedHotels == 'No Hotel'">
            <h4 class="text-4xl font-weight-medium">
              <Loader />
            </h4>
          </div>
          <p class="text-sm">
            Geçen aya kıyasla bu ay verileri
          </p>
        </VCol>

        <VCol cols="12" sm="7" class="pt-0">
          <VueApexCharts v-if="store.state.selectedHotels != 'No Hotel'"
            :options="chartOptions"
            :series="series"
            height="190"
          />
          <VCardText v-if="store.state.selectedHotels == 'No Hotel'">
            <Loader style="width: 80px; height: 80px; float:right;"/>
          </VCardText>
        </VCol>
      </VRow>

      <div class="border rounded mt-3 px-5 py-3">
        <VRow>
          <VCol
            v-for="report in earningsReports"
            :key="report.title"
            cols="12"
            sm="4"
          >
            <div class="d-flex align-center mt-3">
              <VAvatar
                rounded
                size="26"
                :color="report.color"
                variant="tonal"
                class="me-2"
              >
                <VIcon size="18" :icon="report.icon" />
              </VAvatar>

              <h6 class="text-base font-weight-medium">
                {{ report.title }}
              </h6>
            </div>
            <h4 class="text-h5 my-3 d-flex text-center ml-5" v-if="store.state.selectedHotels != 'No Hotel'">
              {{ formatNumber(report.amount) }}
            </h4>
            <h4 class="text-h5 my-3 d-flex text-center ml-5" v-if="store.state.selectedHotels == 'No Hotel'">
              <Loader />
            </h4>
          </VCol>
          <VCol cols="12" sm="12">
            <VProgressLinear
              :model-value="successRate.bar"
              color="success"
              height="4"
              rounded
              rounded-bar
            />
          </VCol>
        </VRow>
      </div>
    </VCardText>
  </VCard>
</template>
