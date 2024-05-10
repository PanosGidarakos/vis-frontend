

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../../store/data/dataSlice';
import { AppDispatch } from '../../store';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Switch, Typography } from '@mui/material';
import { VegaLite } from 'react-vega';
import axios from 'axios';

const PdpModel = () => {
   
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedMark, setSelectedMark] = useState("line");

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


    const handleChange = (e: SelectChangeEvent<string>) => {
        const value = e.target.value as string;
        setSelectedOption(value);
    };

    const handleMarkChange = () => {
        setSelectedMark((prevMark) => (prevMark === 'line' ? 'bar' : 'line'));
    };

    let vegaLiteComponent = null;

    if (!loading && !error && data && data.effect && data.modelVal) {
       
        const keys = JSON.parse(data.modelVal)[0];
        const values = JSON.parse(data.effect)[0];
        const subddata = keys.map((key, index) => ({ a: key, b: values[index] }));

        const spec = {
            "width": 1000,
            "height": 300,
            "data": {
                "values": subddata,
            },
            "mark": { type: selectedMark },
            "encoding": {
                "x": { "field": "a", "type": "ordinal" },
                "y": { "field": "b", "type": "quantitative" },
            }
        };
        vegaLiteComponent = <VegaLite spec={spec} />;
    }

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-simple-select-label">Select Feature</InputLabel>
                <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selectedOption}
    label="Select Feature"
    onChange={handleChange}
>
    <MenuItem value="dur">dur</MenuItem>
    <MenuItem value="proto">proto</MenuItem>
    <MenuItem value="service">service</MenuItem>
    <MenuItem value="state">state</MenuItem>
    <MenuItem value="spkts">spkts</MenuItem>
    <MenuItem value="dpkts">dpkts</MenuItem>
    <MenuItem value="rate">rate</MenuItem>
    <MenuItem value="sttl">sttl</MenuItem>
    <MenuItem value="dttl">dttl</MenuItem>
    <MenuItem value="sload">sload</MenuItem>
    <MenuItem value="dload">dload</MenuItem>
    <MenuItem value="sinpkt">sinpkt</MenuItem>
    <MenuItem value="dinpkt">dinpkt</MenuItem>
    <MenuItem value="sjit">sjit</MenuItem>
    <MenuItem value="djit">djit</MenuItem>
    <MenuItem value="swin">swin</MenuItem>
    <MenuItem value="stcpb">stcpb</MenuItem>
    <MenuItem value="dtcpb">dtcpb</MenuItem>
    <MenuItem value="tcprtt">tcprtt</MenuItem>
    <MenuItem value="synack">synack</MenuItem>
    <MenuItem value="ackdat">ackdat</MenuItem>
    <MenuItem value="smean">smean</MenuItem>
    <MenuItem value="dmean">dmean</MenuItem>
    <MenuItem value="trans_depth">trans_depth</MenuItem>
    <MenuItem value="response_body_len">response_body_len</MenuItem>
    <MenuItem value="ct_srv_src">ct_srv_src</MenuItem>
    <MenuItem value="ct_state_ttl">ct_state_ttl</MenuItem>
    <MenuItem value="ct_dst_ltm">ct_dst_ltm</MenuItem>
    <MenuItem value="ct_dst_sport_ltm">ct_dst_sport_ltm</MenuItem>
    <MenuItem value="is_ftp_login">is_ftp_login</MenuItem>
    <MenuItem value="ct_flw_http_mthd">ct_flw_http_mthd</MenuItem>
    <MenuItem value="ct_src_ltm">ct_src_ltm</MenuItem>
    <MenuItem value="is_sm_ips_ports">is_sm_ips_ports</MenuItem>
</Select>
                {loading ? (
                    <p>Loading...</p>
                ) : data && !error && (
                    <div></div>
                )}
                {error && <p>Error: {error}</p>}

                {vegaLiteComponent}

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

export default PdpModel;