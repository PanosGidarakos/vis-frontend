import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent, Switch, Typography } from '@mui/material';
import { VegaLite } from 'react-vega';
import SelectHyperParams from './Selectors/SelectHyperParms';
import { fetchDataForDataSlice } from '../../../store/data/dataSlice';

const ParameterizedComponent = ({
  fetchDataFunction,
  defaultOption,
  defaultXaitype,
  defaultMethod,
  defaultMark
}) => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector(state => state[fetchDataFunction]);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [selectedMark, setSelectedMark] = useState(defaultMark);

  useEffect(() => {
    dispatch(fetchDataForDataSlice({ feature1: selectedOption, xaitype: defaultXaitype, method: defaultMethod }));
  }, [dispatch, fetchDataFunction, selectedOption, defaultXaitype, defaultMethod]);

  const handleChange = (e: SelectChangeEvent<string>) => {
    setSelectedOption(e.target.value);
  };

  const handleMarkChange = () => {
    setSelectedMark(prevMark => prevMark === 'line' ? 'bar' : 'line');
  };
  console.log(data)
  const subddata = data ? JSON.parse(data.hp)[0].map((key, index) => ({ HP: key, Values: JSON.parse(data.vals)[0][index] })) : [];


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <SelectHyperParams selectedOption={selectedOption} handleChange={handleChange} />
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {data && (
        <>
          <VegaLite
            spec={{
              "width": 1000,
              "height": 300,
              "data": { "values": subddata },
              "mark": { type: selectedMark },
              "encoding": {
                "x": { "field": "HP", "type": "ordinal" },
                "y": { "field": "Values", "type": "quantitative" }
              }
            }}
          />
          <Typography variant="subtitle1" gutterBottom>{selectedMark}</Typography>
          <Switch checked={selectedMark === 'bar'} onChange={handleMarkChange} inputProps={{ 'aria-label': 'controlled' }} />
        </>
      )}
    </div>
  );
};

export default ParameterizedComponent;