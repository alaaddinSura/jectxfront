<script setup>
</script>

<template>
  <div class="circle-spin-2"></div>
</template>

<style>
.circle-spin-2 {
  --size: 24px;
  --stroke-width: calc(var(--size) / 6);
  --accent-opacity: .25;
  --color: currentColor;
  --animation-timing-function: linear;
  --animation-duration: 1s;
  position: relative;
  width: var(--size);
  height: var(--size);
}

.circle-spin-2::before,
.circle-spin-2::after {
  content: '';
  position: absolute;
  inset: 0;
  border-width: var(--stroke-width);
  border-style: solid;
  border-radius: 50%;
  transform: rotate(0deg);
  animation: var(--animation-timing-function) var(--animation-duration) infinite circle-spin-2-animation;
}

.circle-spin-2::before {
  border-color: var(--color) var(--color) var(--color) transparent;
  opacity: var(--accent-opacity);
}

.circle-spin-2::after {
  border-color: transparent transparent transparent var(--color);
}

@keyframes circle-spin-2-animation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>