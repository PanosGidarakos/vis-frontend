

import axios from "axios";
// A mock function to mimic making an async request for data
export const fetchTSData = async (dataset_id,columns,visualizationType,aggFunction,filters,limit) => {
    const response = await axios.post(
      `http://localhost:8080/api/visualization/data/${dataset_id}`,
      {
        "visualizationType": visualizationType,
        "columns": columns,
        "aggFucntion": aggFunction,
        "groupBy": [],
        "filters": filters,
        "constraints": {},
        "taskId": "2",
        "limit": limit
    });
   return response;
}


// const visualizationType = 'line';
// const columns = ["timestamp", "dns_interlog_time_q3", "dns_interlog_time_q2", "smtp_in_mean_hops"];
// const aggFunction = 'AVG';
// const filters = [{
//    "column": "dns_interlog_time_q2",
//    "type": "range",
//    "value": {
//       "min": 0,
//       "max": 0
//    }
// }];
// const taskId = '2';
// const limit = 10;
// const dataset_id = 'i2cat_desktop_features';

// fetchTSData(dataset_id,columns,visualizationType,aggFunction,filters,limit)
//    .then(response => {
//       // Handle response
//       console.log("Data:", response.data);
//    })
//    .catch(error => {
//       // Handle error
//       console.error("Error fetching data:", error);
//    });