<script setup>
import * as adminFetchData from "@/views/admin/functions/adminFetchData";

const isDialogVisible = ref(false)

const props = defineProps({
    target: String,
    date: Array,
    hotels: String,
    id: String,
})

const targetProps = computed(()=>{
    return props.target
})

const dateProps = computed(()=>{
  return props.date
})

const hotelsProps = computed(()=>{
  return props.hotels
})

const formEntries = ref([{ target: targetProps, date: dateProps, hotels: hotelsProps }]);

const updateUser = () =>{
      for (const entry of formEntries.value) {
          adminFetchData.updateGoals(props.id,parseInt(entry.target), entry.date, props.hotels === "Ayasofya" ? 22966 : 22964)
      }
  isDialogVisible.value = false
}

</script>

<template>
    <VDialog
    v-model="isDialogVisible"
    persistent
    class="v-dialog-sm"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
        <VBtn
          v-bind="props"
        >
          Güncelle
        </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Aylık Hedef Güncelleme">
        <VIcon
        :icon="'tabler-target-off'"
        size="62"
        class="mx-auto"
        @click="isDialogVisible = true"
        v-bind="props"
        />
      <VCardText>
        İlgili Aylık Hedefi veritabanından kalıcı olarak güncellemek istediğinizden emin misiniz ?
      </VCardText>

      <VCardText class="d-flex justify-end gap-3 flex-wrap">
        <VBtn
          color="secondary"
          variant="tonal"
          @click="isDialogVisible = false"
        >
          İptal
        </VBtn>
        <VBtn @click="updateUser()">
          Güncelle
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>