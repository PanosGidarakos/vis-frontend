export const specConfig = (xaitype, method) => {
    if (xaitype === 'pipeline' && method === 'pdp') {
        return {
            "width": 500,
            "height": 500,
            "mark": { "type": "line" }, // "bar" should be a string
            "encoding": {
                "x": { "field": "HP", "type": "quantitative" }, // "quantitative" should be a string
                "y": { "field": "Values", "type": "quantitative" }
            }
        };
    }
    // Handle other cases or provide a default return value
    return {}; // Return an empty object as default
};
