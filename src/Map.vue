<script setup lang="ts">
import { ScatterplotLayer } from "@deck.gl/layers";
import { MapboxLayer } from "@deck.gl/mapbox";
import { onBeforeUnmount, onMounted } from "vue";

const maptilerToken = import.meta.env.VITE_MAPTILER_TOKEN;
console.log(maptilerToken)

function addDeckLayers(map) {
  const layers = map.getStyle().layers;

  let labelLayerId;
  for (let i = 0; i < layers.length; i++) {
    if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
      labelLayerId = layers[i].id;
      break;
    }
  }

  map.addLayer(
    {
      id: "3d-buildings",
      source: "openmaptiles",
      "source-layer": "building",
      // filter: ["==", "extrude", "true"],
      type: "fill-extrusion",
      minzoom: 15,
      paint: {
        "fill-extrusion-color": "#dca",

        // use an 'interpolate' expression to add a smooth transition effect to the
        // buildings as the user zooms in
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "render_height"],
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "render_min_height"],
        ],
        "fill-extrusion-opacity": 0.6,
      },
    },
    labelLayerId
  );

  map.addLayer(
    new MapboxLayer({
      id: "deckgl-circle",
      type: ScatterplotLayer,
      data: [{ position: [ -71.05754, 42.35219], color: [255, 0, 0], radius: 200 }],
      getPosition: (d) => d.position,
      getFillColor: (d) => d.color,
      getRadius: (d) => d.radius,
      opacity: 0.3,
    }),
    labelLayerId
  );
}

function addDeckSources(map) {
  map.addSource('openmaptiles', {
      type: 'vector',
      url: `https://api.maptiler.com/tiles/v3-openmaptiles/tiles.json?key=${maptilerToken}`
  });
}

onBeforeUnmount(() => {
  console.log('unmount')
})

onMounted(() => {
  const map = new maplibregl.Map({
    antialias: true,
    container: "map",
    bearing: -127.5443,
    center: [-71.05836438462632, 42.35671247471868],
    pitch: 60,
    zoom: 15.345,
    style:
      `https://api.maptiler.com/maps/dataviz/style.json?key=${maptilerToken}`
      // `https://api.maptiler.com/maps/basic-v2/style.json?key=${maptilerToken}`
      // `https://api.maptiler.com/maps/streets/style.json?key=${maptilerToken}`,
      // `https://api.maptiler.com/maps/backdrop/style.json?key=${maptilerToken}`,
      // `https://demotiles.maplibre.org/style.json`
      // "map.style.json"
  });
  map.on("load", () => {
    addDeckSources(map);
    addDeckLayers(map);
  });
});
</script>
<template>
  <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    <div id="map" class="h-[600px] rounded-2xl" />
  </div>
</template>
