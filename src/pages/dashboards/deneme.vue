<script setup>
import ApexChartBalance from '@/views/charts/apex-chart/ApexChartBalance.vue';
import BalanceChart from '@/views/dashboards/deneme/BalanceChart.vue';
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
        <ApexChartBalance />
      </VCardText>
    </VCard>
  </VCol>

  <VCol cols="12">
    <BalanceChart />
  </VCol>
</template>
