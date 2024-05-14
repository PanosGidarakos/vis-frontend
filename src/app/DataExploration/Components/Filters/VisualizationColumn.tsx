import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, FormControl, InputLabel, MenuItem, Select, Button, Grid } from '@mui/material';

const VisualizationColumn = ({ datasetName, onColumnChange }) => {
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');

  useEffect(() => {
    if (datasetName) {
      axios.get(`http://localhost:8080/api/visualization/data/${datasetName}/columns`)
        .then(response => {
          const columnNames = response.data.map(column => column.name);
          setColumns(columnNames);
        })
        .catch(error => {
          console.error('Error fetching columns:', error);
        });
    }
  }, [datasetName]);

  const handleColumnChange = (event) => {
    const value = event.target.value;
    setSelectedColumn(value);
    onColumnChange(value);  // Notify parent component of the column selection
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Select Column</InputLabel>
            <Select
              value={selectedColumn}
              onChange={handleColumnChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, // Adjust the maximum height as needed
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>--Select a Column--</em>
              </MenuItem>
              {columns.map((column, idx) => (
                <MenuItem key={idx} value={column}>
                  {column}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VisualizationColumn;
