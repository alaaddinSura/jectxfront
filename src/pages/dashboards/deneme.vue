<script setup>
import VDataTable from "@/views/dashboards/stats/VDataTable.vue";
import { ref } from "vue";

const menu = ref(false);
const date = ref(null);

console.log("date ==> ", date);

let isPersistent = ref(true);
const datePickerOpen = ref(false);
</script>

<template>
  <VMenu
    :close-on-content-click="false"
    :persistent="isPersistent"
    v-model="datePickerOpen"
  >
    <template #activator="{ props }">
      <IconBtn v-bind="props">
        <VIcon icon="tabler-calendar-down" />
      </IconBtn>
    </template>
    <VCard width="300" v-show="datePickerOpen">
        <VCardText>
      <AppDateTimePicker
        v-model="date"
        :config="{ mode: 'range' }"
        placeholder="Select date"
      />
    </VCardText>
    </VCard>
  </VMenu>
</template>
