<script setup>
import * as fetchData from "@/views/dashboards/functions/fetchData";

const isDialogVisible = ref(false)

const props = defineProps({
    email: String
})

const email = computed(()=>{
    return props.email
})



const deleteUser = (email) => {
  console.log("Deleted Mail", email);
  fetchData.deleteUser(email);
  isDialogVisible.value = true
  store.commit("changeAdminUserDeleteLoader", 0);
};

</script>

<template>
    <VDialog
    v-model="isDialogVisible"
    persistent
    class="v-dialog-sm"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
        <VIcon
        :icon="'tabler-backspace'"
        size="34"
        :color="'error'"
        class="me-1"
        @click="isDialogVisible = true"
        v-bind="props"
        />
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Kişi Silme">
        <VIcon
        :icon="'tabler-mood-x'"
        size="62"
        :color="'error'"
        class="mx-auto"
        @click="isDialogVisible = true"
        v-bind="props"
        />
      <VCardText>
        İlgili kişiyi veritabanından kalıcı olarak silmek istediğinizden emin misiniz ?
      </VCardText>

      <VCardText class="d-flex justify-end gap-3 flex-wrap">
        <VBtn
          color="secondary"
          variant="tonal"
          @click="isDialogVisible = false"
        >
          İptal
        </VBtn>
        <VBtn color="error" @click="deleteUser(email)">
          Sil
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>