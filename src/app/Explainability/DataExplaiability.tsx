import {Container} from "@mui/material";
import CounterFactualsTable from "./Components/CounterFactualsTable";
import GenericPlot from "./Components/GenericPlot";
import { fetchDataForAleModelSlice, fetchDataForAlePipelineSlice, fetchDataForPdp2DPipelineSlice, fetchDataForPdpModelSlice, fetchDataForPdpPipelineSlice } from "../../store/data/dataSlice";

const DataExplainability: React.FC = () => {
  return (<Container fixed>
    <h1>Pdp Pipeline</h1>
    <GenericPlot 
    fetchDataThunk={fetchDataForPdpPipelineSlice} 
    feature1="Model__lr" 
    feature2= {null}
    xaitype="pipeline" 
    method="pdp" 
    xFieldName="HP"
    yFieldName="Values"
    mark="line"/>
    

    <h1>Ale Pipeline</h1>
    <GenericPlot 
    fetchDataThunk={fetchDataForAlePipelineSlice} 
    feature1="Model__lr" 
    feature2= {null}

    xaitype="pipeline" 
    method="ale" 
    xFieldName="size" 
    yFieldName="eff"
    mark="line"/>

    <h1>CounterFactuals Table</h1>
    <CounterFactualsTable/>

    <h1>Pdp Model</h1>
    <GenericPlot 
    fetchDataThunk={fetchDataForPdpModelSlice} 
    feature1="proto" 
    feature2= {null}

    xaitype="model" 
    method="pdp" 
    xFieldName="ModelValues"
    yFieldName="Effect"
    mark="bar"/>


<h1>Ale Model</h1>
    <GenericPlot 
    fetchDataThunk={fetchDataForAleModelSlice} 
    feature1="dur" 
    feature2= {null}

    xaitype="model" 
    method="ale" 
    xFieldName="dur"
    yFieldName="eff"
    mark="bar"/>



<h1>Pdp 2d Pipeline</h1>
    <GenericPlot 
    fetchDataThunk={fetchDataForPdp2DPipelineSlice} 
    feature1="Model__batch_size" 
    feature2= "Model__lr"
    xaitype="pipeline" 
    method="pdp2d" 
    xFieldName="x"
    yFieldName="y"
    mark="rect"/>


    
    
     
    
</Container>);
  
};

export default DataExplainability;
