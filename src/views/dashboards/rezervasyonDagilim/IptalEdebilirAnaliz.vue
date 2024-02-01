<script setup>
import { store } from '@/store/index'
import * as dates from '@/views/dashboards/functions/dates'
import { hexToRgb } from '@layouts/utils'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'


const vuetifyTheme = useTheme()

const NRFORAN = computed(() => {

  let ORAN = 70
  let DEGISIM = 90
  let CLASS = DEGISIM > 0 ? 'text-success' : 'text-error' 
  let ICON = DEGISIM > 0 ? 'tabler-chevron-up' : 'tabler-chevron-down' 
  DEGISIM = DEGISIM > 0 ? DEGISIM : -DEGISIM

  return {
    ORAN, DEGISIM, CLASS, ICON,
  }

})

const series = computed(() => {
  return [
    {
      name: 'NRF',
      data: [160, 170, 190, 20, 50, 90, 70],
    },
    {
      name: 'RF',
      data: [90, 120, 30, 40, 80, 90, 70],
    },
  ]
})

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  
  return {
    chart: {
      parentHeightOffset: 0,
      stacked: true,
      type: 'bar',
      toolbar: { show: false },
    },
    tooltip: { enabled: false },
    legend: { show: false },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '18%',
        borderRadius: 5,
        startingShape: 'rounded',
        endingShape: 'rounded',
      },
    },
    colors: [
      `rgba(${ hexToRgb(currentTheme.primary) }, 1)`,
      `rgba(${ hexToRgb(currentTheme.secondary) }, 1)`,
    ],
    dataLabels: { enabled: false },
    grid: {
      show: false,
      padding: {
        top: -40,
        bottom: -20,
        left: -10,
        right: -2,
      },
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: { labels: { show: false } },
    responsive: [
      {
        breakpoint: 1468,
        options: { plotOptions: { bar: { columnWidth: '22%' } } },
      },
      {
        breakpoint: 1197,
        options: {
          chart: { height: 228 },
          plotOptions: {
            bar: {
              borderRadius: 8,
              columnWidth: '26%',
            },
          },
        },
      },
      {
        breakpoint: 783,
        options: {
          chart: { height: 232 },
          plotOptions: {
            bar: {
              borderRadius: 6,
              columnWidth: '28%',
            },
          },
        },
      },
      {
        breakpoint: 589,
        options: { plotOptions: { bar: { columnWidth: '16%' } } },
      },
      {
        breakpoint: 520,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 6,
              columnWidth: '18%',
            },
          },
        },
      },
      {
        breakpoint: 426,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 5,
              columnWidth: '20%',
            },
          },
        },
      },
      {
        breakpoint: 381,
        options: { plotOptions: { bar: { columnWidth: '24%' } } },
      },
    ],
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
  }
})

const totalEarnings = computed(() => {
  let chosenHotels = store.state.selectedHotels
  let rezData = store.state.iptalEdebilirAnaliz == 0 ? JSON.parse(localStorage.getItem("iptalEdilebilirAnaliz")) : store.state.iptalEdebilirAnaliz

  let statData = rezData.filter(item=> chosenHotels.includes(item.HOTELID))

  let NRFAdet = [...new Set(statData.filter(item=> item.RATETYPE === 'NRF').map(item=> item.RESID))]
  
  let RFAdet = [...new Set(statData.filter(item=> item.RATETYPE === 'RF').map(item=> item.RESID))]

  return [
    {
      avatar: 'tabler-arrow-move-up',
      avatarColor: 'primary',
      title: 'NRF',
      subtitle: 'Non-Refundable',
      earning: NRFAdet.length,
    },
    {
      avatar: 'tabler-arrow-move-down',
      avatarColor: 'secondary',
      title: 'RF',
      subtitle: 'Refundable',
      earning: RFAdet.length,
    },
  ]
})
</script>

<template>
  <VCard>
    <VCardItem class="pb-0">
      <VCardTitle>İptal Edilebilir Analiz</VCardTitle>

      <div class="d-flex align-center mt-2">
        <h4 class="text-h3 me-2">
          {{ NRFORAN.ORAN }}%
        </h4>
        <div :class="NRFORAN.CLASS">
          <VIcon
            size="18"
            :icon="NRFORAN.ICON"
          />
          <span class="text-base">{{ NRFORAN.DEGISIM }}%</span>
        </div>
      </div>
    </VCardItem>

    <VCardText>
      <VueApexCharts
        :options="chartOptions"
        :series="series"
        height="210"
        class="my-2"
      />

      <VList class="card-list mt-4">
        <VListItem
          v-for="earning in totalEarnings"
          :key="earning.title"
        >
          <VListItemTitle class="font-weight-medium">
            {{ earning.title }}
          </VListItemTitle>
          <VListItemSubtitle class="text-disabled">
            {{ earning.subtitle }}
          </VListItemSubtitle>

          <template #prepend>
            <VAvatar
              :icon="earning.avatar"
              :color="earning.avatarColor"
              variant="tonal"
              size="34"
              rounded
            />
          </template>

          <template #append>
            <span class="text-success font-weight-medium">{{ earning.earning }}</span>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 18px;
}
</style>
