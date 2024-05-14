
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// const VisualizationFilter = () => {
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
//     axios.get('http://localhost:8080/api/visualization/data/cybersecurity_experiment_metrics/columns')
//       .then(response => {
//         const columnNames = response.data.map(column => column.name);
//         setColumns(columnNames);
//       })
//       .catch(error => {
//         console.error('Error fetching columns:', error);
//       });
//   }, []);

//   const handleColumnChange = (event) => {
//     const columnName = event.target.value;
//     setSelectedColumn(columnName);

//     if (columnName) {
//       axios.get(`http://localhost:8080/api/visualization/data/cybersecurity_experiment_metrics/column/${columnName}`)
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
//   return (
//     <Box sx={{ p: 2 }}>
//         <h1>Visualization Filter</h1>

//         <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel id="select-column-label">Select Column</InputLabel>
//             <Select
//                 labelId="select-column-label"
//                 id="select-column"
//                 value={selectedColumn || ""}
//                 onChange={handleColumnChange}
//                 label="Select Column"
//                 MenuProps={{
//                     PaperProps: {
//                         style: {
//                             maxHeight: 200,
//                         },
//                     },
//                 }}
//             >
//                 <MenuItem value="">
//                     <em>--Select a Column--</em>
//                 </MenuItem>
//                 {columns.map((column, index) => (
//                     <MenuItem key={index} value={column}>
//                         {column}
//                     </MenuItem>
//                 ))}
//             </Select>
//         </FormControl>

//         {selectedColumn && (
//             <FormControl fullWidth>
//                 <InputLabel id="select-value-label">Select Value</InputLabel>
//                 <Select
//                     labelId="select-value-label"
//                     id="select-value"
//                     value=""
//                     // onChange={handleValueChange}
//                     label="Select Value"
//                     MenuProps={{
//                         PaperProps: {
//                             style: {
//                                 maxHeight: 200,
//                             },
//                         },
//                     }}
//                 >
//                     <MenuItem value="">
//                         <em>--Select a Value--</em>
//                     </MenuItem>
//                     {columnValues.map((value, index) => (
//                         <MenuItem key={index} value={value}>
//                             {value}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//         )}
//     </Box>
// );

// };

// export default VisualizationFilter;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const VisualizationFilter = ({ datasetName, onColumnChange, onValueChange }) => {
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [columnValues, setColumnValues] = useState([]);

  const filterArray = (array) => {
    const nonNullArray = array.filter(value => value !== null);
    const uniqueArray = Array.from(new Set(nonNullArray));
    uniqueArray.sort((a, b) => a - b);
    return uniqueArray;
  };

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
    const columnName = event.target.value;
    setSelectedColumn(columnName);
    onColumnChange(columnName);

    if (columnName) {
      axios.get(`http://localhost:8080/api/visualization/data/${datasetName}/column/${columnName}`)
        .then(response => {
          const values = response.data.map(item => item[columnName]);
          const filteredArray = filterArray(values);
          setColumnValues(filteredArray);
        })
        .catch(error => {
          console.error('Error fetching column values:', error);
        });
    } else {
      setColumnValues([]);
    }
  };

  const handleValueChange = (event) => {
    const value = event.target.value;
    onValueChange(value);
  };

  return (
    <Box sx={{ p: 2 }}>
      <h1>Visualization Filter</h1>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="select-column-label">Select Column</InputLabel>
        <Select
          labelId="select-column-label"
          id="select-column"
          value={selectedColumn}
          onChange={handleColumnChange}
          label="Select Column"
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
        >
          <MenuItem value="">
            <em>--Select a Column--</em>
          </MenuItem>
          {columns.map((column, index) => (
            <MenuItem key={index} value={column}>
              {column}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedColumn && (
        <FormControl fullWidth>
          <InputLabel id="select-value-label">Select Value</InputLabel>
          <Select
            labelId="select-value-label"
            id="select-value"
            value={columnValues}
            onChange={handleValueChange}
            label="Select Value"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            <MenuItem value="">
              <em>--Select a Value--</em>
            </MenuItem>
            {columnValues.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default VisualizationFilter;
