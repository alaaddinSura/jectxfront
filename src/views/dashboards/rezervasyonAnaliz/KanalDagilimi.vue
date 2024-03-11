<script setup>
import { store } from "@/store/index";
import * as dates from "@/views/dashboards/functions/dates";
import Bar from "../stats/Bar.vue";

let color = 'success'
let icon =  'tabler-arrow-down'

const statistics = computed(() => {
  let chosenHotels = store.state.selectedHotels;
  let canalRez = store.state.kanalRezDagilim == 0 ? JSON.parse(localStorage.getItem("kanalRezDagilim")) : store.state.kanalRezDagilim;
  let statData = canalRez.filter((item) => chosenHotels.includes(item.hotelId));
  let anaKanallar = ["ONL", "WH", "AGT", "IND"];
  let kanalData = anaKanallar.map((kanal) =>
    statData.filter((item) => item.anaKanal == kanal)
  );
  kanalData = kanalData.map((item) =>
    item.map((kanal) => (kanal.count != "nan" ? Number(kanal.count) : 0))
  );
  let scores = kanalData.map((item) => item.reduce((f, s) => f + s, 0));
  let totalScores = scores.reduce((f,s)=>f+s,0)
  console.log("scores 0 ==> ", scores[0])
  return [
    {
      title: "Online",
      stats: scores[0] != 'NaN' ?  (scores[0] / totalScores * 100).toFixed(0) + ' %' : "0",
      icon: "tabler-world-dollar",
      color: "primary",
      count: scores[0] != 'NaN' ? scores[0] : '0'
    },
    {
      title: "WH",
      stats: scores[1] != 'NaN' ? (scores[1] / totalScores * 100).toFixed(0) + ' %' : "0",
      icon: "tabler-world-www",
      color: "info",
      count: scores[1] != 'NaN' ? scores[1] : '0'
    },
    {
      title: "AGT",
      stats: scores[2] != 'NaN' ? (scores[2] / totalScores * 100).toFixed(0) + ' %' : "0",
      icon: "tabler-windsock",
      color: "error",
      count: scores[2] != 'NaN' ? scores[2] : '0'
    },
    {
      title: "IND",
      stats: scores[3] != 'NaN' ? (scores[3] / totalScores * 100).toFixed(0) + ' %' : "0",
      icon: "tabler-users",
      color: "success",
      count: scores[3] != 'NaN' ? scores[3] : '0'
    },
  ];
});
let totalCount = statistics.value.map(item => item.count).reduce((f,s)=>f+s,0)

</script>

<template>

  <Bar :data="statistics" title="Kanallara Göre Rezerv Dağılımı" subtitle :loader="store.state.kanalRezDagilimLoader"/>
</template>
