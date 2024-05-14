// vegaSpec.js
export const LineChartSpec = (data) => ({
    width: 500,
    height: 500,
    layer: [
      {
        mark: 'line',
        encoding: {
          x: { field: 'timestamp', type: 'temporal', axis: { title: 'Actual' } },
          y: { field: 'dns_interlog_time_q3', type: 'quantitative', axis: { title: 'Predicted' } },
         
        }
      },
      
    ],
    data: { values: JSON.parse(data) }
  });
  