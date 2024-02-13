<script setup>
import { computed, ref } from "vue"
//import { VDataTable } from '@/vuetify/labs/VDataTable'
import VDataTable from "./VDataTable.vue"
import Skeleton from '../functions/skeleton.vue'


const props = defineProps({
  header: Array,
  data: Array,
  loader: Array,
})

const selectedAnaKanal = ref('')
const selectedAltKanallar = ref([])

const kanallar = {
  ONL: ['AGODA', 'BOOKİNG', 'EXPEDIA', 'WEB', 'ONLDIGER'],
  AGT: ['AGTGRP', 'AGTFIT', 'AGTDIGER'],
  IND: ['WIN', 'DIRECT', 'INDDIGER'],
  WH: ['HOTELBEDS', 'ROIBOS', 'WHDIGER'],
}

const altKanallar = computed(()=>{
  return [...new Set(props.data.filter(item=> item['ANA KANAL'] == selectedAnaKanal.value).map(item => item['ALT KANAL']))]
})

const skeletonDatas = computed(()=>{
  let skeletonData = props.loader 
  return skeletonData
})

const tableData = computed(()=>{
  let data = props.data

  if(['ONL', 'AGT', 'IND', 'WH'].includes(selectedAnaKanal.value)){
    if(selectedAltKanallar.value.length > 0){
      console.log(selectedAnaKanal.value)
      console.log(selectedAltKanallar.value)

      return data.filter(item => item['ANA KANAL'] == selectedAnaKanal.value && selectedAltKanallar.value.includes(item['ALT KANAL']))
    }else{
      return data.filter(item=> item['ANA KANAL'] == selectedAnaKanal.value)
    }
  }
  
  return data
})

let deneme = 1
</script>

<template>
  <VCard>
    <VCardText>
      <VRow>
        <VCol>
          <VSelect
            v-model="selectedAnaKanal"
            label="Ana Kanal Seç"
            :items="['ONL','AGT','IND','WH']"
            variant="outlined"
            clearable
          />
        </VCol>
        <VCol>
          <VSelect
            v-model="selectedAltKanallar"
            label="Alt Kanal Seç"
            :items="altKanallar"
            variant="outlined"
            multiple
            clearable
          />
        </VCol>
      </VRow>
    </VCardText>
    <VDivider />
    <VCardText v-if="loader == 1">
    <VDataTable
      :headers="header"
      :items="tableData"
    />
  </VCardText>
  <VCardText v-if="loader == 0">
    <Skeleton />
    <Skeleton />
  </VCardText>
  </VCard>
</template>