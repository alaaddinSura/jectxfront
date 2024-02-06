<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'
import { store } from '@/store/index'

const vuetifyTheme = useTheme()
const series = [36]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables

  return {
    labels: ['Completed Task'],
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

  return [
    {
      avatarColor: 'primary',
      avatarIcon: 'tabler-ticket',
      title: 'ADR',
      subtitle: data.adr.toFixed(2),
    },
    {
      avatarColor: 'info',
      avatarIcon: 'tabler-circle-check',
      title: 'GELİR',
      subtitle: data.gelir.toFixed(2),
    },
    {
      avatarColor: 'error',
      avatarIcon: 'tabler-circle-check',
      title: 'KAYIP',
      subtitle: data.kayip,
    },
  ]
})

const rezAdetDay = computed(() => {
  let chosenHotels = store.state.selectedHotels.length == 0 ? [22966, 22964] : store.state.selectedHotels

  let rezData = store.state.rezervMiktar.length == 0 ? JSON.parse(localStorage.getItem('rezMiktar')) : store.state.rezervMiktar

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
        <VCol cols="12" md="5" sm="6" class="mt-auto">
          <div class="mb-6 mt-6">
            <h4 class="text-h3">
              {{ formatNumber(rezAdetDay) }}
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
              <VListItemSubtitle class="text-disabled">
                {{ formatNumber(ticket.subtitle) }}
              </VListItemSubtitle>
              <template #prepend>
                <VAvatar rounded size="34" :color="ticket.avatarColor" variant="tonal">
                  <VIcon :icon="ticket.avatarIcon" />
                </VAvatar>
              </template>
            </VListItem>
          </VList>
        </VCol>
        <VCol cols="12" md="7" sm="6">
          <VueApexCharts :options="chartOptions" :series="series" height="340" />
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
