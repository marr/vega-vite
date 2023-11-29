<script setup lang="ts">
import PaneSplitter from "./components/PaneSplitter.vue";
import vegaEmbed from "vega-embed";
const vlSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  config: {
    background: "transparent",
    style: {
      bar: {
        color: "#45010aab",
      },
    },
    view: {
      fill: "#fff",
    },
  },
  data: {
    values: [
      { a: "C", b: 2 },
      { a: "C", b: 7 },
      { a: "C", b: 4 },
      { a: "D", b: 1 },
      { a: "D", b: 2 },
      { a: "D", b: 6 },
      { a: "E", b: 8 },
      { a: "E", b: 4 },
      { a: "E", b: 7 },
    ],
  },
  mark: "bar",
  encoding: {
    y: { field: "a", type: "nominal" },
    x: {
      aggregate: "average",
      field: "b",
      type: "quantitative",
      axis: {
        title: "Average of b",
      },
    },
  },
};

// Embed the visualization in the container with id `vis`
vegaEmbed("#vis", vlSpec);
</script>
<template>
  <splitpanes style="height: 600px">
    <pane min-size="20">1</pane>
    <pane>
      <splitpanes horizontal>
        <pane><div id="vis" /></pane>
        <pane>3</pane>
        <pane>4</pane>
      </splitpanes>
    </pane>
    <pane>5</pane>
  </splitpanes>
</template>
<style scoped>
.splitpanes__pane {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 5rem;
}
</style>