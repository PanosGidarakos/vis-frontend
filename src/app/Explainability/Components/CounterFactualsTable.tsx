import React, { useEffect, useState } from 'react';
import InteractiveTablePlugin from './Helpers/InteractiveTablePlugin';
import SelectHyperParams from './Selectors/SelectHyperParms';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDataForCounterfactualsPipelineSlice } from '../../../store/data/dataSlice';
import { SelectChangeEvent } from '@mui/material';


const CounterFactualsTable = () => {
    const dispatch = useDispatch();
    const { data, status, error } = useSelector((state) => state.counterfactualspipeline); // Modified useSelector
    const [selectedOption, setSelectedOption] = useState("Model__lr");
    const [selectedMark, setSelectedMark] = useState("line");

    console.log(data);

    useEffect(() => {
        dispatch(fetchDataForCounterfactualsPipelineSlice({ feature1: selectedOption, xaitype: "pipeline", method: "counterfactual" })); // Dispatch using the new action creator
    }, [dispatch, selectedOption]);
    let vegaLiteComponent = null;

    // Define subddata conditionally based on the availability of data
    if (data) {
        console.log('datadat',data.cfs);
        
        const columns = Object.keys(JSON.parse(data.cfs)[0]);
        vegaLiteComponent = <InteractiveTablePlugin data={JSON.parse(data.cfs)} columns={columns} height={0} width={0} tableSize="middle" />;
    }
    const handleChange = (e: SelectChangeEvent<string>) => {
        setSelectedOption(e.target.value as string);
    };

    const handleMarkChange = () => {
        setSelectedMark((prevMark) => (prevMark === 'line' ? 'bar' : 'line'));
    };

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <SelectHyperParams selectedOption={selectedOption} handleChange={handleChange} />
                {status === 'loading' && <p>Loading...</p>}
                {status === 'failed' && <p>Error: {error}</p>}
                {data && (
                    <div>
                        {/* Render additional UI components here */}
                    </div>
                )}
                {/* Render VegaLite component only when data is available */}
                {data && vegaLiteComponent}
              
            </div>
        </div>
    );
};

export default CounterFactualsTable;
