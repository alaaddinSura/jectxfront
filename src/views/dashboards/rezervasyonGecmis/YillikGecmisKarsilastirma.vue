<script setup>
import { store } from '@/store/index'
import GecmisKarsilastirma from '@/views/dashboards/stats/GecmisKarsilastirma.vue'
import { _ } from 'lodash'
import Loader from '../functions/loader.vue'
import * as dates from '@/views/dashboards/functions/dates'


const graphData = computed(() => {

    let chosenHotels = store.state.selectedHotels

    let desiredData = JSON.parse(localStorage.getItem('rezervasyonGecmisAylik'))

    let dateLabels = desiredData.cats

    let currentData = desiredData.data.filter(item => item.name == 'current')[0].data
    currentData = currentData.filter(item => chosenHotels.includes(item.hotelId))
    currentData = dateLabels.map(item => currentData.filter(j => j.DATE == item).map(j => Number(j.count)).reduce((f,s) => f+s, 0))
   

    const pastYearRange = dateLabels.map(item => dates.subtractYearFromDate(item))

    let lastData = desiredData.data.filter(item => item.name == 'previous')[0].data
    lastData = lastData.filter(item => chosenHotels.includes(item.hotelId))
    lastData = pastYearRange.map(item => lastData.filter(j => j.DATE == item).map(j => Number(j.count)).reduce((f,s) => f+s, 0))

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
        cats: dateLabels,
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

            <VCardText v-if="store.state.selectedHotels != 'No Hotel'">
                <GecmisKarsilastirma :data="graphData" />
            </VCardText>
            <VCardText v-if="store.state.selectedHotels == 'No Hotel'">
                <Loader style="margin: auto auto; width:100px; height: 100px; padding: 15px"/>
            </VCardText>
        </VCard>
    </VCol>
</template>
