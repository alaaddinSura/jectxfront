<script setup>
import Bar from "../stats/Bar.vue"

let statistic = [
  {
    title: 'Tek Kişi',
    stats: 32,
    icon: 'tabler-user',
    color: 'primary',
  },
  {
    title: 'Çift Kişi',
    stats: 55,
    icon: 'tabler-users',
    color: 'primary',
  },
  {
    title: 'Aile',
    stats: 65,
    icon: 'tabler-baby-carriage',
    color: 'primary',
  },
  {
    title: 'Grup',
    stats: 92,
    icon: 'tabler-users-group',
    color: 'primary',
  },
]
</script>

<template>
  <Bar
    :data="statistic"
    title="Yatak Dağılım"
    subtitle
  />
</template>
