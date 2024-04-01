<script setup>
import { hexToRgb } from '@/@layouts/utils'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify/lib/framework.mjs'
import SkeletonCompareBarVue from '../functions/skeletonCompareBar.vue'
import Skeleton from '../functions/skeleton.vue'

const props = defineProps({
  series: Object,
  loader: Array,
})

const propsData = computed(()=>{
  const min = props.series.min
  const max = props.series.max
  return{

  }
})

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

const vuetifyTheme = useTheme()

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const labelColor = `rgba(${ hexToRgb(currentTheme['on-surface']) },${ variableTheme['disabled-opacity'] })`
  const legendColor = `rgba(${ hexToRgb(currentTheme['on-background']) },${ variableTheme['high-emphasis-opacity'] })`
  const borderColor = `rgba(${ hexToRgb(String(variableTheme['border-color'])) },${ variableTheme['border-opacity'] })`
  
  return {
    bar: {
      chart: {
        parentHeightOffset: 0,
        stacked: true,
        type: 'bar',
        toolbar: { show: false },
      },
      tooltip: { enabled: true, theme: true, fillSeriesColor: true },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '45%',
          borderRadius: 8,
          startingShape: 'rounded',
          endingShape: 'rounded',
        },
      },
      colors: [
        `rgba(${ hexToRgb(currentTheme.primary) }, 1)`,
        `rgba(${ hexToRgb(currentTheme.warning) }, 1)`,
      ],
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: 6,
        lineCap: 'round',
        colors: [currentTheme.surface],
      },
      legend: {
        show: true,
        horizontalAlign: 'left',
        position: 'top',
        fontFamily: 'Public Sans',
        markers: {
          height: 12,
          width: 12,
          radius: 12,
          offsetX: -3,
          offsetY: 2,
        },
        labels: { colors: legendColor },
        itemMargin: { horizontal: 5 },
      },
      grid: {
        show: false,
        padding: {
          bottom: -8,
          top: 20,
        },
      },
      xaxis: {
        categories: props.series.categories,
        labels: {
          style: {
            fontSize: '13px',
            colors: labelColor,
            fontFamily: 'Public Sans',
          },
        },
        axisTicks: { show: false },
        axisBorder: { show: false },
      },
      yaxis: {
        labels: {
          offsetX: -16,
          formatter(val) {
              return `${formatNumber(String(val / 1))}`;
            },
          style: {
            fontSize: '13px',
            colors: labelColor,
            fontFamily: 'Public Sans',
          },
        },//formatNumber(String(val / 1))
        // min: props.series.min * 1.000222,
        // max: formatNumber(Number(props.series.max / 1)),
        // tickAmount: 5,
      },
      responsive: [
        {
          breakpoint: 1700,
          options: { plotOptions: { bar: { columnWidth: '43%' } } 
        },
        },
        {
          breakpoint: 1441,
          options: { plotOptions: { bar: { columnWidth: '52%' } },
          xaxis: { labels: {
            rotate: -45,
            rotateAlways: true,
          } }
        },
        },
        {
          breakpoint: 1300,
          options: { 
          plotOptions: { bar: { columnWidth: '52%' } },
          
        },
        },
        {
          breakpoint: 1025,
          options: {
            plotOptions: { bar: { columnWidth: '70%' } },
            chart: { height: 390 },
          },
        },
        {
          breakpoint: 991,
          options: { plotOptions: { bar: { columnWidth: '38%' } } },
        },
        {
          breakpoint: 850,
          options: { plotOptions: { bar: { columnWidth: '48%' } } },
        },
        {
          breakpoint: 449,
          options: {
            plotOptions: { bar: { columnWidth: '70%' } },
            chart: { height: 360 },
            xaxis: { labels: { offsetY: -5 } },
          },
        },
        {
          breakpoint: 394,
          options: { plotOptions: { bar: { columnWidth: '88%' } } },
        },
      ],
      states: {
        hover: { filter: { type: 'none' } },
        active: { filter: { type: 'none' } },
      },
    },
  }
})
let deneme = 0;
</script>

<template>
  <VCard>
    <VRow>
      <VCol
        cols="12"
        class="border-b"
      >
        <VCardText class="pe-2">
          <h5 class="text-h5 mb-6">
            {{ series.title }}
          </h5>
          <VCardText v-if="loader == 1">
          <VueApexCharts
            :options="chartOptions.bar"
            :series="series.bar"
            height="312"
          />
        </VCardText>
        <VCardText v-if="loader == 0">
          <SkeletonCompareBarVue />
        </VCardText>
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>