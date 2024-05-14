// import React, { useEffect, useState } from 'react';
// import { Button, FormControl, Grid, Input, SelectChangeEvent, Switch, Typography } from '@mui/material';
// import { VegaLite } from 'react-vega';
// import SelectHyperParams from './Selectors/SelectHyperParms';
// import { useDispatch } from 'react-redux';
// import SelectHyperparamsModel from './Selectors/SelectHyperparamsModel';
// import { getGivenData } from './DataUtils';

// const GenericPlot = ({ fetchDataThunk, feature1, feature2, xaitype, method,xFieldName,yFieldName,mark,xtype,ytype}) => {
//     const dispatch = useDispatch();
//     const [data, setData] = useState(null);
//     const [status, setStatus] = useState('idle'); // Default status
//     const [error, setError] = useState(null);
//     const [selectedFeature1, setSelectedFeature1] = useState(feature1);
//     const [selectedMark, setSelectedMark] = useState(mark);
//     const [colorEnabled, setColorEnabled] = useState(false); // State to toggle color
//     const [aggregateFunction, setAggregateFunction] = useState(null); // State for aggregate function
//     const [searchQuery, setSearchQuery] = useState("Raw"); // State for search query

    

//     useEffect(() => {
//         const fetchData = async () => {
//             setStatus('loading');
//             try {
//                 const response = await dispatch(fetchDataThunk({ feature1: selectedFeature1, xaitype, method, feature2 }));
//                 setData(response.payload);
//                 setStatus('succeeded');
//                 console.log(response)
//             } catch (error) {
//                 setError(error.message);
//                 setStatus('failed');
//             }
//         };

//         fetchData();
//         console

//         // Cleanup function
//         return () => {
//             // Cleanup logic if needed
//         };
//     }, [dispatch, fetchDataThunk, selectedFeature1, xaitype, method]);

//     const handleChange = (e: SelectChangeEvent<string>) => {
//         setSelectedFeature1(e.target.value);
//     };

//     const handleMarkChange = () => {
//         setSelectedMark((prevMark: string) => prevMark === 'line' ? 'bar' : 'line');
//     };
   
//     const given = getGivenData(data, xaitype, method); // Use the function to determine 'given' data

//     return (
//         <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//             {xaitype === 'model' ? (
//                 <SelectHyperparamsModel selectedOption={selectedFeature1} handleChange={handleChange} />
//             ) : (
//                 <SelectHyperParams selectedOption={selectedFeature1} handleChange={handleChange} />
//             )}
          
        
//             {status === 'loading' && <p>Loading...</p>}
//             {status === 'failed' && <p>Error: {error}</p>}
//             {data && (
//                 <>
//                     <VegaLite
//                         spec={{
//                             "width": 500,
//                             "height": 300,
//                             "params": [
//                                 {
//                                   "name": "Interpolate",
//                                   "value": "linear",
//                                   "bind": {
//                                     "input": "select",
//                                     "options": [
//                                       "basis",
//                                       "cardinal",
//                                       "catmull-rom",
//                                       "linear",
//                                       "monotone",
                                    
//                                     ]
//                                   }
//                                 },
//                                 {
//                                     "name": "GroupBy",
//                                     "value": "linear",
//                                     "bind": {
//                                       "input": "select",
//                                       "options": [
//                                        "Cant",
//                                        "Decide",
//                                       ]
//                                     }
//                                   },
                                
                                
                                
//                               ],
//                             "data": { "values": given },
//                             "mark": { type: selectedMark },
//                             "encoding": {
//                                 "x": { "field": xFieldName, "type": xtype },
//                                 "y": { "aggregate":aggregateFunction,"field": yFieldName, "type": ytype },
//                                 ...(colorEnabled && {"color": {"field": "value", "type": "quantitative"}}) // Conditionally include color encoding

//                             }
//                         }}
//                     />
//                      <Grid container alignItems="center" spacing={2}> {/* Use Grid container */}
//                         <Grid item>
//                             <Typography variant="subtitle1" gutterBottom>{selectedMark}</Typography>
//                         </Grid>
//                         <Grid item>
//                             <Switch checked={selectedMark === 'bar'} onChange={handleMarkChange} inputProps={{ 'aria-label': 'controlled' }} />
//                         </Grid>
//                         <Grid item>
//                             <Typography variant="subtitle1" gutterBottom>Enable Color</Typography>
//                         </Grid>
//                         <Grid item>
//                             <Switch checked={colorEnabled} onChange={() => setColorEnabled(!colorEnabled)} inputProps={{ 'aria-label': 'controlled' }} />
//                         </Grid>
//                     </Grid>

