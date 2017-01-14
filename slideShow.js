const body = document.querySelector('body');
const container = document.querySelector('#container');
const panel = document.querySelector('#remote');
const animCont = document.querySelector('.anim-cont');
const progress = document.querySelector('#prog');

const animation = {};
const functions = [
    episode1.bind(null, 1), episode2.bind(null, 1), episode3, episode4, episode4_2,
    episode1.bind(null, 10), episode2.bind(null, 10), episode5, episode5_2, episode6,
    episode7, episode8, episode8_2, episode9, episode10, episode11, episode12,
    episode13, episode14, episode15
    ];
const episodes = [0, 7.5, 15.5, 19.8, 23.3, 27.3, 35.4, 43.4, 54.8, 57.3,
    65.9, 75.5, 89.1, 99.3, 108, 133, 152.6, 160.5, 172.5, 185.6];

const btnPlay = document.querySelector('.btn.play');
const btnVolume = document.querySelector('.btn.volume');
const player = document.querySelector('#player');

let bodyWidth;
let bodyHeight;
let height;
let width;

let images = [];
let img;
let offsetX = 0;
let offsetY = 0;
let angle = 0;
let isBreake = false;
let isPlay = true;
let mainTimer;

resizeWindow();
progress.setAttribute('value', 0);

for (let i = 1; i < 145; i++) {
    images[i] = `images(${i}).jpg`;
}

const imgElements = createImgElements();

body.addEventListener('resize', resizeWindow);

btnPlay.addEventListener('click', () => {
    isPlay = !isPlay;
    if (!isPlay) {
        animation.anims.forEach(animation => animation.finish());
        animation.timersInterval.forEach(timer => clearInterval(timer));
        animation.timersTimeout.forEach(timer => clearTimeout(timer));
        player.pause();
        clearInterval(mainTimer);
        btnPlay.classList.remove('pause');
        btnPlay.classList.add('start');
    } else {
        player.play();
        btnPlay.classList.remove('start');
        btnPlay.classList.add('pause');
        progress.setAttribute('value', episodes[animation.func] * 5);
        startProgressBar();
        let promise = functions[animation.func]();

        for (let i = animation.func + 1; i < 20; i++) {
            promise = promise.then(functions[i]);
        }
    }
});

document.querySelector('.btn.fullsize').addEventListener('click', () => {
    if (animCont.requestFullscreen) {
        animCont.requestFullscreen();
    } else if (animCont.webkitRequestFullscreen) {
        animCont.webkitRequestFullscreen();
    } else if (animCont.mozRequestFullScreen) {
        animCont.mozRequestFullScreen();
    } else if (animCont.msRequestFullscreen) {
        animCont.msRequestFullscreen();
    }
});

btnVolume.addEventListener('click', () => {
    player.volume = player.volume === 1 ? 0 : 1;

    if (player.volume === 1) {
        btnVolume.classList.remove('translate');
        btnVolume.classList.add('no-translate');
    } else {
        btnVolume.classList.remove('no-translate');
        btnVolume.classList.add('translate');
    }
});

document.querySelector('.btn.forward').addEventListener('click', () => {
    let currentFunc = animation.func;
    let i = currentFunc + 2;
    isBreake = true;
    if (currentFunc === functions.length - 1) {
        return;
    }

    if (!isPlay) {
        isPlay = true;
        btnPlay.classList.remove('start');
        btnPlay.classList.add('pause');
        player.play();
        startProgressBar();
    }
//    setTime(episodes[currentFunc + 1]);
    animation.anims.forEach(animation => animation.finish());
    animation.timersInterval.forEach(timer => clearInterval(timer));
    animation.timersTimeout.forEach(timer => clearTimeout(timer));
    progress.setAttribute('value', episodes[currentFunc + 1] * 5);

    let promise = functions[currentFunc + 1]();
    isBreake = false;
    while (i < 20 && !isBreake) {
        promise = promise.then(functions[i]);
        i++;
    }
});

document.querySelector('.btn.backward').addEventListener('click', () => {
    let currentFunc = animation.func;
    let i = currentFunc;
    isBreake = true;
    if (currentFunc === 0) {
        return;
    }

    if (!isPlay) {
        isPlay = true;
        btnPlay.classList.remove('start');
        btnPlay.classList.add('pause');
        player.play();
        startProgressBar();
    }
   // setTime(episodes[currentFunc - 1]);
    animation.anims.forEach(animation => animation.finish());
    animation.timersInterval.forEach(timer => clearInterval(timer));
    animation.timersTimeout.forEach(timer => clearTimeout(timer));
    progress.setAttribute('value', episodes[currentFunc - 1] * 5);

    let promise = functions[currentFunc - 1]();
    isBreake = false;
    while (i < 20 && !isBreake) {
        promise = promise.then(functions[i]);
        i++;
    }
});

startGame();

function startGame() {
    animation.func = 0;
    if (animation.anims) {
        animation.anims.forEach(animation => animation.finish());
    }
    if (animation.timersInterval) {
        animation.timersInterval.forEach(timer => clearInterval(timer));
    }
    if (animation.timersTimeout) {
        animation.timersTimeout.forEach(timer => clearTimeout(timer));
    }
    player.play();
    progress.setAttribute("value", 0);
    startProgressBar();
    player.volume = 1;
    btnVolume.classList.add('no-translate');
    btnPlay.classList.add('pause');

    let promise = functions[0]();
    for (let i = 1; i < 20; i++) {
        promise = promise.then(functions[i], err => console.log(err));
    }
}

function startProgressBar() {
    mainTimer = setInterval(() => {
        let current = +progress.getAttribute('value') + 1;
        progress.setAttribute("value", current);
    }, 200);
}

function setTime(time) {
    player.currentTime = time;
}

function resizeWindow() {
    bodyHeight = document.documentElement.clientHeight + 'px';
    bodyWidth = document.documentElement.clientWidth + 'px';
    height = parseInt(bodyHeight) * 92 /100 + 'px';
    width = parseInt(height) * 1920 / 1080 + 'px';

    if (parseInt(width) > parseInt(bodyWidth)) {
        width = bodyWidth;
        height = parseInt(width) * 1080 / 1920 + 'px';
    }
    body.style.height = bodyHeight;
    container.style.height = height;
    container.style.width = width;
    panel.style.height = parseInt(height) * 8.5 / 100 + 'px';
    panel.style.width = width;
}

