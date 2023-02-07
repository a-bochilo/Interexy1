const animationVSInterval = (selector, duration) => {
    const runner = document.querySelector(selector);
    const runnerWidth = runner.getBoundingClientRect().width;
    const parentPadding = parseInt(
        getComputedStyle(runner.parentNode).paddingLeft
    );
    const parentWidth = runner.parentNode.clientWidth - 2 * parentPadding;

    let left = 0;
    let delta = (parentWidth - runnerWidth) / (duration * 100);

    const move = () => {
        left += delta;
        if (left + runnerWidth > parentWidth || left < 0) {
            delta *= -1;
        } else {
            runner.style.translate = left + "px";
        }
    };

    setInterval(() => move(), 10);
};

// const animationRFA = (selector, duration) => {
//     const runner = document.querySelector(selector);
//     const runnerWidth = runner.getBoundingClientRect().width;
//     const parentPadding = parseInt(
//         getComputedStyle(runner.parentNode).paddingLeft
//     );
//     const parentWidth = runner.parentNode.clientWidth - 2 * parentPadding;
//     let range = parentWidth - runnerWidth;

//     const move = (progress) => {
//         runner.style.translate = progress + "px";
//     };
//     let start = performance.now();
//     let dir = 1;

//     requestAnimationFrame(function rafAnimation(time) {
//         let timeFract = (time - start) / duration;
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

const animationRFA = (selector, duration) => {
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
    let start = Date.now();
    let dir = 1;

    requestAnimationFrame(function rafAnimation() {
        let time = Date.now();
        let timeFract = (time - start) / duration;
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

const animationRFA2 = (selector, speed) => {
    const runner = document.querySelector(selector);
    const runnerWidth = runner.getBoundingClientRect().width;
    const parentPadding = parseInt(
        getComputedStyle(runner.parentNode).paddingLeft
    );
    const parentWidth = runner.parentNode.clientWidth - 2 * parentPadding;
    let range = parentWidth - runnerWidth;

    let movingSpeed = speed;

    let progress = 0;
    let start = 0;

    const move = (timeStamp) => {
        requestAnimationFrame(move);
        let deltaT = timeStamp - (start || timeStamp);

        start = timeStamp;
        progress += movingSpeed * ((deltaT / 1000) * 60);

        runner.style.translate = progress + "px";

        if (progress > range || progress < 0) {
            movingSpeed *= -1;
        }
    };
    requestAnimationFrame(move);
};

window.onload = () => {
    animationVSInterval("#js-runner", 2);
    animationRFA("#js-runner-raf", 2000);
    animationRFA2("#js-runner-raf2", 2);
};
