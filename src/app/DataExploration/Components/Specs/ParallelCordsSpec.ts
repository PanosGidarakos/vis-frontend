export const ParallelCords = (data) => ({
  data: { values: JSON.parse(data) },
  
    "width": 1000,
    "height": 300,
   
    "transform": [
      // No need to filter out specific fields as you will use all fields in fold
      {"window": [{"op": "count", "as": "index"}]},
      {"fold": ["max_depth", "min_child_weight", "learning_rate", "n_estimators", "proportion"]},
      {"filter": "isFinite(datum.value)"},

      {
        "joinaggregate": [
          {"op": "min", "field": "value", "as": "min"},
          {"op": "max", "field": "value", "as": "max"}
        ],
        "groupby": ["key"]
      },
      {
        "calculate": "(datum.value - datum.min) / (datum.max - datum.min)",
        "as": "norm_val"
      },
      {
        "calculate": "(datum.min + datum.max) / 2",
        "as": "mid"
      }
    ],
    "layer": [{
      "mark": {"type": "rule", "color": "#ccc"},
      "encoding": {
        "detail": {"aggregate": "count"},
        "x": {"field": "key"}
      }
    }, {
      "mark": "line",
      "encoding": {
        // Assuming each row in the data represents a unique entry; no color field needed if there is no categorical data
        "detail": {"type": "nominal", "field": "index"},
        "opacity": {"value": 0.3},
        "x": {"type": "nominal", "field": "key"},
        "y": {"type": "quantitative", "field": "norm_val", "axis": null},
        "tooltip": [
          {"type": "quantitative", "field": "max_depth"},
          {"type": "quantitative", "field": "min_child_weight"},
          {"type": "quantitative", "field": "learning_rate"},
          {"type": "quantitative", "field": "n_estimators"},
          {"type": "quantitative", "field": "proportion"}
        ]
      }
    }, {
      "encoding": {
        "x": {"type": "nominal", "field": "key"},
        "y": {"value": 0}
      },
      "layer": [{
        "mark": {"type": "text", "style": "label"},
        "encoding": {
          "text": {"aggregate": "max", "field": "max"}
        }
      }, {
        "mark": {"type": "tick", "style": "tick", "size": 8, "color": "#ccc"}
      }]
    }, {
      "encoding": {
        "x": {"type": "ordinal", "field": "key"},
        "y": {"value": 150}
      },
      "layer": [{
        "mark": {"type": "text", "style": "label"},
        "encoding": {
          "text": {"aggregate": "min", "field": "mid"}
        }
      }, {
        "mark": {"type": "tick", "style": "tick", "size": 8, "color": "#ccc"}
      }]
    }, {
      "encoding": {
        "x": {"type": "ordinal", "field": "key"},
        "y": {"value": 300}
      },
      "layer": [{
        "mark": {"type": "text", "style": "label"},
        "encoding": {
          "text": {"aggregate": "min", "field": "min"}
        }
      }, {
        "mark": {"type": "tick", "style": "tick", "size": 8, "color": "#ccc"}
      }]
    }],
    "config": {
      "axisX": {"domain": false, "labelAngle": 0, "tickColor": "#ccc", "title": null},
      "view": {"stroke": null},
      "style": {
        "label": {"baseline": "middle", "align": "right", "dx": -5},
        "tick": {"orient": "horizontal"}
      }
    }
  }
);
  