function createImgElements() {
    let imgElements = images.map(image => {
        const el = document.createElement('div');
        el.classList.add('wrapper');
        el.innerHTML = `<img src="./images/${image}"  width="${parseInt(width)*0.65}" height="${parseInt(height)*0.65}">`;
        return el;
    });
    return imgElements;
}

function addFullSizeImage(number) {
    container.appendChild(imgElements[number]);
    img = imgElements[number].querySelector('img');
    if (!img) {
        imgElements[number].innerHTML = `<img src="./images/images(${number}).jpg">`;
        img = imgElements[number].querySelector('img');
    }
    img.style.width = width;
    img.style.height = height;
}

function addImage(number) {
    container.appendChild(imgElements[number]);
    img = imgElements[number].querySelector('img');
    if (!img) {
        imgElements[number].innerHTML = `<img src="./images/images(${number}).jpg">`;
        img = imgElements[number].querySelector('img');
    }
    img.style.width = parseInt(width) * 0.65 + 'px';
    img.style.height = parseInt(height) * 0.65 + 'px';
}

function episode1(number) {
    animation.func = number === 1 ? 0 : 5;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';
    const cloneCont = container.cloneNode(true);
    container.appendChild(cloneCont);
    cloneCont.style.position = 'absolute';
    cloneCont.style.background = `url("./images/images(${number}).jpg") no-repeat 50% 50% /280%`;
    cloneCont.style.filter = 'brightness(50%)';
    animation.anims.push(cloneCont.animate({
        transform: ['rotate(0)', 'rotate(-2deg)', 'rotate(2deg) scale(1.2)'],
    }, 7500));

    let counter = number;
    const timer = setInterval(() => {
        addImage(counter);

        if (number !== 1 && counter > number) {
            const timer3 = setTimeout(() => {
                imgElements[counter - 1].style.filter = 'grayscale(100%)';
            }, 1000);
            animation.timersTimeout.push(timer3);
        }

        switch (counter) {
            case (number):
                offsetX = 0;
                offsetY = parseInt(height) * 0.2;
                angle = 0;
                break;
            case (number + 1):
                offsetX = parseInt(width) * 0.25;
                offsetY = parseInt(height) * 0.1;
                angle = -15;
                break;
            case (number + 2):
                offsetX = parseInt(width) * 0.1;
                offsetY = parseInt(height) * 0.22;
                angle = 15;
                break;
            case (number + 3):
                offsetX = parseInt(width) * 0.27;
                offsetY = parseInt(height) * 0.1;
                angle = -30;
                break;
            case (number + 4):
                offsetX = parseInt(width) * 0.05;
                offsetY = parseInt(height) * 0.3;
                angle = 5;
                break;
        }

        animation.anims.push(imgElements[counter].animate({
            transform: [`translate(-${width}, ${height}) rotate(-60deg)`,
                `translate(${offsetX}px, ${offsetY}px) rotate(${angle}deg`]
        }, {
            duration: 500,
            fill: 'forwards'
        }));

        if (++counter > (number + 4)) {
            clearInterval(timer);
        }
    }, 1300);

    animation.timersInterval.push(timer);
    return new Promise(resolve => {
        const timer2 = setTimeout(resolve, 8000);
        animation.timersTimeout.push(timer2);
    });
}

function episode2(number) {
    animation.func = number === 1 ? 1 : 6;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';
    const cloneCont = container.cloneNode(true);
    container.appendChild(cloneCont);
    cloneCont.style.position = 'absolute';
    cloneCont.style.background = `url("./images/images(${number}).jpg") no-repeat 50% 50% /280%`;
    cloneCont.style.filter = 'brightness(50%)';
    animation.anims.push(cloneCont.animate({
        transform: ['rotate(0)', 'rotate(-2deg)', 'rotate(2deg) scale(1.2)'],
    }, 7500));

    for (let i = number; i < number + 5; i++) {
        addImage(i);
    }

    let counter = number + 4;
    return new Promise(resolve => {
        const timer2 = setInterval(() => {
            let op = counter === number ? 1 : 0;
            let filter = number === 1 ? '0' : '100%';

            switch (counter) {
                case (number):
                    offsetX = 0;
                    offsetY = parseInt(height) * 0.2;
                    angle = 0;
                    break;
                case (number + 1):
                    offsetX = parseInt(width) * 0.25;
                    offsetY = parseInt(height) * 0.1;
                    angle = -15;
                    break;
                case (number + 2):
                    offsetX = parseInt(width) * 0.1;
                    offsetY = parseInt(height) * 0.22;
                    angle = 15;
                    break;
                case (number + 3):
                    offsetX = parseInt(width) * 0.27;
                    offsetY = parseInt(height) * 0.1;
                    angle = -30;
                    break;
                case (number + 4):
                    offsetX = parseInt(width) * 0.05;
                    offsetY = parseInt(height) * 0.3;
                    angle = 5;
                    filter = '0';
                    break;
            }

            animation.anims.push(imgElements[counter].animate({
                transform: [`translate(${offsetX}px, ${offsetY}px) rotate(${angle}deg) scale(1)`,
                    `translate(${offsetX}px, ${offsetY}px) rotate(${angle}deg) scale(2.5)`],
                opacity: [1, op],
                filter: [`grayscale(${filter})`, 'grayscale(20%)', 'grayscale(0)']
            }, {
                duration: 1000,
                easing: 'ease-in',
                fill: 'forwards'
            }));

            if (--counter < number) {
                clearInterval(timer2);
                const timer3 = setTimeout(resolve, 1000);
                animation.timersTimeout.push(timer3);
            }
        }, 1400);
        animation.timersInterval.push(timer2);
    });
}

