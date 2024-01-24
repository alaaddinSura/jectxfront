<script setup>
import { hexToRgb } from '@layouts/utils'
import VueApexCharts from 'vue3-apexcharts'
import {
  useDisplay,
  useTheme,
} from 'vuetify'

const props = defineProps({
  data: Object,
})

const vuetifyTheme = useTheme()
const display = useDisplay()


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
                return String(props.data.totalAmountNight)
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: display.thresholds.value.lg,
        options: {
          chart: {
            width: 200,
            height: 160,
          },
        },
      },
      {
        breakpoint: 420,
        options: {
          chart: {
            width: 150,
            height: 120,
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
      <div class="d-flex flex-column">
        <div class="mb-auto">
          <h5 class="text-h5 text-no-wrap">
            {{ data.name }}
          </h5>
        </div>

        <div>
          <h3 class="text-h3 mb-1">
            {{ data.totalNight }}
          </h3>
          <div>
            <VIcon
              icon="tabler-chevron-up"
              color="success"
              class="me-1"
            />
            <span class="text-success font-weight-medium">
              {{ data.percentage }} %
            </span>
          </div>
        </div>
      </div>
      <div>
        <VueApexCharts
          :options="chartOptions"
          :series="series"
          :height="110"
        />
      </div>
    </VCardText>
  </VCard>
</template>