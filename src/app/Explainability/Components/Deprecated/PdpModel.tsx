import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent, Switch, Typography } from '@mui/material';
import { VegaLite } from 'react-vega';
import SelectHyperparamsModel from '../Selectors/SelectHyperparamsModel';
import { fetchDataForPdpModelSlice} from '../../../../store/data/dataSlice';


const PdpModel = () => {
    const dispatch = useDispatch();
    const { data, status, error } = useSelector((state) => state.pdpmodel);
    const [selectedOption, setSelectedOption] = useState("proto");
    const [selectedMark, setSelectedMark] = useState("line");


    useEffect(() => {
        dispatch(fetchDataForPdpModelSlice({ feature1: selectedOption, xaitype: "model", method: "pdp" })); // Dispatch using the new action creator
    }, [dispatch, selectedOption]);

    // Define subddata conditionally based on the availability of data
    const subddata = data ? (
        JSON.parse(data.modelVal)[0].map((key, index) => ({ HP: key, Values: JSON.parse(data.effect)[0][index] }))
    ) : [];

    const handleChange = (e: SelectChangeEvent<string>) => {
        setSelectedOption(e.target.value as string);
    };

    const handleMarkChange = () => {
        setSelectedMark((prevMark) => (prevMark === 'line' ? 'bar' : 'line'));
    };
    console.log('datapdp model',data);
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
                            "data": { "values": subddata },
                            "mark": { type: selectedMark },
                            "encoding": {
                                "x": {"field": "HP", "type": "ordinal"},
                                "y": {"field": "Values", "type": "quantitative"}
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

export default PdpModel;



