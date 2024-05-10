
import React, { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Switch, Typography } from '@mui/material';
import { VegaLite } from 'react-vega';
import axios from "axios";

const Pdp2d = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedMark, setSelectedMark] = useState("line");

    useEffect(() => {
        if (selectedOption.trim() !== "") {
            handleFetchFeature(selectedOption, "pipeline");
        }
    }, [selectedOption]);

    const handleFetchFeature = async (option, xaitype) => {
        try {
            setLoading(true);
            const response = await axios.post(
                'http://localhost:8080/api/visualization/explainability/i2cat_desktop_features',
                {
                    "modelId": "UNSW_NB15_model",
                    "explainabilityType": xaitype,
                    "explainabilityMethod": 'pdp2d',
                    "visualizationType": "line",
                    "constraints": {},
                    "additionalParams": {
                        "feature1": option,
                        "feature2":"Model__batch_size"
                    }
                }
            );
            setData(response.data);
            setLoading(false);
            setError(null);
            console.log('responedata',response.data);
        } catch (error) {
            setError('Failed to fetch data');
            setLoading(false);
        }
    };
    console.log('data,',data)

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
    };

    const handleMarkChange = () => {
        setSelectedMark((prevMark) => (prevMark === 'line' ? 'bar' : 'line'));
    };

    let vegaLiteComponent = null;

    if (!loading && !error && data && data.pdp2dXI && data.pdp2dYI &&data.pdp2dZI) {
        const keys = data.pdp2dXI[0];
        const keys2=data.pdp2dYI[0];
        const values = JSON.parse(data.pdp2dZI)[0];
    const subddata = keys.map((key, index) => ({ Xi: key, Yi: keys2[index], Values: values[index] }));
        console.log('subddata',subddata);

        const spec = {
            "width": 500,
            "height": 500,
            "data": {
                "values": subddata,
            },
            "mark": { type: selectedMark },
            "encoding": {
                "x": { "field": "HP", "type": "quantitative" },
                "y": { "field": "Values", "type": "quantitative" },
            }
        };
        vegaLiteComponent = <VegaLite spec={spec} />;
    }

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-simple-select-label">Select Feature</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedOption}
                        label="Select Feature"
                        onChange={handleChange}
                    >
                        <MenuItem value="Model__lr">Model__lr</MenuItem>
                        <MenuItem value="Model__batch_size">Model__batch_size</MenuItem>
                        <MenuItem value="preprocessor__num__scaler">preprocessor__num__scaler</MenuItem>
                        <MenuItem value="Model__optimizer">Model__optimizer</MenuItem>
                    </Select>
                    {loading ? (
                        <p>Loading...</p>
                    ) : data && !error && (
                        <div></div>
                    )}
                    {error && <p>Error: {error}</p>}

                    {selectedOption && vegaLiteComponent}

                    <Typography variant="subtitle1" gutterBottom>
                        {selectedMark}
                    </Typography>
                    <Switch
                        checked={selectedMark === 'bar'}
                        onChange={handleMarkChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </FormControl>
            </div>
        </div>
    );
};

export default Pdp2d;
