<script setup>
import AdminTable from "@/views/dashboards/stats/AdminTable.vue"
import AylikHedefler from "@/views/dashboards/admin/AylikHedefler.vue"
import Kisiler from "@/views/dashboards/admin/Kisiler.vue"

</script>

<template>

    <VRow>
        <!-- <VCol cols="12" lg="6">
                <AylikHedefler />
        </VCol>
        <VCol cols="12" lg="6">
            <AdminTable :headerTitle="'Günlük Hedefler'"/>
    </VCol> -->
    <VCol cols="12" lg="6">
        <!-- <AylikHedefler /> -->
    </VCol>
    <VCol cols="12" lg="6">
        <Kisiler />
    </VCol>
    
    </VRow>
</template>

<style scoped>

</style>