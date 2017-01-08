const body = document.querySelector('body');
const container = document.querySelector('#container');
let bodyWidth;
let bodyHeight;
let height;
let width;

let images = [];
let img;
let offsetX = 0;
let offsetY = 0;
let angle = 0;
let animation = {};

resizeWindow();

for (let i = 1; i < 145; i++) {
    images[i] = `images(${i}).jpg`;
}

const imgElements = createImgElements();

window.addEventListener('resize', resizeWindow);

document.querySelector('#player').play();

episode1(1)
    .then(() => episode2(1))
    .then(episode3)
    .then(episode4)
    .then(() => episode1(10))
    .then(() => episode2(10))
    .then(episode5)
    .then(episode6)
    .then(episode7)
    .then(episode8)
    .then(episode9)
    .then(episode10)
    .then(episode11)
    .then(episode12)
    .then(episode13)
    .then(episode14)
    .then(episode15);

function resizeWindow() {
    bodyHeight = document.documentElement.clientHeight + 'px';
    bodyWidth = document.documentElement.clientWidth + 'px';
    height = parseInt(bodyHeight) * 96 /100 + 'px';
    width = parseInt(height) * 1920 / 1080 + 'px';

    if (width > bodyWidth) {
        width = parseInt(bodyWidth) * 0.9 + 'px';
        height = parseInt(width) * 1080 / 1920 + 'px';
    }
    body.style.height = bodyHeight;
    container.style.height = height;
    container.style.width = width;
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
    img.style.width = parseInt(width) * 0.65 + 'px';
    img.style.height = parseInt(height) * 0.65 + 'px';
}

function episode1(number) {
    return new Promise(resolve => {
        let counter = number;
        offsetY = parseInt(height) * 0.2;
        const timer = setInterval(() => {
            container.style.background = `url("./images/images(${number}).jpg") no-repeat 50% 50% /250%`;
            addImage(counter);

            switch (counter) {
                case (number):
                    offsetX = parseInt(width) * 0.16;
                    break;
                case (number + 1):
                    offsetX = parseInt(width) * 0.2;
                    angle = -10;
                    break;
                case (number + 2):
                    offsetX = parseInt(width) * 0.23;
                    angle = 10;
                    break;
                case (number + 3):
                    offsetX = parseInt(width) * 0.26;
                    angle = -15;
                    break;
                case (number + 4):
                    offsetX = parseInt(width) * 0.18;
                    angle = 5;
                    break;
            }

            animation[`animate${counter}`] = imgElements[counter].animate({
                transform: [`translate(-${width}, ${height}) rotate(-60deg)`,
                    `translate(${offsetX}px, ${offsetY}px) rotate(${angle}deg`]
            }, {
                duration: 500,
                fill: 'forwards'
            });

            if (++counter > (number + 4)) {
                clearInterval(timer);
                setTimeout(() => {
                    container.style.background = '';
                }, 8000);
                setTimeout(resolve, 1500);
            }
        }, 1300);
    });
}

function episode2(number) {
    let filter = number === 1 ? '0' : '100%';
    return new Promise(resolve => {
        let counter = number + 4;

        const timer = setInterval(() => {
            let op = counter === number ? 1 : 0;

            if (counter !== (number + 4)) {
                container.removeChild(imgElements[counter + 1]);
            }

            imgElements[counter].animate({
                transform: [`translate(${offsetX}px, ${offsetY}px) scale(1)`,
                    `translate(${offsetX}px, ${offsetY}px) scale(2.5)`],
                opacity: [1, op],
                filter: [`grayscale(${filter})`, 'grayscale(0)']
            }, {
                duration: 1000,
                easing: 'ease-in',
                fill: 'forwards'
            });

            if (--counter < number) {
                clearInterval(timer);
                setTimeout(resolve, 1000);
            }
        }, 1400);
    });
}

