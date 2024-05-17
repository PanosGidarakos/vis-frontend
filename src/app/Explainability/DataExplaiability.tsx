import { Container, Grid } from "@mui/material";
import CounterFactualsTable from "./Components/CounterFactualsTable";
import GenericPlot from "./Components/GenericPlot";
import Sidebar from "../Dashboard/Sidebar";
import { fetchDataForAleModelSlice, fetchDataForAlePipelineSlice, fetchDataForPdp2DPipelineSlice, fetchDataForPdpModelSlice, fetchDataForPdpPipelineSlice } from "../../store/data/explainabilitySlice";

const DataExplainability: React.FC = () => {
  return (
    <Container fixed>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Sidebar/>
        </Grid>
        <Grid item xs={12}>
          <h2>Hyperparameter Explainability</h2>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <h3>Hyperparameter Partial Dependence Plot (PDP)</h3>
              <GenericPlot 
                fetchDataThunk={fetchDataForPdpPipelineSlice} 
                feature1="Model__lr" 
                feature2={null}
                xaitype="pipeline" 
                method="pdp" 
                xFieldName="HP"
                yFieldName="Values"
                mark="line"
                xtype="nominal"
                ytype="quantitative"
              />
            </Grid>
            <Grid item xs={6}>
              <h3>Hyperparamer Accumulated Local Effects (ALE)</h3>
              <GenericPlot 
                fetchDataThunk={fetchDataForAlePipelineSlice} 
                feature1="Model__lr"
                feature2={null}
                xaitype="pipeline" 
                method="ale" 
                xFieldName="index" 
                yFieldName="eff"
                mark="line"
                xtype="ordinal"
                ytype="quantitative"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <h2>Hyperparameter 2D Partial Dependence Plot (PDP)</h2>
          <GenericPlot 
            fetchDataThunk={fetchDataForPdp2DPipelineSlice} 
            feature1="Model__optimizer" 
            feature2="Model__lr"
            xaitype="pipeline" 
            method="pdp2d" 
            xFieldName="x"
            yFieldName="y"
            mark="rect"
            xtype="ordinal"
            ytype="ordinal"
          />
        </Grid>
        <Grid item xs={12}>
          <h2>Misclassification Analysis</h2>
          <CounterFactualsTable />
        </Grid>
        <Grid item xs={12}>
          <h2>Feature Expainability</h2>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <h3>Feature Partial Dependence Plot (PDP)</h3>
              <GenericPlot 
                fetchDataThunk={fetchDataForPdpModelSlice} 
                feature1="proto" 
                feature2={null}
                xaitype="model" 
                method="pdp" 
                xFieldName="ModelValues"
                yFieldName="Effect"
                mark="bar"
                xtype="ordinal"
                ytype="quantitative"
              />
            </Grid>
            <Grid item xs={6}>
              <h3>Feature Accumulated Local Effects (ALE)</h3>
              <GenericPlot 
                fetchDataThunk={fetchDataForAleModelSlice} 
                feature1="rate" 
                feature2={null}
                xaitype="model" 
                method="ale" 
                xFieldName="rate"
                yFieldName="eff"
                mark="line"
                xtype="quantitative"
                ytype="quantitative"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DataExplainability;




// import { Container, Grid } from "@mui/material";
// import CounterFactualsTable from "./Components/CounterFactualsTable";
// import GenericPlot from "./Components/GenericPlot";
// import Sidebar from "../Dashboard/Sidebar";
// import { fetchDataForAleModelSlice, fetchDataForAlePipelineSlice, fetchDataForPdp2DPipelineSlice, fetchDataForPdpModelSlice, fetchDataForPdpPipelineSlice } from "../../store/data/explainabilitySlice";

// const DataExplainability: React.FC = () => {
//   return (
//     <Container fixed>
//         <Grid item xs={12}>
//           <h2>Misclassification Analysis</h2>
//           <CounterFactualsTable />
//         </Grid>
        
//     </Container>
//   );
// };

// export default DataExplainability;
