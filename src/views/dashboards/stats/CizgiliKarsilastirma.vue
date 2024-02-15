<script setup>
import { getLineChartSimpleConfig } from '@core/libs/apex-chart/apexCharConfig'
import { hexToRgb } from '@layouts/utils'
import { computed, defineProps } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const props = defineProps({
  data: {
    type: Object,
    default: {},
    required: true,
  },
})

const vuetifyTheme = useTheme()
const balanceChartConfig = computed(() => getLineChartSimpleConfig(vuetifyTheme.current.value))

const colorVariables = themeColors => {
  const themeSecondaryTextColor = `rgba(${hexToRgb(themeColors.colors['on-surface'])},${themeColors.variables['medium-emphasis-opacity']})`
  const themeDisabledTextColor = `rgba(${hexToRgb(themeColors.colors['on-surface'])},${themeColors.variables['disabled-opacity']})`
  const themeBorderColor = `rgba(${hexToRgb(String(themeColors.variables['border-color']))},${themeColors.variables['border-opacity']})`
  const themePrimaryTextColor = `rgba(${hexToRgb(themeColors.colors['on-surface'])},${themeColors.variables['high-emphasis-opacity']})`
  
  return { themeSecondaryTextColor, themeDisabledTextColor, themeBorderColor, themePrimaryTextColor }
}

const graphData = computed(() => {

  const lineData = props.data.data
  let line= []

  const nokta = Object.keys(lineData).map(key=>{
    line.push({
      name: key,
      data: lineData[key],
    })
  })
  
  return {
    line,
    cats: props.data.cats,
  }
})



const series = [
  ...graphData.value.line,
]


const getSubBalanceConfig = computed(() => {
  const themeColors = vuetifyTheme.current.value
  const { themeBorderColor, themeDisabledTextColor } = colorVariables(themeColors)
 
  return {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    colors: ['#ff9f43', '#3F51B5', '#28c76f', '#3F51B5'],
    stroke: { curve: 'straight' },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#ff9f43'],
      strokeColors: ['#fff'],
    },
    grid: {
      padding: { top: -10 },
      borderColor: themeBorderColor,
      xaxis: {
        lines: { show: true },
      },
    },
    tooltip: {
      custom(data) {
        return `<div class='bar-chart pa-2'>
          <span style='color: red'>${data.series[data.seriesIndex][data.dataPointIndex]}</span>
        </div>`
      },
    },
    yaxis: {
      labels: {
        style: { colors: themeDisabledTextColor },
      },
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: themeBorderColor },
      crosshairs: {
        stroke: { color: themeBorderColor },
      },
      labels: {
        style: { colors: themeDisabledTextColor },
      },
      categories: graphData.value.cats,
    },
  }
})
</script>

<template>
  <VueApexCharts
    type="line"
    height="400"
    :options="getSubBalanceConfig"
    :series="series"
  />
</template>
