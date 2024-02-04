<script setup>
import NormalGecmisKarsilastirma from '@/views/dashboards/rezervasyonGecmis/NormalGecmisKarsilastirma.vue'
import YillikGecmisKarsilastirma from '@/views/dashboards/rezervasyonGecmis/YillikGecmisKarsilastirma.vue';
</script>

<template>
    <VRow>
        <VCol cols="12">
            <NormalGecmisKarsilastirma/>
        </VCol>
        <VCol cols="12">
            <YillikGecmisKarsilastirma/>
        </VCol>
    </VRow>
</template>