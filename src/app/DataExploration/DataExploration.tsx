import React, { useEffect, useState } from 'react';
import VisualizationComponent from './Components/VisualizationComponent';
import Sidebar from '../Dashboard/Sidebar';
import VisualizationFilter from './Components/VisualFilter';

const DataExploration: React.FC = () => {
  const centerContentStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Ensures the content is centered vertically
  };

 
  const [selectedDataset, setSelectedDataset] = useState('cybersecurity_experiment_metrics');
  const [selectedColumn, setSelectedColumn] = useState('accuracy');
  const [selectedValue, setSelectedValue] = useState(10);

  const handleColumnChange = (columnName) => {
    setSelectedColumn(columnName);
  };

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    // Perform any actions needed when selectedColumn or selectedValue changes
    // For example, you may want to fetch data for the VisualizationComponent here
    console.log('Selected column or value changed:', selectedColumn, selectedValue);
  }, [selectedColumn, selectedValue]);

  return (
    <div style={centerContentStyle}> {/* Apply inline styles */}
    <Sidebar/>

      <VisualizationFilter
        datasetName={selectedDataset}
        onColumnChange={handleColumnChange}
        onValueChange={handleValueChange}
      />
      <div>
        <h2>Selected Column: {selectedColumn}</h2>
        <h2>Selected Value: {selectedValue}</h2>
        {/* Use the selectedColumn and selectedValue in other parts of the dashboard */}
      </div>
      <VisualizationComponent kolona={selectedColumn} megisto={selectedValue}/>

    </div>
  );
};

export default DataExploration;
