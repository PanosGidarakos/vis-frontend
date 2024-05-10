

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getData } from '../../../store/data/dataSlice';
// import { AppDispatch } from '../../store';
// import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Switch, Typography } from '@mui/material';
// import { VegaLite } from 'react-vega';

// const PdpPipeline = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const data = useSelector((state: any) => state.data.data);
//     console.log('data', data);
//     const loading = useSelector((state: any) => state.data.status);
//     const error = useSelector((state: any) => state.data.error);
//     const [selectedOption, setSelectedOption] = useState("");
//     const [selectedMark, setSelectedMark] = useState("line");

//     useEffect(() => {
//         handleFetchFeature(selectedOption);
//     }, [selectedOption]);

//     const handleFetchFeature = (option: string) => {
//         if (option.trim() !== "") {
//             dispatch(getData(option));
//         }
//     };

//     const handleChange = (e: SelectChangeEvent<string>) => {
//         const value = e.target.value as string;
//         setSelectedOption(value);
//     };

//     const handleMarkChange = () => {
//         setSelectedMark((prevMark) => (prevMark === 'line' ? 'bar' : 'line'));
//     };

//     let vegaLiteComponent = null;

//     if (!loading && !error && data && data.hp && data.vals) {
//         let hpArray = JSON.parse(data.hp);
//         let valsArray = JSON.parse(data.vals);
//         const keys = JSON.parse(data.hp)[0];
//         const values = JSON.parse(data.vals)[0];
//         const subddata = keys.map((key, index) => ({ a: key, b: values[index] }));

//         const spec = {
//             "width": 500,
//             "height": 500,
//             "data": {
//                 "values": subddata,
//             },
//             "mark": { type: selectedMark },
//             "encoding": {
//                 "x": { "field": "a", "type": "quantitative" },
//                 "y": { "field": "b", "type": "quantitative" },
//             }
//         };
//         vegaLiteComponent = <VegaLite spec={spec} />;
//     }

//     return (
//         <div>
//             <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

