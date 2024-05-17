// Separate file: plotDataUtils.js

export const getGivenData = (data, xaitype, method) => {
    if (xaitype === 'pipeline' && method === 'pdp') {
        const hpData = data && data.pdphpval ? JSON.parse(data.pdphpval)[0] : [];
        const valsData = data && data.pdpvalues ? JSON.parse(data.pdpvalues)[0] : [];
        return hpData.map((key, index) => ({ HP: key, Values: valsData[index] }));
        
    } else if (xaitype === 'pipeline' && method === 'ale') {

        return data && data.aledata ? JSON.parse(data.aledata) : [];
    } else if (xaitype === 'pipeline' && method === 'pdp2d'){
        
        return data && data.pdp2dzi && data.pdp2dxi && data.pdp2dyi ? JSON.parse(data.pdp2dzi).map((row, rowIndex) =>
            row.map((value, colIndex) => ({
                x: JSON.parse(data.pdp2dxi)[colIndex],
                y: JSON.parse(data.pdp2dyi)[rowIndex],
                value
            }))
        ).flat() : [];
    } else if (xaitype === 'model' && method === 'pdp'){

        const hpData = data && data.modelpdpvalues ? JSON.parse(data.modelpdpvalues)[0] : [];
        const valsData = data && data.modelpdpeff ? JSON.parse(data.modelpdpeff)[0] : [];
        return hpData.map((key, index) => ({ ModelValues: key, Effect: valsData[index] }));
        
    } else if (xaitype === 'model' && method === 'ale') {
        return data && data.aledata ? JSON.parse(data.aledata) : [];
    }
    return [];
};
