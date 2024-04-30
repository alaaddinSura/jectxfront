<script setup>
import * as adminFetchData from "@/views/admin/functions/adminFetchData";

const isDialogVisible = ref(false)

const props = defineProps({
    delete: String
})

const deleted = computed(()=>{
    return props.delete
})



const deleteGoals = (deleted) => {
  adminFetchData.deleteGoals(deleted)
  isDialogVisible.value = true
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
    <VCard title="Hedef Silme">
        <VIcon
        :icon="'tabler-target-arrow'"
        size="62"
        :color="'error'"
        class="mx-auto"
        @click="isDialogVisible = true"
        v-bind="props"
        />
      <VCardText>
        İlgili hedefi veritabanından kalıcı olarak silmek istediğinizden emin misiniz ?
      </VCardText>

      <VCardText class="d-flex justify-end gap-3 flex-wrap">
        <VBtn
          color="secondary"
          variant="tonal"
          @click="isDialogVisible = false"
        >
          İptal
        </VBtn>
        <VBtn color="error" @click="deleteGoals(deleted)">
          Sil
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>