function episode3() {
    animation.func = 2;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';
    const cloneCont = container.cloneNode(true);
    container.appendChild(cloneCont);
    cloneCont.style.position = 'absolute';
    cloneCont.style.background = `url("./images/images(6).jpg") no-repeat 50% 50% /100%`;

    return new Promise(resolve => {
        const timer1 = setTimeout(() => {
            addFullSizeImage(7);
            addFullSizeImage(8);
            imgElements[7].querySelector('img').style.border = 'none';
            imgElements[8].querySelector('img').style.border = 'none';
            animation.anims.push(imgElements[7].animate({
                transform: [`translateX(-${width})`,
                    `translateX(-${parseInt(width) / 2}px)`,
                    `translateX(-${parseInt(width) / 2}px)`,
                    `translateX(-${parseInt(width) / 2}px)`,
                    `translateX(-${parseInt(width) * 0.75}px)`],
            }, {
                duration: 3000,
                fill: 'forwards'
            }));

            animation.anims.push(imgElements[8].animate({
                transform: [`translateX(${width})`,
                    `translateX(${parseInt(width) / 2}px)`,
                    `translateX(${parseInt(width) / 2}px)`,
                    `translateX(${parseInt(width) / 2}px)`,
                    `translateX(${parseInt(width) * 0.75}px)`],
            }, {
                duration: 3000,
                fill: 'forwards'
            }));

            const timer2 = setTimeout(resolve, 3200);
            animation.timersTimeout.push(timer2);
        }, 1000);
        animation.timersTimeout.push(timer1);
    });
}

function episode4() {
    animation.func = 3;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';
    const cloneCont = container.cloneNode(true);
    container.appendChild(cloneCont);
    cloneCont.style.position = 'absolute';
    cloneCont.style.background = `url("./images/images(6).jpg") no-repeat 50% 50% /100%`;
    addFullSizeImage(7);
    addFullSizeImage(8);
    imgElements[7].querySelector('img').style.border = 'none';
    imgElements[8].querySelector('img').style.border = 'none';

    animation.anims.push(imgElements[7].animate({
        transform: [`translateX(-${width})`,
            `translateX(-${parseInt(width) * 0.75}px)`],
    }, {
        duration: 0,
        fill: 'forwards'
    }));
    animation.anims.push(imgElements[8].animate({
        transform: [`translateX(${width})`,
            `translateX(${parseInt(width) * 0.75}px)`],
    }, {
        duration: 0,
        fill: 'forwards'
    }));

    addImage(9);
    img = imgElements[9].querySelector('img');
    img.style.width = parseInt(width) * 0.5 + 'px';
    img.style.height = parseInt(height) * 0.5 + 'px';
    img.style.border = '3px solid black';
    animation.anims.push(imgElements[9].animate({
        transform: [`translate(${parseInt(width) * 0.25}px, ${height})`,
            `translate(${parseInt(width) * 0.25}px, ${-parseInt(height) * 0.65}px)`],
    }, {
        duration: 3400,
        fill: 'forwards'
    }));

    return new Promise(resolve => {
        const timer = setTimeout(resolve, 3500);
        animation.timersTimeout.push(timer);
    });
}

function episode4_2() {
    animation.func = 4;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';
    const cloneCont = container.cloneNode(true);
    container.appendChild(cloneCont);
    cloneCont.style.position = 'absolute';
    cloneCont.style.background = `url("./images/images(6).jpg") no-repeat 50% 50% /100%`;
    addFullSizeImage(7);
    addFullSizeImage(8);
    imgElements[7].querySelector('img').style.border = 'none';
    imgElements[8].querySelector('img').style.border = 'none';

    animation.anims.push(imgElements[7].animate({
        transform: [`translate(-${parseInt(width) * 0.75}px)`,
            `translate(-${parseInt(width) * 0.75}px)`,
            `translate(-${parseInt(width) * 0.75}px)`,
            `translate(0)`],
    }, {
        duration: 3800,
        fill: 'forwards'
    }));

    animation.anims.push(imgElements[8].animate({
        transform: [`translate(${parseInt(width) * 0.75}px)`,
            `translate(${parseInt(width) * 0.25}px)`,
            `translate(${parseInt(width) * 0.25}px)`,
            `translate(${width})`],
    }, {
        duration: 2800,
        fill: 'forwards'
    }));

    return new Promise(resolve => {
        const timer = setTimeout(resolve, 4500);
        animation.timersTimeout.push(timer);
    });
}

function episode5() {
    animation.func = 7;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';
    const cloneCont = container.cloneNode(true);
    container.appendChild(cloneCont);
    cloneCont.style.position = 'absolute';
    cloneCont.style.background = `url("./images/images(15).jpg") no-repeat 50% 50% /320%`;
    cloneCont.style.filter = 'brightness(30%)';
    let counter = 15;
    let dur;
    let startX, startY, endX, endY;
    let startAngle, endAngle, startScale, endScale;

    return new Promise(resolve => {
        const timer = setInterval(() => {
            switch (counter) {
                case (15):
                    startX = 0;
                    endX = parseInt(width) * 0.05;
                    startY = parseInt(height) * (-0.8);
                    endY = parseInt(height) / 8;
                    startScale = 0.5;
                    endScale = 1.5;
                    startAngle = 10;
                    endAngle = -3;
                    dur = 4000;
                    break;
                case (16):
                    startX = parseInt(width) * (-0.6);
                    startY = 0;
                    endX = parseInt(width) * 0.14;
                    endY = parseInt(height) * 0.1;
                    startScale = 0.5;
                    endScale = 1.5;
                    startAngle = 15;
                    endAngle = 2;
                    dur = 3200;
                    break;
                case (17):
                    startX = parseInt(width) * 0.8;
                    startY = 0;
                    endX = parseInt(width) * 0.16;
                    endY = parseInt(height) * 0.15;
                    startScale = 0.5;
                    endScale = 1.5;
                    startAngle = -25;
                    endAngle = -3;
                    dur = 3200;
                    break;
                case (18):
                    startX = parseInt(width) * 0.8;
                    startY = 0;
                    endX = parseInt(width) / 10;
                    endY = parseInt(height) / 10;
                    startScale = 0.5;
                    endScale = 1.8;
                    startAngle = 20;
                    endAngle = 0;
                    dur = 4500;
                    break;
            }

            addImage(counter);
            imgElements[counter].querySelector('img').style.border = 'none';

            animation.anims.push(imgElements[counter].animate({
                transform: [`translate(${startX}px, ${startY}px) rotate(${startAngle}deg) scale(${startScale})`,
                    `scale(${endScale}) rotate(${endAngle - 3}deg) translate(${endX}px, ${endY}px)`,
                    `scale(${endScale}) rotate(${endAngle}deg) translate(${endX}px, ${endY}px)`
                ],
            }, {
                duration: dur,
                fill: 'forwards',
                easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
            }));

            if (++counter > 18) {
                clearInterval(timer);
                const timer2 = setTimeout(resolve, 5900);
                animation.timersTimeout.push(timer2);
            }
        }, 1400);
        animation.timersInterval.push(timer);
    });
}

