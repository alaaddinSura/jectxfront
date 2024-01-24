<script setup>
import Bar from "../stats/Bar.vue"

const statistics = [
  {
    title: 'Adet',
    stats: 50,
    icon: 'tabler-book',
    color: 'primary',
  },
  {
    title: 'Geceleme',
    stats: 156,
    icon: 'tabler-moon',
    color: 'primary',
  },
  {
    title: 'Oran',
    stats: 3.12,
    icon: 'tabler-divide',
    color: 'primary',
  },
  {
    title: 'Gelir',
    stats: 17000,
    icon: 'tabler-arrow-badge-up',
    color: 'primary',
  },
]
</script>

<template>
  <Bar
    :data="statistics"
    title="Rez Analiz"
  />
</template>