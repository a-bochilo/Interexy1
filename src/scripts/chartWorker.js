const createData = ({ amount, range }) => {
    const data = [];
    while (data.length < amount) {
        const i = Math.floor(Math.random() * (range - 1 + 1) + 1);
        data.push(i);
    }
    return data;
};

const dataProcessing = (data) => {
    return data.map(
        (el) => Math.round(el * Math.random()) - Math.round(4 * Math.random())
    );
};

onmessage = (e) => {
    const data = createData(e.data);
    const outputData = dataProcessing(data);
    postMessage(outputData);
};
