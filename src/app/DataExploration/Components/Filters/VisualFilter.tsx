// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// const VisualizationFilter = ({ datasetName, onColumnChange, onValueChange }) => {
//   const [columns, setColumns] = useState([]);
//   const [selectedColumn, setSelectedColumn] = useState('');
//   const [columnValues, setColumnValues] = useState([]);

//   const filterArray = (array) => {
//     const nonNullArray = array.filter(value => value !== null);
//     const uniqueArray = Array.from(new Set(nonNullArray));
//     uniqueArray.sort((a, b) => a - b);
//     return uniqueArray;
//   };

//   useEffect(() => {
//     if (datasetName) {
//       axios.get(`http://localhost:8080/api/visualization/data/${datasetName}/columns`)
//         .then(response => {
//           const columnNames = response.data.map(column => column.name);
//           setColumns(columnNames);
//         })
//         .catch(error => {
//           console.error('Error fetching columns:', error);
//         });
//     }
//   }, [datasetName]);

//   const handleColumnChange = (event) => {
//     const columnName = event.target.value;
//     setSelectedColumn(columnName);
//     onColumnChange(columnName);

//     if (columnName) {
//       axios.get(`http://localhost:8080/api/visualization/data/${datasetName}/column/${columnName}`)
//         .then(response => {
//           const values = response.data.map(item => item[columnName]);
//           const filteredArray = filterArray(values);
//           setColumnValues(filteredArray);
//         })
//         .catch(error => {
//           console.error('Error fetching column values:', error);
//         });
//     } else {
//       setColumnValues([]);
//     }
//   };

//   const handleValueChange = (event) => {
//     const value = event.target.value;
//     onValueChange(value);
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <h1>Visualization Filter</h1>

//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel id="select-column-label">Select Column</InputLabel>
//         <Select
//           labelId="select-column-label"
//           id="select-column"
//           value={selectedColumn}
//           onChange={handleColumnChange}
//           label="Select Column"
//           MenuProps={{
//             PaperProps: {
//               style: {
//                 maxHeight: 200,
//               },
//             },
//           }}
//         >
//           <MenuItem value="">
//             <em>--Select a Column--</em>
//           </MenuItem>
//           {columns.map((column, index) => (
//             <MenuItem key={index} value={column}>
//               {column}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {selectedColumn && (
//         <FormControl fullWidth>
//           <InputLabel id="select-value-label">Select Value</InputLabel>
//           <Select
//             labelId="select-value-label"
//             id="select-value"
//             value={columnValues}
//             onChange={handleValueChange}
//             label="Select Value"
//             MenuProps={{
//               PaperProps: {
//                 style: {
//                   maxHeight: 200,
//                 },
//               },
//             }}
//           >
//             <MenuItem value="">
//               <em>--Select a Value--</em>
//             </MenuItem>
//             {columnValues.map((value, index) => (
//               <MenuItem key={index} value={value}>
//                 {value}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       )}
//     </Box>
//   );
// };

// export default VisualizationFilter;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Button, Grid } from '@mui/material';

// const VisualizationFilter = ({ datasetName, onFiltersChange }) => {
//   const [columns, setColumns] = useState([]);
//   const [filters, setFilters] = useState([
//     { column: '', type: 'range', value: { min: '', max: '' } }
//   ]);

//   useEffect(() => {
//     if (datasetName) {
//       axios.get(`http://localhost:8080/api/visualization/data/${datasetName}/columns`)
//         .then(response => {
//           const columnNames = response.data.map(column => column.name);
//           setColumns(columnNames);
//         })
//         .catch(error => {
//           console.error('Error fetching columns:', error);
//         });
//     }
//   }, [datasetName]);

//   const handleFilterChange = (index, key, value) => {
//     setFilters(prevFilters => {
//       const newFilters = [...prevFilters];
//       if (key === 'min' || key === 'max') {
//         newFilters[index].value[key] = value;
//       } else {
//         newFilters[index][key] = value;
//       }
//       return newFilters;
//     });
//   };

