import { IChartWorkerProps } from "./charts";

interface IChartWorkerData {
    data: number[];
    range: number;
}

const createData = ({ amount, range }: IChartWorkerProps): IChartWorkerData => {
    const data: number[] = [];
    while (data.length < amount) {
        const i = Math.floor(Math.random() * ((range ?? 50) - 1 + 1) + 1);
        data.push(i);
    }
    return { data, range };
};

const dataProcessing = ({ data, range }: IChartWorkerData) => {
    let processedData: number[] = [];
    for (let i = 0; i < data.length / 20; i++) {
        processedData = data
            .map(
                (el) =>
                    Math.round(el * Math.random()) -
                    Math.round((range ?? 50) * 0.3 * Math.random())
            )
            .filter((_, i) => i % Math.round(data.length / 250) === 0);
    }
    return processedData;
};

onmessage = (e: MessageEvent<IChartWorkerProps>): void => {
    const start = Date.now();
    console.log("ChartWorker started");
    const data = createData(e.data);
    const outputData = dataProcessing(data);
    console.log(`ChartWorker finished in ${Date.now() - start}ms`);
    postMessage(outputData);
};
