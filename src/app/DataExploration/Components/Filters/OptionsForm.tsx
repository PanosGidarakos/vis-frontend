import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

const OptionsForm = ({ options, handleOptionChange }) => {
  return (
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

      <TextField
        label="Filter Min"
        type="number"
        value={options.filterMin}
        onChange={e => handleOptionChange('filterMin', parseInt(e.target.value, 10))}
      />

      <TextField
        label="Filter Max"
        type="number"
        value={options.filterMax}
        onChange={e => handleOptionChange('filterMax', parseInt(e.target.value, 10))}
      />

      <FormControl>
        <InputLabel id="limit-label">Limit</InputLabel>
        <Select
          labelId="limit-label"
          value={options.limit}
          onChange={e => handleOptionChange('limit', parseInt(e.target.value, 10))}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={1000}>1000</MenuItem>
        </Select>
      </FormControl>

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
  );
};

export default OptionsForm;
