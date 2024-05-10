import { Box, Container, Grid } from "@mui/material";
import CounterFactualsTable from "./Components/CounterFactualsTable";
import PdpPipeline from "./Components/PdpPipeline";
import PdpModel from "./Components/PdpModel";


const DataExplainability: React.FC = () => {
  return (<Container fixed>
    <CounterFactualsTable/>
    <PdpPipeline/>
    <PdpModel/>
      
  
</Container>);
  
};

export default DataExplainability;
