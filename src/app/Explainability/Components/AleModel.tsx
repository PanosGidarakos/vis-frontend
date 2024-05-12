

import React, { useEffect, useState } from 'react';
import {SelectChangeEvent, Switch, Typography } from '@mui/material';
import { VegaLite } from 'react-vega';
import SelectHyperparamsModel from './Selectors/SelectHyperparamsModel';
import { fetchDataForAleModelSlice, } from '../../../store/data/dataSlice';
import { useDispatch, useSelector } from 'react-redux';

const AleModel = () => {
  

    const dispatch = useDispatch();
    const { data, status, error } = useSelector((state) => state.alemodel);

    const [selectedOption, setSelectedOption] = useState("state");
    const [selectedMark, setSelectedMark] = useState("line");
    const [selectedMethod, setSelectedMethod] = useState("ale");


    useEffect(() => {
        dispatch(fetchDataForAleModelSlice({ feature1: selectedOption, xaitype: "model", method: selectedMethod })); // Dispatch using the new action creator
    }, [dispatch, selectedOption,selectedMethod]);

    // Define subddata conditionally based on the availability of data
    

    const handleChange = (e: SelectChangeEvent<string>) => {
        setSelectedOption(e.target.value as string);
    };

    const handleMarkChange = () => {
        setSelectedMark((prevMark) => (prevMark === 'line' ? 'bar' : 'line'));
    };
    console.log('data ale model',data);


    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <SelectHyperparamsModel selectedOption={selectedOption} handleChange={handleChange} />
                {status === 'loading' && <p>Loading...</p>}
                {status === 'failed' && <p>Error: {error}</p>}
                {data && (
                    <></>
                )}
                {/* Render VegaLite component only when data is available */}
                {data && (
                    <VegaLite
                        spec={{
                            "width": 1000,
                            "height": 300,
                            "data": { values: JSON.parse(data.ale) }, 
                            "mark": { type: selectedMark },
                            "encoding": {
                                "x": {"field":selectedOption, "type": "nominal"},
                                "y": {"field": "eff", "type": "quantitative"}
                            }
                        }}
                    />
                )}
                <Typography variant="subtitle1" gutterBottom>
                    {selectedMark}
                </Typography>
                <Switch
                    checked={selectedMark === 'bar'}
                    onChange={handleMarkChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
        </div>
    );
};

export default AleModel;





