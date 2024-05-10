// import React, { useEffect, useState } from 'react';
// import { Select, MenuItem, FormControl, InputLabel, } from '@mui/material';
// import axios from 'axios';
// import InteractiveTablePlugin from './InteractiveTablePlugin';

// const CounterFactualsTable = () => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [selectedOption, setSelectedOption] = useState("Model__lr");

//     useEffect(() => {
//         if (selectedOption.trim() !== "") {
//             handleFetchFeature(selectedOption, "pipeline");
//         }
//     }, [selectedOption]);

//     const handleFetchFeature = async (option: string, xaitype: string) => {
//         try {
//             setLoading(true);
//             const response = await axios.post(
//                 'http://localhost:8080/api/visualization/explainability/i2cat_desktop_features',
//                 {
//                     "modelId": "UNSW_NB15_model",
//                     "explainabilityType": xaitype,
//                     "explainabilityMethod": 'counterfactual',
//                     "visualizationType": "line",
//                     "constraints": {},
//                     "additionalParams": {
//                         "feature1": option
//                     }
//                 }
//             );
//             setData(response.data);
//             setLoading(false);
//             setError(null);
//         } catch (error) {
//             setError(error);
//             setLoading(false);
//         }
//     };


//     const handleChange = (e: { target: { value: any; }; }) => {
//         const value = e.target.value;
//         setSelectedOption(value);
//     };

   

//     let vegaLiteComponent = null;
//     console.log('data',data)

//     if (!loading && !error && data && data.cfs  ) {
//         console.log('cfs',JSON.parse(data.cfs));
//         const columns = Object.keys(JSON.parse(data.cfs)[0]);
//         console.log('columns',columns);
//         vegaLiteComponent = <InteractiveTablePlugin data={JSON.parse(data.cfs)}  columns={columns}
//         height={0} // Specify the height you desire
//         width={0} // Specify the width you desire
//         tableSize="middle" // Or 'small', 'large', or leave undefined;
//         />
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

//                 </FormControl>
//             </div>
//         </div>
//     );
// };


// export default CounterFactualsTable;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InteractiveTablePlugin from './InteractiveTablePlugin';
import SelectHyperParams from './SelectHyperParms';

const CounterFactualsTable = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState("Model__lr");

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
                    "explainabilityMethod": 'counterfactual',
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
            setError("error");
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
    };

    let vegaLiteComponent = null;

    if (!loading && !error && data && data.cfs) {
        const columns = Object.keys(JSON.parse(data.cfs)[0]);
        vegaLiteComponent = <InteractiveTablePlugin data={JSON.parse(data.cfs)} columns={columns} height={0} width={0} tableSize="middle" />;
    }

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SelectHyperParams selectedOption={selectedOption} handleChange={handleChange} />
                {loading ? <p>Loading...</p> : data && !error && <div></div>}
                {error && <p>Error: {error}</p>}

                {selectedOption && vegaLiteComponent}


            </div>
        </div>
    );
};

export default CounterFactualsTable;
