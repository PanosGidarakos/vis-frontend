import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const SelectHyperParams = ({ selectedOption, handleChange }) => {
    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-simple-select-label">Select a Hyperparameter </InputLabel>
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
        </FormControl>
    );
};

export default SelectHyperParams;
