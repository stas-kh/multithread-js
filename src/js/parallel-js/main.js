window.addEventListener('load', () => {
    function powToX(arr, x) {
        let resultArr = [];
        arr.forEach((arr) => {
            resultArr.push(Math.pow(arr, x));
        });
        return resultArr;
    }

    function powMatrix(matrix) {
        const POW_TO = 15;
        let result = [];
        matrix.forEach((subArr) => {
            result.push(powToX(subArr, POW_TO));
        });
        return result;
    }

    document.forms[0].addEventListener('submit', function () {
        let p = new Parallel(JSON.parse(this['initial-data'].value));

        p.require(powToX)
            .spawn(powMatrix)
            .then((data) => console.info("See an output of ParallelJS thread", '\n' + JSON.stringify(data, {}, 4)));
    });
});