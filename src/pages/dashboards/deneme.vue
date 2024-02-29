<script setup>
import VDataTable from '@/views/dashboards/stats/VDataTable.vue';

let headers = ['Name', 'Calories', 'Cats']

let items = [
    {
        name: 'Frozen Yogurt',
        calories: 159,
        cats: 'diet',
    },
    {
        name: 'Ice cream sandwich',
        calories: 237,
        cats: 'dies'
    },
    {
        name: 'Eclair',
        calories: 262,
        cats: 'asd'
    },
    {
        name: 'Frozen Yogurt',
        calories: 159,
        cats: 'diet',
    },
    {
        name: 'Ice cream sandwich',
        calories: 237,
        cats: 'dies'
    },
    {
        name: 'Eclair',
        calories: 262,
        cats: 'asd'
    },
    {
        name: 'Frozen Yogurt',
        calories: 159,
        cats: 'diet',
    },
    {
        name: 'Ice cream sandwich',
        calories: 237,
        cats: 'dies'
    },
    {
        name: 'Eclair',
        calories: 262,
        cats: 'asd'
    },
]

</script>

<template>
    <VIcon :icon="'flag-ad-1x1'"/>
    <VIcon :icon="'flag-us-4x3'"/>
</template>