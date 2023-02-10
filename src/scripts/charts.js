import Chart from "chart.js/auto";

const createChart = (amount, range) => {
    const chart = document.getElementById("chart");
    const chartWorker = new Worker("./chartWorker.js");
    chartWorker.postMessage({ amount, range });
    chartWorker.onmessage = (e) => {
        new Chart(chart, {
            type: "line",
            data: {
                labels: e.data.map((_, i) => i + 1),
                datasets: [
                    {
                        label: "My chart",
                        data: e.data,
                        borderWidth: 1,
                        backgroundColor: "rgb(255, 0, 0)",
                        borderCapStyle: "round",
                        borderColor: "red",
                        borderWidth: 0.5,
                        radius: 1,
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
                animation: true,
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
    createChart(200, 150);
});
