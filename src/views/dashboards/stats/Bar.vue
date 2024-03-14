<script setup>
import {store} from "@/store/index"
import Loader from "../functions/loader.vue"

const props = defineProps({
  data: Array,
  title: String,
  subtitle: Boolean,
  loader: Array,
})

const statistic = computed(()=> {return props.data})

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
// statistic.map(item => item.stats).filter(k => yuzde.includes(k)) ? 'Yüzdeli' : 'Yüzdeli Değil'

let statDataSearch = statistic.value.map(item => item.stats);
let result = 'Yüzdeli Değil';

for (let i = 0; i < statDataSearch.length; i++) {
  if (String(statDataSearch[i]).includes('%')) {
    result = 'Yüzdeli';
    break;
  }
}
let percentageControl = props.data.some(item => 'percentage' in item)
//const text = computed(()=>props.subtitle ?  result === 'Yüzdeli' ?  String(statistic.value.map(item => item.count).reduce((f,s)=> f+s,0)) : String(props.data.map(item=>item.stats).reduce((f, s)=>f+s, 0)): "")
const text = computed(()=>props.subtitle ?  String(props.data.map(item=>item.stats).reduce((f, s)=>f+s, 0)): "")
</script>

<template>
  <VCard :title="props.title">
    <template #append>
      <span class="text-body-2">{{ props.subtitle ?  "Toplam Miktar " + text : '' }}</span>
    </template>
    <VCardText class="pt-6">
      <VRow>
        <VCol
          v-for="item in statistic"
          :key="item.title"
          cols="6"
          md="3"
        >
          <div class="d-flex items-center">
            <VAvatar
              :color="item.color"
              variant="tonal"
              size="42"
              class="me-3"
            >
              <VIcon :icon="item.icon" size="24"/>
            </VAvatar>
            <!-- <div v-if="store.state.yatakDagilimLoader == 0">
              <Loader />
            </div> -->
            <div class="d-flex flex-column">
              <span class="items-center" v-if="loader == 1">
              <span class="text-md">{{ formatNumber(item.stats) }} <VChip label :color="item.color" class="font-weight-bold ml-2" v-if="percentageControl">
                <span v-if="loader == 1">
                    {{ item.percentage }}
                </span>
                <span class="text-sm font-weight-medium" v-if="loader == 0"><Loader /></span>
            </VChip></span>
              </span>
              <span class="text-h6 font-weight-medium" v-if="loader == 0"><Loader /></span>
              <span class="text-sm">
                {{ item.title }}
              </span>
              
              
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style scoped>

</style>