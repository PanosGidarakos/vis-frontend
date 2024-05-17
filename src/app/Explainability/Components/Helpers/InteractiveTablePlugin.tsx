// import { Button, Col, Collapse, Modal, Row, Space, Spin, Table, TableProps, Tag } from 'antd';
// import React, { useState } from 'react';
// import ParallelCoordinatesPlot from './ParallelCoordinatesPlot';

// type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
// type TablePaginationPosition = NonNullable<TablePagination<any>['position']>[number];

// interface InteractiveTablePluginProps {
//   data: any[];
//   columns: any[];
//   height: number;
//   width: number;
//   tableSize: any;
// }

// export default function InteractiveTablePlugin(props: InteractiveTablePluginProps) {
//   const { data, columns, tableSize } = props;
  
//   const [computedCounterfactuals, setComputedCounterfactuals] = useState([]);
//   const [loadingRows, setLoadingRows] = useState([]); // State to track loading rows
//   const [bottom, setBottom] = useState<TablePaginationPosition>('bottomRight');
//   const [modalVisible, setModalVisible] = useState(false);

//   const { Panel } = Collapse;


//   const computeCounterfactuals = (rowId: number) =>{
//     setLoadingRows([...loadingRows, rowId]); // Set loading state for the row
//     setTimeout(() => {
//       setComputedCounterfactuals([...computedCounterfactuals, rowId]);
//       setLoadingRows(loadingRows.filter(id => id !== rowId)); // Remove loading state after 500ms
//       setModalVisible(true); // Open the modal after computation finishes
//     }, 500);
//   }

//   const convertToAntColumns = (columnsArray: []) => {
//     const antdCols = columnsArray.map((column, index) => ({
//       title: column,
//       dataIndex: column,
//       key: column,
//     }));
//     return [
//       ...antdCols,
//       {
//         title: 'Action',
//         key: 'action',
//         sorter: false,
//         fixed: 'right',
//         render: (text: string, record: any, id: number) => (
//           <Button onClick={() => showCounterfactualsModal(record.key)}>
//             <Space>
//               Counterfactuals
//               {loadingRows.includes(record.key) && <Spin size="small" />} {/* Show Spin if loading */}
//             </Space>
//           </Button>
//         ),
//       }
//     ];
//   };

//   const convertToAntRecords = (data: any) => {
//     data.forEach((d:any, idx:number) => d["key"] = idx);
//     return data;
//   }

//   const renderSubTable = () => {
//     const subData = [
//       {
//         "Model__learning_rate": 0.1,
//         "Model__max_depth": 2,
//         "Model__min_child_weight": 1,
//         "Model__n_estimators": 75,
//         "preprocessor__num__scaler": "StandardScaler()",
//         "BinaryLabel": 1,
//         "Cost": null
//       },
//       {
//         "Model__learning_rate": 0.001,
//         "Model__max_depth": 2,
//         "Model__min_child_weight": 1,
//         "Model__n_estimators": 75,
//         "preprocessor__num__scaler": "StandardScaler()",
//         "BinaryLabel": 0,
//         "Cost": "1.0"
//       },
//       {
//         "Model__learning_rate": 0.001,
//         "Model__max_depth": 2,
//         "Model__min_child_weight": 1,
//         "Model__n_estimators": 95,
//         "preprocessor__num__scaler": "StandardScaler()",
//         "BinaryLabel": 0,
//         "Cost": "1.2666666666666668"
//       },
//       {
//         "Model__learning_rate": 0.001,
//         "Model__max_depth": 2,
//         "Model__min_child_weight": 1,
//         "Model__n_estimators": 99,
//         "preprocessor__num__scaler": "StandardScaler()",
//         "BinaryLabel": 0,
//         "Cost": "1.32"
//       },
//       {
//         "Model__learning_rate": 0.1,
//         "Model__max_depth": 8,
//         "Model__min_child_weight": 1,
//         "Model__n_estimators": 26,
//         "preprocessor__num__scaler": "StandardScaler()",
//         "BinaryLabel": 0,
//         "Cost": "1.4033333333333333"
//       },
//       {
//         "Model__learning_rate": 0.1,
//         "Model__max_depth": 9,
//         "Model__min_child_weight": 1,
//         "Model__n_estimators": 25,
//         "preprocessor__num__scaler": "StandardScaler()",
//         "BinaryLabel": 0,
//         "Cost": "1.5416666666666665"
//       }
//     ];

