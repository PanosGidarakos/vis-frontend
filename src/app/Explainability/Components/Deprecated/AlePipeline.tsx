

import React, { useEffect, useState } from 'react';
import {  SelectChangeEvent, Switch, Typography } from '@mui/material';
import { VegaLite } from 'react-vega';
import SelectHyperParams from '../Selectors/SelectHyperParms';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataForAlePipelineSlice } from '../../../../store/data/explainabilitySlice';

const AlePipeline = () => {
    const dispatch = useDispatch();
    const { data, status, error } = useSelector(state => state.alepipeline);
    const [selectedOption, setSelectedOption] = useState("Model__lr");
    const [selectedMark, setSelectedMark] = useState("line");

    useEffect(() => {
        dispatch(fetchDataForAlePipelineSlice({ feature1: selectedOption, xaitype: "pipeline", method: "ale" }));
    }, [dispatch, selectedOption]);

    const handleChange = (e: SelectChangeEvent<string>) => {
        setSelectedOption(e.target.value);
    };

    const handleMarkChange = () => {
        setSelectedMark(prevMark => prevMark === 'line' ? 'bar' : 'line');
    };

   

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
                            "data": { "values": JSON.parse(data.ale) },
                            "mark": { type: selectedMark },
                            "encoding": {
                                "x": { "field": "index", "type": "nominal" },
                                "y": { "field": "eff", "type": "quantitative" }
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

export default AlePipeline;