function episode5_2() {
    animation.func = 8;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    let cloneImg18 = imgElements[18].cloneNode(true);
    container.innerHTML = '';
    const cloneCont = container.cloneNode(true);
    container.appendChild(cloneCont);
    cloneCont.style.position = 'absolute';
    cloneCont.style.background = `url("./images/images(15).jpg") no-repeat 50% 50% /320%`;
    cloneCont.style.filter = 'brightness(30%)';
    addFullSizeImage(15);
    addFullSizeImage(16);
    addFullSizeImage(17);
    container.appendChild(cloneImg18);
    animation.anims.push(cloneImg18.animate({
        transform: [
            `scale(1.8) translate(${parseInt(width) / 10}px, ${parseInt(height) / 10}px)`,
            `scale(1.5) translate(-${parseInt(width) * 1.2}px, 0)`
        ],
    }, {
        duration: 2500,
        fill: 'forwards'
    }));
    return new Promise(resolve => {
        const timer = setTimeout(resolve, 2600);
        animation.timersTimeout.push(timer);
    });
}

function episode6() {
    animation.func = 9;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';
    const cloneCont = container.cloneNode(true);
    container.appendChild(cloneCont);
    cloneCont.style.position = 'absolute';
    cloneCont.style.background = `url("./images/images(15).jpg") no-repeat 50% 50% /320%`;
    cloneCont.style.filter = 'brightness(30%)';
    let counter = 16;
    addFullSizeImage(15);
    addFullSizeImage(16);
    addFullSizeImage(17);
    animation.anims.push(imgElements[17].animate({
        transform: ['translate(0, 0)', `translate(${parseInt(width) * 1.2}px, 0) rotate(10deg)`],
    }, {
        duration: 2000,
        fill: 'forwards'
    }));

    return new Promise(resolve => {
        const timer = setInterval(() => {
            offsetX = counter % 2 === 0 ? parseInt(width) * (-1.2) : parseInt(width) * 1.2;
            angle = counter % 2 === 0 ? 12 : -12;

            animation.anims.push(imgElements[counter].animate({
                transform: ['translate(0, 0)', `translate(${offsetX}px) rotate(${angle}deg)`],
            }, {
                duration: 2000,
                fill: 'forwards'
            }));

            if (--counter < 15) {
                clearInterval(timer);
                const timer2 = setTimeout(() => {
                    animation.anims.push(cloneCont.animate({
                        transform: ['rotate(0)', 'rotate(5deg)', 'rotate(3deg)', 'rotate(0)'],
                    }, {
                        duration: 2000,
                    }));
                }, 2100);
                animation.timersTimeout.push(timer2);
                const timer3 = setTimeout(resolve, 4300);
                animation.timersTimeout.push(timer3);
            }
        }, 2100);
        animation.timersInterval.push(timer);
    });
}

function episode7() {
    animation.func = 10;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';
    addFullSizeImage(19);
    animation.anims.push(imgElements[19].animate({
        transform: [`scale(0.8)`, `scale(1)`],
        filter: [`grayscale(0)`, `grayscale(0)`, 'grayscale(100%)']
    }, {
        duration: 1800,
        fill: 'forwards'
    }));
    const timer1 = setTimeout(() => {
        addImage(20);
        animation.anims.push(imgElements[20].animate({
            transform: [`translate(0, -${parseInt(height) * 0.6}px) rotate(60deg)`,
                `translate(${parseInt(width) * 0.2}px, ${parseInt(height) * 0.2}px) rotate(10deg)`],
            filter: [`grayscale(0)`, `grayscale(0)`, 'grayscale(100%)']
        }, {
            duration: 1800,
            fill: 'forwards'
        }));
    }, 1600);
    animation.timersTimeout.push(timer1);

    const timer2 = setTimeout(() => {
        addImage(21);
        animation.anims.push(imgElements[21].animate({
            transform: [`translate(${parseInt(width) * 0.6}px, -${parseInt(height) * 0.6}px) rotate(-60deg)`,
                `translate(${parseInt(width) * 0.25}px, ${parseInt(height) * 0.2}px) rotate(-10deg)`],
            filter: [`grayscale(0)`, 'grayscale(100%)']
        }, {
            duration: 1800,
            fill: 'forwards'
        }));
    }, 3200);
    animation.timersTimeout.push(timer2);

    return new Promise(resolve => {
        const timer3 = setTimeout(() => {
            addImage(22);
            animation.anims.push(imgElements[22].animate({
                transform: [
                    `translate(${parseInt(width) * 0.6}px, ${parseInt(height) * 0.6}px) rotate(60deg)`,
                    `translate(${parseInt(width) * 0.3}px, ${parseInt(height) * 0.2}px) rotate(10deg) scale(1.2)`,
                    `translate(${parseInt(width) * 0.2}px, ${parseInt(height) * 0.2}px) rotate(0deg) scale(1.7)`
                ],
            }, {
                duration: 4200,
                fill: 'forwards'
            }));
            const timer4 = setTimeout(resolve, 5200);
            animation.timersTimeout.push(timer4);
        }, 5000);
        animation.timersTimeout.push(timer3);
    });
}