//             <FormControl sx={{ m: 1, width: 300 }}>
//                 <InputLabel id="demo-simple-select-label">Select Feature</InputLabel>
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={selectedOption}
//                     label="Select Feature"
//                     onChange={handleChange}
//                 >
//                     <MenuItem value="Model__lr">Model__lr</MenuItem>
//                     <MenuItem value="Model__batch_size">Model__batch_size</MenuItem>
//                     <MenuItem value="preprocessor__num__scaler">preprocessor__num__scaler</MenuItem>
//                     <MenuItem value="Model__optimizer">Model__optimizer</MenuItem>
//                 </Select>
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : data && !error && (
//                     <div></div>
//                 )}
//                 {error && <p>Error: {error}</p>}

//                 {vegaLiteComponent}

//                 <Typography variant="subtitle1" gutterBottom>
//                     Select Mark Type
//                 </Typography>
//                 <Switch
//                     checked={selectedMark === 'bar'}
//                     onChange={handleMarkChange}
//                     inputProps={{ 'aria-label': 'controlled' }}
//                 />
//             </FormControl>
//             </div>
//         </div>
//     );
// };

// export default PdpPipeline;














// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getData } from '../../../store/data/dataSlice';
// import { AppDispatch } from '../../store';
// import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Switch, Typography } from '@mui/material';
// import { VegaLite } from 'react-vega';

// const PdpPipeline = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const data = useSelector((state: any) => state.data.data);
//     console.log(data);
//     const loading = useSelector((state: any) => state.data.status);
//     const error = useSelector((state: any) => state.data.error);
//     const [selectedOption, setSelectedOption] = useState("");
//     const [selectedMark, setSelectedMark] = useState("line");

//     useEffect(() => {
//         handleFetchFeature(selectedOption);
//     }, [selectedOption]);

//     const handleFetchFeature = (option: string) => {
//         if (option.trim() !== "") {
//             dispatch(getData({city:option, xaitype:"pipeline"}));
//         }
//     };

//     const handleChange = (e: SelectChangeEvent<string>) => {
//         const value = e.target.value as string;
//         setSelectedOption(value);
//     };

//     const handleMarkChange = () => {
//         setSelectedMark((prevMark) => (prevMark === 'line' ? 'bar' : 'line'));
//     };

//     let vegaLiteComponent = null;

//     if (!loading && !error && data && data.hp && data.vals) {
        
//         const keys = JSON.parse(data.hp)[0];
//         const values = JSON.parse(data.vals)[0];
//         const subddata = keys.map((key, index) => ({ HP: key, Values: values[index] }));

//         const spec = {
//             "width": 500,
//             "height": 500,
//             "data": {
//                 "values": subddata,
//             },
//             "params": [
//                 // {
//                 // "name": "grid",
//                 // "select": "interval",

//                 ////selec box
//                 // "value": {"x": [55, 160], "y": [13, 37]},
//                 ////zoom

//                 // "bind": "scales",
      
//             //   }
//             ] ,

//             "mark": { type: selectedMark },
//             "encoding": {
//                 "x": { "field": "HP", "type": "quantitative" },
//                 "y": { "field": "Values", "type": "quantitative" },
//             }
//         };
        
//         vegaLiteComponent = <VegaLite spec={spec} />;
//     }

//     return (
//         <div>
//             <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
//                 <FormControl sx={{ m: 1, width: 300 }}>
//                     <InputLabel id="demo-simple-select-label">Select Feature</InputLabel>
//                     <Select
//                         labelId="demo-simple-select-label"
//                         id="demo-simple-select"
//                         value={selectedOption}
//                         label="Select Feature"
//                         onChange={handleChange}
//                     >
//                         <MenuItem value="Model__lr">Model__lr</MenuItem>
//                         <MenuItem value="Model__batch_size">Model__batch_size</MenuItem>
//                         <MenuItem value="preprocessor__num__scaler">preprocessor__num__scaler</MenuItem>
//                         <MenuItem value="Model__optimizer">Model__optimizer</MenuItem>
//                     </Select>
//                     {loading ? (
//                         <p>Loading...</p>
//                     ) : data && !error && (
//                         <div></div>
//                     )}
//                     {error && <p>Error: {error}</p>}

//                     {selectedOption && vegaLiteComponent}

//                     <Typography variant="subtitle1" gutterBottom>
//                         {selectedMark}
//                     </Typography>
//                     <Switch
//                         checked={selectedMark === 'bar'}
//                         onChange={handleMarkChange}
//                         inputProps={{ 'aria-label': 'controlled' }}
//                     />
//                 </FormControl>
//             </div>
//         </div>
//     );
// };

// export default PdpPipeline;








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

        // const spec = {
        //     "width": 500,
        //     "height": 500,
        //     "data": {
        //         "values": subddata,
        //     },
        //     "mark": { type: selectedMark },
        //     "encoding": {
        //         "x": { "field": "HP", "type": "quantitative" },
        //         "y": { "field": "Values", "type": "quantitative" },
        //     }
        // };

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
            //   {
            //     "name": "tension",
            //     "value": 0,
            //     "bind": {"input": "range", "min": 0, "max": 1, "step": 0.05}
            //   },
            //   {
            //     "name": "strokeWidth",
            //     "value": 2,
            //     "bind": {"input": "range", "min": 0, "max": 10, "step": 0.5}
            //   },
            //   {
            //     "name": "strokeCap",
            //     "value": "butt",
            //     "bind": {"input": "select", "options": ["butt", "round", "square"]}
            //   },
            //   {
            //     "name": "strokeDash",
            //     "value": [1, 0],
            //     "bind": {
            //       "input": "select",
            //       "options": [[1, 0], [8, 8], [8, 4], [4, 4], [4, 2], [2, 1], [1, 1]]
            //     }
            //   }
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
