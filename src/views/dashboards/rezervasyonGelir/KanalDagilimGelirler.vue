<script setup>
import { hexToRgb } from "@layouts/utils";
import VueApexCharts from "vue3-apexcharts";
import { useTheme } from "vuetify";
import { store } from "@/store/index";

const vuetifyTheme = useTheme();
const currentTab = ref(0);
const refVueApexChart = ref();

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

const chartConfigs = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors;
  const variableTheme = vuetifyTheme.current.value.variables;
  const labelPrimaryColor = `rgba(${hexToRgb(currentTheme.primary)},${
    variableTheme["dragged-opacity"]
  })`;
  const legendColor = `rgba(${hexToRgb(currentTheme["on-background"])},${
    variableTheme["high-emphasis-opacity"]
  })`;
  const borderColor = `rgba(${hexToRgb(
    String(variableTheme["border-color"])
  )},${variableTheme["border-opacity"]})`;
  const labelColor = `rgba(${hexToRgb(currentTheme["on-surface"])},${
    variableTheme["disabled-opacity"]
  })`;

  let chosenHotels = store.state.selectedHotels;
  let rezData = JSON.parse(localStorage.getItem("kanalDagilimGelirler"));
  let statData = rezData.filter((item) => chosenHotels.includes(item.HOTELID));
  statData = statData.filter((item) => item.BASARILI == "success");
  console.log(statData)

  let dates = [...new Set(statData.map((item) => item.DATE))].sort();

  let onlineData = statData.filter((item) => item.ANAKANAL == "ONL");
  
  onlineData = dates.map((date) =>
    onlineData
      .filter((item) => item.DATE == date)
      .map((item) => item.TOTALREVENUE)
      .reduce((f, s) => f + s, 0)
  );

  let whData = statData.filter((item) => item.ANAKANAL == "WH");
  whData = dates.map((date) =>
    whData
      .filter((item) => item.DATE == date)
      .map((item) => item.TOTALREVENUE)
      .reduce((f, s) => f + s, 0)
  );

  let agtDATA = statData.filter((item) => item.ANAKANAL == "AGT");
  agtDATA = dates.map((date) =>
  agtDATA
      .filter((item) => item.DATE == date)
      .map((item) => item.TOTALREVENUE)
      .reduce((f, s) => f + s, 0)
  );

  let indDATA = statData.filter((item) => item.ANAKANAL == "IND");
  indDATA = dates.map((date) =>
  indDATA
      .filter((item) => item.DATE == date)
      .map((item) => item.TOTALREVENUE)
      .reduce((f, s) => f + s, 0)
  );
  console.log(indDATA)
  return [
    {
      title: "Online",
      icon: "tabler-world-dollar",
      chartOptions: {
        chart: {
          parentHeightOffset: 0,
          type: "bar",
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            columnWidth: "32%",
            startingShape: "rounded",
            borderRadius: 4,
            distributed: true,
            dataLabels: { position: "top" },
          },
        },
        grid: {
          show: false,
          padding: {
            top: 0,
            bottom: 0,
            left: -10,
            right: -10,
          },
        },
        colors: [
          labelPrimaryColor,
          labelPrimaryColor,
          labelPrimaryColor,
          currentTheme.primary,
          labelPrimaryColor,
          labelPrimaryColor,
          labelPrimaryColor,
        ],
        dataLabels: {
          enabled: true,
          formatter(val) {
            return `${formatNumber(val)}`;
          },
          offsetY: -25,
          style: {
            fontSize: "15px",
            colors: [legendColor],
            fontWeight: "600",
            fontFamily: "Public Sans",
          },
        },
        legend: { show: false },
        tooltip: { enabled: false },
        xaxis: {
          categories: dates,
          axisBorder: {
            show: true,
            color: borderColor,
          },
          axisTicks: { show: false },
          labels: {
            style: {
              colors: labelColor,
              fontSize: "13px",
              fontFamily: "Public Sans",
            },
          },
        },
        yaxis: {
          labels: {
            offsetX: -15,
            formatter(val) {
              return `${formatNumber(String(val / 1))}`;
            },
            style: {
              fontSize: "13px",
              colors: labelColor,
              fontFamily: "Public Sans",
            },
            min: 0,
            max: 60000,
            tickAmount: 6,
          },
        },
        responsive: [
          {
            breakpoint: 1441,
            options: { plotOptions: { bar: { columnWidth: "41%" } } },
          },
          {
            breakpoint: 590,
            options: {
              plotOptions: { bar: { columnWidth: "61%" } },
              yaxis: { labels: { show: false } },
              grid: {
                padding: {
                  right: 0,
                  left: -20,
                },
              },
              dataLabels: {
                style: {
                  fontSize: "12px",
                  fontWeight: "400",
                },
              },
            },
          },
        ],
      },
      series: [
        {
          data: onlineData,
        },
      ],
    },
    {
      title: "WH",
      icon: "tabler-world-www",
      chartOptions: {
        chart: {
          parentHeightOffset: 0,
          type: "bar",
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            columnWidth: "32%",
            startingShape: "rounded",
            borderRadius: 4,
            distributed: true,
            dataLabels: { position: "top" },
          },
        },
        grid: {
          show: false,
          padding: {
            top: 0,
            bottom: 0,
            left: -10,
            right: -10,
          },
        },
        colors: [
          labelPrimaryColor,
          labelPrimaryColor,
          labelPrimaryColor,
          currentTheme.primary,
          labelPrimaryColor,
          labelPrimaryColor,
          labelPrimaryColor,
        ],
        dataLabels: {
          enabled: true,
          formatter(val) {
            return `${formatNumber(val)}`;
          },
          offsetY: -25,
          style: {
            fontSize: "15px",
            colors: [legendColor],
            fontWeight: "600",
            fontFamily: "Public Sans",
          },
        },
        legend: { show: false },
        tooltip: { enabled: false },
        xaxis: {
          categories: dates,
          axisBorder: {
            show: true,
            color: borderColor,
          },
          axisTicks: { show: false },
          labels: {
            style: {
              colors: labelColor,
              fontSize: "13px",
              fontFamily: "Public Sans",
            },
          },
        },
        yaxis: {
          labels: {
            offsetX: -15,
            formatter(val) {
              return `${formatNumber(String(val / 1))}`;
            },
            style: {
              fontSize: "13px",
              colors: labelColor,
              fontFamily: "Public Sans",
            },
            min: 0,
            max: 60000,
            tickAmount: 6,
          },
        },
        responsive: [
          {
            breakpoint: 1441,
            options: { plotOptions: { bar: { columnWidth: "41%" } } },
          },
          {
            breakpoint: 590,
            options: {
              plotOptions: { bar: { columnWidth: "61%" } },
              grid: { padding: { right: 0 } },
              dataLabels: {
                style: {
                  fontSize: "12px",
                  fontWeight: "400",
                },
              },
              yaxis: { labels: { show: false } },
            },
          },
        ],
      },
      series: [
        {
          data: whData,
        },
      ],
    },
    {
      title: "AGT",
      icon: "tabler-windsock",
      chartOptions: {
        chart: {
          parentHeightOffset: 0,
          type: "bar",
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            columnWidth: "32%",
            startingShape: "rounded",
            borderRadius: 4,
            distributed: true,
            dataLabels: { position: "top" },
          },
        },
        grid: {
          show: false,
          padding: {
            top: 0,
            bottom: 0,
            left: -10,
            right: -10,
          },
        },
        colors: [
          labelPrimaryColor,
          labelPrimaryColor,
          labelPrimaryColor,
          currentTheme.primary,
          labelPrimaryColor,
          labelPrimaryColor,
          labelPrimaryColor,
        ],
        dataLabels: {
          enabled: true,
          formatter(val) {
            return `${formatNumber(val)}`;
          },
          offsetY: -25,
          style: {
            fontSize: "15px",
            colors: [legendColor],
            fontWeight: "600",
            fontFamily: "Public Sans",
          },
        },
        legend: { show: false },
        tooltip: { enabled: false },
        xaxis: {
          categories: dates,
          axisBorder: {
            show: true,
            color: borderColor,
          },
          axisTicks: { show: false },
          labels: {
            style: {
              colors: labelColor,
              fontSize: "13px",
              fontFamily: "Public Sans",
            },
          },
        },
        yaxis: {
          labels: {
            offsetX: -15,
            formatter(val) {
              return `${formatNumber(String(val / 1))}`;
            },
            style: {
              fontSize: "13px",
              colors: labelColor,
              fontFamily: "Public Sans",
            },
            min: 0,
            max: 60000,
            tickAmount: 6,
          },
        },
        responsive: [
          {
            breakpoint: 1441,
            options: { plotOptions: { bar: { columnWidth: "41%" } } },
          },
          {
            breakpoint: 590,
            options: {
              plotOptions: { bar: { columnWidth: "61%" } },
              grid: { padding: { right: 0 } },
              dataLabels: {
                style: {
                  fontSize: "12px",
                  fontWeight: "400",
                },
              },
              yaxis: { labels: { show: false } },
            },
          },
        ],
      },
      series: [
        {
          data: agtDATA,
        },
      ],
    },
    {
      title: "IND",
      icon: "tabler-users",
      chartOptions: {
        chart: {
          parentHeightOffset: 0,
          type: "bar",
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            columnWidth: "32%",
            startingShape: "rounded",
            borderRadius: 4,
            distributed: true,
            dataLabels: { position: "top" },
          },
        },
        grid: {
          show: false,
          padding: {
            top: 0,
            bottom: 0,
            left: -10,
            right: -10,
          },
        },
        colors: [
          labelPrimaryColor,
          labelPrimaryColor,
          labelPrimaryColor,
          currentTheme.primary,
          labelPrimaryColor,
          labelPrimaryColor,
          labelPrimaryColor,
        ],
        dataLabels: {
          enabled: true,
          formatter(val) {
            return `${formatNumber(val)}`;
          },
          offsetY: -25,
          style: {
            fontSize: "15px",
            colors: [legendColor],
            fontWeight: "600",
            fontFamily: "Public Sans",
          },
        },
        legend: { show: false },
        tooltip: { enabled: false },
        xaxis: {
          categories: dates,
          axisBorder: {
            show: true,
            color: borderColor,
          },
          axisTicks: { show: false },
          labels: {
            style: {
              colors: labelColor,
              fontSize: "13px",
              fontFamily: "Public Sans",
            },
          },
        },
        yaxis: {
          labels: {
            offsetX: -15,
            formatter(val) {
              return `${formatNumber(String(val / 1))}`;
            },
            style: {
              fontSize: "13px",
              colors: labelColor,
              fontFamily: "Public Sans",
            },
            min: 0,
            max: 60000,
            tickAmount: 6,
          },
        },
        responsive: [
          {
            breakpoint: 1441,
            options: { plotOptions: { bar: { columnWidth: "41%" } } },
          },
          {
            breakpoint: 590,
            options: {
              plotOptions: { bar: { columnWidth: "50%" } },
              dataLabels: {
                style: {
                  fontSize: "12px",
                  fontWeight: "400",
                },
              },
              grid: { padding: { right: 0 } },
              yaxis: { labels: { show: false } },
            },
          },
        ],
      },
      series: [
        {
          data: indDATA,
        },
      ],
    },
  ];
});
</script>

