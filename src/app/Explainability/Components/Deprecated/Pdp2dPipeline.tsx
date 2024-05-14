import React, { useEffect, useState } from 'react';
import {  SelectChangeEvent, Switch, Typography } from '@mui/material';
import { VegaLite } from 'react-vega';
import SelectHyperParams from '../Selectors/SelectHyperParms';
import { useDispatch, useSelector } from 'react-redux';
import {fetchDataForPdp2DPipelineSlice } from '../../../../store/data/explainabilitySlice';

const Pdp2dPipeline = () => {
    const dispatch = useDispatch();
    const { data, status, error } = useSelector(state => state.pdp2dpipeline);
    const [selectedFeature1, setSelectedFeature1] = useState("Model__lr");
    const [selectedFeature2, setSelectedFeature2] = useState("Model__batch_size");

    const [selectedMark, setSelectedMark] = useState("line");

    useEffect(() => {
        dispatch(fetchDataForPdp2DPipelineSlice({ feature1: selectedFeature1, xaitype: "pipeline", method: "pdp2d",feature2: selectedFeature2 }));
    }, [dispatch, selectedFeature1, selectedFeature2]);

    const handleChangeFeature1 = (e: SelectChangeEvent<string>) => {
        setSelectedFeature1(e.target.value);
    };

    const handleChangeFeature2 = (e: SelectChangeEvent<string>) => {
        setSelectedFeature2(e.target.value);
    };

    const handleMarkChange = () => {
        setSelectedMark(prevMark => prevMark === 'line' ? 'bar' : 'line');
    };
    console.log(data)
   

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SelectHyperParams selectedOption={selectedFeature1} handleChange={handleChangeFeature1} />
            <SelectHyperParams selectedOption={selectedFeature2} handleChange={handleChangeFeature2} />

            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {data && (
                <>
                    <VegaLite
                        spec={{
                            "width": 1000,
                            "height": 300,
                            "data": {
                                values: JSON.parse(data.pdp2dZI).map((row, rowIndex) =>
                                    row.map((value, colIndex) => ({
                                        x: JSON.parse(data.pdp2dXI)[colIndex],
                                        y: JSON.parse(data.pdp2dYI)[rowIndex],
                                        value
                                    }))
                                ).flat()
                            },
                            "mark": { type: "rect" },
                            "encoding": {
                                "x": { "field": "x", "type": "ordinal" },
                                "y": { "field": "y", "type": "ordinal" },
                                "color": {"field": "value", "type": "quantitative"}

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

export default Pdp2dPipeline;

