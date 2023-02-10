const createData = ({ amount, range }) => {
    const data = [];
    while (data.length < amount) {
        const i = Math.floor(Math.random() * (range - 1 + 1) + 1);
        data.push(i);
    }
    return { data, range };
};

const dataProcessing = ({ data, range }) => {
    let processedData = [];
    for (let i = 0; i < data.length * 100; i++) {
        processedData = data
            .map(
                (el) =>
                    Math.round(el * Math.random()) -
                    Math.round(range * 0.3 * Math.random())
            )
            .filter((el, i) => i % 3 === 0);
    }
    return processedData;
};

onmessage = (e) => {
    const start = Date.now();
    const data = createData(e.data);
    const outputData = dataProcessing(data);
    console.log(`ChartWorker finished in ${Date.now() - start}ms`);
    postMessage(outputData);
};
