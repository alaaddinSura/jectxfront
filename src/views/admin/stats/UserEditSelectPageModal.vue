<script setup>
import { emailValidator, requiredValidator,userValidator } from "@validators";
import * as fetchData from "@/views/dashboards/functions/fetchData";
import { store } from "@/store/index";

const props = defineProps({
    role: String,
    email: String,
    pages: Array
})

const propsRoles = computed(()=>{
    return props.role;
})

const propsEmail = computed(()=>{
  return props.email;
})

const propsPages = computed(()=>{
  return props.pages;
})

const fetchPropsPage = propsPages.value[0].to.flatMap(item => item)

const isDialogVisible = ref(false);
const interestOptions = ['Misafir Dağılım', 'Doluluk Dağılım', 'Rezervasyon Gelir', 'Rezervasyon Analiz', 'Geçmiş Karşılaştırma'];
const adminPagesOptions = ["Kişiler", "Hedefler"];
const formEntries = ref([{ adminPages: [], interest: fetchPropsPage, role: propsRoles }]);




const isSaveButtonActive = computed(() => {
  return true;
});

const addUserPage = () =>{
  
  const formEntry = formEntries.value;
  store.commit("clearUpdateUserPages")
  const pushStore = {
    "email": props.email,
    "newRole" : propsRoles.value,
    "newPages": [{
      "from": "Dashboards",
      "to": formEntry[0].interest.flatMap(item => item)
    }]
  }
  store.commit("changeUpdateUserPages", pushStore)
  isDialogVisible.value = false
}


const resetDialog = () => {
  formEntries.value = [{ adminPages: [], interest: [], role: '' }];
  store.commit("clearAddUserPages")
  isDialogVisible.value = false;
};


</script>

<template>
    <VDialog
    v-model="isDialogVisible"
    max-width="600"
  >
    <!-- Dialog Activator   @click="isDialogVisible = true" -->
    <template #activator="{ props }">
      <VBtn 
      class="me-1"
      v-bind="props"
      ><VIcon icon="tabler-plus" class="mr-2"/> Sayfaları Seç</VBtn >
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Kişiyi Güncelle">
      <VCardText>
        <VRow v-for="(entry, index) in formEntries" :key="index" class="mb-10">
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
            <!-- <VCol
            cols="12">
            <p class="-mb-6">Admin</p>
            <VAutocomplete
                v-model="entry.adminPages"
                multiple
                :items="['Kişiler', 'Hedefler']"
                label="Admin Sayfaları"
                :disabled="props.role === 'user'"
              />
            </VCol> -->
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
        <VBtn @click.prevent="addUserPage()" :disabled="!isSaveButtonActive">
          Sayfaları Ekle
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>