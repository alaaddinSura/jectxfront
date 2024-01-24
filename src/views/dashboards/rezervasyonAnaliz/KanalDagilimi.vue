<script setup>
import Bar from "../stats/Bar.vue"

const statistics =[
  {
    title: 'Online',
    stats: 0,
    icon: 'tabler-world-dollar',
    color: 'primary',
  },
  {
    title: 'WH',
    stats: 0,
    icon: 'tabler-world-www',
    color: 'info',
  },
  {
    title: 'AGT',
    stats: 0,
    icon: 'tabler-windsock',
    color: 'error',
  },
  {
    title: 'IND',
    stats: 0,
    icon: 'tabler-users',
    color: 'success',
  },
]
</script>

<template>
  <Bar
    :data="statistics"
    title="Kanallara Göre Rezerv Dağılımı"
    subtitle
  />
</template>