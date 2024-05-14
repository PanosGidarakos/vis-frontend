import React, { useState, useEffect } from 'react';
import { fetchTSData } from '../../../store/data/dataAPI';
import { VegaLite } from 'react-vega';
import { ConfusionMatrixSpec } from './Specs/ConfusionMatrixSpec';
import { LineChartSpec } from './Specs/LineChartSpec';
import { BigScatter } from './Specs/BigScatterSpec';
import { ParallelCords } from './Specs/ParallelCordsSpec';

const specMap = {
  confusionMatrix: ConfusionMatrixSpec,
  lineChart: LineChartSpec,
  bigScatter:BigScatter,
  parallel:ParallelCords
  // Add other visualizations here
};

const VisualizationComponent = ({ dataset,filters, visualizationType,cols }) => {
  const [options, setOptions] = useState({
    visualizationType: 'line',
    columns: cols,
    aggFunction: '',
    limit: 5000,
    dataset_id: dataset
  });
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTSData(
          options.dataset_id,
          options.columns,
          options.visualizationType,
          options.aggFunction,
          filters,
          options.limit
        );
        console.log(JSON.parse(response.data.data))
        setData(response.data);
        // console.log(JSON.parse(response.data.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [options, filters]);

  const handleOptionChange = (key, value) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      [key]: value
    }));
  };
  console.log(visualizationType);

  const getSpec = specMap[visualizationType];

  return (
    <div>
      {data && getSpec && (
        <VegaLite
          spec={getSpec(data.data)}
        />
      )}
    </div>
  );
};

export default VisualizationComponent;
