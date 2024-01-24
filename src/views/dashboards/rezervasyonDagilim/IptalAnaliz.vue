<script setup>
import Bar from "../stats/Bar.vue"

const statistics = [
  {
    title: 'Adet',
    stats: 1,
    icon: 'tabler-circle-letter-x',
    color: 'error',
  },
  {
    title: 'Geceleme',
    stats: 1,
    icon: 'tabler-moon',
    color: 'error',
  },
  {
    title: 'Oran',
    stats: `1.00`,
    icon: 'tabler-divide',
    color: 'error',
  },
  {
    title: 'Kayıp',
    stats: `120.0`,
    icon: 'tabler-arrow-badge-down',
    color: 'error',
  },
]
</script>

<template>
  <Bar
    :data="statistics"
    title="İptal Analiz"
  />
</template>