<script setup>
import VueApexCharts from "vue3-apexcharts";
import { useTheme } from "vuetify";
import { hexToRgb } from "@layouts/utils";
import { store } from "@/store/index";
import { computed } from "vue";
import Loader from "../functions/loader.vue";

const vuetifyTheme = useTheme();

const series = computed(() => {
  let chosenHotels = store.state.selectedHotels;
  let rezData = JSON.parse(localStorage.getItem("kazancDurumu7AyGrafik"));

  rezData.forEach(item => {
    if(item.TOTALREVENUE == null){
      item.TOTALREVENUE = 0
    }
  })

  let statData = rezData.filter((item) => chosenHotels.includes(item.HOTELID));
  let dates = [...new Set(statData.map(item => item.DATE))].sort()
  let data = dates.map(hotel => statData
  .filter(item => item.DATE == hotel)
  .map(item => item.TOTALREVENUE)
  .reduce((f,s) => f+s, 0))
  return [
    {
      data
    },
  ];
});


const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors;
  const variableTheme = vuetifyTheme.current.value.variables;

  let rezData = JSON.parse(localStorage.getItem("kazancDurumu7AyGrafik"));

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
  let data = JSON.parse(localStorage.getItem("aylikTakip"));
  let chosenHotels = store.state.selectedHotels.length == 0 ? [22966, 22964] : store.state.selectedHotels
  data = data.filter(item => chosenHotels.includes(item.hotelId))

  return [
    {
      color: "primary",
      icon: "tabler-target-arrow",
      title: "Hedef",
      amount: "1.2M",
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
  let chosenHotels = store.state.selectedHotels;
  let rezData = JSON.parse(localStorage.getItem("kazancDurumuRezMiktar"));
  let statData = rezData.filter((item) => chosenHotels.includes(item.hotelId));
  let totalRez = statData.map((item) => item.count).reduce((f, s) => f + s, 0);
  return totalRez;
});

const revenueChange = computed(() => {
  let changeRevenue = 5.6;

  return {
    oran: changeRevenue,
    statu: changeRevenue > 0 ? "success" : "error",
  };
});

const successRate = computed(() => {
  let statisticBar = 80;

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
            You informed of this month compared to last month
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
