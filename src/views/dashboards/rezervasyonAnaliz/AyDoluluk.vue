<script setup>
import { store } from "@/store/index.js";
import { ref } from "vue";
import DolulukOrani from "../stats/DolulukOrani.vue";

let name = ref("Gece Son Ay");
let color = ref("#C2185B");
let nightcount = computed(() => {
  let chosenHotels = store.state.selectedHotels;

  let roomCounts = [
    {
      hotelId: 22966,
      count: 60 * 30,
    },
    {
      hotelId: 22964,
      count: 220 * 30,
    },
  ];

  let rezData =
    store.state.ayDoluluk == 0
      ? JSON.parse(localStorage.getItem("nightAmount"))
      : store.state.ayDoluluk;

  let statData = rezData.filter((item) => chosenHotels.includes(item.hotelId));
  roomCounts = roomCounts.filter((item => chosenHotels.includes(item.hotelId)))
  roomCounts = roomCounts.map(item => item.count).reduce((f,s) => f+s, 0)

  let geceCount = statData
    .map((item) => (item.count != "nan" ? Number(item.count) : 0))
    .reduce((f, s) => f + s, 0);

  let oran = [(geceCount / roomCounts * 100).toFixed(2)];

  return {
    geceCount,
    oran,
  };
});
</script>

<template>
  <DolulukOrani
    :name="name"
    :color="color"
    :nightcount="nightcount.geceCount"
    :oran="nightcount.oran"
  />
</template>
