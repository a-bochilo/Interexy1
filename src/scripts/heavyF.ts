const workerFunc = (num: number) => {
    const worker = new Worker("./worker.js");
    const button = document.querySelector(
        ".header .worker"
    ) as HTMLButtonElement | null;
    button?.addEventListener("click", () => worker.postMessage(num));
    worker.onmessage = (e) => {
        console.log(e.data);
    };
};

const nonWorkerFunc = (num: number) => {
    const button = document.querySelector(
        ".header .non-worker"
    ) as HTMLButtonElement | null;
    const hardCalc = (num: number): string => {
        console.log("NonWorker started");
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
        return `NonWorker result: ${Math.round(result)}, time: ${
            Date.now() - start
        }`;
    };
    button?.addEventListener("click", () => {
        console.log(hardCalc(num));
    });
};

window.addEventListener("load", () => {
    workerFunc(2000);
    nonWorkerFunc(2000);
});
