

import React, { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Switch, Typography } from '@mui/material';
import { VegaLite } from 'react-vega';
import axios from "axios";
import SelectHyperParams from './SelectHyperParms';

const PdpPipeline = () => {
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
                    "explainabilityMethod": 'pdp',
                    "visualizationType": "line",
                    "constraints": {},
                    "additionalParams": {
                        "feature1": option
                    }
                }
            );
            setData(response.data);
            setLoading(false);
            setError(null);
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

    if (!loading && !error && data && data.hp && data.vals) {
        const keys = JSON.parse(data.hp)[0];
        const values = JSON.parse(data.vals)[0];
        const subddata = keys.map((key, index) => ({ HP: key, Values: values[index] }));
        console.log('subddata', subddata);


        const spec={
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "width": 1000,
            "height": 300,
            "params": [
              {
                "name": "interpolate",
                "value": "linear",
                "bind": {
                  "input": "select",
                  "options": [
                    "basis",
                    "cardinal",
                    "catmull-rom",
                    "linear",
                    "monotone",
                    "natural",
                    "step",
                    "step-after",
                    "step-before"
                  ]
                }
              },
            ],
            "data": {
              "values": subddata
            },
            "mark": {
              "type": "line",
              "interpolate": {"expr": "interpolate"},
            },
            "encoding": {
              "x": {"field": "HP", "type": "ordinal"},
              "y": {"field": "Values", "type": "quantitative"}
            }
          };
        vegaLiteComponent = <VegaLite spec={spec} />;
    }

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SelectHyperParams selectedOption={selectedOption} handleChange={handleChange} />

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
            </div>
        </div>
    );
};

export default PdpPipeline;
