import {Container} from "@mui/material";
import PdpPipeline from "./Components/PdpPipeline";
import PdpModel from "./Components/PdpModel";
import CounterFactualsTable from "./Components/CounterFactualsTable";
import Pdp2dPipeline from "./Components/Pdp2dPipeline";
import AlePipeline from "./Components/AlePipeline";
import AleModel from "./Components/AleModel";

const DataExplainability: React.FC = () => {
  return (<Container fixed>
   
     CounterFactualsTable
     <CounterFactualsTable/>
     <PdpModel/>
     <PdpPipeline/>
     <AleModel/>
     <AlePipeline/>
     <Pdp2dPipeline/>
    
     
    
</Container>);
  
};

export default DataExplainability;
