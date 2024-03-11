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

const text = computed(()=>props.subtitle ?  result === 'Yüzdeli' ?  String(statistic.value.map(item => item.count).reduce((f,s)=> f+s,0)) : String(props.data.map(item=>item.stats).reduce((f, s)=>f+s, 0)): "")
</script>

<template>
  <VCard :title="props.title">
    <template #append>
      <span class="text-sm text-disabled items-center">{{ "Toplam Miktar " + text }}</span>
    </template>
    <VCardText class="pt-6">
      <VRow>
        <VCol
          v-for="item in statistic"
          :key="item.title"
          cols="6"
          md="5"
          lg="5"
        >
          <div class="d-flex align-center gap-4">
            <VAvatar
              :color="item.color"
              variant="tonal"
              size="42"
            >
              <VIcon :icon="item.icon" />
            </VAvatar>
            <!-- <div v-if="store.state.yatakDagilimLoader == 0">
              <Loader />
            </div> -->
            <div class="d-flex flex-column">
              <span class="items-center" v-if="loader == 1"><span class="text-h6 font-weight-medium text-lg-h5 title text-md-h5 mr-2" v-if="result === 'Yüzdeli'">{{ formatNumber(item.count) }}</span>
              <span class="text-h6 font-weight-medium text-lg-h5 title text-md-h5 mr-2" v-if="result != 'Yüzdeli'">{{ formatNumber(item.stats) }}</span>
                <span v-if="result === 'Yüzdeli'">
                  <VChip label :color="item.color" class="font-weight-bold">
                    <span>
                        {{ item.stats }}
                    </span>
                </VChip>
                </span>

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