<script setup>
import CizgiliKarsilastirma from '../stats/CizgiliKarsilastirma.vue'
import { computed } from 'vue'

const graphData = {
  data: {
    veri1: [280,
      200,
      220,
      180,
      270,
      250,
      70,
      90,
      200,
      150,
      160,
      100,
      150,
      100,
      50,
      100,
      234],
    veri2: [10,
      20,
      30,
      40,
      50,
      60,
      70,
      80,
      90,
      100,
      110,
      120,
      130,
      140,
      150,
      160,
      170],
    veri3: [300,
      200,
      150,
      250,
      50,
      20,
      70,
      10,
      120,
      80,
      150,
      140,
      250,
      35,
      180,
      120,
      170],
    veri4: [180,
      100,
      120,
      80,
      170,
      150,
      20,
      50,
      100,
      50,
      60,
      50,
      90,
      100,
      150,
      50,
      200],
  },
  cats: [
    '2/12',
    '8/12',
    '9/12',
    '10/12',
    '11/12',
    '12/12',
    '13/12',
    '14/12',
    '15/12',
    '16/12',
    '17/12',
    '18/12',
    '19/12',
    '20/12',
    '21/12',
    '22/12',
    '23/12',
  ],
}

const datas = computed(()=>{
  
  return{
    data: graphData.data,
    cats: graphData.cats,
  }
})
</script>

<template>
  <!-- 👉 Balance Line Chart  -->
  <VCol cols="12">
    <VCard>
      <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
        <VCardTitle>Normal Rezervasyon Karşılaştırması</VCardTitle>

        <template #append>
          <div class="d-flex align-center">
            <VChip
              label
              color="success"
              class="font-weight-bold"
            >
              <VIcon
                start
                icon="tabler-arrow-up"
                size="15"
              />
              <span>22%</span>
            </VChip>
          </div>
        </template>
      </VCardItem>

      <VCardText>
        <CizgiliKarsilastirma :data="datas" />
      </VCardText>
    </VCard>
  </VCol>
</template>
