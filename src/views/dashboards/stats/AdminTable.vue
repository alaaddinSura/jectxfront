  <script setup>
  import { computed, ref } from "vue"
  //import { VDataTable } from '@/vuetify/labs/VDataTable'
  import VDataTable from "./VDataTable.vue"
  import Skeleton from '../functions/skeleton.vue'
  import Loader from "../functions/loader.vue"


  const props = defineProps({
    header: Array,
    data: Array,
    loader: Array,
    headerTitle: String,
  })


  const skeletonDatas = computed(()=>{
    let skeletonData = props.loader 
    return skeletonData
  })

  const tableData = computed(()=>{
    let data = props.data

    return data
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
  let deneme = 1
  </script>

  <template>
    <VCard :title="props.headerTitle"> circle-minus
      <template #append>
        <VIcon
        :icon="'tabler-circle-plus'"
        size="24"
        :color="'success'"
        class="me-1"
      />
        </template>
      <VDivider />
      <VCardText v-if="deneme == 1">
      <VDataTable
        :headers="header"
        :items="tableData"
      />
    </VCardText>
      <VCardText v-if="deneme == 0">
        <Loader style="width: 100px; height: 100px; margin-left:auto; margin-right: auto; margin-top: auto; margin-bottom: auto;"/>
    </VCardText>
    
    </VCard>
  </template>