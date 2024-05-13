
import React, { useEffect, useState } from 'react';
import { VegaLite } from 'react-vega';
import axios from "axios";
import SelectHyperparamsModel from '../Selectors/SelectHyperparamsModel';

const Pdp2dModel = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState("rate");

    useEffect(() => {
        if (selectedOption.trim() !== "") {
            handleFetchFeature(selectedOption, "model");
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
                        "feature2":"rate"
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
    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
    };


    let vegaLiteComponent = null;

    if (!loading && !error && data && data.pdp2dXI && data.pdp2dYI &&data.pdp2dZI) {
        const mappedData = [];
        const xi = JSON.parse(data.pdp2dXI);
        const yi = JSON.parse(data.pdp2dYI);
        const zi = JSON.parse(data.pdp2dZI);

        // Iterate over each xi and yi combination
        for (let j = 0; j < yi.length; j++) {
            const y = yi[j];
            for (let i = 0; i < xi.length; i++) {
                const x = xi[i];
                const z = zi[j][i]; // Accessing z values from the 2D zi array
                // Assign value from zi to the mapped data
                mappedData.push({ x, y, value: z });
            }
        }   
        const datal = {
            values: mappedData
        };
        const spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "description": "A simple heatmap",
            "width": 500,
            "height": 400, 
            "data": { values: datal.values }, 
            "mark": "rect",
            "encoding": {
            "x": {"field": "x", "type": "ordinal"},
            "y": {"field": "y", "type": "ordinal"},
            "color": {"field": "value", "type": "quantitative"}
            }
        };
        vegaLiteComponent = <VegaLite spec={spec} />;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
            {/* <div> */}
            <SelectHyperparamsModel selectedOption={selectedOption} handleChange={handleChange} />
                   {loading ? (
                        <p>Loading...</p>
                    ) : data && !error && (
                        <div></div>
                    )}
                    {error && <p>Error: {error}</p>}

                    {selectedOption && vegaLiteComponent}
            {/* </div> */}
        </div>
    );
};

export default Pdp2dModel;
