<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'
import { store } from '@/store/index'
import Loader from '../functions/loader.vue'
import * as dates from "@/views/dashboards/functions/dates";

const vuetifyTheme = useTheme()
//const series = [50]

const seriesPercent = computed(()=>{
  let data = JSON.parse(localStorage.getItem('gunlukTakip'))
  let chosenHotels = store.state.selectedHotels.length == 0 ? [22966, 22964] : store.state.selectedHotels
  data = data.filter(item => chosenHotels.includes(item.hotelId))
  let dataCount = data.map(item => item.gelir).reduce((f, s) => f + s, 0)

  const statData =  store.state.getGoals.length == 0 ? JSON.parse(localStorage.getItem("getGoals")) : store.state.getGoals
  let rezData = statData.filter(item => chosenHotels.includes(item.hotelId))
  
  let todayDate;
  let monthData;
  if(rezData.filter(item => dates.findCurrentMonth().includes(item.date))){
    todayDate = rezData.filter(item => dates.findCurrentMonth().includes(item.date))
    monthData = todayDate.map(item => item.value).reduce((f,s)=> f+s,0)
  }else{
    monthData = 1000000
  }
  const monthCount = (monthData / 30)
  const monthPercent = (( dataCount / monthCount ) * 100).toFixed(0)

  return monthPercent
})

let series = Array(seriesPercent.value)

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables

  return {
    labels: ['Tamamlanan Görev'],
    chart: { type: 'radialBar' },
    plotOptions: {
      radialBar: {
        offsetY: 10,
        startAngle: -140,
        endAngle: 130,
        hollow: { size: '65%' },
        track: {
          background: currentTheme.surface,
          strokeWidth: '100%',
        },
        dataLabels: {
          name: {
            offsetY: -20,
            color: `rgba(${hexToRgb(currentTheme['on-background'])},${variableTheme['disabled-opacity']})`,
            fontSize: '13px',
            fontWeight: '400',
            fontFamily: 'Public Sans',
          },
          value: {
            offsetY: 10,
            color: `rgba(${hexToRgb(currentTheme['on-background'])},${variableTheme['high-emphasis-opacity']})`,
            fontSize: '38px',
            fontWeight: '400',
            fontFamily: 'Public Sans',
          },
        },
      },
    },
    colors: [currentTheme.primary],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.5,
        gradientToColors: [currentTheme.primary],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0.6,
        stops: [
          30,
          70,
          100,
        ],
      },
    },
    stroke: { dashArray: 10 },
    grid: {
      padding: {
        top: -20,
        bottom: 5,
      },
    },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    responsive: [{
      breakpoint: 960,
      options: { chart: { height: 340 } },
    }],
  }
})

const supportTicket = computed(() => {
  let data = JSON.parse(localStorage.getItem('gunlukTakip'))
  let chosenHotels = store.state.selectedHotels.length == 0 ? [22966, 22964] : store.state.selectedHotels
  data = data.filter(item => chosenHotels.includes(item.hotelId))
  return [
    {
      avatarColor: 'primary',
      avatarIcon: 'tabler-ticket',
      title: 'ADR',
      subtitle: Number(data.map(item => item.gelir).reduce((f,s) => f+s, 0) / data.map(item => item.geceleme).reduce((f, s) => f + s, 0)).toFixed(2),
    },
    {
      avatarColor: 'info',
      avatarIcon: 'tabler-circle-check',
      title: 'GELİR',
      subtitle: data.map(item => item.gelir).reduce((f, s) => f + s, 0).toFixed(2),
    },
    {
      avatarColor: 'error',
      avatarIcon: 'tabler-circle-check',
      title: 'KAYIP',
      subtitle: data.map(item => item.kayip).reduce((f, s) => f + s, 0).toFixed(2),
    },
  ]
})

const rezAdetDay = computed(() => {
  let chosenHotels = store.state.selectedHotels.length == 0 ? [22966, 22964] : store.state.selectedHotels

  let rezData = JSON.parse(localStorage.getItem('rezMiktar'))

  let statData = rezData.filter(item => chosenHotels.includes(item.hotelId))

  let totalCount = statData.map(item => item.count).reduce((f, s) => f + s, 0)

  return totalCount
})

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
</script>

<template>
  <VCard title="Günlük Takip">
    <template #append>
      <div class="mt-n4 me-n2">
        <MoreBtn :menu-list="[{ title: 'View More', value: 'View More' }, { title: 'Delete', value: 'Delete' }]" />
      </div>
    </template>

    <VCardText>
      <VRow>
        <VCol cols="12" md="4" sm="6" class="mt-auto">
          <div class="mb-6 mt-6">
            <h4 class="text-h3" v-if="store.state.selectedHotels != 'No Hotel'">
              {{ formatNumber(rezAdetDay) }}
            </h4>
            <h4 class="text-h3" v-if="store.state.selectedHotels == 'No Hotel'">
              <Loader />
            </h4>
            <p>
              Rezervasyon Miktarı
            </p>
          </div>

          <VList class="card-list">
            <VListItem v-for="ticket in supportTicket" :key="ticket.title">
              <VListItemTitle class="font-weight-medium">
                {{ ticket.title }}
              </VListItemTitle>
              <VListItemSubtitle class="text-disabled" v-if="store.state.selectedHotels != 'No Hotel'">
                {{ formatNumber(ticket.subtitle) }}
              </VListItemSubtitle>
              <VListItemSubtitle class="text-disabled" v-if="store.state.selectedHotels == 'No Hotel'">
                <Loader />
              </VListItemSubtitle>
              <template #prepend>
                <VAvatar rounded size="34" :color="ticket.avatarColor" variant="tonal">
                  <VIcon :icon="ticket.avatarIcon" />
                </VAvatar>
              </template>
            </VListItem>
          </VList>
        </VCol>
        <VCol cols="12" md="8" sm="6">
          <VueApexCharts :options="chartOptions" :series="series"  height="340" v-if="store.state.selectedHotels != 'No Hotel'"/>
          <VCardText v-if="store.state.selectedHotels == 'No Hotel'">
            <Loader style="margin-left: auto; margin-right:auto; width:100px;height:100px;margin-top:20px;"/>
          </VCardText>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 18px;
}
</style>
