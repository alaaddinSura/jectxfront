<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()

const series = [{
  data: [
    120,
    65,
    50,
    45,
    90,
    55,
    70,
  ],
}]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  
  return {
    chart: {
      parentHeightOffset: 0,
      type: 'bar',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        barHeight: '60%',
        columnWidth: '55%',
        startingShape: 'rounded',
        endingShape: 'rounded',
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
      `rgba(${ hexToRgb(currentTheme.primary) },${ variableTheme['pressed-opacity'] })`,
      `rgba(${ hexToRgb(currentTheme.primary) },${ variableTheme['pressed-opacity'] })`,
      `rgba(${ hexToRgb(currentTheme.primary) },${ variableTheme['pressed-opacity'] })`,
      `rgba(${ hexToRgb(currentTheme.primary) },${ variableTheme['pressed-opacity'] })`,
      `rgba(${ hexToRgb(currentTheme.primary) }, 1)`,
      `rgba(${ hexToRgb(currentTheme.primary) },${ variableTheme['pressed-opacity'] })`,
      `rgba(${ hexToRgb(currentTheme.primary) },${ variableTheme['pressed-opacity'] })`,
    ],
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: [
        '2023-10',
        '2023-11',
        '2023-12',
        '2024-01',
        '2024-02',
        '2024-03',
        '2024-05',
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: `rgba(${ hexToRgb(currentTheme['on-surface']) },${ variableTheme['disabled-opacity'] })`,
          fontSize: '13px',
          fontFamily: 'Public Sans',
        },
      },
    },
    yaxis: { labels: { show: false } },
    tooltip: { enabled: false },
    responsive: [{
      breakpoint: 1025,
      options: { chart: { height: 199 } },
    }],
  }
})

const earningsReports = [
  {
    color: 'primary',
    icon: 'tabler-target-arrow',
    title: 'Hedef',
    amount: '1.2M',
    progress: '55',
  },
  {
    color: 'info',
    icon: 'tabler-currency-euro',
    title: 'Kazanç',
    amount: '436K',
    progress: '25',
  },
  {
    color: 'error',
    icon: 'tabler-currency-euro-off',
    title: 'Kayıp',
    amount: '7.8K',
    progress: '65',
  },
]

const moreList = [
  {
    title: 'View More',
    value: 'View More',
  },
  {
    title: 'Delete',
    value: 'Delete',
  },
]

const rezAdetMonth = "468"

const revenueChange = computed(()=>{
  let changeRevenue = 5.6

  return{
    oran: changeRevenue,
    statu: changeRevenue > 0 ? 'success' : 'error',
  }
})

const successRate = computed(()=>{
  let statisticBar= 80
  
  return{
    bar: statisticBar,
  }
})
</script>

<template>
  <VCard>
    <VCardItem class="pb-sm-0">
      <VCardTitle>Aylınk Kazanç Durumu</VCardTitle>
    </VCardItem>

    <VCardText class="mt-sm-n6">
      <VRow>
        <VCol
          cols="12"
          sm="5"
          class="d-flex flex-column align-self-end"
        >
          <div class="d-flex align-center gap-2 mb-2 pb-1 flex-wrap">
            <h4 class="text-4xl font-weight-medium">
              {{ rezAdetMonth }}
            </h4>
            <VChip
              label
              :color="revenueChange.statu"
            >
              {{ revenueChange.oran }}%
            </VChip>
          </div>

          <p class="text-sm">
            You informed of this month compared to last month
          </p>
        </VCol>

        <VCol
          cols="12"
          sm="7"
          class="pt-0"
        >
          <VueApexCharts
            :options="chartOptions"
            :series="series"
            height="190"
          />
        </VCol>
      </VRow>

      <div class="border rounded mt-3 px-5 py-4">
        <VRow>
          <VCol
            v-for="report in earningsReports"
            :key="report.title"
            cols="12"
            sm="4"
          >
            <div class="d-flex align-center">
              <VAvatar
                rounded
                size="26"
                :color="report.color"
                variant="tonal"
                class="me-2"
              >
                <VIcon
                  size="18"
                  :icon="report.icon"
                />
              </VAvatar>

              <h6 class="text-base font-weight-medium">
                {{ report.title }}
              </h6>
            </div>
            <h4 class="text-h4 my-3">
              {{ report.amount }}
            </h4>
          </VCol>
          <VCol
            cols="12"
            sm="12"
          >
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
