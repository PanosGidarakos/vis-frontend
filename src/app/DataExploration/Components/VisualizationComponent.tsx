// import React, { useState, useEffect } from 'react';
// import { fetchTSData } from '../../../store/data/dataAPI'; // Import your fetch function
// import { VegaLite } from 'react-vega';
// import { json } from 'd3';

// const VisualizationComponent = () => {
//   // Define initial state for options and data
//   const [options, setOptions] = useState({
//     visualizationType: 'line',
//     columns: ['timestamp', 'dns_interlog_time_q3', 'dns_interlog_time_q2', 'smtp_in_mean_hops'],
//     aggFunction: 'AVG',
//     filterColumn: 'dns_interlog_time_q2',
//     filterMin: 0,
//     filterMax: 10,
//     limit: 100,
//     dataset_id: 'i2cat_desktop_features'
//   });
//   const [data, setData] = useState(null);

//   // Fetch data when options change
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetchTSData(
//           options.dataset_id,
//           options.columns,
//           options.visualizationType,
//           options.aggFunction,
//           [{ column: options.filterColumn, type: 'range', value: { min: options.filterMin, max: options.filterMax } }],
//           options.limit
//         );
//         setData(response.data );
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [options]);

//   // Define function to handle option changes
//   const handleOptionChange = (key, value) => {
//     setOptions(prevOptions => ({
//       ...prevOptions,
//       [key]: value
//     }));
//   };

//   return (
//     <div>
//       {/* Control Panel */}
//       <div>
//         {/* Select Visualization Type */}
//         <select value={options.visualizationType} onChange={e => handleOptionChange('visualizationType', e.target.value)}>
//           <option value="line">Line</option>
//           <option value="bar">Bar</option>
//         </select>

//         {/* Select Columns */}
//         <select multiple value={options.columns} onChange={e => handleOptionChange('columns', Array.from(e.target.selectedOptions, option => option.value))}>
//           {options.columns.map(column => (
//             <option key={column} value={column}>{column}</option>
//           ))}
//         </select>

//         {/* Select Aggregation Function */}
//         <select value={options.aggFunction} onChange={e => handleOptionChange('aggFunction', e.target.value)}>
//           <option value="AVG">Average</option>
//           <option value="MIN">Minimum</option>
//           <option value="MAX">Maximum</option>
//         </select>

//         {/* Select Filter Column */}
//         <select value={options.filterColumn} onChange={e => handleOptionChange('filterColumn', e.target.value)}>
//           {options.columns.map(column => (
//             <option key={column} value={column}>{column}</option>
//           ))}
//         </select>

//         {/* Filter Min Value */}
//         <input type="number" value={options.filterMin} onChange={e => handleOptionChange('filterMin', parseInt(e.target.value))} />

//         {/* Filter Max Value */}
//         <input type="number" value={options.filterMax} onChange={e => handleOptionChange('filterMax', parseInt(e.target.value))} />

//         {/* Select Limit */}
//         <select value={options.limit} onChange={e => handleOptionChange('limit', parseInt(e.target.value))}>
//           <option value={10}>10</option>
//           <option value={100}>100</option>
//           <option value={1000}>1000</option>
//         </select>

//         {/* Select Dataset ID */}
//         <select value={options.dataset_id} onChange={e => handleOptionChange('dataset_id', e.target.value)}>
//           <option value="i2cat_desktop_features">i2cat_desktop_features</option>
//           <option value="i2cat_desktop_features_new">i2cat_desktop_features_new</option>
//           <option value="i2cat_desktop_features_new_new">i2cat_desktop_features_new_new</option>
//         </select>
//       </div>

//       {/* Render Visualization */}
//       {data && (
//         <VegaLite spec={{"width": 300,
//         "height": 200,
//         "mark": "line",
//         "encoding": {
//             "x": {"field": "dns_interlog_time_q2", "type": "quantitative"},
//             "y": {"field": "dns_interlog_time_q2", "type": "quantitative"}
//           },
//           "data": {
//             "values": JSON.parse(data.data)
              
            
//           },
//     }}  />
//       )}
//     </div>
//   );
// };

// export default VisualizationComponent;


import React, { useState, useEffect } from 'react';
import { fetchTSData } from '../../../store/data/dataAPI';
import { VegaLite } from 'react-vega';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

