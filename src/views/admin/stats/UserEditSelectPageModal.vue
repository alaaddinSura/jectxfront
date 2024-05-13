<script setup>
import { emailValidator, requiredValidator } from "@validators";
import * as fetchData from "@/views/dashboards/functions/fetchData";
import { store } from "@/store/index";
import { onMounted } from "vue";

const props = defineProps({
    pages: Array,
    role: String,
    email: String,
})

const propsPages = computed(()=>{
    return props.pages
})

const propsRoles = computed(()=>{
  return props.role;
})

const propsEmail = computed(()=>{
  return props.email;
})


console.log("props Page ==> ", propsPages.value[0].to.flatMap(item => item))

const isDialogVisible = ref(false);
const interestOptions = ['Misafir Dağılım', 'Doluluk Dağılım', 'Rezervasyon Gelir', 'Rezervasyon Analiz', 'Geçmiş Karşılaştırma'];
const formEntries = ref([{ adminPages: [], interest: [] }]);


const isSaveButtonActive = computed(() => {
  return true;
});

 const updateUserInterest = (role, entry) => {
  console.log("Propstan gelenler ==> ", propsPages.value[0].to.flatMap(item => item))
   console.log("Değişti Emmioğlu ==> ", entry.interest)
   entry.interest = entry.interest.filter(item => interestOptions.includes(item));
  //  entry.interest = propsPages.value[0].to.flatMap(item => item)
 };


 const updateUserPage = () =>{
  store.commit("clearUpdateUserPages")
  const formEntry = formEntries.value;
  const pushStore = {
    email: props.email,
    newRole : propsRoles.value,
    newPages: [{
      from: "Dashboards",
      to: formEntry[0].interest.flatMap(item => item)
    }]
  }
  //fetchData.updateUserTwo(pushStore)
  store.commit("changeUpdateUserPages", pushStore)
  formEntries.value = [{ adminPages: [], interest: [], role: '' }];
  isDialogVisible.value = false
}



const resetDialog = () => {
  formEntries.value = [{ adminPages: [], interest: [], role: '' }];
  store.commit("clearUpdateUserPages")
  isDialogVisible.value = false;
};

const watchEntryRole = (entry) => {
  watch(() => entry.interest, (newValue, oldValue) => {
    updateUserInterest(newValue, entry);
  });
};

for (const entry of formEntries.value) {
  watchEntryRole(entry); // Sayfa yüklendiğinde tüm girişler için izleme fonksiyonunu başlat
}

onMounted(()=>{
  console.log("Girdi Beee")
  formEntries.value.interest = propsPages.value[0].to.flatMap(item => item)
})

</script>

<template>
    <VDialog
    v-model="isDialogVisible"
    max-width="600"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn 
      class="me-1"
      v-bind="props"
      >Sayfaları Göster</VBtn >
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Kişiyi Güncelle">
      <VCardText>
        <VRow v-for="(entry, index) in formEntries" :key="index" class="mb-10">
            <VCol cols="12">
                <p>Sayfa Düzenleme</p>
            </VCol>
            <VCol
            cols="12">
            <p>Dashboards</p>
            <VAutocomplete
                v-model="entry.interest"
                multiple
  
                :items="['Misafir Dağılım', 'Doluluk Dağılım', 'Rezervasyon Gelir', 'Rezervasyon Analiz', 'Geçmiş Karşılaştırma']"
                label="Dashboard Sayfaları"
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
        <VBtn @click.prevent="updateUserPage()" :disabled="!isSaveButtonActive">
          Sayfaları Düzenle
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>