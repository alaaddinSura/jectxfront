<script setup>
import { store } from '@/store/index'
import * as dates from '@/views/dashboards/functions/dates'
import { hexToRgb } from '@layouts/utils'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import Loader from '../functions/loader.vue'
import SkeletonCompareBar from '../functions/skeletonCompareBar.vue'


const vuetifyTheme = useTheme()

const NRFORAN = computed(() => {
  let dateRange = store.state.dateRange
  let chosenHotels = store.state.selectedHotels
  let startDate = dateRange.split(' to ')[0]
  let endDate = dateRange.split(' to ')[1]

  let rezData = store.state.iptalEdilebilirAnalizGunluk == 0 ? JSON.parse(localStorage.getItem("iptalEdilebilirAnalizGunluk")) : store.state.iptalEdilebilirAnalizGunluk
  
  let chosenDates = [...new Set(rezData.map(item => item.DATE))]

  let statData = rezData.filter(item => chosenDates.includes(item.DATE))
  statData = statData.filter(item => chosenHotels.includes(item.HOTELID))

  let NRFADET = statData.filter(item => item.RATETYPE === 'NRF').map(item => Number(item.COUNT)).reduce((f, s) => f + s, 0)
  let TUMADET = statData.map(item => Number(item.COUNT)).reduce((f, s) => f + s, 0)


  let chosenDates2 = chosenDates.slice(0, -1)
  let last7months = dates.finLast7months(dates.findtodayDate())
  let last7DayCount = 210
  let last7monthsNRF = last7months.map(date => rezData.filter(item => item.DATE.includes(date)
    && item.RATETYPE == 'NRF'
    && chosenHotels.includes(item.HOTELID)).map(item => item.COUNT != 'nan' ? Number(item.COUNT) : 0).reduce((f, s) => f + s, 0)).reduce((f, s) => f + s, 0)


  let statData2 = rezData.filter(item => chosenDates2.includes(item.DATE))
  statData2 = statData2.filter(item => chosenHotels.includes(item.HOTELID))

  let ORAN = Math.round((Number(NRFADET / TUMADET) * 100))
  let ORAN2 = Math.round((last7monthsNRF / last7DayCount))
  let ORAN3 = Math.round((NRFADET / chosenDates.length))

  let DEGISIM = ORAN3 - ORAN2
  let CLASS = DEGISIM > 0 ? 'text-success' : 'text-error'
  let ICON = DEGISIM > 0 ? 'tabler-chevron-up' : 'tabler-chevron-down'
  DEGISIM = DEGISIM > 0 ? DEGISIM : -DEGISIM

  return {
    ORAN, DEGISIM, CLASS, ICON,
  }

})

const series = computed(() => {
  let chosenHotels = store.state.selectedHotels
  let rezData = store.state.iptalEdebilirAnaliz.length == 0 ? JSON.parse(localStorage.getItem("iptalEdilebilirAnaliz")) : store.state.iptalEdebilirAnaliz
  let dates = [...new Set(rezData.map(item => item.DATE))].sort()

  let NRFList = rezData.filter(item => item.RATETYPE == 'NRF' && chosenHotels.includes(item.HOTELID))
  NRFList = dates.map(date => NRFList.filter(item => item.DATE == date).map(item => item.COUNT).reduce((f,s) => f+s, 0))

  let RFList = rezData.filter(item => item.RATETYPE == 'RF' && chosenHotels.includes(item.HOTELID))
  RFList = dates.map(date => RFList.filter(item => item.DATE == date).map(item => item.COUNT).reduce((f, s) => f + s, 0))
  RFList = RFList.map(item => -item)

  return [
    {
      name: 'NRF',
      data: NRFList,
    },
    {
      name: 'RF',
      data: RFList,
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
  let rezData = store.state.iptalEdilebilirAnalizGunluk == 0 ? JSON.parse(localStorage.getItem("iptalEdilebilirAnalizGunluk")) : store.state.iptalEdilebilirAnalizGunluk
  let statData = rezData.filter(item=> chosenHotels.includes(item.HOTELID))

  let NRFAdet = statData.filter(item=> item.RATETYPE === 'NRF').map(item=> item.COUNT).reduce((f,s)=>f+s,0)

  let RFAdet = statData.filter(item=> item.RATETYPE === 'RF').map(item=> item.COUNT).reduce((f,s)=>f+s,0)

  return [
    {
      avatar: 'tabler-arrow-move-up',
      avatarColor: 'primary',
      title: 'NRF',
      subtitle: 'Non-Refundable',
      earning: NRFAdet,
    },
    {
      avatar: 'tabler-arrow-move-down',
      avatarColor: 'secondary',
      title: 'RF',
      subtitle: 'Refundable',
      earning: RFAdet,
    },
  ]
})
</script>

<template>
  <VCard>
    <VCardItem class="pb-0">
      <VCardTitle>İptal Edilebilir Analiz</VCardTitle>

      <div class="d-flex align-center mt-2">
        <h4 class="text-h3 me-2" v-if="store.state.iptalEdilebilirAnalizGunlukLoader == 1">
          {{ NRFORAN.ORAN }}%
        </h4>
        <h4 class="text-h3 me-2" v-if="store.state.iptalEdilebilirAnalizGunlukLoader == 0">
          <Loader />
        </h4>
      </div>
    </VCardItem>

    <VCardText>
      <VueApexCharts v-if="store.state.iptalEdebilirAnalizLoader == 1"
        :options="chartOptions"
        :series="series"
        height="210"
        class="my-2"
      />
      <VCardText v-if="store.state.iptalEdebilirAnalizLoader == 0">
        <Loader style="height: 70px; width: 70px; margin-top: 20px; margin-left: auto; margin-right: auto"/>
      </VCardText>
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
            <span class="text-success font-weight-medium" v-if="store.state.iptalEdilebilirAnalizGunlukLoader == 1">{{ earning.earning }}</span>
            <span class="text-success font-weight-medium" v-if="store.state.iptalEdilebilirAnalizGunlukLoader == 0"><Loader style="margin-left: 60px"/></span>
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

/* HTML: <div class="loader"></div> */
.loader {
  width: 45px;
  aspect-ratio: 1;
  --c:no-repeat repeating-linear-gradient(90deg,#000 0 calc(100%/7),#0000 0 calc(200%/7));
  background: var(--c),var(--c),var(--c),var(--c);
  background-size: 140% 26%;
  animation: l25 .75s infinite;
}
@keyframes l25 {
 0%   {background-position:0    calc(0*100%/3),100% calc(1*100%/3),0    calc(2*100%/3),100% calc(3*100%/3)}
 25%  {background-position:100% calc(0*100%/3),100% calc(1*100%/3),0    calc(2*100%/3),100% calc(3*100%/3)}
 50%  {background-position:100% calc(0*100%/3),0    calc(1*100%/3),0    calc(2*100%/3),100% calc(3*100%/3)}
 75%  {background-position:100% calc(0*100%/3),0    calc(1*100%/3),100% calc(2*100%/3),100% calc(3*100%/3)}
 100% {background-position:100% calc(0*100%/3),0    calc(1*100%/3),100% calc(2*100%/3),0    calc(3*100%/3)}
}
</style>
