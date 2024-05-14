export const BigScatter = (data) => (
    {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "repeat": {
          "row": ['precision','recall','accuracy'],
          "column": ['precision','recall','accuracy']
        },
        width:400,
        heigh:400,
        "spec": {
            data: { values: JSON.parse(data) },
            width:400,
        height:400,

          "mark": "point",
          "params": [
            {
              "name": "brush",
              "select": {
                "type": "interval",
                "resolve": "union",
                "on": "[pointerdown[event.shiftKey], window:pointerup] > window:pointermove!",
                "translate": "[pointerdown[event.shiftKey], window:pointerup] > window:pointermove!",
                "zoom": "wheel![event.shiftKey]"
              }
            },
            {
              "name": "grid",
              "select": {
                "type": "interval",
                "resolve": "global",
                "translate": "[pointerdown[!event.shiftKey], window:pointerup] > window:pointermove!",
                "zoom": "wheel![!event.shiftKey]"
              },
              "bind": "scales"
            }
          ],
          "encoding": {
            "x": {"field": {"repeat": "column"}, "type": "quantitative"},
            "y": {
              "field": {"repeat": "row"},
              "type": "quantitative",
              "axis": {"minExtent": 30}
            },
            
          }
        }
      }
        );
  