//                     <FormControl
//                         onSubmit={(e) => {
//                             e.preventDefault();
//                             dispatch(fetchDataThunk({ feature1: selectedFeature1, xaitype, method, feature2 }));
//                         }}>
//                         <Input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search Aggregate Function"
//                         />
//                         <Button type="submit">Aggregate</Button>
//                     </FormControl>
//                 </>
//             )}
//         </div>
//     );
// };

// export default GenericPlot;




// import React, { useEffect, useState } from 'react';
// import { Button, FormControl, Grid, Input, SelectChangeEvent, Switch, Typography } from '@mui/material';
// import { VegaLite } from 'react-vega';
// import SelectHyperParams from './Selectors/SelectHyperParms';
// import { useDispatch } from 'react-redux';
// import SelectHyperparamsModel from './Selectors/SelectHyperparamsModel';
// import { getGivenData } from './DataUtils';

// const GenericPlot = ({ fetchDataThunk, feature1, feature2, xaitype, method, xFieldName, yFieldName, mark, xtype, ytype }) => {
//     const dispatch = useDispatch();
//     const [data, setData] = useState(null);
//     const [status, setStatus] = useState('idle'); // Default status
//     const [error, setError] = useState(null);
//     const [selectedFeature1, setSelectedFeature1] = useState(feature1);
//     const [selectedMark, setSelectedMark] = useState(mark);
//     const [colorEnabled, setColorEnabled] = useState(false); // State to toggle color
//     const [aggregateFunction, setAggregateFunction] = useState(null); // State for aggregate function
//     const [searchQuery, setSearchQuery] = useState("Raw"); // State for search query
//     const [switchEnabled, setSwitchEnabled] = useState(false); // State to control section visibility

//     useEffect(() => {
//         const fetchData = async () => {
//             setStatus('loading');
//             try {
//                 const response = await dispatch(fetchDataThunk({ feature1: selectedFeature1, xaitype, method, feature2 }));
//                 setData(response.payload);
//                 setStatus('succeeded');
//             } catch (error) {
//                 setError(error.message);
//                 setStatus('failed');
//             }
//         };

//         fetchData();

//         // Cleanup function
//         return () => {
//             // Cleanup logic if needed
//         };
//     }, [dispatch, fetchDataThunk, selectedFeature1, xaitype, method]);

//     const handleChange = (e: SelectChangeEvent<string>) => {
//         setSelectedFeature1(e.target.value);
//     };

//     const handleMarkChange = () => {
//         setSelectedMark((prevMark: string) => prevMark === 'line' ? 'bar' : 'line');
//     };

//     const given = getGivenData(data, xaitype, method); // Use the function to determine 'given' data

//     return (
//         <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//             {xaitype === 'model' ? (
//                 <SelectHyperparamsModel selectedOption={selectedFeature1} handleChange={handleChange} />
//             ) : (
//                 <SelectHyperParams selectedOption={selectedFeature1} handleChange={handleChange} />
//             )}

//             {status === 'loading' && <p>Loading...</p>}
//             {status === 'failed' && <p>Error: {error}</p>}
//             {data && (
//                 <>
//                     <VegaLite
//                         spec={{
//                             "width": 500,
//                             "height": 300,
//                             "params": [
//                                 {
//                                     "name": "Interpolate",
//                                     "value": "linear",
//                                     "bind": {
//                                         "input": "select",
//                                         "options": [
//                                             "basis",
//                                             "cardinal",
//                                             "catmull-rom",
//                                             "linear",
//                                             "monotone",

//                                         ]
//                                     }
//                                 },
//                                 {
//                                     "name": "GroupBy",
//                                     "value": "linear",
//                                     "bind": {
//                                         "input": "select",
//                                         "options": [
//                                             "Cant",
//                                             "Decide",
//                                         ]
//                                     }
//                                 },



//                             ],
//                             "data": { "values": given },
//                             "mark": { type: selectedMark },
//                             "encoding": {
//                                 "x": { "field": xFieldName, "type": xtype },
//                                 "y": { "aggregate": aggregateFunction, "field": yFieldName, "type": ytype },
//                                 ...(colorEnabled && { "color": { "field": "value", "type": "quantitative" } }) // Conditionally include color encoding

