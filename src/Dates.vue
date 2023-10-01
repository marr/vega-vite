<script setup lang="ts">
import vegaEmbed from "vega-embed";
import data from "vega-datasets";

data["earthquakes.json"]().then((earthquakes) => {
  // console.log(earthquakes);
  const vlSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: {
      values: earthquakes.features,
      name: "foo",
    },
    mark: "circle",
    "params": [  // An array of named parameters.
    {
      "name": 'range',
      "select": {
        "type": 'interval',
        "encodings": ["x"]
      }
    }
  ],
    transform: [{ filter: "datum.properties.mag > 5" }],
    encoding: {
      y: {
        field: "properties.mag",
        type: "quantitative",
        axis: { title: "Magnitude" },
        scale: { domain: [5, 7] }
      },
      fillOpacity: { value: 0.4 },
      tooltip: [{
        field: "properties.time",
        type: "temporal",
        timeUnit: "yearmonthdatehoursminutesseconds",
        title: 'Time'
      },{
        field: 'properties.mag',
        type: 'quantitative',
        title: 'Magnitude'
      }],
      x: {
        field: "properties.time",
        type: "temporal",
        timeUnit: "yearmonthdatehoursminutesseconds",
        axis: {
          title: "Time",
        },
      },
    },
  };

  // Embed the visualization in the container with id `vis`
  vegaEmbed("#vis", vlSpec).then(({ view }) => {
    console.log(view.data("foo"));
  });
});
</script>
<template>
  <div id="vis" />
</template>
