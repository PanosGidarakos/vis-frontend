import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent, Switch, Typography } from '@mui/material';
import { VegaLite } from 'react-vega';
import SelectHyperParams from '../Selectors/SelectHyperParms';
import { fetchDataForPdpPipelineSlice } from '../../../../store/data/dataSlice';

const PdpPipeline = () => {
    const dispatch = useDispatch();
    const { data, status, error } = useSelector(state => state.pdppipeline);
    const [selectedOption, setSelectedOption] = useState("Model__lr");
    const [selectedMark, setSelectedMark] = useState("line");

    useEffect(() => {
        dispatch(fetchDataForPdpPipelineSlice({ feature1: selectedOption, xaitype: "pipeline", method: "pdp" }));
    }, [dispatch, selectedOption]);

    const handleChange = (e: SelectChangeEvent<string>) => {
        setSelectedOption(e.target.value);
    };

    const handleMarkChange = () => {
        setSelectedMark(prevMark => prevMark === 'line' ? 'bar' : 'line');
    };

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

export default PdpPipeline;

