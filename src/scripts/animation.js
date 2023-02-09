const getRunnerAndRangeAndMove = (selector) => {
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
    const { runner, range } = getRunnerAndRangeAndMove(selector);

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
    const { range, move } = getRunnerAndRangeAndMove(selector);

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
    const { range, move } = getRunnerAndRangeAndMove(selector);

    let movingSpeed = speed;

    let progress = 0;
    let totalDuration = 0;
    let sum = 0;

    const step = (time) => {
        requestAnimationFrame(step);
        let deltaT = time - (totalDuration || time);
        sum += deltaT;
        console
            .log
            // `tot:${totalDuration}, step:${time}, delt:${deltaT}, sum ${sum}`
            ();

        totalDuration = time;
        progress += movingSpeed * ((deltaT / 1000) * 60);

        if (progress > range) {
            progress = range;
        } else if (progress < 0) {
            progress = 0;
        }
        if (sum > 1 / 60) {
            sum = 0;
            // console.log("MOVE");
            move(progress);
        }

        if (progress === range || progress === 0) {
            movingSpeed *= -1;
        }
    };
    let id = requestAnimationFrame(step);
    window.blur(() => cancelAnimationFrame(id));
};

window.onload = () => {
    animationVSInterval("#js-runner", 2);
    animationRAF("#js-runner-raf", 2);
    animationRAF2("#js-runner-raf2", 2);
};