function episode8() {
    animation.func = 11;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';
    let counter = 24;

    addFullSizeImage(23);
    animation.anims.push(imgElements[23].animate({
        transform: [`scale(0.8) translate(0, ${parseInt(height) / 2}px) rotate3d(2, 1, 0, -100deg)`,
            `scale(1) translate(0, 0) rotate3d(0, 0, 0, 0deg)`]
    }, {
        duration: 1700,
        fill: 'forwards'
    }));

    const timer = setInterval(() => {
        addFullSizeImage(counter);
        let angleY = counter % 2 === 0 ? 1 : -1;
        animation.anims.push(imgElements[counter].animate({
            transform: [`scale(0.8) translate(0, ${parseInt(height) / 2}px) rotate3d(2, ${angleY}, 0, -100deg)`,
                `scale(1) translate(0, 0) rotate3d(0, 0, 0, 0deg)`]
        }, {
            duration: 1700,
            fill: 'forwards'
        }));

        if (++counter > 26) {
            clearInterval(timer);
            container.innerHTML = '';
            addFullSizeImage(23);
            addFullSizeImage(24);
            addFullSizeImage(25);
            addFullSizeImage(26);

            for (let i = 26; i > 22; i--) {
                let delay = 2200 + 1000 * (26 - i);
                animation.anims.push(imgElements[i].animate({
                    transform: [`translate(0, 0)`,
                        `translate(${width}, 0)`]
                }, {
                    duration: 1000,
                    delay: delay,
                    fill: 'forwards'
                }));
            }
        }
    }, 1800);
    animation.timersInterval.push(timer);
    return new Promise(resolve => {
        const timer2 = setTimeout(resolve, 11800);
        animation.timersTimeout.push(timer2);
    });
}

function episode8_2() {
    animation.func = 12;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';
    let coordX, coordY;
    for (let i = 27; i < 31; i++) {
        addFullSizeImage(i);
        coordX = i % 2 === 0 ? parseInt(width) / 2 : parseInt(width) / (-2);
        coordY = i > 28 ? parseInt(height) / 2 : parseInt(height) / (-2);
        animation.anims.push(imgElements[i].animate({
            transform: [`scaleX(0) translate(0, 0)`,
                `scale(0.5) translate(${coordX}px, ${coordY}px)`,
                `scale(0.5) translate(${coordX}px, ${coordY}px)`,
                `scale(0.5) translate(${coordX}px, ${coordY}px)`,
                `scaleX(0) translate(0, 0)`]
        }, {
            duration: 7400,
            fill: 'forwards'
        }));
    }

    return new Promise(resolve => {
        const timer1 = setTimeout(() => {
            container.innerHTML = '';
            addFullSizeImage(31);
            const timer2 = setTimeout(resolve, 2800);
            animation.timersTimeout.push(timer2);
        }, 7400);
        animation.timersTimeout.push(timer1);
    });
}

function episode9() {
    animation.func = 13;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';

    addFullSizeImage(31);
    addFullSizeImage(32);
    animation.anims.push(imgElements[32].animate({
        transform: [`translate(-${width})`, 'translate(0)']
    }, {
        duration: 1100,
        fill: 'forwards'
    }));

    const timer1 = setTimeout(() => {
        addFullSizeImage(33);
        imgElements[33].querySelector('img').style.border = '2px solid black';
        animation.anims.push(imgElements[33].animate({
            transform: [`scale(0.6) translate(-${width})`, `scale(0.6) translate(-${parseInt(width) * 0.5}px)`]
        }, {
            duration: 1200,
            fill: 'forwards'
        }));
    }, 1300);

    animation.timersTimeout.push(timer1);

    const timer2 = setTimeout(() => {
        addFullSizeImage(34);
        imgElements[34].querySelector('img').style.border = '2px solid black';
        animation.anims.push(imgElements[34].animate({
            transform: [`scale(0.6) translate(${parseInt(width) * 1.2}px)`,
                ` scale(0.6) translate(${parseInt(width) * 0.5}px)`]
        }, {
            duration: 1100,
            fill: 'forwards'
        }));
    }, 2600);

    animation.timersTimeout.push(timer2);

    return new Promise(resolve => {
        const timer3 = setTimeout(() => {
            addFullSizeImage(35);
            animation.anims.push(imgElements[35].animate({
                transform: [`scale(0.25)`, 'scale(1)']
            }, {
                duration: 1800,
                fill: 'forwards'
            }));
            const timer3 = setTimeout(resolve, 3300);
            animation.timersTimeout.push(timer3);
        }, 4100);
        animation.timersTimeout.push(timer3);
    });
}

function episode10() {
    animation.func = 14;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';

    addFullSizeImage(40);
    addFullSizeImage(39);
    addFullSizeImage(38);
    addFullSizeImage(37);
    addFullSizeImage(36);
    animation.anims.push(imgElements[36].animate({
        transform: [`scale(2.5)`,
            'scale(1)',
            'scale(1)',
            'rotate(-7)',
            `translate(${parseInt(width) *1.2}px)`
        ]
    }, {
        duration: 7200,
        fill: 'forwards'
    }));

    animation.anims.push(imgElements[37].animate({
        transform: [`scale(1.2) translate(-${parseInt(width) * 0.5}px) rotate(20deg)`,
            `scale(1.2) translate(-${parseInt(width) * 0.1}px) rotate(11deg)`,
            `scale(1.2) translate(0) rotate(6deg)`,
            `scale(1.2) translate(0) rotate(0deg)`,
            `scale(1) translate(${parseInt(width) * 1.3}px) rotate(-10deg)`,
        ]
    }, {
        duration: 11200,
        fill: 'forwards'
    }));

    animation.anims.push(imgElements[38].animate({
        transform: [`scale(0.6) translate(${parseInt(width) * 0.6}px) rotate(-3deg)`,
            `scale(0.8) translate(0) rotate(0deg)`,
            `scale(1) translate(0) rotate(0deg)`,
            `scale(1) translate(-${parseInt(width) * 1.3}px) rotate(15deg)`,
        ]
    }, {
        duration: 13500,
        fill: 'forwards'
    }));

    animation.anims.push(imgElements[39].animate({
        transform: [`scale(0.25)`,
            `translate(0) rotate(10deg) scale(0.5)`,
            `translate(0) rotate(0deg) scale(1)`,
            `translate(${parseInt(width) * 1.3}px) rotate(-10deg) scale(1)`,
        ]
    }, {
        duration: 18000,
        fill: 'forwards'
    }));

    imgElements[40].querySelector('img').style.border = 'none';
    animation.anims.push(imgElements[40].animate({
        transform: [`scale(1)`, `scale(1)`, `scale(1)`,
            `scale(1)`, `scale(3)`
        ]
    }, {
        duration: 19800,
        fill: 'forwards'
    }));

    return new Promise(resolve => {
        const timer6 = setTimeout(resolve, 20000);
        animation.timersTimeout.push(timer6);
    });
}

