<script setup>
import { hexToRgb } from '@layouts/utils'
import VueApexCharts from 'vue3-apexcharts'
import {
  useDisplay,
  useTheme,
} from 'vuetify'
import Loader from '../functions/loader.vue'
import { load } from 'webfontloader'
const props = defineProps({
  data: Object,
  loader: Array,
})
import { store } from '@/store'

const vuetifyTheme = useTheme()
const display = useDisplay()

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}


const series = computed(() => {
  return props.data.series
})


const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const labelSuccessColor = `rgba(${ hexToRgb(currentTheme.success) },0.2)`
  const headingColor = `rgba(${ hexToRgb(currentTheme['on-background']) },${ variableTheme['high-emphasis-opacity'] })`

  const chartColors = {
    donut: props.data.colors,
  }
  
  return {
    chart: {
      parentHeightOffset: 0,
      type: 'donut',
    },
    labels: props.data.labels,
    colors: Object.values(chartColors.donut),
    stroke: { width: 0 },
    dataLabels: {
      enabled: false,
      formatter(val) {
        return `${ parseInt(val) }%`
      },
    },
    legend: { show: false },
    tooltip: { theme: false },
    grid: {
      padding: {
        top: 0,
        bottom: -10,
        right: -20,
        left: -20,
      },
    },
    states: { hover: { filter: { type: 'none' } } },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            value: {
              fontSize: '1.375rem',
              fontFamily: 'Public Sans',
              color: headingColor,
              fontWeight: 600,
              offsetY: -15,
              formatter(val) {
                return `${ parseInt(val) }%`
              },
            },
            name: {
              offsetY: 20,
              fontFamily: 'Public Sans',
            },
            total: {
              show: true,
              showAlways: true,
              color: currentTheme.success,
              fontSize: '.8125rem',
              label: 'Geceleme',
              fontFamily: 'Public Sans',
              formatter() {
                return formatNumber(String(props.data.totalAmountNight))
              },
            },
          },
        },
      },
    },
    
  }
})
let deneme = 0
</script>

<template>
  <VCard>
    <VCardText class="d-flex justify-space-between">
      <div class="d-flex flex-column">
        <div class="mb-auto">
          <h6 class="text-h6 text-no-wrap">
            {{ data.name }}
          </h6>
        </div>

        <div>
          <h5 class="text-h4  mb-1" v-if="loader == 1">
            {{ formatNumber(data.totalNight) }}
          </h5>
          <h5 class="text-h3 mb-1" v-if="loader == 0">
            <Loader />
          </h5>
          
        </div>
      </div>
      <div>
        <VueApexCharts v-if="loader == 1"
          :options="chartOptions"
          :series="props.data.series"
          :height="147"
        />
        <VCardText v-if="loader == 0">
          <Loader style="height: 100px; width: 100px"/>
        </VCardText>
      </div>
    </VCardText>
  </VCard>
</template>