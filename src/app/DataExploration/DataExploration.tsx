
import React, { useState } from 'react';
import VisualizationComponent from './Components/VisualizationComponent';
import Sidebar from '../Dashboard/Sidebar';
import VisualizationFilter from './Components/Filters/VisualFilter';
import VisualizationColumn from './Components/Filters/VisualizationColumn';
import { Container, Grid } from '@mui/material';

const DataExploration: React.FC = () => {

  const [selectedDataset, setSelectedDataset] = useState('cybersecurity_experiment_validation_results');
  const [filters, setFilters] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');

  // const [visualizationType, setVisualizationType] = useState('confusionMatrix'); // Example type
  // const handleVisualizationTypeChange = (type) => {
  //   setVisualizationType(type);
  // };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };
  const handleColumnChange = (column) => {
    setSelectedColumn(column);
  };
  

  return (
    


<Container fixed>
<Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <h1>Performance Analysis of Single Experiment Variant</h1>
        </Grid>
        <Grid item xs={3}>
          <Sidebar/>
        </Grid>
        <Grid item xs={12}>
          <h2>Select Experiment Variant:</h2>
          <VisualizationFilter
        datasetName={'cybersecurity_experiment_metrics'}
        onFiltersChange={handleFiltersChange}
      />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <h3>Confusion Matrix</h3>
              <VisualizationComponent dataset={'cybersecurity_experiment_validation_results'} filters={filters} visualizationType={"confusionMatrix"}cols={['label','predicted']} />
            </Grid>
          </Grid>
        </Grid>
         <Grid item xs={12}>
          <h2>Classification Scatter</h2>
          <VisualizationComponent dataset= {'cybersecurity_experiment_metrics'} filters={filters} visualizationType={'bigScatter'} cols={['precision','recall','accuracy']}/>
        </Grid>
         <Grid item xs={12}>
          <h2>Parallel Cordinates</h2>
          <VisualizationComponent dataset={'cybersecurity_experiment_metrics'} filters={filters} visualizationType={'parallel'} cols={['max_depth', 'min_child_weight', 'learning_rate', 'n_estimators', 'proportion']}/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DataExploration;