function episode11() {
    animation.func = 15;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';

    addFullSizeImage(46);
    animation.anims.push(imgElements[46].animate({
        transform: [
            `translate(0, 0)`,
            `translate(0, 0)`,
            `translate(-${parseInt(width) * 0.4}px)`,
            `translate(-${parseInt(width) * 0.4}px)`,
            `translate(-${parseInt(width) * 0.4}px, -${parseInt(height) / 2}px)`,
        ],
        filter: [`grayscale(0)`, `grayscale(10%)`, `grayscale(50%)`, `grayscale(50%)`, 'grayscale(90%)'],
        opacity: [1, 1, 1, 1, 1, 1, 1, 0.5, 0]
    }, {
        duration: 4800,
        fill: 'forwards'
    }));

    const timer1 = setTimeout(() => {
        addFullSizeImage(52);
        animation.anims.push(imgElements[52].animate({
            transform: [`translate(${parseInt(width) * 0.6}px, ${parseInt(height) * 0.4}px)`,
                `translate(${parseInt(width) * 0.6}px, ${parseInt(height) * 0.4}px)`],
            filter: [`grayscale(0)`, `grayscale(20%)`, `grayscale(50%)`, 'grayscale(80%)'],
            opacity: [0.7, 1]
        }, {
            duration: 2500,
            fill: 'forwards'
        }));
    }, 7500);
    animation.timersTimeout.push(timer1);

    const timer2 = setTimeout(() => {
        addFullSizeImage(48);
        animation.anims.push(imgElements[48].animate({
            transform: [
                `scale(0.6) translate(-${parseInt(width) / 3}px, ${parseInt(height)}px)`,
                `scale(0.6) translate(-${parseInt(width) / 3}px, ${parseInt(height) / 2}px)`,
                `scale(0.6) translate(-${parseInt(width) / 3}px, ${parseInt(height) / 2}px)`,
                `scale(0.6) translate(-${parseInt(width) / 3}px, ${parseInt(height) / 2}px)`
            ],
            filter: [`grayscale(0)`, `grayscale(0)`, `grayscale(50%)`, 'grayscale(80%)'],
            opacity: [0, 1, 1, 1, 0]
        }, {
            duration: 4000,
            fill: 'forwards'
        }));
    }, 3300);

    const timer3 = setTimeout(() => {
        addFullSizeImage(50);
        animation.anims.push(imgElements[50].animate({
            transform: [
                `translate(-${parseInt(width) * 0.4}px, -${parseInt(height) * 0.5}px)`,
                `translate(-${parseInt(width) * 0.4}px, -${parseInt(height) * 0.5}px)`,
                `translate(-${parseInt(width) * 0.4}px, -${parseInt(height) * 0.5}px)`,
                `translate(-${parseInt(width) * 0.4}px, -${parseInt(height) * 0.5}px)`,
                `translate(-${parseInt(width) * 0.4}px, -${parseInt(height) * 0.5}px)`,
                `translate(-${parseInt(width) * 0.4}px, 0)`,
            ],
            filter: [`grayscale(0)`, `grayscale(0)`, `grayscale(20%)`, 'grayscale(80%)'],
            opacity: [0.7, 1, 1]
        }, {
            duration: 5200,
            fill: 'forwards'
        }));
    }, 4700);

    const timer4 = setTimeout(() => {
        const elem51 = document.createElement('div');
        elem51.style.width = width;
        elem51.style.height = height;
        elem51.style.background = `url("./images/images(51).jpg") no-repeat 50% 50% /110%`;
        elem51.style.position = 'absolute';
        container.appendChild(elem51);
        animation.anims.push(elem51.animate({
            transform: [
                `scale(0.6) translate(-${parseInt(width) / 3}px, ${parseInt(height) / 2}px)`,
                `scale(0.6) translate(-${parseInt(width) / 3}px, ${parseInt(height) / 2}px)`,
                `scale(0.6) translate(-${parseInt(width) / 3}px, ${parseInt(height) / 2}px)`,
                `scale(0.6) translate(-${parseInt(width) / 3}px, ${parseInt(height) / 2}px)`,
                `scale(0.6) translate(-${parseInt(width) / 3}px, ${parseInt(height) * 1.4}px)`,
            ],
            filter: [`grayscale(0)`, `grayscale(0)`, `grayscale(20%)`, 'grayscale(80%)'],
            opacity: [0.5, 1, 1]
        }, {
            duration: 4000,
            fill: 'forwards'
        }));
    }, 6200);
    animation.timersTimeout.push(timer2);
    animation.timersTimeout.push(timer3);
    animation.timersTimeout.push(timer4);

    const timer5 = setTimeout(() => {
        const elem49 = document.createElement('div');
        elem49.style.width = width;
        elem49.style.height = height;
        elem49.style.background = `url("./images/images(49).jpg") no-repeat 50% 50% /120%`;
        elem49.style.position = 'absolute';
        container.appendChild(elem49);
        animation.anims.push(elem49.animate({
            transform: [
                `scale(0.4) translate(${parseInt(width) * 0.75}px, -${parseInt(height) * 0.75}px)`,
                `scale(0.4) translate(${parseInt(width) * 0.75}px, -${parseInt(height) * 0.75}px)`,
            ],
            filter: [`grayscale(0)`, `grayscale(15%)`, `grayscale(80%)`, 'grayscale(80%)'],
            opacity: [0, 1, 1, 1, 0.5, 0]
        }, {
            duration: 4400,
            fill: 'forwards'
        }));
    }, 5600);
    animation.timersTimeout.push(timer5);

    const timer6 = setTimeout(() => {
        const elem54 = document.createElement('div');
        elem54.style.width = width;
        elem54.style.height = height;
        elem54.style.background = `url("./images/images(54).jpg") no-repeat 50% 50% /120%`;
        elem54.style.position = 'absolute';
        container.appendChild(elem54);
        animation.anims.push(elem54.animate({
            transform: [
                `scale(0.4) translate(${parseInt(width) * 0.75}px, -${parseInt(height) * 0.75}px)`,
                `scale(0.4) translate(${parseInt(width) * 0.75}px, -${parseInt(height) * 0.75}px)`,
            ],
            filter: [`grayscale(0)`, `grayscale(0)`, `grayscale(0)`, 'grayscale(80%)'],
            opacity: [0.3, 1]
        }, {
            duration: 2400,
            fill: 'forwards'
        }));
    }, 8200);
    animation.timersTimeout.push(timer6);

    const timer47 = setTimeout(() => {
        const elem47 = document.createElement('div');
        elem47.style.width = width;
        elem47.style.height = height;
        elem47.style.background = `url("./images/images(47).jpg") no-repeat 50% 50% /120%`;
        elem47.style.position = 'absolute';
        container.appendChild(elem47);
        animation.anims.push(elem47.animate({
            transform: [`translate(${parseInt(width) * 1.1}px)`,
                `translate(${parseInt(width) * 0.8}px)`,
                `translate(${parseInt(width) * 0.6}px)`,
                `translate(${parseInt(width) * 0.6}px)`,
                `translate(${parseInt(width) * 0.6}px)`,
                `translate(${parseInt(width) * 0.6}px)`,
                `translate(${parseInt(width) * 0.6}px, ${parseInt(height) / 3}px)`
            ],
            filter: [`grayscale(0)`, `grayscale(0)`, `grayscale(20%)`, `grayscale(50%)`, 'grayscale(80%)'],
        }, {
            duration: 5000,
            fill: 'forwards'
        }));
    }, 600);
    animation.timersTimeout.push(timer47);

    return new Promise(resolve => {
        const timer8 = setTimeout(() => {
            addFullSizeImage(53);
            animation.anims.push(imgElements[53].animate({
                transform: [
                    `translate(-${parseInt(width) * 0.4}px)`,
                    `translate(-${parseInt(width) * 0.4}px)`,
                    `translate(0)`,
                ],
                filter: [`grayscale(0)`, `grayscale(0)`, `grayscale(30%)`, 'grayscale(70%)'],
                opacity: [0, 1, 1]
            }, {
                duration: 3200,
                fill: 'forwards'
            }));
            const timer7 = setTimeout(resolve, 6500);
            animation.timersTimeout.push(timer7);
        }, 11500);
        animation.timersTimeout.push(timer8);
    });
}

