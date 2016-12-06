importScripts('events.js', 'https://cdnjs.cloudflare.com/ajax/libs/numeric/1.2.6/numeric.min.js');

const getComplexValuesMatrix = (data)=> {
    return numeric.eig(data);
};

const returnMessageToMainThread = (data) => {
    self.postMessage({
        type: EVENTS.RECEIVE_DATA,
        message: data
    });
};

self.addEventListener('message', function (e) {
    switch (e.data.type) {
        case EVENTS.HANDLE_DATA:
            let resultMatrix = getComplexValuesMatrix(e.data.message);
            returnMessageToMainThread(resultMatrix);
            break;
        default:
            throw new Error(`The following command ${e.data.type} is not supported in WebWorker`);
    }
});