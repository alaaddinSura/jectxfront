<script setup>
import { emailValidator, requiredValidator } from "@validators";
import * as fetchData from "@/views/dashboards/functions/fetchData";

const props = defineProps({
    role: String
})

const selectedData = ref(null);

const propsRoles = computed(()=>{
    return props.role
})


const isDialogVisible = ref(false);
const interestOptions = ['Misafir Dağılım', 'Doluluk Dağılım', 'Rezervasyon Gelir', 'Rezervasyon Analiz', 'Geçmiş Karşılaştırma'];
const formEntries = ref([{ adminPages: [], interest: [], role: propsRoles }]);


const isSaveButtonActive = computed(() => {
//   for (const entry of formEntries.value) {
//     if (emailValidator(entry.email) !== true || entry.interest.length === 0 || entry.role.length === 0 || entry.email.length === 0) {
//       return false;
//     }
//   }
  return true;
});

const updateUserInterest = (role, entry) => {
  if (role === 'admin') {
    entry.interest = [...interestOptions];
  } else {
    entry.interest = [];
  }
};


const resetDialog = () => {
  formEntries.value = [{ adminPages: [], interest: [], role: '' }];
  isDialogVisible.value = false;
};

const watchEntryRole = (entry) => {
  watch(() => entry.role, (newValue, oldValue) => {
    updateUserInterest(newValue, entry);
  });
};

for (const entry of formEntries.value) {
  watchEntryRole(entry); // Sayfa yüklendiğinde tüm girişler için izleme fonksiyonunu başlat
}

</script>

<template>
    <VDialog
    v-model="isDialogVisible"
    max-width="600"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
        <VAutocomplete
        label="Sayfalar"
        v-bind="props"
      />
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Yeni Kişi Ekle">
      <VCardText>
        <VRow v-for="(entry, index) in formEntries" :key="index" class="mb-10">
            <VCol cols="12">
                <p>Sayfa Ekleme</p>
            </VCol>
            <VCol
            cols="12">
            <p>Dashboards</p>
            <VAutocomplete
                v-model="entry.interest"
                multiple
                :items="['Misafir Dağılım', 'Doluluk Dağılım', 'Rezervasyon Gelir', 'Rezervasyon Analiz', 'Geçmiş Karşılaştırma']"
                label="Dashboard Sayfaları"
                :selected-items="entry.role === 'admin' ? ['Misafir Dağılım', 'Doluluk Dağılım', 'Rezervasyon Gelir', 'Rezervasyon Analiz', 'Geçmiş Karşılaştırma'] : []"
              />
            </VCol>
            <VCol
            cols="12">
            <p class="-mb-6">Admin</p>
            <VAutocomplete
                v-model="entry.adminPages"
                multiple
                :items="['Kişiler', 'Hedefler']"
                label="Admin Sayfaları"
              />
            </VCol>
          </VRow>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
            <VSpacer />
        <VBtn
          variant="tonal"
          color="secondary"
          @click="resetDialog"
        >
          Kapat
        </VBtn>
        <VBtn @click.prevent="$emit('pagesPost', formEntries), isDialogVisible=false" :disabled="!isSaveButtonActive">
          Sayfaları Ekle
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>