<script setup>
import NormalGecmisKarsilastirma from '@/views/dashboards/rezervasyonGecmis/NormalGecmisKarsilastirma.vue';
import HaftalikGecmisKarsilastirma from '@/views/dashboards/rezervasyonGecmis/HaftalikGecmisKarsilastirma.vue';
import YillikGecmisKarsilastirma from '@/views/dashboards/rezervasyonGecmis/YillikGecmisKarsilastirma.vue';
</script>

<template>
    <VRow>
        <VCol cols="12">
            <NormalGecmisKarsilastirma/>
        </VCol>
        <!-- <VCol cols="12">
            <HaftalikGecmisKarsilastirma />
        </VCol> -->
        <VCol cols="12">
            <YillikGecmisKarsilastirma/>
        </VCol>
    </VRow>
</template>