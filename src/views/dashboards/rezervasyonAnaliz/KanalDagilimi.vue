<script setup>
import { store } from "@/store/index";
import * as dates from "@/views/dashboards/functions/dates";
import Bar from "../stats/Bar.vue";

const statistics = computed(() => {
  let chosenHotels = store.state.selectedHotels;

  let canalRez = store.state.kanalRezDagilim.length == 0 ? JSON.parse(localStorage.getItem("kanalRezDagilim")) : store.state.kanalRezDagilim;

  let statData = canalRez.filter((item) => chosenHotels.includes(item.hotelId));

  let anaKanallar = ["ONL", "WH", "AGT", "IND"];

  let kanalData = anaKanallar.map((kanal) =>
    statData.filter((item) => item.anaKanal == kanal)
  );

  kanalData = kanalData.map((item) =>
    item.map((kanal) => (kanal.count != "nan" ? Number(kanal.count) : 0))
  );
  let scores = kanalData.map((item) => item.reduce((f, s) => f + s, 0));
  return [
    {
      title: "Online",
      stats: scores[0],
      icon: "tabler-world-dollar",
      color: "primary",
    },
    {
      title: "WH",
      stats: scores[1],
      icon: "tabler-world-www",
      color: "info",
    },
    {
      title: "AGT",
      stats: scores[2],
      icon: "tabler-windsock",
      color: "error",
    },
    {
      title: "IND",
      stats: scores[3],
      icon: "tabler-users",
      color: "success",
    },
  ];
});
</script>

<template>
  <Bar :data="statistics" title="Kanallara Göre Rezerv Dağılımı" subtitle />
</template>