//   const addFilter = () => {
//     setFilters(prevFilters => [
//       ...prevFilters,
//       { column: '', type: 'range', value: { min: '', max: '' } }
//     ]);
//   };

//   const removeFilter = (index) => {
//     setFilters(prevFilters => prevFilters.filter((_, i) => i !== index));
//   };

//   useEffect(() => {
//     onFiltersChange(filters);
//   }, [filters, onFiltersChange]);

//   return (
//     <Box sx={{ p: 2 }}>
//       <h1>Visualization Filter</h1>

//       {filters.map((filter, index) => (
//         <Grid container spacing={2} key={index} alignItems="center">
//           <Grid item xs={3}>
//             <FormControl fullWidth>
//               <InputLabel>Select Column</InputLabel>
//               <Select
//                 value={filter.column}
//                 onChange={e => handleFilterChange(index, 'column', e.target.value)}
//               >
//                 <MenuItem value="">
//                   <em>--Select a Column--</em>
//                 </MenuItem>
//                 {columns.map((column, idx) => (
//                   <MenuItem key={idx} value={column}>
//                     {column}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={3}>
//             <TextField
//               label="Min Value"
//               type="number"
//               value={filter.value.min}
//               onChange={e => handleFilterChange(index, 'min', e.target.value)}
//             />
//           </Grid>

//           <Grid item xs={3}>
//             <TextField
//               label="Max Value"
//               type="number"
//               value={filter.value.max}
//               onChange={e => handleFilterChange(index, 'max', e.target.value)}
//             />
//           </Grid>

//           <Grid item xs={3}>
//             <Button variant="contained" color="secondary" onClick={() => removeFilter(index)}>
//               Remove
//             </Button>
//           </Grid>
//         </Grid>
//       ))}

//       <Button variant="contained" color="primary" onClick={addFilter}>
//         Add Filter
//       </Button>
//     </Box>
//   );
// };

// export default VisualizationFilter;

/////teleio

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Button, Grid } from '@mui/material';

// const VisualizationFilter = ({ datasetName, onFiltersChange }) => {
//   const [columns, setColumns] = useState([]);
//   const [filters, setFilters] = useState([
//     { column: '', type: 'range', value: { min: '', max: '' } }
//   ]);

//   useEffect(() => {
//     if (datasetName) {
//       axios.get(`http://localhost:8080/api/visualization/data/${datasetName}/columns`)
//         .then(response => {
//           const columnNames = response.data.map(column => column.name);
//           setColumns(columnNames);
//         })
//         .catch(error => {
//           console.error('Error fetching columns:', error);
//         });
//     }
//   }, [datasetName]);

//   const handleFilterChange = (index, key, value) => {
//     setFilters(prevFilters => {
//       const newFilters = [...prevFilters];
//       if (key === 'value') {
//         newFilters[index].value.min = value;
//         newFilters[index].value.max = value;
//       } else {
//         newFilters[index][key] = value;
//       }
//       return newFilters;
//     });
//   };

//   const addFilter = () => {
//     setFilters(prevFilters => [
//       ...prevFilters,
//       { column: '', type: 'range', value: { min: '', max: '' } }
//     ]);
//   };

//   const removeFilter = (index) => {
//     setFilters(prevFilters => prevFilters.filter((_, i) => i !== index));
//   };

//   useEffect(() => {
//     onFiltersChange(filters);
//   }, [filters, onFiltersChange]);

//   return (
//     <Box sx={{ p: 2 }}>
//       <h1>Visualization Filter</h1>