const VisualizationComponent = ({kolona,megisto}) => {
    console.log('Visualization')
  const [options, setOptions] = useState({
    visualizationType: 'line',
    columns: [],
    aggFunction: '',
    filterColumn: kolona,
    filterMin: parseInt(megisto, 10),
    filterMax: parseInt(megisto, 10),
    limit: 100,
    dataset_id: 'cybersecurity_experiment_metrics'
  });
  const [data, setData] = useState(null);
  useEffect(() => {
    setOptions(prevOptions => ({
      ...prevOptions,
      filterColumn: kolona,
      filterMin: parseInt(megisto, 10),
      filterMax: parseInt(megisto, 10) // Ensure megisto is a number
    }));
  }, [kolona, megisto]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTSData(
          options.dataset_id,
          options.columns,
          options.visualizationType,
          options.aggFunction,
          [{ column: options.filterColumn, type: 'range', value: { min: options.filterMin, max: options.filterMax } }],
          options.limit
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [options]);

  const handleOptionChange = (key, value) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      [key]: value
    }));
  };
  console.log(options)
  return (
    <div>
      <div>
        <FormControl>
          <InputLabel id="visualization-type-label">Visualization Type</InputLabel>
          <Select
            labelId="visualization-type-label"
            value={options.visualizationType}
            onChange={e => handleOptionChange('visualizationType', e.target.value)}
          >
            <MenuItem value="line">Line</MenuItem>
            <MenuItem value="bar">Bar</MenuItem>
          </Select>
        </FormControl>

        {/* Select Columns */}
        <FormControl>
          <InputLabel id="columns-label">Columns</InputLabel>
          <Select
            labelId="columns-label"
            multiple
            value={options.columns}
            onChange={e => handleOptionChange('columns', e.target.value)}
          >
            {options.columns.map(column => (
              <MenuItem key={column} value={column}>{column}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Select Aggregation Function */}
        <FormControl>
          <InputLabel id="agg-function-label">Aggregation Function</InputLabel>
          <Select
            labelId="agg-function-label"
            value={options.aggFunction}
            onChange={e => handleOptionChange('aggFunction', e.target.value)}
          >
            <MenuItem value="AVG">Average</MenuItem>
            <MenuItem value="MIN">Minimum</MenuItem>
            <MenuItem value="MAX">Maximum</MenuItem>
          </Select>
        </FormControl>

        {/* Select Filter Column */}
        <FormControl>
          <InputLabel id="filter-column-label">Filter Column</InputLabel>
          <Select
            labelId="filter-column-label"
            value={options.filterColumn}
            onChange={e => handleOptionChange('filterColumn', e.target.value)}
          >
            {options.columns.map(column => (
              <MenuItem key={column} value={column}>{column}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Filter Min Value */}
        <TextField
          label="Filter Min"
          type="number"
          value={options.filterMin}
          onChange={e => handleOptionChange('filterMin', parseInt(e.target.value))}
        />

        {/* Filter Max Value */}
        <TextField
          label="Filter Max"
          type="number"
          value={options.filterMax}
          onChange={e => handleOptionChange('filterMax', parseInt(e.target.value))}
        />

        {/* Select Limit */}
        <FormControl>
          <InputLabel id="limit-label">Limit</InputLabel>
          <Select
            labelId="limit-label"
            value={options.limit}
            onChange={e => handleOptionChange('limit', parseInt(e.target.value))}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={1000}>1000</MenuItem>
          </Select>
        </FormControl>

        {/* Select Dataset ID */}
        <FormControl>
          <InputLabel id="dataset-id-label">Dataset ID</InputLabel>
          <Select
            labelId="dataset-id-label"
            value={options.dataset_id}
            onChange={e => handleOptionChange('dataset_id', e.target.value)}
          >
            <MenuItem value="i2cat_desktop_features">i2cat_desktop_features</MenuItem>
            <MenuItem value="cybersecurity_experiment_validation_results">cybersecurity_experiment_validation_results</MenuItem>
            <MenuItem value="cybersecurity_experiment_metrics">cybersecurity_experiment_metrics</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Render Visualization */}
      {data && (
        <VegaLite
          spec={{
            width: 500,
            height: 500,
            mark: 'line',
            params: [{
                "name": "grid",
                "select": "interval",
                "bind": "scales"
              }],
            encoding: {
              x: { field: 'recall', type: 'quantitative' },
              y: { field: 'accuracy', type: 'quantitative' }
            },
            data: { values: JSON.parse(data.data) }
          }}
        />
      )}
    </div>
  );
};

export default VisualizationComponent;
