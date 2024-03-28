<script setup>
import VDataTable from "@/views/dashboards/stats/VDataTable.vue";
import { ref, watch } from 'vue';
import * as fetchData from "@/views/dashboards/functions/fetchData";
import { store } from "@/store/index";

const menu = ref(false);
const date = ref(null);
const secondDate = ref(null);
const secondDateRange = ref([])

watch(secondDateRange, (newDateRange, oldDateRange) => {
  if (newDateRange.length > 2) {
    // Kullanıcı iki tarihten fazla tarih seçmişse, ek tarihleri iptal et
    secondDateRange.value = oldDateRange;
  }
  console.log("date ==> ", secondDateRange.value);
});



const datePickerOpen = ref(false);

const toggleDatePicker = () => {
  datePickerOpen.value = !datePickerOpen.value;
  if (datePickerOpen.value && !dateRange.value.includes('to')) {
    dateRange.value = today; // Varsayılan olarak bugünün tarihini alabilirsiniz.
  }
};

let isPersistent = ref(true);

</script>

<template>
    <VRow>
      <VCol cols="2">
        <VCard>
          <VCardText>
        <AppDateTimePicker
          v-model="date"
          placeholder="Başlangıç Tarihi"
        />
      </VCardText>
      </VCard>
      </VCol>
      <VCol cols="2">
        <VCard>
          <VCardText>
        <AppDateTimePicker
          v-model="secondDate"
          placeholder="Bitiş Tarihi"
        />
      </VCardText>
      </VCard>
      </VCol>
      <VCol>

        <div>
          <IconBtn @click="toggleDatePicker">
            <!-- <VIcon icon="tabler-calendar-down" /> -->
          </IconBtn>
          <VMenu
            :close-on-content-click="false"
            offset-y
            :persistent="isPersistent"
            v-model="datePickerOpen"
          >
            <template #activator="{ props }">
              <IconBtn v-bind="props">
                <VIcon icon="tabler-calendar-down" />
              </IconBtn>
            </template>
            <VCard width="380" v-show="datePickerOpen">
              <VCardText>
                <VBtn class="p-2 my-2 w-100">
                  Raporla
                </VBtn>
                <VRow>
                  <VCol>
                    <AppDateTimePicker
                    v-model="dateRange"
                    label="Başlangıç Tarihi"
                    placeholder="Başlangıç Tarihi"
                  />
                  </VCol>
                  <VCol>
                    <AppDateTimePicker
                    v-model="dateRange"
                    label="Bitiş Tarihi"
                    placeholder="Bitiş Tarihi"
                  />
                  </VCol>
                </VRow> 
              </VCardText>
            </VCard>
          </VMenu>
        </div>
      </VCol>
      <VCol>
        <div>
          <IconBtn @click="toggleDatePicker">
            <!-- <VIcon icon="tabler-calendar-down" /> -->
          </IconBtn>
          <VMenu
            :close-on-content-click="false"
            offset-y
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
                <VBtn class="p-2 my-2 w-100">
                  Raporla
                </VBtn>
                    <AppDateTimePicker
                    v-model="secondDateRange"
                    label="Tarih Seçiniz"
                    placeholder="Tarih Seçiniz"
                    :config="{ mode: 'multiple', minDate: minSelectableDate, maxDate: maxSelectableDate }"
                  />
              </VCardText>
            </VCard>
          </VMenu>
        </div>
      </VCol>
    </VRow>
</template>
