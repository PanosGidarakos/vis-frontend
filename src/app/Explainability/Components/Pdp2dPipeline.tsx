
// import React, { useEffect, useState } from 'react';
// import { VegaLite } from 'react-vega';
// import axios from "axios";
// import SelectHyperParams from './Selectors/SelectHyperParms';

// const Pdp2dPipeline = () => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [selectedOption, setSelectedOption] = useState("Model__lr");

//     useEffect(() => {
//         if (selectedOption.trim() !== "") {
//             handleFetchFeature(selectedOption, "pipeline");
//         }
//     }, [selectedOption]);

//     const handleFetchFeature = async (option, xaitype) => {
//         try {
//             setLoading(true);
//             const response = await axios.post(
//                 'http://localhost:8080/api/visualization/explainability/i2cat_desktop_features',
//                 {
//                     "modelId": "UNSW_NB15_model",
//                     "explainabilityType": xaitype,
//                     "explainabilityMethod": 'pdp2d',
//                     "visualizationType": "line",
//                     "constraints": {},
//                     "additionalParams": {
//                         "feature1": option,
//                         "feature2":"Model__lr"
//                     }
//                 }
//             );
//             setData(response.data);
//             setLoading(false);
//             setError(null);
//             console.log('responedata',response.data);
//         } catch (error) {
//             setError('Failed to fetch data');
//             setLoading(false);
//         }
//     };
//     const handleChange = (e) => {
//         const value = e.target.value;
//         setSelectedOption(value);
//     };


//     let vegaLiteComponent = null;

//     if (!loading && !error && data && data.pdp2dXI && data.pdp2dYI &&data.pdp2dZI) {
//         const mappedData = [];
//         const xi = JSON.parse(data.pdp2dXI);
//         const yi = JSON.parse(data.pdp2dYI);
//         const zi = JSON.parse(data.pdp2dZI);

//         // Iterate over each xi and yi combination
//         for (let j = 0; j < yi.length; j++) {
//             const y = yi[j];
//             for (let i = 0; i < xi.length; i++) {
//                 const x = xi[i];
//                 const z = zi[j][i]; // Accessing z values from the 2D zi array
//                 // Assign value from zi to the mapped data
//                 mappedData.push({ x, y, value: z });
//             }
//         }   
//         const datal = {
//             values: mappedData
//         };
//         const spec = {
//             "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
//             "description": "A simple heatmap",
//             "width": 500,
//             "height": 400, 
            // "data": {
            //     values: JSON.parse(data.pdp2dZI).map((row, rowIndex) =>
            //         row.map((value, colIndex) => ({
            //             x: JSON.parse(data.pdp2dXI)[colIndex],
            //             y: JSON.parse(data.pdp2dYI)[rowIndex],
            //             value
            //         }))
            //     ).flat()
            // },
//             "mark": "rect",
//             "encoding": {
//             "x": {"field": "x", "type": "ordinal"},
//             "y": {"field": "y", "type": "ordinal"},
//             "color": {"field": "value", "type": "quantitative"}
//             }
//         };
//         vegaLiteComponent = <VegaLite spec={spec} />;
//     }

//     return (
//         <div style={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
//             {/* <div> */}
//             <SelectHyperParams selectedOption={selectedOption} handleChange={handleChange} />
//                    {loading ? (
//                         <p>Loading...</p>
//                     ) : data && !error && (
//                         <div></div>
//                     )}
//                     {error && <p>Error: {error}</p>}

//                     {selectedOption && vegaLiteComponent}
//             {/* </div> */}
//         </div>
//     );
// };

// export default Pdp2dPipeline;






import React, { useEffect, useState } from 'react';
import {  SelectChangeEvent, Switch, Typography } from '@mui/material';
import { VegaLite } from 'react-vega';
import SelectHyperParams from './Selectors/SelectHyperParms';
import { useDispatch, useSelector } from 'react-redux';
import {fetchDataForPdp2DPipelineSlice } from '../../../store/data/dataSlice';

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

