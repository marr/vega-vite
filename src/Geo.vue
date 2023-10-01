<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  const map = new maplibregl.Map({
    container: 'map',
    // style: 'https://demotiles.maplibre.org/style.json'
    style: 'map.style.json',
  });
  map.on("idle", () => {
    // controls.value.bearing = mb.getBearing();
    // controls.value.zoom = mb.getZoom();
    // controls.value.center = mb.getCenter();
    // controls.value.pitch = mb.getPitch();
  });
});
</script>
<template>
  <div>
    <div id="map" />
  </div>
</template>
<style scoped>
#map {
  position: absolute;
  inset: 0;
}
</style>
