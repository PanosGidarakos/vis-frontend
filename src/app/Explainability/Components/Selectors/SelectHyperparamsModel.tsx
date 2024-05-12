import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const SelectHyperparamsModel = ({ selectedOption, handleChange }) => {
    return (
         <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-simple-select-label">Select Hyperparameters</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedOption}
            label="Select Feature"
            onChange={handleChange}
            MenuProps={{
                PaperProps: {
                    style: {
                        maxHeight: 200, // Adjust the maximum height of the menu as needed
                    },
                },
            }}
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
        </FormControl>
    );
};

export default SelectHyperparamsModel;
