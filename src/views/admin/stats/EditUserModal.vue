<script setup>
import * as fetchData from "@/views/dashboards/functions/fetchData";
import EditUserConfirmation from "./EditUserConfirmation.vue"
import { store } from "@/store/index";

const isDialogVisible = ref(false)
const email = ref('asd')
const pages = ref([])
const role = ref('')

const props = defineProps({
    email: String
})

const formEntries = ref([{ email: props.email, pages: [], role: '' }]);

const updateUser = () =>{
    for (const entry of formEntries.value) {
        fetchData.updateUser(entry.email,entry.role, Object.values(entry.pages))
    }
  isDialogVisible.value = false
}

const isSaveButtonActive = computed(() => {
  for (const entry of formEntries.value) {
    if (entry.pages.length === 0 || entry.role.length === 0) {
      return false;
    }
  }
  return true;
});

const exitModal = () =>{
  formEntries.value = ([{ email: props.email, pages: [], role: '' }]);
  isDialogVisible.value = false
}
</script>

<template>
    <VDialog
    v-model="isDialogVisible"
    max-width="600"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
       <VIcon
            :icon="'tabler-edit'"
            size="26"
            class="me-1"
            @click="isDialogVisible = true"
            v-bind="props"
            />
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Kişiyi Güncelle">
      <VCardText>
        <VRow class="mb-3" v-for="(entry, index) in formEntries" :key="index">
            <VCol cols="12">
              <VTextField
              v-model="entry.email"
                :value="props.email"
                label="Email"
                readonly
              />
            </VCol>
            <VCol
              cols="12"
              sm="12"
            >
              <VAutocomplete
                v-model="entry.pages"
                multiple
                :items="['Misafir Dağılım', 'Doluluk Dağılım', 'Rezervasyon Gelir', 'Rezervasyon Analiz', 'Geçmiş Analiz','Admin']"
                label="Sayfalar"
              />
            </VCol>
            <VCol
              cols="12"
              sm="12"
            >
              <VAutocomplete
                v-model="entry.role"
                :items="['admin','user']"
                label="Rolü"
              />
            </VCol> 
          </VRow>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn
          variant="tonal"
          color="secondary"
          @click="exitModal()"
        >
          Kapat
        </VBtn>
        <VBtn :disabled="!isSaveButtonActive" width="120px">
          <template v-for="(entry, index) in formEntries" :key="index">
            <EditUserConfirmation :email="entry.email" :pages="entry.pages" :role="entry.role" />
          </template>
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>