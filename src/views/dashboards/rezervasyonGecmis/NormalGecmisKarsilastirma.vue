<script setup>
import { store } from '@/store/index'
import GecmisKarsilastirma from '@/views/dashboards/stats/GecmisKarsilastirma.vue'
import { _ } from 'lodash'
import Loader from '../functions/loader.vue'
import * as dates from '@/views/dashboards/functions/dates'

const graphData = computed(() => {
    
    
    let chosenHotels = store.state.selectedHotels

    let desiredData = JSON.parse(localStorage.getItem('rezervasyonGecmisGunluk'))
    console.log("desiredData ==> ",desiredData)
    let dateSelect = desiredData.cats

    let currentData = desiredData.data.filter(item => item.name == 'current')[0].data
    currentData = currentData.filter(item => chosenHotels.includes(item.hotelId))
    console.log("current Data ==> ", currentData)
    let revperrez = currentData.map(item => item.REVPERREZ)
    console.log(console.log("REVPERREZ ==> ", revperrez))
    currentData.sort(dates.compareDates);

    let currentRevPerrez = Object.values(_.mapValues(_.groupBy(currentData, 'DATE'), items => _.sumBy(items, 'REVPERREZ')))

    currentData = Object.values(_.mapValues(_.groupBy(currentData, 'DATE'), items => _.sumBy(items, 'count')))
    let lastData = desiredData.data.filter(item => item.name == 'previous')[0].data
    console.log("last Data ==> ", lastData)
    lastData = lastData.filter(item => chosenHotels.includes(item.hotelId))
    lastData.sort(dates.compareDates);
    let lastRevPerrez = Object.values(_.mapValues(_.groupBy(lastData, 'DATE'), items => _.sumBy(items, 'REVPERREZ')))
    lastData = Object.values(_.mapValues(_.groupBy(lastData, 'DATE'), items => _.sumBy(items, 'count')))
    
    console.log("current Data Son Hali ==> ",currentData)


    let percentage = ((currentData.reduce((f, s) => f + s, 0) - lastData.reduce((f, s) => f + s, 0)) / lastData.reduce((f, s) => f + s, 0) * 100)
    let color = percentage > 0 ? 'success' : '#F53107'
    let icon = percentage > 0 ? 'tabler-arrow-up': 'tabler-arrow-down'

    return {
        yaxisData: [
            {
                name: "current",
                data: currentData,
            },
            {
                name: "previous",
                data: lastData,
            }
        ],
        cats: dateSelect,
        currentData,
        lastData,
        percentage,
        color,
        icon,
        currentRevPerrez,
        lastRevPerrez
    }
})
</script>

<template>
    <!-- 👉 Balance Line Chart  -->
    <VCol cols="12">
        <VCard>
            <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
                <VCardTitle>Rezervasyon Günlük Karşılaştırma</VCardTitle>

                <template #append>
                    <div class="d-flex align-center">
                        <h6 class="text-h6 me-3 " style="color:#ff9f43">
                            {{ graphData.currentData.reduce((f,s) => f+s, 0) }}
                        </h6>
                        <h6 class="text-h6 me-3" style="color:#3F51B5">
                            {{ graphData.lastData.reduce((f,s) => f+s, 0) }}
                        </h6>
                        <VChip label :color="graphData.color" class="font-weight-bold">
                            <VIcon start :icon="graphData.icon" size="15" />
                            <span>
                                {{ graphData.percentage.toFixed(1)}} %
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
