<script setup>

const props = defineProps({
    headers: Array,
    items: Array
})

</script>

<template>
    <VTable fixed-header height="600px">
        <thead>
            <tr>
                <th v-for="item in headers.map(j => j.title)" :key="item" class="text-left">
                 {{ item }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.name">
                <td v-for="name in Object.values(item)" :key="name">
                    {{ name }}
                </td>
            </tr>
        </tbody>
    </VTable>
</template>
