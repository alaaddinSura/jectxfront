<script setup>

</script>

<template>
    <div class="loader" style="width: 45%;"></div>
    <div class="loader" style="width: 65%;"></div>
    <div class="loader" style="width: 95%;"></div>
</template>

<style>
  /* HTML: <div class="loader"></div> */
.loader {
    height: 20px;
    background: 
      linear-gradient(90deg,#0001 33%,#0005 50%,#0001 66%)
      #f2f2f2;
    background-size:300% 100%;
    margin-bottom: 10px;
    animation: l1 2s infinite linear;
  }
  @keyframes l1 {
    0% {background-position: right}
  }
</style>