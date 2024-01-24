<script setup>
import { ref } from "vue"

const props = defineProps({
  header: Array,
  data: Array,
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
    <v-data-table
      :headers="header"
      :items="tableData"
    />
  </VCard>
</template>