//       {filters.map((filter, index) => (
//         <Grid container spacing={2} key={index} alignItems="center">
//           <Grid item xs={4}>
//             <FormControl fullWidth>
//               <InputLabel>Select Column</InputLabel>
//               <Select
//                 value={filter.column}
//                 onChange={e => handleFilterChange(index, 'column', e.target.value)}
//               >
//                 <MenuItem value="">
//                   <em>--Select a Column--</em>
//                 </MenuItem>
//                 {columns.map((column, idx) => (
//                   <MenuItem key={idx} value={column}>
//                     {column}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={4}>
//             <TextField
//               label="Value"
//               type="number"
//               value={filter.value.min}
//               onChange={e => handleFilterChange(index, 'value', e.target.value)}
//               fullWidth
//             />
//           </Grid>

//           <Grid item xs={4}>
//             <Button variant="contained" color="secondary" onClick={() => removeFilter(index)}>
//               Remove
//             </Button>
//           </Grid>
//         </Grid>
//       ))}

//       <Button variant="contained" color="primary" onClick={addFilter}>
//         Add Filter
//       </Button>
//     </Box>
//   );
// };

// export default VisualizationFilter;

//teleio





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Button, Grid } from '@mui/material';

// const VisualizationFilter = ({ datasetName, onFiltersChange }) => {
//   const [columns, setColumns] = useState([]);
//   const [columnValues, setColumnValues] = useState({});
//   const [filters, setFilters] = useState([
//     { column: '', type: 'range', value: { min: '', max: '' } }
//   ]);

//   useEffect(() => {
//     if (datasetName) {
//       axios.get(`http://localhost:8080/api/visualization/data/${datasetName}/columns`)
//         .then(response => {
//           const columnNames = response.data.map(column => column.name);
//           setColumns(columnNames);
//         })
//         .catch(error => {
//           console.error('Error fetching columns:', error);
//         });
//     }
//   }, [datasetName]);

//   const fetchColumnValues = (columnName) => {
//     if (columnName) {
//       axios.get(`http://localhost:8080/api/visualization/data/${datasetName}/column/${columnName}`)
//         .then(response => {
//           const values = response.data.map(item => item[columnName]);
//           const uniqueValues = [...new Set(values)];  // Ensure values are unique
//           setColumnValues(prevValues => ({ ...prevValues, [columnName]: uniqueValues }));
//         })
//         .catch(error => {
//           console.error('Error fetching column values:', error);
//         });
//     }
//   };

//   const handleFilterChange = (index, key, value) => {
//     setFilters(prevFilters => {
//       const newFilters = [...prevFilters];
//       if (key === 'column') {
//         newFilters[index][key] = value;
//         fetchColumnValues(value);  // Fetch values when column is selected
//       } else if (key === 'value') {
//         newFilters[index].value.min = value;
//         newFilters[index].value.max = value;
//       } else {
//         newFilters[index][key] = value;
//       }
//       return newFilters;
//     });
//   };

//   const addFilter = () => {
//     setFilters(prevFilters => [
//       ...prevFilters,
//       { column: '', type: 'range', value: { min: '', max: '' } }
//     ]);
//   };

//   const removeFilter = (index) => {
//     setFilters(prevFilters => prevFilters.filter((_, i) => i !== index));
//   };

//   useEffect(() => {
//     onFiltersChange(filters);
//   }, [filters, onFiltersChange]);

//   return (
//     <Box sx={{ p: 2 }}>
//       {/* <h1>Visualization Filter</h1> */}

