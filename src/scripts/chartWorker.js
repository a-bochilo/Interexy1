const createData = ({ amount, range }) => {
    const data = [];
    while (data.length < amount) {
        const i = Math.floor(Math.random() * (range - 1 + 1) + 1);
        data.push(i);
    }
    return data;
};

const dataProcessing = (data) => {
    let processedData = [];
    for (let i = 0; i < data.length * 100; i++) {
        processedData = data.map(
            (el) =>
                Math.round(el * Math.random()) - Math.round(4 * Math.random())
        );
    }
    return processedData;
};

onmessage = (e) => {
    const start = Date.now();
    const data = createData(e.data);
    const outputData = dataProcessing(data);
    console.log(`${Date.now() - start}`);
    postMessage(outputData);
};
