<!-- eslint-disable indent -->
<script setup>
import { store } from '@/store/index'
import * as dates from '@/views/dashboards/functions/dates'
import axios from '@axios'
import { ref, watch } from 'vue'

let dateRange = ref(dates.findYesterdayDate() + " to " + dates.findtodayDate())
let isPersistent = ref(true)


watch(dateRange, (newValue, oldValue) => {
  if(newValue.includes('to')){
    store.commit('changeDateRange', newValue)
    let startDate = dateRange.value.split(' to ')[0]
    let endDate = dateRange.value.split(' to ')[1] 
    axios.get('https://suraanaliz-05a6f1924519.herokuapp.com/guestnation?datetype=CHECKINDATE&from=' + startDate + '&to=' + endDate)
      .then(r => {
        store.commit('changeGuestNations', r.data)
      })
    axios.get('https://suraanaliz-05a6f1924519.herokuapp.com/subraw?from=' + startDate + '&to=' + endDate)
      .then(r => {
        store.commit('changeRawData', r.data)
      })
  }
  else{
    let dateValue = newValue + ' to ' + newValue
    store.commit('changeDateRange', dateValue)
    let startDate = dateValue.split(' to ')[0]
    let endDate = dates.findAfterDate(startDate)
    axios.get('https://suraanaliz-05a6f1924519.herokuapp.com/guestnation?datetype=CHECKINDATE&from=' + startDate + '&to=' + endDate)
      .then(r => {
        store.commit('changeGuestNations', r.data)
      })
    axios.get('https://suraanaliz-05a6f1924519.herokuapp.com/subraw?from=' + startDate + '&to=' + endDate)
      .then(r => {
        store.commit('changeRawData', r.data)
      })
  }
})
</script>


<template>
  <VMenu
    :close-on-content-click="false"
    offset-y
    :persistent="isPersistent"
  >
    <template #activator="{props}">
      <IconBtn v-bind="props">
        <VIcon icon="tabler-calendar-down" />
      </IconBtn>
    </template>
    <VCard width="300">
      <VCardText>
        <AppDateTimePicker
          v-model="dateRange"
          :config="{ mode: 'range' }"
          placeholder="Tarih Seçiniz"
        />
      </VCardText>
    </VCard>
  </VMenu>
</template>
