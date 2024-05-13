import React, { useEffect, useState } from 'react';
import { SelectChangeEvent, Switch, Typography } from '@mui/material';
import { VegaLite } from 'react-vega';
import SelectHyperParams from './Selectors/SelectHyperParms';
import { useDispatch } from 'react-redux';
import SelectHyperparamsModel from './Selectors/SelectHyperparamsModel';
import { getGivenData } from './DataUtils';
const GenericPlot = ({ fetchDataThunk, feature1, feature2, xaitype, method,xFieldName,yFieldName,mark}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('idle'); // Default status
    const [error, setError] = useState(null);
    const [selectedFeature1, setSelectedFeature1] = useState(feature1);
    const [selectedMark, setSelectedMark] = useState(mark);

    useEffect(() => {
        const fetchData = async () => {
            setStatus('loading');
            try {
                const response = await dispatch(fetchDataThunk({ feature1: selectedFeature1, xaitype, method, feature2 }));
                setData(response.payload);
                setStatus('succeeded');
                console.log(response)
            } catch (error) {
                setError(error.message);
                setStatus('failed');
            }
        };

        fetchData();
        console

        // Cleanup function
        return () => {
            // Cleanup logic if needed
        };
    }, [dispatch, fetchDataThunk, selectedFeature1, xaitype, method]);

    const handleChange = (e: SelectChangeEvent<string>) => {
        setSelectedFeature1(e.target.value);
    };

    const handleMarkChange = () => {
        setSelectedMark((prevMark: string) => prevMark === 'line' ? 'bar' : 'line');
    };
   
    const given = getGivenData(data, xaitype, method); // Use the function to determine 'given' data

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {xaitype === 'model' ? (
                <SelectHyperparamsModel selectedOption={selectedFeature1} handleChange={handleChange} />
            ) : (
                <SelectHyperParams selectedOption={selectedFeature1} handleChange={handleChange} />
            )}
        
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {data && (
                <>
                    <VegaLite
                        spec={{
                            "width": 1000,
                            "height": 300,
                            "data": { "values": given },
                            "mark": { type: selectedMark },
                            "encoding": {
                                "x": { "field": xFieldName, "type": "ordinal" },
                                "y": { "field": yFieldName, "type": "ordinal" },
                                // "color": {"field": "value", "type": "quantitative"}

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

export default GenericPlot;
