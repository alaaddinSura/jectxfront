<script setup>
import { store } from '@/store/index'
import GecmisKarsilastirma from '@/views/dashboards/stats/GecmisKarsilastirma.vue'
import { _ } from 'lodash'


const graphData = computed(() => {

    let chosenHotels = store.state.selectedHotels

    let desiredData = JSON.parse(localStorage.getItem('rezervasyonGecmisAylik'))

    let dates = desiredData.cats

    let currentData = desiredData.data.filter(item => item.name == 'current')[0].data
    currentData = currentData.filter(item => chosenHotels.includes(item.hotelId))
    currentData = Object.values(_.mapValues(_.groupBy(currentData, 'DATE'), items => _.sumBy(items, 'count')))

    let lastData = desiredData.data.filter(item => item.name == 'previous')[0].data
    lastData = lastData.filter(item => chosenHotels.includes(item.hotelId))
    lastData = Object.values(_.mapValues(_.groupBy(lastData, 'DATE'), items => _.sumBy(items, 'count')))

    let percentage = ((currentData.reduce((f, s) => f + s, 0) - lastData.reduce((f, s) => f + s, 0)) / lastData.reduce((f, s) => f + s, 0) * 100)
    let color = percentage > 0 ? 'success' : '#F53107'
    let icon = percentage > 0 ? 'tabler-arrow-up' : 'tabler-arrow-down'

    return {
        yaxisData: [
            {
                name: "current",
                data: currentData
            },
            {
                name: "previous",
                data: lastData
            }
        ],
        cats: dates,
        currentData,
        lastData,
        percentage,
        color,
        icon
    }
})
</script>


<template>
    <!-- 👉 Balance Line Chart  -->
    <VCol cols="12">
        <VCard>
            <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
                <VCardTitle>Rezervasyon Aylık Karşılaştırma</VCardTitle>

                <template #append>
                    <div class="d-flex align-center">
                        <h6 class="text-h6 me-3 " style="color:#ff9f43">
                            {{ graphData.currentData.reduce((f, s) => f + s, 0) }}
                        </h6>
                        <h6 class="text-h6 me-3" style="color:#3F51B5">
                            {{ graphData.lastData.reduce((f, s) => f + s, 0) }}
                        </h6>
                        <VChip label :color="graphData.color" class="font-weight-bold">
                            <VIcon start :icon="graphData.icon" size="15" />
                            <span>
                                {{ graphData.percentage.toFixed(1) }} %
                            </span>
                        </VChip>
                    </div>
                </template>
            </VCardItem>

            <VCardText>
                <GecmisKarsilastirma :data="graphData" />
            </VCardText>
        </VCard>
    </VCol>
</template>
