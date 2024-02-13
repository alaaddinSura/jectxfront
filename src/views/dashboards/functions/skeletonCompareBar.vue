<script setup></script>

<template>
  <!-- <div class="profile-info">
         <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />  -->
  <!-- <h3 />-->
  <!-- <p style="width: 45%;"/>
        <p style="width: 65%;"/> 
        <p style="width: 95%;"/>  
    </div> -->
  <div class="loaderCompare">
    <div class="loaderContainer" style="width: 5%">
      <div class="loaders" style="width: 100%"></div>
      <div class="loaderss" style="width: 100%"></div>
    </div>
    <div class="loaderContainer" style="width: 5%">
      <div class="loaders" style="width: 100%"></div>
      <div class="loaderss" style="width: 100%"></div>
    </div>
    <div class="loaderContainer" style="width: 5%">
      <div class="loaders" style="width: 100%"></div>
      <div class="loaderss" style="width: 100%"></div>
    </div>
    <div class="loaderContainer" style="width: 5%">
      <div class="loaders" style="width: 100%"></div>
      <div class="loaderss" style="width: 100%"></div>
    </div>
    <div class="loaderContainer" style="width: 5%">
      <div class="loaders" style="width: 100%;"></div>
      <div class="loaderss" style="width: 100%"></div>
    </div>
    <div class="loaderContainer" style="width: 5%">
      <div class="loaders" style="width: 100%"></div>
      <div class="loaderss" style="width: 100%"></div>
    </div>
    <div class="loaderContainer" style="width: 5%">
      <div class="loaders" style="width: 100%"></div>
      <div class="loaderss" style="width: 100%"></div>
    </div>
  </div>
</template>

<style>
.loaderCompare {
  display: flex;
  justify-content: space-evenly;
}
.loaderContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile-info span {
  min-width: 100px;
  height: 16px;
  display: inline-block;
  background-color: #ddd;
  margin-left: 16px;
  margin-top: 10px;
}

.profile-info h3 {
  content: " ";
  width: 250px;
  height: 24px;
  background-color: #ddd;
  margin: 10px 0;
}

.profile-info p {
  width: 80%;
  background-color: #e5e5e5;
  height: 16px;
  line-height: 140%;
}

/* HTML: <div class="loader"></div> */
.loaders {
  height: 200px;
  border-radius: 5px;
  background: linear-gradient(90deg, #0001 33%, #0005 50%, #0001 66%) #f2f2f2;
  background-size: 300% 100%;
  margin-bottom: 10px;
  animation: l1 2s infinite linear;
}
.loaderss {
  height: 50px;
  border-radius: 5px;
  background: linear-gradient(90deg, #0001 33%, #0005 50%, #0001 66%) #ddd;
  background-size: 300% 100%;
  margin-bottom: 10px;
  animation: l1 2s infinite linear;
}
@keyframes l1 {
  0% {
    background-position: right;
  }
}
</style>
