import React from 'react';
import { VegaLite } from 'react-vega';

const VegaLiteGraphHeatMap = () => {
    const data = {
        values: [
          { x: 'A', y: 'X', value: 10 },
          { x: 'A', y: 'Y', value: 20 },
          { x: 'A', y: 'Z', value: 30 },
          { x: 'B', y: 'X', value: 40 },
          { x: 'B', y: 'Y', value: 50 },
          { x: 'B', y: 'Z', value: 60 },
          { x: 'C', y: 'X', value: 70 },
          { x: 'C', y: 'Y', value: 80 },
          { x: 'C', y: 'Z', value: 90 }
        ]
      };
      console.log('dataheatmap',data);
      console.log('dataheatmapvalues',data.values);

    
      // Vega-Lite specification for the heatmap
      const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A simple heatmap",
        "width": 300,
        "height": 200, 
        "data": { values: data.values }, 
        "mark": "rect",
        "encoding": {
          "x": {"field": "x", "type": "ordinal"},
          "y": {"field": "y", "type": "ordinal"},
          "color": {"field": "value", "type": "quantitative"}
        }
      };
  return (
      <VegaLite spec={spec} />
  );
};

export default VegaLiteGraphHeatMap;
