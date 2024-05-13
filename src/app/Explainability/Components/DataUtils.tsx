// Separate file: plotDataUtils.js

export const getGivenData = (data, xaitype, method) => {
    if (xaitype === 'pipeline' && method === 'pdp') {
        const hpData = data && data.hp ? JSON.parse(data.hp)[0] : [];
        const valsData = data && data.vals ? JSON.parse(data.vals)[0] : [];
        return hpData.map((key, index) => ({ HP: key, Values: valsData[index] }));
        
    } else if (xaitype === 'pipeline' && method === 'ale') {

        return data && data.ale ? JSON.parse(data.ale) : [];
    } else if (xaitype === 'pipeline' && method === 'pdp2d'){
        
        return data && data.pdp2dZI && data.pdp2dXI && data.pdp2dYI ? JSON.parse(data.pdp2dZI).map((row, rowIndex) =>
            row.map((value, colIndex) => ({
                x: JSON.parse(data.pdp2dXI)[colIndex],
                y: JSON.parse(data.pdp2dYI)[rowIndex],
                value
            }))
        ).flat() : [];
    } else if (xaitype === 'model' && method === 'pdp'){

        const hpData = data && data.modelVal ? JSON.parse(data.modelVal)[0] : [];
        const valsData = data && data.effect ? JSON.parse(data.effect)[0] : [];
        return hpData.map((key, index) => ({ ModelValues: key, Effect: valsData[index] }));
        
    } else if (xaitype === 'model' && method === 'ale') {
        return data && data.ale ? JSON.parse(data.ale) : [];
    }
    return [];
};