function episode12() {
    animation.func = 16;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';
    addFullSizeImage(55);
    animation.anims.push(imgElements[55].animate({
        transform: [
            `translate(${parseInt(width) * 0.75}px, -${parseInt(height) * 0.25}px) scale(0.2)`,
            `translate(-${parseInt(width) * 0.25}px, 0) scale(0.6)`,
        ],
    }, {
        duration: 1500,
        fill: 'forwards'
    }));

    const timer1 = setTimeout(() => {
        addFullSizeImage(56);
        animation.anims.push(imgElements[56].animate({
            transform: [
                `translate(${parseInt(width) * 0.9}px, -${parseInt(height) * 0.25}px) scale(0.2)`,
                `translate(${parseInt(width) * 0.25}px, 0) scale(0.6)`,
            ],
        }, {
            duration: 1500,
            fill: 'forwards'
        }));

    }, 1600);
    animation.timersTimeout.push(timer1);

    return new Promise(resolve => {
        const timer2 = setTimeout(() => {
            addFullSizeImage(57);
            animation.anims.push(imgElements[57].animate({
                transform: [
                    `scale(2.5)`,
                    `scale(0.65)`,
                ],
                opacity: [0, 1]
            }, {
                duration: 1000,
                fill: 'forwards'
            }));``
            const timer3 = setTimeout(resolve, 3000);
            animation.timersTimeout.push(timer3);
        }, 4800);
        animation.timersTimeout.push(timer2);
    });
}

function episode13() {
    animation.func = 17;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';

    const elem56 = document.createElement('div');
    elem56.style.width = width;
    elem56.style.height = height;
    elem56.style.background = `url("./images/images(56).jpg") no-repeat 50% 50% /430%`;
    elem56.style.filter = 'brightness(50%)';
    elem56.style.position = 'absolute';
    container.appendChild(elem56);

    addFullSizeImage(58);

    const timer2 = setTimeout(() => {
        addFullSizeImage(59);
        imgElements[59].querySelector('img').style.border = 'none';
        animation.anims.push(imgElements[59].animate({
            transform: [
                `translate(${parseInt(width) * 0.21}px, ${parseInt(height) * 0.12}px) scale(0.6) rotate(14deg)`,
                `translate(${parseInt(width) * 0.17}px, ${parseInt(height) * 0.12}px) scale(0.6) rotate(-8deg)`,
                `translate(${parseInt(width) * 0.13}px, ${parseInt(height) * 0.12}px) scale(0.6) rotate(-4deg)`,
                `translate(${parseInt(width) * 0.13}px, ${parseInt(height) * 0.12}px) scale(0.6) rotate(-2deg)`,
            ],
            opacity: [0, 1, 1, 1, 1]
        }, {
            duration: 7800,
            fill: 'forwards'
        }));
    }, 80);

    const timer1 = setTimeout(() => {
        const elem60 = document.createElement('div');
        elem60.style.width = width;
        elem60.style.height = height;
        elem60.style.background = `url("./images/images(60).jpg") no-repeat 50% 50% /100%`;
        elem60.style.position = 'absolute';
        container.appendChild(elem60);
        animation.anims.push(elem60.animate({
            transform: [
                `translate(0, 0) scale(2)`,
                `translate(0, 0) scale(2)`,
                `translate(-${parseInt(width) * 0.18}px, ${parseInt(height) * 0.18}px) scale(0.6) rotate(5deg)`,
                `translate(-${parseInt(width) * 0.18}px, ${parseInt(height) * 0.18}px) scale(0.6) rotate(1deg)`,
                `translate(-${parseInt(width) * 0.18}px, ${parseInt(height) * 0.18}px) scale(0.6) rotate(-2deg)`,
                `translate(0, 0) scale(1)`,
            ],
        }, {
            duration: 9400,
            fill: 'forwards'
        }));
    }, 120);

    animation.timersTimeout.push(timer1);
    animation.timersTimeout.push(timer2);

    imgElements[58].querySelector('img').style.border = 'none';
    animation.anims.push(imgElements[58].animate({
        transform: [
            `translate(-${parseInt(width) * 0.15}px, 0) scale(0.6) rotate(-3deg)`,
            `translate(-${parseInt(width) * 0.15}px, -${parseInt(height) * 0.18}px) scale(0.6) rotate(-7deg)`,
            `translate(-${parseInt(width) * 0.15}px, -${parseInt(height) * 0.18}px) scale(0.6) rotate(-3deg)`,
            `translate(-${parseInt(width) * 0.15}px, -${parseInt(height) * 0.18}px) scale(0.6) rotate(0deg)`,
            `translate(-${parseInt(width) * 0.15}px, -${parseInt(height) * 0.18}px) scale(0.6) rotate(-2deg)`,
        ],
        opacity: [0, 0, 1, 1, 1]
    }, {
        duration: 8000,
        fill: 'forwards'
    }));

    return new Promise(resolve => {
        const timer3 = setTimeout(resolve, 12000);
        animation.timersTimeout.push(timer3);
    });
}

