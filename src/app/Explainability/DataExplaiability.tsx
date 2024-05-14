// import { Container } from "@mui/material";
// import CounterFactualsTable from "./Components/CounterFactualsTable";
// import GenericPlot from "./Components/GenericPlot";
// import { 
//   fetchDataForAleModelSlice, 
//   fetchDataForAlePipelineSlice, 
//   fetchDataForPdp2DPipelineSlice, 
//   fetchDataForPdpModelSlice, 
//   fetchDataForPdpPipelineSlice 
// } from "../../store/data/dataSlice";
// import Sidebar from "../Dashboard/Sidebar";

// const DataExplainability: React.FC = () => {
//   return (
//     <Container fixed>
//         <section>
//             <Sidebar/>
//         </section>
//       <section>
//         <h1>Pdp Pipeline</h1>
//         <GenericPlot 
//           fetchDataThunk={fetchDataForPdpPipelineSlice} 
//           feature1="Model__lr" 
//           feature2={null}
//           xaitype="pipeline" 
//           method="pdp" 
//           xFieldName="HP"
//           yFieldName="Values"
//           mark="line"
//         />
//       </section>

//       <section>
//         <h1>Ale Pipeline</h1>
//         <GenericPlot 
//           fetchDataThunk={fetchDataForAlePipelineSlice} 
//           feature1="Model__lr" 
//           feature2={null}
//           xaitype="pipeline" 
//           method="ale" 
//           xFieldName="index" 
//           yFieldName="eff"
//           mark="line"
//         />
//       </section>

//       <section>
//         <h1>CounterFactuals Table</h1>
//         <CounterFactualsTable />
//       </section>

//       <section>
//         <h1>Pdp Model</h1>
//         <GenericPlot 
//           fetchDataThunk={fetchDataForPdpModelSlice} 
//           feature1="proto" 
//           feature2={null}
//           xaitype="model" 
//           method="pdp" 
//           xFieldName="ModelValues"
//           yFieldName="Effect"
//           mark="bar"
//         />
//       </section>

//       <section>
//         <h1>Ale Model</h1>
//         <GenericPlot 
//           fetchDataThunk={fetchDataForAleModelSlice} 
//           feature1="dur" 
//           feature2={null}
//           xaitype="model" 
//           method="ale" 
//           xFieldName="dur"
//           yFieldName="eff"
//           mark="bar"
//         />
//       </section>

//       <section>
//         <h1>Pdp 2d Pipeline</h1>
//         <GenericPlot 
//           fetchDataThunk={fetchDataForPdp2DPipelineSlice} 
//           feature1="Model__batch_size" 
//           feature2="Model__lr"
//           xaitype="pipeline" 
//           method="pdp2d" 
//           xFieldName="x"
//           yFieldName="y"
//           mark="rect"
//         />
//       </section>
//     </Container>
//   );
// };

// export default DataExplainability;



// import { Container } from "@mui/material";
// import CounterFactualsTable from "./Components/CounterFactualsTable";
// import GenericPlot from "./Components/GenericPlot";
// import { 
//   fetchDataForAleModelSlice, 
//   fetchDataForAlePipelineSlice, 
//   fetchDataForPdp2DPipelineSlice, 
//   fetchDataForPdpModelSlice, 
//   fetchDataForPdpPipelineSlice 
// } from "../../store/data/dataSlice";
// import Sidebar from "../Dashboard/Sidebar";

// const DataExplainability: React.FC = () => {
//   return (
//     <Container fixed>
//         <section style={{ display: "flex", flexDirection: "row" }}>
//             <Sidebar/>
//             </section>
//       <section style={{ display: "flex", flexDirection: "row" }}>
//         <div style={{ flex: 1 }}>
//           <h1>Pdp Pipeline</h1>
//           <GenericPlot 
//             fetchDataThunk={fetchDataForPdpPipelineSlice} 
//             feature1="Model__lr" 
//             feature2={null}
//             xaitype="pipeline" 
//             method="pdp" 
//             xFieldName="HP"
//             yFieldName="Values"
//             mark="line"
//             xtype="nominal"
//             ytype="quantitative"

