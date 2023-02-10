import Chart from "chart.js/auto";

export interface IChartWorkerProps {
    amount: number;
    range: number;
}

const createChart = async (amount: number, range: number) => {
    const parentElement = document.querySelector(
        "section.article__wrapper"
    ) as HTMLElement | null;
    if (!parentElement) return;
    const chart = document.createElement("canvas");
    chart.id = "chart";
    const chartWorker = new Worker("./chartWorker.js");
    chartWorker.postMessage({ amount, range });
    chartWorker.onmessage = (e: MessageEvent<number[]>) => {
        if (e.data) parentElement.prepend(chart);
        new Chart(chart, {
            type: "line",
            data: {
                labels: e.data.map((_, i) => i + 1),
                datasets: [
                    {
                        label: "My chart",
                        data: e.data,
                        backgroundColor: "rgb(255, 0, 0)",
                        borderCapStyle: "round",
                        borderColor: "red",
                        borderWidth: 0.5,
                        pointRadius: 1.5,
                        fill: {
                            target: "origin",
                            above: "rgba(0, 255, 26, 0.441)",
                            below: "rgba(195, 255, 0, 0.441)",
                        },
                        tension: 0.5,
                    },
                ],
            },
            options: {
                // animation: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        // enabled: false,
                    },
                },

                scales: {
                    y: {
                        // beginAtZero: true,
                        stacked: true,
                    },
                },
            },
        });
    };
};

window.addEventListener("load", () => {
    createChart(20000, 150);
});