function episode3() {
    container.removeChild(imgElements[1]);
    addFullSizeImage(6);

    return new Promise(resolve => {
        setTimeout(() => {
            addFullSizeImage(7);

            addFullSizeImage(8);

            imgElements[7].animate({
                transform: [`translateX(-${width})`,
                    `translateX(-${parseInt(width) / 2}px)`,
                    `translateX(-${parseInt(width) / 2}px)`,
                    `translateX(-${parseInt(width) / 2}px)`,
                    `translateX(-${parseInt(width) * 0.8}px)`],
            }, {
                duration: 3000,
                fill: 'forwards'
            });


            imgElements[8].animate({
                transform: [`translateX(${width})`,
                    `translateX(${parseInt(width) / 2}px)`,
                    `translateX(${parseInt(width) / 2}px)`,
                    `translateX(${parseInt(width) / 2}px)`,
                    `translateX(${parseInt(width) * 0.8}px)`],
            }, {
                duration: 3000,
                fill: 'forwards'
            });

            setTimeout(resolve, 3000);
        }, 1200);
    });
}

function episode4() {
    addImage(9);
    img = imgElements[9].querySelector('img');
    img.style.width = parseInt(width) * 0.6 + 'px';
    img.style.height = parseInt(height) * 0.6 + 'px';

    imgElements[9].animate({
        transform: [`translate(${parseInt(width) * 0.2}px, ${height})`,
            `translate(${parseInt(width) * 0.2}px, ${-parseInt(height) * 0.65}px)`],
    }, {
        duration: 3500,
        fill: 'forwards'
    });

    return new Promise(resolve => {
        setTimeout(() => {
            container.innerHTML = '';
            addFullSizeImage(8);
            imgElements[8].animate({
                transform: [`translate(${width})`, `translate(0)`, `translate(${width})`],
            }, {
                duration: 2500,
                delay: 200,
                fill: 'forwards'
            });

            addFullSizeImage(7);
            imgElements[7].animate({
                transform: [`translate(-${parseInt(width) * 1.4}px)`, `translate(0)`],
            }, {
                duration: 1400,
                delay: 1200,
                fill: 'forwards'
            });

            setTimeout(() => {
                container.innerHTML = '';
                resolve();
            }, 4000);

        }, 3500);
    })
}

