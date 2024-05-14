import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {Grid} from '@mui/material';
import SelectOpt from './Select';
import * as alloptions from './options';

import { useDispatch } from "react-redux";
import { getData } from "../store/data/explainabilitySlice";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Topbar: React.FC = () => {
    
  const classes = useStyles();
  const [explanationMethod, setExplanationMethod] = useState<string>('');
  const [explanationType, setExplanationType] = useState<string>('');
  const [modelIdVisualizationType, setModelIdVisualizationType] = useState<string>('');
  const [additionalParams, setAdditionalParams] = useState<string>('');

  const handleExplanationMethodChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setExplanationMethod(event.target.value as string);
  };

  const handleExplanationTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setExplanationType(event.target.value as string);
  };

  const handleModelIdVisualizationTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setModelIdVisualizationType(event.target.value as string);
  };

  const handleAdditionalParamsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAdditionalParams(event.target.value as string);
  };

  return (
    <div className={classes.root}>
    
      <Grid container spacing={2} justifyContent="center">

        <Grid item>
            <SelectOpt  name="XAI Type" options={alloptions.explainabilityTypeOptions}/>
        </Grid>

        <Grid item>
            <SelectOpt  name="Viz Type" options={alloptions.visualizationTypeOptions}/>
        </Grid>

        <Grid item>
            <SelectOpt  name="Model Id" options={alloptions.modelIdOptions}/>
        </Grid>

        <Grid item>
            <SelectOpt  name="Added Params" options={alloptions.modelIdOptions}/>
        </Grid>

        <Grid item>
            <SelectOpt  name="XAI Method" options={alloptions.explainabilityMethodOptions}/>
        </Grid>
      </Grid>
     
    </div>
  );
};

export default Topbar;

