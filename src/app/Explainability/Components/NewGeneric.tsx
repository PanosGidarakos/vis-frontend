import React, { useEffect, useState } from 'react';
import { Typography, Switch } from '@mui/material';
import { VegaLite } from 'react-vega';
import SelectHyperParams from './Selectors/SelectHyperParms';
import { useDispatch } from 'react-redux';

const NewGeneric = ({ fetchDataThunk, defaultOption, xaitype, method, vegaSpec, parseData,xaxis,yaxis}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const [selectedMark, setSelectedMark] = useState("line");

    useEffect(() => {
        const fetchData = async () => {
            setStatus('loading');
            try {
                const response = await dispatch(fetchDataThunk({ feature1: selectedOption, xaitype, method }));
                setData(response.payload);
                setStatus('succeeded');
            } catch (error) {
                setError(error.message);
                setStatus('failed');
            }
        };

        fetchData();

        return () => {
            // Cleanup logic if needed
        };
    }, [dispatch, fetchDataThunk, selectedOption, xaitype, method]);

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleMarkChange = () => {
        setSelectedMark(prevMark => prevMark === 'line' ? 'bar' : 'line');
    };

    const parsedData = parseData(data);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SelectHyperParams selectedOption={selectedOption} handleChange={handleChange} />
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {parsedData && (
                <>
                    <VegaLite
                         spec={vegaSpec}
                        // data={{ values: parsedData }}
                        mark={{ type: selectedMark }}
                        encoding={{
                            x: { field: "HP", type: "ordinal" },
                            y: { field: "Values", type: "ordinal" }
                        }}
                      
                        data={{ values: parsedData }}
                    />
                    <Typography variant="subtitle1" gutterBottom>{selectedMark}</Typography>
                    <Switch checked={selectedMark === 'bar'} onChange={handleMarkChange} inputProps={{ 'aria-label': 'controlled' }} />
                </>
            )}
        </div>
    );
};

export default NewGeneric;