//           />
//         </div>
//         <div style={{ flex: 1 }}>
//           <h1>Ale Pipeline</h1>
//           <GenericPlot 
//             fetchDataThunk={fetchDataForAlePipelineSlice} 
//             feature1="Model__lr" 
//             feature2={null}
//             xaitype="pipeline" 
//             method="ale" 
//             xFieldName="index" 
//             yFieldName="eff"
//             mark="line"
//             xtype="ordinal"
//             ytype="quantitative"


//           />
//         </div>
//       </section>

//       <section>
//         <h1>CounterFactuals Table</h1>
//         <CounterFactualsTable />
//       </section>

//       <section style={{ display: "flex", flexDirection: "row" }}>
//         <div style={{ flex: 1 }}>
//           <h1>Pdp Model</h1>
//           <GenericPlot 
//             fetchDataThunk={fetchDataForPdpModelSlice} 
//             feature1="proto" 
//             feature2={null}
//             xaitype="model" 
//             method="pdp" 
//             xFieldName="ModelValues"
//             yFieldName="Effect"
//             mark="bar"
//             xtype="ordinal"
//             ytype="quantitative"


//           />
//         </div>
//         <div style={{ flex: 1 }}>
//           <h1>Ale Model</h1>
//           <GenericPlot 
//             fetchDataThunk={fetchDataForAleModelSlice} 
//             feature1="dur" 
//             feature2={null}
//             xaitype="model" 
//             method="ale" 
//             xFieldName="dur"
//             yFieldName="eff"
//             mark="line"
//             xtype="quantitative"
//             ytype="quantitative"

//           />
//         </div>
//       </section>

//       <section>
//         <h1>Pdp 2d Pipeline</h1>
//         <GenericPlot 
//           fetchDataThunk={fetchDataForPdp2DPipelineSlice} 
//           feature1="Model__optimizer" 
//           feature2="Model__lr"
//           xaitype="pipeline" 
//           method="pdp2d" 
//           xFieldName="x"
//           yFieldName="y"
//           mark="rect"
//           xtype="ordinal"
//           ytype="ordinal"

//         />
//       </section>
//     </Container>
//   );
// };

// export default DataExplainability;




import { Container, Grid } from "@mui/material";
import CounterFactualsTable from "./Components/CounterFactualsTable";
import GenericPlot from "./Components/GenericPlot";
import Sidebar from "../Dashboard/Sidebar";
import { fetchDataForAleModelSlice, fetchDataForAlePipelineSlice, fetchDataForPdp2DPipelineSlice, fetchDataForPdpModelSlice, fetchDataForPdpPipelineSlice } from "../../store/data/explainabilitySlice";

const DataExplainability: React.FC = () => {
  return (
    <Container fixed>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Data Explainability Dashboard</h1>
        </Grid>
        <Grid item xs={3}>
          <Sidebar/>
        </Grid>
        <Grid item xs={12}>
          <h2>Pipeline Analysis</h2>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <h3>PDP Pipeline</h3>
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
              <h3>ALE Pipeline</h3>
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
          <h2>Model Analysis</h2>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <h3>PDP Model</h3>
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
              <h3>ALE Model</h3>
              <GenericPlot 
                fetchDataThunk={fetchDataForAleModelSlice} 
                feature1="dur" 
                feature2={null}

                xaitype="model" 
                method="ale" 
                xFieldName="dur"
                yFieldName="eff"
                mark="line"
                xtype="quantitative"
                ytype="quantitative"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <h2>2D Pipeline Analysis</h2>
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
          <h2>Counterfactuals Analysis</h2>
          <CounterFactualsTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DataExplainability;
