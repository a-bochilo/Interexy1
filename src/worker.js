const hardCalc = (num) => {
    console.log("Worker started");
    const start = Date.now();
    let result = 5;
    for (let i = 1; i < num; i++) {
        result = result * 1.0001 + i / 2;
        for (let k = i; k < num; k++) {
            result += 1;
            for (let j = 1; j < k; j++) {
                result += 1;
            }
        }
    }
    return `Worker result: ${Math.round(result)}, time: ${Date.now() - start}`;
};

onmessage = (e) => {
    const result = hardCalc(e.data);
    postMessage(result);
};