//                             }
//                         }}
//                     />

//                     {switchEnabled && (
//                         <>
//                             <Grid container alignItems="center" spacing={2}>
//                                 <Grid item>
//                                     <Typography variant="subtitle1" gutterBottom>{selectedMark}</Typography>
//                                 </Grid>
//                                 <Grid item>
//                                     <Switch checked={selectedMark === 'bar'} onChange={handleMarkChange} inputProps={{ 'aria-label': 'controlled' }} />
//                                 </Grid>
//                                 <Grid item>
//                                     <Typography variant="subtitle1" gutterBottom>Enable Color</Typography>
//                                 </Grid>
//                                 <Grid item>
//                                     <Switch checked={colorEnabled} onChange={() => setColorEnabled(!colorEnabled)} inputProps={{ 'aria-label': 'controlled' }} />
//                                 </Grid>
//                             </Grid>

//                             <FormControl
//                                 onSubmit={(e) => {
//                                     e.preventDefault();
//                                     dispatch(fetchDataThunk({ feature1: selectedFeature1, xaitype, method, feature2 }));
//                                 }}>
//                                 <Input
//                                     type="text"
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                     placeholder="Search Aggregate Function"
//                                 />
//                                 <Button type="submit">Aggregate</Button>
//                             </FormControl>
//                         </>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default GenericPlot;





import React, { useEffect, useState } from 'react';
import { Button, FormControl, Grid, Input, SelectChangeEvent, Switch, Typography } from '@mui/material';
import { VegaLite } from 'react-vega';
import SelectHyperParams from './Selectors/SelectHyperParms';
import { useDispatch } from 'react-redux';
import SelectHyperparamsModel from './Selectors/SelectHyperparamsModel';
import { getGivenData } from './DataUtils';

const GenericPlot = ({ fetchDataThunk, feature1, feature2, xaitype, method, xFieldName, yFieldName, mark, xtype, ytype }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('idle'); // Default status
    const [error, setError] = useState(null);
    const [selectedFeature1, setSelectedFeature1] = useState(feature1);
    const [selectedMark, setSelectedMark] = useState(mark);
    const [colorEnabled, setColorEnabled] = useState(false); // State to toggle color
    const [aggregateFunction, setAggregateFunction] = useState(null); // State for aggregate function
    const [searchQuery, setSearchQuery] = useState("Raw"); // State for search query
    const [switchEnabled, setSwitchEnabled] = useState(false); // State to control section visibility
    

    useEffect(() => {
        if (method === 'pdp2d') {
            setColorEnabled(true);
        } else {
            setColorEnabled(false);
        }
        const fetchData = async () => {
            setStatus('loading');
            try {
                const response = await dispatch(fetchDataThunk({ feature1: selectedFeature1, xaitype, method, feature2 }));
                setData(response.payload);
                setStatus('succeeded');
            } catch (error) {
                setError(error.message);
                setStatus('failed');
            }
        };

        fetchData();

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

    const toggleSectionVisibility = () => {
        setSwitchEnabled(!switchEnabled);
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
                            "width": 500,
                            "height": 300,
                            "data": { "values": given },
                            "mark": { type: selectedMark },
                            "encoding": {
                                "x": { "field": xFieldName, "type": xtype },
                                "y": {"field": yFieldName, "type": ytype },
                                ...(colorEnabled && { "color": { "field": "value", "type": "quantitative" } }) // Conditionally include color encoding

                            }
                        }}
                    />

                    <Switch checked={switchEnabled} onChange={toggleSectionVisibility} />
                    <label>  Menu Visibility</label>

                    {switchEnabled && (
                        <>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item>
                                    <Typography variant="subtitle1" gutterBottom>Type {selectedMark}</Typography>
                                </Grid>
                                <Grid item>
                                    <Switch checked={selectedMark === 'bar'} onChange={handleMarkChange} inputProps={{ 'aria-label': 'controlled' }} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" gutterBottom>Enable Color</Typography>
                                </Grid>
                                <Grid item>
                                    <Switch checked={colorEnabled} onChange={() => setColorEnabled(!colorEnabled)} inputProps={{ 'aria-label': 'controlled' }} />
                                </Grid>
                            </Grid>

                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default GenericPlot;
