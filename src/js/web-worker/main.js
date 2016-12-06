window.addEventListener('load', () => {
    let worker = new Worker('src/js/web-worker/worker.js');

    const postMatrixToWorker = (data) => {
        worker.postMessage({
            type: EVENTS.HANDLE_DATA,
            message: data
        });
    };

    const getResultFromWorker = (data) => {
        let resultArea = document.querySelector("#result-data"),
            resultMatrix = document.createTextNode(JSON.stringify(data, {}, 4));
        resultArea.style.display = "block";
        resultArea.innerHTML = "";
        resultArea.appendChild(resultMatrix);
    };

    worker.addEventListener('message', function (e) {
        switch (e.data.type) {
            case EVENTS.RECEIVE_DATA:
                getResultFromWorker(e.data.message);
                break;
            default:
                throw new Error(`The following command ${e.data.type} is not supported in main thread`);
        }
    });

    document.forms[0].addEventListener('submit', function (e) {
        postMatrixToWorker(JSON.parse(this['initial-data'].value));
        e.preventDefault();
    })
});