//     const subColumns = [
//       {
//         title: 'Model__learning_rate',
//         dataIndex: 'Model__learning_rate',
//         key: 'Model__learning_rate',
//       },
//       {
//         title: 'Model__max_depth',
//         dataIndex: 'Model__max_depth',
//         key: 'Model__max_depth',
//       },
//       {
//         title: 'Model__min_child_weight',
//         dataIndex: 'Model__min_child_weight',
//         key: 'Model__min_child_weight',
//       },
//       {
//         title: 'Model__n_estimators',
//         dataIndex: 'Model__n_estimators',
//         key: 'Model__n_estimators',
//       },
//       {
//         title: 'BinaryLabel',
//         dataIndex: 'BinaryLabel',
//         key: 'BinaryLabel',
//         render: (value: number) => (
//           <Tag color={value === 1 ? 'red' : 'green'}>
//             {value === 1 ? 'Factual' : 'Counterfactual'}
//           </Tag>
//         ),
//       },
//       {
//         title: 'Action',
//         key: 'action',
//         render: () => (
//           <Button type="link">
//             Save configuration
//           </Button>
//         ),
//       },
//     ];
//     const [displayChart, setDisplayChart] = useState(true);

//     const handleToggleChart = () => {
//       setDisplayChart(true);
//     };
  
//     const handleToggleTable = () => {
//       setDisplayChart(false);
//     };

//     return (
//       <Modal
//         title="Counterfactuals"
//         open={modalVisible}
//         onCancel={closeModal}
//         footer={null}
//         width={1000}>
//         <Row gutter={16} justify="center" style={{ marginBottom: '10px' }}>
//         <Col>
//             <Button type={displayChart ? "primary" : "default"} onClick={handleToggleChart}>
//               Chart View
//             </Button>
//           </Col>
//           <Col>
//             <Button type={displayChart ? "default" : "primary"} onClick={handleToggleTable}>
//               Table View
//             </Button>
//           </Col>
//         </Row>
//         <Row>
//           {displayChart ? (
//             <ParallelCoordinatesPlot data={subData.slice(1)} />
//           ):
//             (<Table
//             dataSource={subData}
//             columns={subColumns}
//             pagination={false}
//             size="small"
//             scroll={{ y: 400 }}
//            />
//            )        
//           }
//         </Row>
//       </Modal>
//     );
//   };

//   const showCounterfactualsModal = (rowId: number) => {
//     computeCounterfactuals(rowId);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   return (
//     <div style={{ textAlign: 'center' }}> {/* Set text alignment to center */}
//       <Table
//         size={tableSize}
//         style={{ margin: '0 auto', maxWidth: '1500px' }} 
//         dataSource={convertToAntRecords(data)}
//         columns={convertToAntColumns(columns)}
//         pagination={{ position: 'bottom' }} 
//       />
//       {renderSubTable(data,columns)}
//     </div>
//   );
// }




import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Grid,
  Typography,
  Chip,
  DialogActions
} from '@mui/material';
import ParallelCoordinatesPlot from './ParallelCoordinatesPlot';

interface InteractiveTablePluginProps {
  data: any[];
  columns: any[];
  height: number;
  width: number;
  tableSize: 'small' | 'medium';
}

