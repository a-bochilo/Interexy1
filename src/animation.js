const workerF = (num) => {
    const worker = new Worker("./worker.js");
    const button = document.querySelector(".header .worker");
    button.addEventListener("click", () => worker.postMessage(num));
    worker.onmessage = (e) => {
        console.log(e.data);
    };
};

const nonWorkerF = (num) => {
    const button = document.querySelector(".header .non-worker");
    const hardCalc = (num) => {
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
    button.addEventListener("click", () => {
        console.log(hardCalc(num));
    });
};

const getRunnerRangeMove = (selector) => {
    const runner = document.querySelector(selector);
    const runnerWidth = runner.getBoundingClientRect().width;
    const parentPadding = parseInt(
        getComputedStyle(runner.parentNode).paddingLeft
    );
    const parentWidth = runner.parentNode.clientWidth - 2 * parentPadding;
    let range = parentWidth - runnerWidth;

    const move = (progress) => {
        runner.style.translate = progress + "px";
    };
    return { runner, range, move };
};

const animationVSInterval = (selector, duration) => {
    const { runner, range } = getRunnerRangeMove(selector);

    let left = 0;
    let delta = range / (duration * 100);

    const move = () => {
        left += delta;
        if (left > range || left < 0) {
            delta *= -1;
        } else {
            runner.style.translate = left + "px";
        }
    };

    setInterval(() => move(), 10);
};

// const animationRAF = (selector, duration) => {
//     const { range, move } = getRunnerRangeMove(selector);

//     let start = performance.now();
//     let dir = 1;

//     requestAnimationFrame(function rafAnimation(time) {
//         let timeFract = (time - start) / (duration * 1000);
//         if (timeFract > 1 && dir > 0) {
//             timeFract = 1;
//         } else if (timeFract > 1 && dir < 0) {
//             timeFract = 0;
//         }
//         let progress = dir > 0 ? range * timeFract : range - range * timeFract;
//         if (timeFract === 1) {
//             start = time;
//             dir = -1;
//         }
//         if (timeFract === 0) {
//             dir = 1;
//             start = time;
//             progress = 0;
//         }

//         move(progress);

//         requestAnimationFrame(rafAnimation);
//     });
// };

const animationRAF = (selector, duration) => {
    const { range, move } = getRunnerRangeMove(selector);

    let start = Date.now();
    let dir = 1;

    requestAnimationFrame(function rafAnimation() {
        let time = Date.now();
        let timeFract = (time - start) / (duration * 1000);
        if (timeFract >= 1 && dir > 0) {
            timeFract = 1;
        } else if (timeFract >= 1 && dir < 0) {
            timeFract = 0;
        }
        let progress = dir > 0 ? range * timeFract : range - range * timeFract;
        if (timeFract === 1) {
            start = time;
            dir = -1;
        }
        if (timeFract === 0) {
            dir = 1;
            start = time;
            progress = 0;
        }

        move(progress);

        requestAnimationFrame(rafAnimation);
    });
};

const animationRAF2 = (selector, speed) => {
    const { range, move } = getRunnerRangeMove(selector);

    let movingSpeed = speed;

    let progress = 0;
    let start = 0;

    const step = (timeStamp) => {
        requestAnimationFrame(step);
        let deltaT = timeStamp - (start || timeStamp);

        start = timeStamp;
        progress += movingSpeed * ((deltaT / 1000) * 60);

        move(progress);

        if (progress > range) {
            progress = range;
            movingSpeed *= -1;
        } else if (progress < 0) {
            movingSpeed *= -1;
            progress = 0;
        }
    };
    requestAnimationFrame(step);
};

window.onload = () => {
    animationVSInterval("#js-runner", 2);
    animationRAF("#js-runner-raf", 2);
    animationRAF2("#js-runner-raf2", 2);
    workerF(2000);
    nonWorkerF(2000);
};