<template>
  <VCard title="Kanal Dağılım Gelirler">
    <VCardText>
      <VSlideGroup v-model="currentTab" show-arrows mandatory>
        <VSlideGroupItem
          v-for="(report, index) in chartConfigs"
          :key="report.title"
          v-slot="{ isSelected, toggle }"
          :value="index"
        >
          <div
            style="block-size: 94px; inline-size: 110px"
            :style="
              isSelected
                ? 'border-color:rgb(var(--v-theme-primary)) !important'
                : ''
            "
            :class="isSelected ? 'border' : 'border border-dashed'"
            class="d-flex flex-column justify-center align-center cursor-pointer rounded px-5 py-2 me-6"
            @click="toggle"
          >
            <VAvatar
              rounded
              size="38"
              :color="isSelected ? 'primary' : 'secondary'"
              variant="tonal"
              class="mb-2"
            >
              <VIcon :icon="report.icon" />
            </VAvatar>
            <p class="mb-0 font-weight-medium">
              {{ report.title }}
            </p>
          </div>
        </VSlideGroupItem>
      </VSlideGroup>

      <VueApexCharts
        ref="refVueApexChart"
        :key="currentTab"
        :options="chartConfigs[Number(currentTab)].chartOptions"
        :series="chartConfigs[Number(currentTab)].series"
        height="240"
        class="mt-3"
      />
    </VCardText>
  </VCard>
</template>
