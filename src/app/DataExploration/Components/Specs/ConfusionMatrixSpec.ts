// vegaSpec.js
export const ConfusionMatrixSpec = (data) => ({
    width: 500,
    height: 500,
    layer: [
      {
        mark: 'rect',
        encoding: {
          x: { field: 'label', type: 'ordinal', axis: { title: 'Actual' } },
          y: { field: 'predicted', type: 'ordinal', axis: { title: 'Predicted' } },
          color: {
            aggregate: 'count',
            type: 'quantitative',
            title: 'Count',
            // scale: { scheme: 'blues' }
          }
        }
      },
      {
        mark: {
          type: 'text',
          align: 'center',
          baseline: 'middle',
          dy: -5,
          fontSize: 15
        },
        encoding: {
          x: { field: 'label', type: 'ordinal' },
          y: { field: 'predicted', type: 'ordinal' },
          text: { 
            aggregate: 'count', 
            type: 'quantitative' 
          },
          color: {
            condition: {
              test: 'datum.count > 50',
              value: 'white'
            },
            value: 'black'
          }
        }
      }
    ],
    data: { values: JSON.parse(data) }
  });
  