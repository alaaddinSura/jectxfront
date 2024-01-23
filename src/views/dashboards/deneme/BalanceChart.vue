<script setup>
import ApexChartBalance from '@/views/charts/apex-chart/ApexChartBalance.vue'
import SubBalance from '@/views/stats/SubBalance.vue'

const graphData = {
  data: [
    280,
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
    234,
  ],
  cats: [
    '7/12',
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
</script>

<template>
  <!-- 👉 Balance Line Chart  -->
  <VCol cols="12">
    <VCard>
      <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
        <VCardTitle>Balance</VCardTitle>
        <VCardSubtitle>Commersdsdcial networks &amp; enterprises</VCardSubtitle>

        <template #append>
          <div class="d-flex align-center">
            <h6 class="text-h6 me-3">
              $221,267
            </h6>
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
        <SubBalance :data="graphData" />
      </VCardText>
    </VCard>
  </VCol>
</template>