function episode5() {
    container.style.background = `url("./images/images(15).jpg") no-repeat 50% 50% /300%`;
    let counter = 15;
    let dur = 2500;
    let startX, startY, endX, endY;
    let startAngle, endAngle, startScale, endScale;

    return new Promise(resolve => {
        const timer = setInterval(() => {
            switch (counter) {
                case (15):
                    startX = 0;
                    endX = parseInt(width) / 10;
                    startY = parseInt(height) * (-0.8);
                    endY = parseInt(height) / 8;
                    startScale = 0.6;
                    endScale = 1.4;
                    startAngle = 15;
                    endAngle = -3;
                    break;
                case (16):
                    startX = parseInt(width) * (-0.6);
                    startY = 0;
                    endX = parseInt(width) / 10;
                    endY = parseInt(height) / 8;
                    startScale = 0.6;
                    endScale = 1.4;
                    startAngle = -5;
                    endAngle = 3;
                    break;
                case (17):
                    startX = parseInt(width) * 0.8;
                    startY = 0;
                    endX = parseInt(width) / 12;
                    endY = parseInt(height) / 9;
                    startScale = 0.6;
                    endScale = 1.4;
                    startAngle = 10;
                    endAngle = -3;
                    dur = 3000;
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

            imgElements[counter].animate({
                transform: [`translate(${startX}px, ${startY}px) rotate(${startAngle}deg) scale(${startScale})`,
                    `scale(${endScale}) rotate(${endAngle}deg) translate(${endX}px, ${endY}px)`
                ],
            }, {
                duration: dur,
                fill: 'forwards',
                easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
            });


            if (++counter > 18) {
                clearInterval(timer);
                setTimeout(() => {
                    let cloneImg18 = imgElements[18].cloneNode(true);
                    container.innerHTML = '';
                    addFullSizeImage(15);
                    addFullSizeImage(16);
                    addFullSizeImage(17);
                    container.appendChild(cloneImg18);
                    cloneImg18.animate({
                        transform: [
                            `scale(1.8) translate(${parseInt(width) / 10}px, ${parseInt(height) / 10}px)`,
                            `scale(1.5) translate(-${parseInt(width) * 1.2}px, 0)`
                        ],
                    }, {
                        duration: 2500,
                        fill: 'forwards'
                    });

                    resolve();
                }, 5800);
            }
        }, 1400);
    });
}

function episode6() {
    let counter = 17;

    return new Promise(resolve => {

        const timer = setInterval(() => {
            offsetX = counter % 2 === 0 ? parseInt(width) * (-1.2) : parseInt(width) * 1.2;

            imgElements[counter].animate({
                transform: ['translate(0, 0)', `translate(${offsetX}px) rotate(10deg)`],
            }, {
                duration: 2000,
                fill: 'forwards'
            });

            if (--counter < 15) {
                clearInterval(timer);
                setTimeout(() => {
                    container.innerHTML = '';
                    container.animate({
                        transform: ['rotate(0)', 'rotate(8deg)'],
                    }, {
                        duration: 2100,
                    });
                }, 2200);
                setTimeout(resolve, 4300);
            }
        }, 2100)
    });
}

function episode7() {
    container.innerHTML = '';
    addFullSizeImage(19);
    imgElements[19].animate({
        transform: [`scale(0.8)`, `scale(1)`],
        filter: [`grayscale(0)`, `grayscale(0)`, 'grayscale(100%)']
    }, {
        duration: 1800,
        fill: 'forwards'
    });
    setTimeout(() => {
        addImage(20);
        imgElements[20].animate({
            transform: [`translate(0, -${parseInt(height) * 0.6}px) rotate(60deg)`,
                `translate(${parseInt(width) * 0.2}px, ${parseInt(height) * 0.2}px) rotate(10deg)`],
            filter: [`grayscale(0)`, `grayscale(0)`, 'grayscale(100%)']
        }, {
            duration: 1800,
            fill: 'forwards'
        });
    }, 1600);

    setTimeout(() => {
        addImage(21);
        imgElements[21].animate({
            transform: [`translate(${parseInt(width) * 0.6}px, -${parseInt(height) * 0.6}px) rotate(-60deg)`,
                `translate(${parseInt(width) * 0.25}px, ${parseInt(height) * 0.2}px) rotate(-10deg)`],
            filter: [`grayscale(0)`, 'grayscale(100%)']
        }, {
            duration: 1800,
            fill: 'forwards'
        });
    }, 3200);

    return new Promise(resolve => {
        setTimeout(() => {
            addImage(22);
            imgElements[22].animate({
                transform: [
                    `translate(${parseInt(width) * 0.6}px, ${parseInt(height) * 0.6}px) rotate(60deg)`,
                    `translate(${parseInt(width) * 0.3}px, ${parseInt(height) * 0.2}px) rotate(10deg) scale(1.2)`,
                    `translate(${parseInt(width) * 0.2}px, ${parseInt(height) * 0.2}px) rotate(0deg) scale(1.7)`
                ],
            }, {
                duration: 4200,
                fill: 'forwards'
            });
            setTimeout(resolve, 4600);
        }, 5000);
    });
}

function episode8() {
    container.style.background = '';
    container.innerHTML = '';
    let counter = 23;

    const timer = setInterval(() => {
        addFullSizeImage(counter);
        let angleY = counter % 2 === 0 ? 1 : 4;
        imgElements[counter].animate({
            transform: [`translate(0, ${parseInt(width) / 2}px) rotate3d(2, ${angleY}, 0, 90deg)`,
                `translate(0, 0) rotate3d(0, 0, 0, 0deg)`]
        }, {
            duration: 1750,
            fill: 'forwards'
        });

        if (++counter  > 26) {
            clearInterval(timer);
            container.innerHTML = '';
            addFullSizeImage(23);
            addFullSizeImage(24);
            addFullSizeImage(25);
            addFullSizeImage(26);

            for (let i = 26; i > 22; i--) {
                let delay = 2200 + 1000 * (26 - i);
                imgElements[i].animate({
                    transform: [`translate(0, 0)`,
                        `translate(${width}, 0)`]
                }, {
                    duration: 1000,
                    delay: delay,
                    fill: 'forwards'
                });
            }
        }
    }, 1800);

    return new Promise(resolve => {
        setTimeout(() => {
            container.innerHTML = '';
            let coordX, coordY;
            for (let i = 27; i < 31; i++) {
                addFullSizeImage(i);
                coordX = i % 2 === 0 ? parseInt(width) / 2 : parseInt(width) / (-2);
                coordY = i > 28 ? parseInt(height) / 2 : parseInt(height) / (-2);
                imgElements[i].animate({
                    transform: [`scaleX(0) translate(0, 0)`,
                        `scale(0.5) translate(${coordX}px, ${coordY}px)`,
                        `scale(0.5) translate(${coordX}px, ${coordY}px)`,
                        `scale(0.5) translate(${coordX}px, ${coordY}px)`,
                        `scaleX(0) translate(0, 0)`]
                }, {
                    duration: 7400,
                    fill: 'forwards'
                });
            }

            setTimeout(() => {
                container.innerHTML = '';
                addFullSizeImage(31);
                setTimeout(resolve, 2800);
            }, 7400);
        }, 13600);
    });
}

function episode9() {
    let counter = 32;

    return new Promise(resolve => {
        const timer = setInterval(() => {
            addFullSizeImage(counter);
            imgElements[counter].animate({
                transform: [`translate(-${width})`, 'translate(0)']
            }, {
                duration: 1200,
                fill: 'forwards'
            });

            if (++counter === 35) {
                clearInterval(timer);
                setTimeout(() => {
                    addFullSizeImage(35);
                    imgElements[35].animate({
                        transform: [`scale(0.25)`, 'scale(1)']
                    }, {
                        duration: 1800,
                        fill: 'forwards'
                    });
                    setTimeout(resolve, 3300);
                }, 1500);
            }
        }, 1300);
    });
}

function episode10() {
    container.innerHTML = '';

    addFullSizeImage(36);
    imgElements[36].animate({
        transform: [`scale(2.5)`,
            'scale(1)',
            'scale(1)',
            'rotate(7)',
            `translate(${width})`
        ]
    }, {
        duration: 7200,
        fill: 'forwards'
    });

    setTimeout(() => {
        addFullSizeImage(37);
        imgElements[37].animate({
            transform: [`translate(-${parseInt(width) * 2}px) rotate(60deg)`,
                `translate(-${width}) rotate(30deg)`,
                `translate(0) rotate(6deg)`,
                `translate(0) rotate(0deg)`,
                `translate(${parseInt(width) * 1.3}px) rotate(-10deg)`,
            ]
        }, {
            duration: 8200,
            fill: 'forwards'
        });
    }, 4000);

    setTimeout(() => {
        addFullSizeImage(38);
        imgElements[38].animate({
            transform: [`translate(${parseInt(width) * 2}px) rotate(-60deg)`,
                `translate(${width}) rotate(-30deg)`,
                `translate(0) rotate(-6deg)`,
                `translate(0) rotate(0deg)`,
                `translate(-${parseInt(width) * 1.3}px) rotate(10deg)`,
            ]
        }, {
            duration: 8200,
            fill: 'forwards'
        });
    }, 6500);

    setTimeout(() => {
        addFullSizeImage(39);
        imgElements[39].animate({
            transform: [`scale(0.3)`,
                `translate(0) rotate(4deg) scale(0.8)`,
                `translate(0) rotate(0deg) scale(1)`,
                `translate(${parseInt(width) * 1.3}px) rotate(-10deg)`,
            ]
        }, {
            duration: 8200,
            fill: 'forwards'
        });
    }, 10200);

    setTimeout(() => {
        container.style.background = `url("./images/images(40).jpg") no-repeat 50% 50% /100%`;
    }, 15500);

    return new Promise(resolve => {
        setTimeout(() => {
            addFullSizeImage(40);
            imgElements[40].querySelector('img').style.border = 'none';
            imgElements[40].animate({
                transform: [`scale(1)`,
                    `scale(3)`
                ]
            }, {
                duration: 5500,
                fill: 'forwards'
            });
            setTimeout(resolve, 7200);
        }, 18000);
    });
}

function episode11() {
    container.style.background = '';
    container.innerHTML = '';
    addFullSizeImage(47);
    addFullSizeImage(46);
    imgElements[46].animate({
        transform: [
            `translate(0, 0)`,
            `translate(-${parseInt(width) * 0.4}px)`,
            `translate(-${parseInt(width) * 0.4}px)`,
            `translate(-${parseInt(width) * 0.4}px, -${parseInt(height) / 2}px)`,
        ],
        filter: [`grayscale(0)`, `grayscale(50%)`, `grayscale(50%)`, 'grayscale(100%)'],
        opacity: [1, 1, 1, 1, 1, 0]
    }, {
        duration: 5000,
        fill: 'forwards'
    });

    imgElements[47].animate({
        transform: [`translate(${parseInt(width)}px)`,
            `translate(${parseInt(width) * 0.6}px)`,
            `translate(${parseInt(width) * 0.6}px)`,
            `translate(${parseInt(width) * 0.6}px, ${parseInt(height) / 3}px)`
        ],
        filter: [`grayscale(0)`, `grayscale(50%)`, `grayscale(50%)`, 'grayscale(100%)'],
        opacity: [1, 1, 1, 0]
    }, {
        duration: 6800,
        fill: 'forwards'
    });

    setTimeout(() => {
        addFullSizeImage(52);
        imgElements[52].animate({
            transform: [`translate(${parseInt(width) * 0.6}px, ${parseInt(height) / 3}px)`,
                `translate(${parseInt(width) * 0.6}px, ${parseInt(height) * 0.4}px)`],
            filter: [`grayscale(0)`, `grayscale(20%)`, `grayscale(50%)`, 'grayscale(80%)'],
            opacity: [0, 1]
        }, {
            duration: 3000,
            fill: 'forwards'
        });
    }, 6200);

    setTimeout(() => {
        addFullSizeImage(48);
        imgElements[48].animate({
            transform: [
                `scale(0.6) translate(-${parseInt(width) / 3}px, ${parseInt(height)}px)`,
                `scale(0.6) translate(-${parseInt(width) / 3}px, ${parseInt(height) / 2}px)`,
                `scale(0.6) translate(-${parseInt(width) / 3}px, ${parseInt(height) / 2}px)`,
            ],
            filter: [`grayscale(0)`, `grayscale(0)`, `grayscale(50%)`, 'grayscale(100%)'],
            opacity: [1, 1, 1, 0]
        }, {
            duration: 5500,
            fill: 'forwards'
        });

        addFullSizeImage(50);
        imgElements[50].animate({
            transform: [
                `translate(-${parseInt(width) * 0.4}px, -${parseInt(height) / 2}px)`,
                `translate(-${parseInt(width) * 0.4}px, -${parseInt(height) / 2}px)`,
                `translate(-${parseInt(width) * 0.4}px, -${parseInt(height) / 2}px)`,
                `translate(-${parseInt(width) * 0.4}px, 0)`,
            ],
            filter: [`grayscale(0)`, `grayscale(0)`, `grayscale(50%)`, 'grayscale(90%)'],
            opacity: [0, 0.6, 1]
        }, {
            duration: 8000,
            fill: 'forwards'
        });
        setTimeout(() => {
            addFullSizeImage(51);
            imgElements[51].animate({
                transform: [
                    `scale(0.6) translate(-${parseInt(width) / 3}px, ${parseInt(height) / 2}px)`,
                    `scale(0.6) translate(-${parseInt(width) / 3}px, ${parseInt(height) / 2}px)`
                ],
                filter: [`grayscale(0)`, `grayscale(0)`, `grayscale(50%)`, 'grayscale(80%)'],
                opacity: [0, 1, 0.8, 0]
            }, {
                duration: 3000,
                fill: 'forwards'
            });
        }, 4000);

    }, 3500);

    setTimeout(() => {
        addFullSizeImage(49);
        imgElements[49].animate({
            transform: [
                `scale(0.4) translate(${parseInt(width) * 0.75}px, -${parseInt(height) * 1.2}px)`,
                `scale(0.4) translate(${parseInt(width) * 0.75}px, -${parseInt(height) * 0.75}px)`,
            ],
            filter: [`grayscale(0)`, `grayscale(0)`, `grayscale(0)`, 'grayscale(100%)'],
            opacity: [1, 1, 1, 0]
        }, {
            duration: 4500,
            fill: 'forwards'
        });
        setTimeout(() => {
            addFullSizeImage(54);
            imgElements[54].animate({
                transform: [
                    `scale(0.4) translate(${parseInt(width) * 0.75}px, -${parseInt(height) * 0.75}px)`,
                    `scale(0.4) translate(${parseInt(width) * 0.75}px, -${parseInt(height) * 0.75}px)`,
                ],
                filter: [`grayscale(0)`, `grayscale(0)`, `grayscale(0)`, 'grayscale(80%)'],
                opacity: [0, 1]
            }, {
                duration: 2500,
                fill: 'forwards'
            });
        }, 3800);
    }, 4000);

    return new Promise(resolve => {
        setTimeout(() => {
            addFullSizeImage(53);
            imgElements[53].animate({
                transform: [
                    `translate(-${parseInt(width) * 0.4}px)`,
                    `translate(-${parseInt(width) * 0.4}px)`,
                    `translate(0)`,
                ],
                filter: [`grayscale(0)`, `grayscale(0)`, `grayscale(30%)`, 'grayscale(70%)'],
            }, {
                duration: 3200,
                fill: 'forwards'
            });
            setTimeout(() => {
                container.innerHTML = '';
                resolve();
            }, 6500);
        }, 13000);
    });
}

function episode12() {
    addFullSizeImage(55);
    imgElements[55].animate({
        transform: [
            `translate(${parseInt(width) * 0.75}px, -${parseInt(height) * 0.25}px) scale(0.2)`,
            `translate(-${parseInt(width) * 0.25}px, 0) scale(0.6)`,
        ],
    }, {
        duration: 1500,
        fill: 'forwards'
    });

    setTimeout(() => {
        addFullSizeImage(56);
        imgElements[56].animate({
            transform: [
                `translate(${parseInt(width) * 0.9}px, -${parseInt(height) * 0.25}px) scale(0.2)`,
                `translate(${parseInt(width) * 0.25}px, 0) scale(0.6)`,
            ],
        }, {
            duration: 1500,
            fill: 'forwards'
        });

    }, 1600);

    return new Promise(resolve => {
        setTimeout(() => {
            addFullSizeImage(57);
            imgElements[57].animate({
                transform: [
                    `scale(2.5)`,
                    `scale(0.65)`,
                ],
                opacity: [0, 1]
            }, {
                duration: 1000,
                fill: 'forwards'
            });
            setTimeout(() => {
                container.innerHTML = '';
                resolve();
            }, 3000);
        }, 4800);
    })
}

function episode13() {
    addFullSizeImage(58);
    imgElements[58].querySelector('img').style.border = 'none';
    imgElements[58].animate({
        transform: [
            `translate(-${parseInt(width) * 0.2}px, 0) scale(0.6) rotate(-3deg)`,
            `translate(-${parseInt(width) * 0.2}px, -${parseInt(height) * 0.15}px) scale(0.6) rotate(-7deg)`,
            `translate(-${parseInt(width) * 0.2}px, -${parseInt(height) * 0.15}px) scale(0.6) rotate(0deg)`,
            `translate(-${parseInt(width) * 0.2}px, -${parseInt(height) * 0.15}px) scale(0.6) rotate(-3deg)`,
            `translate(-${parseInt(width) * 0.2}px, -${parseInt(height) * 0.15}px) scale(0.6) rotate(7deg)`,
        ],
        opacity: [0, 1, 1, 1, 1]
    }, {
        duration: 8000,
        fill: 'forwards'
    });

    addFullSizeImage(59);
    imgElements[59].querySelector('img').style.border = 'none';
    imgElements[59].animate({
        transform: [
            `translate(${parseInt(width) * 0.2}px, 0) scale(0.6) rotate(-3deg)`,
            `translate(${parseInt(width) * 0.2}px, 0) scale(0.6) rotate(8deg)`,
            `translate(${parseInt(width) * 0.21}px, 0) scale(0.6) rotate(-3deg)`,
            `translate(${parseInt(width) * 0.21}px, 0) scale(0.6) rotate(-7deg)`,
            `translate(${parseInt(width) * 0.2}px, 0) scale(0.6) rotate(3deg)`,
        ],
        opacity: [0, 1, 1, 1, 1]
    }, {
        duration: 8000,
        fill: 'forwards'
    });

    addFullSizeImage(60);
    imgElements[60].querySelector('img').style.border = 'none';
    imgElements[60].animate({
        transform: [
            `translate(0, 0) scale(2)`,
            `translate(0, 0) scale(2)`,
            `translate(-${parseInt(width) * 0.2}px, ${parseInt(height) * 0.2}px) scale(0.6)`,
            `translate(-${parseInt(width) * 0.18}px, ${parseInt(height) * 0.18}px) scale(0.6) rotate(-5deg)`,
            `translate(-${parseInt(width) * 0.18}px, ${parseInt(height) * 0.18}px) scale(0.6) rotate(5deg)`,
            `translate(0, 0) scale(1)`,
        ],
    }, {
        duration: 9000,
        fill: 'forwards'
    });

    return new Promise(resolve => {
        setTimeout(() => {
            container.innerHTML = '';
            resolve();
        }, 12000);
    });
}

function episode14() {
    addFullSizeImage(61);
    addFullSizeImage(58);
    addFullSizeImage(60);
    imgElements[61].querySelector('img').style.border = 'none';

    imgElements[60].animate({
        transform: [`scale(1)`, `scale(3)`],
        opacity: [1, 0]
    }, {
        duration: 1600,
        fill: 'forwards'
    });

    imgElements[58].animate({
        transform: [
            `translate(-${parseInt(width) * 0.2}px, -${parseInt(height) * 0.15}px) scale(0.6) rotate(7deg)`,
            'scale(1)',
            'scale(3)',
        ],
        opacity: [1, 0.8, 0]
    }, {
        duration: 3000,
        delay: 1200,
        fill: 'forwards'
    });

    imgElements[61].animate({
        transform: [
            'translate(0, 0) scale(1.4)',
            'translate(0, 0) scale(1.4)',
            'translate(0, 0) scale(1.4)',
            'translate(0, 0) scale(1.4)',
            `translate(${parseInt(width) * 0.3}px, 0) scale(1)`
        ]
    }, {
        duration: 4300,
        delay: 3200,
        fill: 'forwards'
    });

    setTimeout(() => {
        addFullSizeImage(62);
        imgElements[62].querySelector('img').style.border = 'none';
        imgElements[62].animate({
            transform: [
                `translate(-${parseInt(width) * 1.2}px, 0)`,
                `translate(-${parseInt(width) * 0.48}px, 0)`
            ]
        }, {
            duration: 1500,
            fill: 'forwards'
        });
    }, 6100);

    return new Promise(resolve => {
        setTimeout(() => {
            addFullSizeImage(63);
            imgElements[63].querySelector('img').style.border = 'none';
            imgElements[63].animate({
                transform: [
                    `translate(0, -${parseInt(height) * 1.2}px) scale(1.2)`,
                    `translate(0, 0) scale(1.3)`
                ]
            }, {
                duration: 1800,
                fill: 'forwards'
            });
            setTimeout(resolve, 3200);
        }, 10000);
    });
}

function episode15() {
    container.innerHTML = '';
    const element64 = document.createElement('div');
    const element65 = document.createElement('div');
    const element66 = document.createElement('div');

    element64.style.width = parseInt(width) * 0.6 + 'px';
    element64.style.height = height;
    element64.style.background = `url("./images/images(64).jpg") no-repeat 50% 50% /150%`;
    container.appendChild(element64);

    element65.style.width = parseInt(width) * 0.4 + 'px';
    element65.style.height = height;
    element65.style.background = `url("./images/images(65).jpg") no-repeat 50% 50% /120%`;
    container.appendChild(element65);

    element66.style.width = parseInt(width) * 0.4 + 'px';
    element66.style.height = height;
    element66.style.background = `url("./images/images(66).jpg") no-repeat 50% 50% /120%`;
    container.appendChild(element66);

    let animation = element64.animate({
        transform: [
            `translate(${parseInt(width) * 0.6}px, 0)`,
            `translate(-${parseInt(width) / 100}px, 0)`
        ],
    }, {
        duration: 1800,
        fill: 'forwards'
    });

    element65.animate({
        transform: [
            `translate(${parseInt(width) * 0.6}px, -${parseInt(height) * 2}px)`,
            `translate(${parseInt(width) * 0.6}px, -${parseInt(height) * 1.2}px)`
        ],
    }, {
        duration: 1800,
        fill: 'forwards'
    });

    element66.animate({
        transform: [
            `translate(${parseInt(width) * 0.6}px, -${parseInt(height) * 0.5}px)`,
            `translate(${parseInt(width) * 0.6}px, -${parseInt(height) * 1.8}px)`
        ],
    }, {
        duration: 1800,
        fill: 'forwards'
    });


    for (let i = 1; i < 6; i++) {
        setTimeout(() => {
            document.querySelector('#player').volume -= 0.2;
        }, 1000 * i);
    }

    setTimeout(() => {
        document.querySelector('#player').pause();
        container.animate({
            opacity: [1, 0]
        }, {
            duration: 2000,
            fill: 'forwards'
        });
        window.removeEventListener('resize', resizeWindow);
    }, 5000);
}