function episode14() {
    animation.func = 18;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';
    addFullSizeImage(61);
    addFullSizeImage(58);
    addFullSizeImage(59);
    addFullSizeImage(60);
    imgElements[61].querySelector('img').style.border = 'none';

    animation.anims.push(imgElements[60].animate({
        transform: [`scale(1)`, `scale(3)`],
        opacity: [1, 0.8, 0]
    }, {
        duration: 1300,
        fill: 'forwards'
    }));

    animation.anims.push(imgElements[59].animate({
        transform: [`scale(1)`, `scale(3)`],
        opacity: [1, 0.75, 0]
    }, {
        duration: 1300,
        delay: 1300,
        fill: 'forwards'
    }));

    animation.anims.push(imgElements[58].animate({
        transform: [
            `translate(-${parseInt(width) * 0.2}px, -${parseInt(height) * 0.15}px) scale(0.6) rotate(7deg)`,
            'scale(1)',
            'scale(3)',
        ],
        opacity: [0, 0.2, 1, 0.8, 0]
    }, {
        duration: 4200,
        delay: 1300,
        fill: 'forwards'
    }));

    animation.anims.push(imgElements[61].animate({
        transform: [
            'translate(0, 0) scale(1.4)',
            'translate(0, 0) scale(1.4)',
            'translate(0, 0) scale(1.4)',
            'translate(0, 0) scale(1.4)',
            `translate(${parseInt(width) * 0.3}px, 0) scale(1)`
        ]
    }, {
        duration: 4000,
        delay: 4500,
        fill: 'forwards'
    }));

    const timer1 = setTimeout(() => {
        addFullSizeImage(62);
        imgElements[62].querySelector('img').style.border = 'none';
        animation.anims.push(imgElements[62].animate({
            transform: [
                `translate(-${parseInt(width) * 1.2}px, 0)`,
                `translate(-${parseInt(width) * 0.48}px, 0)`
            ]
        }, {
            duration: 1300,
            fill: 'forwards'
        }));
    }, 8300);
    animation.timersTimeout.push(timer1);

    return new Promise(resolve => {
        const timer2 = setTimeout(() => {
            addFullSizeImage(63);
            imgElements[63].querySelector('img').style.border = 'none';
            animation.anims.push(imgElements[63].animate({
                transform: [
                    `translate(0, -${parseInt(height) * 1.2}px) scale(1.2)`,
                    `translate(0, 0) scale(1.3)`
                ]
            }, {
                duration: 1000,
                fill: 'forwards'
            }));
            const timer3 = setTimeout(resolve, 3200);
            animation.timersTimeout.push(timer3);
        }, 10800);
        animation.timersTimeout.push(timer2);
    });
}

function episode15() {
    animation.func = 19;
    animation.anims = [];
    animation.timersInterval = [];
    animation.timersTimeout = [];
    container.innerHTML = '';
    const element64 = document.createElement('div');
    const element65 = document.createElement('div');
    const element66 = document.createElement('div');

    element64.style.width = parseInt(width) * 0.6 + 'px';
    element64.style.height = height;
    element64.style.background = `url("./images/images(64).jpg") no-repeat 50% 50% /165%`;
    container.appendChild(element64);

    element65.style.width = parseInt(width) * 0.4 + 'px';
    element65.style.height = height;
    element65.style.background = `url("./images/images(65).jpg") no-repeat 50% 25% /140%`;
    container.appendChild(element65);

    element66.style.width = parseInt(width) * 0.4 + 'px';
    element66.style.height = height;
    element66.style.background = `url("./images/images(66).jpg") no-repeat 50% 50% /140%`;
    container.appendChild(element66);

    animation.anims.push(element64.animate({
        transform: [
            `translate(${parseInt(width) * 0.6}px, 0)`,
            `translate(-${parseInt(width) / 100}px, 0)`
        ],
    }, {
        duration: 1800,
        fill: 'forwards'
    }));

    animation.anims.push(element65.animate({
        transform: [
            `translate(${parseInt(width) * 0.6}px, -${parseInt(height) * 2}px)`,
            `translate(${parseInt(width) * 0.6}px, -${parseInt(height) * 1.2}px)`
        ],
    }, {
        duration: 1800,
        fill: 'forwards'
    }));

    animation.anims.push(element66.animate({
        transform: [
            `translate(${parseInt(width) * 0.6}px, -${parseInt(height) * 0.5}px)`,
            `translate(${parseInt(width) * 0.6}px, -${parseInt(height) * 1.8}px)`
        ],
    }, {
        duration: 1800,
        fill: 'forwards'
    }));


    let timer;
    for (let i = 1; i < 6; i++) {
        timer = setTimeout(() => {
            document.querySelector('#player').volume -= 0.2;
        }, 1000 * i);
        animation.timersTimeout.push(timer);
    }

    const timer2 = setTimeout(() => {
        player.pause();
        animation.anims.push(container.animate({
            opacity: [1, 0]
        }, {
            duration: 1500,
            fill: 'forwards'
        }));
        const timer3 = setTimeout(() => {
            player.load();
            location.reload();
        }, 2000);
        animation.timersTimeout.push(timer3);
    }, 5000);
    animation.timersTimeout.push(timer2);
}