export default function InteractiveTablePlugin(props: InteractiveTablePluginProps) {
  const { data, columns, tableSize } = props;
  
  const [computedCounterfactuals, setComputedCounterfactuals] = useState<number[]>([]);
  const [loadingRows, setLoadingRows] = useState<number[]>([]); // State to track loading rows
  const [modalVisible, setModalVisible] = useState(false);
  const [displayChart, setDisplayChart] = useState(true);

  const computeCounterfactuals = (rowId: number) => {
    setLoadingRows((prevLoadingRows) => [...prevLoadingRows, rowId]); // Set loading state for the row
    setTimeout(() => {
      setComputedCounterfactuals((prevCounterfactuals) => [...prevCounterfactuals, rowId]);
      setLoadingRows((prevLoadingRows) => prevLoadingRows.filter(id => id !== rowId)); // Remove loading state after 500ms
      setModalVisible(true); // Open the modal after computation finishes
    }, 500);
  }

  const convertToMuiColumns = (columnsArray: string[]) => {
    return [
      ...columnsArray.map((column) => ({
        id: column,
        label: column,
      })),
      {
        id: 'action',
        label: 'Action',
        disableSorting: true,
        render: (record: any) => (
          <Button onClick={() => showCounterfactualsModal(record.key)}>
            {loadingRows.includes(record.key) ? <CircularProgress size={24} /> : 'Counterfactuals'}
          </Button>
        ),
      },
    ];
  };

  const convertToMuiRecords = (data: any[]) => {
    return data.map((record, index) => ({
      ...record,
      key: index,
    }));
  }

  const renderSubTable = () => {
    const subData = [
      {
        "Model__learning_rate": 0.1,
        "Model__max_depth": 2,
        "Model__min_child_weight": 1,
        "Model__n_estimators": 75,
        "preprocessor__num__scaler": "StandardScaler()",
        "BinaryLabel": 1,
        "Cost": null
      },
      {
        "Model__learning_rate": 0.001,
        "Model__max_depth": 2,
        "Model__min_child_weight": 1,
        "Model__n_estimators": 75,
        "preprocessor__num__scaler": "StandardScaler()",
        "BinaryLabel": 0,
        "Cost": "1.0"
      },
      {
        "Model__learning_rate": 0.001,
        "Model__max_depth": 2,
        "Model__min_child_weight": 1,
        "Model__n_estimators": 95,
        "preprocessor__num__scaler": "StandardScaler()",
        "BinaryLabel": 0,
        "Cost": "1.2666666666666668"
      },
      {
        "Model__learning_rate": 0.001,
        "Model__max_depth": 2,
        "Model__min_child_weight": 1,
        "Model__n_estimators": 99,
        "preprocessor__num__scaler": "StandardScaler()",
        "BinaryLabel": 0,
        "Cost": "1.32"
      },
      {
        "Model__learning_rate": 0.1,
        "Model__max_depth": 8,
        "Model__min_child_weight": 1,
        "Model__n_estimators": 26,
        "preprocessor__num__scaler": "StandardScaler()",
        "BinaryLabel": 0,
        "Cost": "1.4033333333333333"
      },
      {
        "Model__learning_rate": 0.1,
        "Model__max_depth": 9,
        "Model__min_child_weight": 1,
        "Model__n_estimators": 25,
        "preprocessor__num__scaler": "StandardScaler()",
        "BinaryLabel": 0,
        "Cost": "1.5416666666666665"
      }
    ];

    const subColumns = [
      { id: 'Model__learning_rate', label: 'Model__learning_rate' },
      { id: 'Model__max_depth', label: 'Model__max_depth' },
      { id: 'Model__min_child_weight', label: 'Model__min_child_weight' },
      { id: 'Model__n_estimators', label: 'Model__n_estimators' },
      {
        id: 'BinaryLabel',
        label: 'BinaryLabel',
        render: (value: number) => (
          <Chip label={value === 1 ? 'Factual' : 'Counterfactual'} color={value === 1 ? 'error' : 'success'} />
        ),
      },
      {
        id: 'action',
        label: 'Action',
        render: () => (
          <Button variant="text">Save configuration</Button>
        ),
      },
    ];

    const handleToggleChart = () => {
      setDisplayChart(true);
    };

    const handleToggleTable = () => {
      setDisplayChart(false);
    };

    return (
      <Dialog open={modalVisible} onClose={closeModal} maxWidth="lg" fullWidth>
        <DialogTitle>Counterfactuals</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} justifyContent="center" mb={2}>
            <Grid item>
              <Button variant={displayChart ? "contained" : "outlined"} onClick={handleToggleChart}>
                Chart View
              </Button>
            </Grid>
            <Grid item>
              <Button variant={displayChart ? "outlined" : "contained"} onClick={handleToggleTable}>
                Table View
              </Button>
            </Grid>
          </Grid>
          {displayChart ? (
            <ParallelCoordinatesPlot data={data} />
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {subColumns.map((column) => (
                      <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subData.map((row, index) => (
                    <TableRow key={index}>
                      {subColumns.map((column) => (
                        <TableCell key={column.id}>
                          {column.render ? column.render(row[column.id]) : row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const showCounterfactualsModal = (rowId: number) => {
    computeCounterfactuals(rowId);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const muiColumns = convertToMuiColumns(columns);
  console.log(muiColumns);
  const muiData = convertToMuiRecords(data);

  return (
    <Box textAlign="center">
      <TableContainer sx={{ margin: '0 auto', maxWidth: '1500px' }}>
        <Table size={tableSize}>
          <TableHead>
            <TableRow>
              {muiColumns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {muiData.map((row) => (
              <TableRow key={row.key}>
                {muiColumns.map((column) => (
                  <TableCell key={column.id}>
                    {column.render ? column.render(row) : row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {renderSubTable()}
    </Box>
  );
}
