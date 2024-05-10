import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface Option {
  value: string | number;
  name: string;
}

interface SelectororoProps {
  name: string;
  options: Option[];
}

const SelectOpt: React.FC<SelectororoProps> = ({name, options }) => {
  return (
    <FormControl required sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id={`${name}-label`}>{name}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={`${name}-select`}
        label={`${name}*`}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectOpt;