//       {filters.map((filter, index) => (
//         <Grid container spacing={2} key={index} alignItems="center">
//           <Grid item xs={2}>
//             <FormControl fullWidth>
//               <InputLabel>Select Column</InputLabel>
//               <Select
//                 value={filter.column}
//                 onChange={e => handleFilterChange(index, 'column', e.target.value)}
//                 MenuProps={{
//                   PaperProps: {
//                     style: {
//                       maxHeight: 200, // Adjust the maximum height as needed
//                     },
//                   },
//                 }}
//               >
//                 <MenuItem value="">
//                   <em>--Select a Column--</em>
//                 </MenuItem>
//                 {columns.map((column, idx) => (
//                   <MenuItem key={idx} value={column}>
//                     {column}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={2}>
//             <FormControl fullWidth>
//               <InputLabel>Select Value</InputLabel>
//               <Select
//                 value={filter.value.min}
//                 onChange={e => handleFilterChange(index, 'value', e.target.value)}
//                 disabled={!filter.column}
//                 MenuProps={{
//                   PaperProps: {
//                     style: {
//                       maxHeight: 200, // Adjust the maximum height as needed
//                     },
//                   },
//                 }}
//               >
//                 <MenuItem value="">
//                   <em>--Select a Value--</em>
//                 </MenuItem>
//                 {filter.column && columnValues[filter.column] && columnValues[filter.column].map((value, idx) => (
//                   <MenuItem key={idx} value={value}>
//                     {value}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={4}>
//             <Button variant="contained" color="secondary" onClick={() => removeFilter(index)}>
//               Remove
//             </Button>
//           </Grid>
//         </Grid>
//       ))}

//       <Button variant="contained" color="primary" onClick={addFilter}>
//         Add Filter
//       </Button>
//     </Box>
//   );
// };

// export default VisualizationFilter;











import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, FormControl, InputLabel, MenuItem, Select, Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const VisualizationFilter = ({ datasetName, onFiltersChange }) => {
  const [columns, setColumns] = useState([]);
  const [columnValues, setColumnValues] = useState({});
  const [filters, setFilters] = useState([
    { column: '', type: 'range', value: { min: '', max: '' } }
  ]);

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

  const fetchColumnValues = (columnName) => {
    if (columnName) {
      axios.get(`http://localhost:8080/api/visualization/data/${datasetName}/column/${columnName}`)
        .then(response => {
          const values = response.data.map(item => item[columnName]);
          const uniqueValues = [...new Set(values)];  // Ensure values are unique
          setColumnValues(prevValues => ({ ...prevValues, [columnName]: uniqueValues }));
        })
        .catch(error => {
          console.error('Error fetching column values:', error);
        });
    }
  };

  const handleFilterChange = (index, key, value) => {
    setFilters(prevFilters => {
      const newFilters = [...prevFilters];
      if (key === 'column') {
        newFilters[index][key] = value;
        fetchColumnValues(value);  // Fetch values when column is selected
      } else if (key === 'value') {
        newFilters[index].value.min = value;
        newFilters[index].value.max = value;
      } else {
        newFilters[index][key] = value;
      }
      return newFilters;
    });
  };

  const addFilter = () => {
    setFilters(prevFilters => [
      ...prevFilters,
      { column: '', type: 'range', value: { min: '', max: '' } }
    ]);
  };

  const removeFilter = (index) => {
    setFilters(prevFilters => prevFilters.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  return (
    <Box sx={{ p: 2 }}>
      {/* <h1>Visualization Filter</h1> */}

      {filters.map((filter, index) => (
        <Grid container spacing={4} key={index} alignItems="center">
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel>Select Column</InputLabel>
              <Select
                value={filter.column}
                onChange={e => handleFilterChange(index, 'column', e.target.value)}
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

          {filter.column && (
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel>Select Value</InputLabel>
                <Select
                  value={filter.value.min}
                  onChange={e => handleFilterChange(index, 'value', e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200, // Adjust the maximum height as needed
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>--Select a Value--</em>
                  </MenuItem>
                  {columnValues[filter.column] && columnValues[filter.column].map((value, idx) => (
                    <MenuItem key={idx} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={1}>
            <Button variant="outlined"   size="small" startIcon={<DeleteIcon/>} color="secondary" onClick={() => removeFilter(index)}>
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}

      <Button variant="contained" color="primary" onClick={addFilter}>
        Add Filter
      </Button>
    </Box>
  );
};

export default VisualizationFilter;