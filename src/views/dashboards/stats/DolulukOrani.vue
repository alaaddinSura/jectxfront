<script setup>
import { hexToRgb } from '@layouts/utils'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import Loader from '../functions/loader.vue'
import { store } from '@/store'

const props = defineProps({
  name: String,
  color: String,
  nightcount: Number,
  oran: Array,
  loader: Array,
})

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

const vuetifyTheme = useTheme()

const dataRange = computed(()=>{
  const oran = props.oran
  const name = props.name
  const nightCount = props.nightcount
  const loader = props.loader
  
  return{
    oran, name, nightCount, loader
  }
})

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  
  return {
    chart: {
      sparkline: { enabled: true },
      parentHeightOffset: 0,
      type: 'radialBar',
    },
    colors: [props.color],
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: -90,
        endAngle: 90,
        hollow: { size: '65%' },
        track: {
          strokeWidth: '45%',
          background: `rgba(${ hexToRgb(String(variableTheme['border-color'])) },${ variableTheme['border-opacity'] })`,
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: '22px',
            color: `rgba(${ hexToRgb(currentTheme['on-background']) },${ variableTheme['high-emphasis-opacity'] })`,
            fontWeight: 600,
            offsetY: -5,
          },
        },
      },
    },
    grid: {
      show: false,
      padding: { bottom: 5 },
    },
    stroke: { lineCap: 'round' },
    labels: ['Progress'],
    responsive: [
      {
        breakpoint: 1442,
        options: {
          chart: { height: 140 },
          plotOptions: {
            radialBar: {
              dataLabels: { value: { fontSize: '18px' } },
              hollow: { size: '60%' },
            },
          },
        },
      },
      {
        breakpoint: 1370,
        options: { chart: { height: 120 } },
      },
      {
        breakpoint: 1280,
        options: {
          chart: { height: 150 },
          plotOptions: {
            radialBar: {
              dataLabels: { value: { fontSize: '18px' } },
              hollow: { size: '70%' },
            },
          },
        },
      },
      {
        breakpoint: 960,
        options: {
          chart: { height: 250 },
          plotOptions: {
            radialBar: {
              hollow: { size: '70%' },
              dataLabels: { value: { fontSize: '18px' } },
            },
          },
        },
      },
    ],
  }
})
</script>

<template>
  <VCard>
    <VCardText>
      <div class="mb-n2">
        <h5 class="text-h5" v-if="dataRange.loader == 1">
          {{ formatNumber(dataRange.nightCount) }}
        </h5>
        <h5 v-if="dataRange.loader == 0">
          <Loader />
      </h5>
        <span class="text-disabled text-sm">{{ dataRange.name }}</span>
      </div>
      <VueApexCharts
        :options="chartOptions"
        :series="dataRange.oran"
        type="radialBar"
        :height="155" v-if="loader == 1"
      />
      <VCardText v-if="loader == 0" style="display: flex; justify-content: center; align-items: center; margin-top: 10px">
        <Loader />
      </VCardText>
      <div class="text-sm text-center clamp-text text-disabled mt-3">
        Oda Doluluk
      </div>
    </VCardText>
  </VCard>
</template>
