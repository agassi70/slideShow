const body = document.querySelector('body');
const container = document.querySelector('#container');
const bodyHeight = body.style.height = document.documentElement.clientHeight + 'px';
const height = container.style.height = parseInt(bodyHeight) * 96 /100 + 'px';
const width = container.style.width = parseInt(height) * 1920 / 1080 + 'px';

let images = [];
let img;
let offsetX = 0;
let offsetY = 0;
let angle = 0;

for (let i = 1; i < 145; i++) {
    images[i] = `images(${i}).jpg`;
}

const imgElements = createImgElements();

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
    .then(episode9);



//offsetY = parseInt(height) * 0.2;
//episode8()
//    .then(episode9);

function createImgElements() {
    let imgElements = images.map(image => {
        const el = document.createElement('div');
        el.classList.add('wrapper');
        el.innerHTML = `<img src="./images/${image}"  width="${parseInt(width)*0.6}" height="${parseInt(height)*0.6}">`;
        return el;
    });
    return imgElements;
}

function addFullSizeImage(number) {
    container.appendChild(imgElements[number]);
    img = imgElements[number].querySelector('img');
    img.style.width = width;
    img.style.height = height;
}

function episode1(number) {
    return new Promise(resolve => {
        let counter = number;
        offsetY = parseInt(height) * 0.2;
        const timer = setInterval(() => {
            container.appendChild(imgElements[counter]);

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

            imgElements[counter].animate({
                transform: [`translate(-${width}, ${height}) rotate(-60deg)`,
                    `translate(${offsetX}px, ${offsetY}px) rotate(${angle}deg`]
            }, {
                duration: 300,
                fill: 'forwards'
            });

            if (++counter > (number + 4)) {
                clearInterval(timer);
                resolve();
            }
        }, 1200);
    });
}

function episode2(number) {
    return new Promise(resolve => {
        let counter = number + 4;

        const timer = setInterval(() => {
            let op = counter === number ? 1 : 0;

            if (counter !== (number + 4)) {
                imgElements[counter + 1].remove();
            }

            imgElements[counter].animate({
                transform: [`translate(${offsetX}px, ${offsetY}px) scale(1)`,
                    `translate(${offsetX}px, ${offsetY}px) scale(2)`],
                opacity: [1, op]
            }, {
                duration: 1000,
                easing: 'ease-in',
                fill: 'forwards'
            });

            if (--counter < number) {
                clearInterval(timer);
                setTimeout(resolve, 2000);
            }
        }, 1200)
    });
}

function episode3() {
    imgElements[1].remove();
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
        }, 1000);
    });
}

function episode4() {
    container.appendChild(imgElements[9]);
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
            imgElements[6].remove();
            imgElements[7].remove();
            imgElements[8].remove();
            imgElements[9].remove();

            addFullSizeImage(8);
            imgElements[8].animate({
                transform: [`translate(${width})`, `translate(0)`, `translate(${width})`],
            }, {
                duration: 2000,
                fill: 'forwards'
            });

            addFullSizeImage(7);
            imgElements[7].animate({
                transform: [`translate(-${width})`, `translate(0)`],
            }, {
                duration: 1000,
                delay: 1000,
                fill: 'forwards'
            });

            setTimeout(() => {
                imgElements[7].remove();
                imgElements[8].remove();
                resolve();
            }, 3000);

        }, 3500);
    })
}

function episode5() {
    imgElements[10].remove();
    let counter = 15;
    let dur = 300;
    let endY = offsetY;
    let startX, startY, endX;
    let startAngle, endAngle, startScale, endScale;

    return new Promise(resolve => {
        const timer = setInterval(() => {
            switch (counter) {
                case (15):
                    startX = 0;
                    endX = parseInt(width) * 0.2;
                    startY = - parseInt(height) * 0.6;
                    startScale = 0.6;
                    endScale = 1;
                    startAngle = 15;
                    endAngle = -3;
                    break;
                case (16):
                    startX = - parseInt(width) * 0.6;
                    startY = 0;
                    endX = parseInt(width) * 0.2;
                    startScale = 0.5;
                    endScale = 1;
                    startAngle = -5;
                    endAngle = 5;
                    break;
                case (17):
                    startX = parseInt(width) * 0.6;
                    startY = 0;
                    endX = parseInt(width) * 0.2;
                    startScale = 0.5;
                    endScale = 1;
                    startAngle = 5;
                    endAngle = -5;
                    break;
                case (18):
                    startX = parseInt(width) * 0.8;
                    startY = 0;
                    endX = parseInt(width) * 0.2;
                    startScale = 0.5;
                    endScale = 1.6;
                    startAngle = 15;
                    endAngle = 0;
                    dur = 4000;
                    break;
            }

            container.appendChild(imgElements[counter]);

            if (counter === 18) {
                imgElements[counter].animate({
                    transform: [`translate(${startX}px, ${startY}px) rotate(${startAngle}deg) scale(${startScale})`,
                        `translate(${endX}px, ${endY}px) rotate(${endAngle}deg) scale(${endScale})`,
                        `translate(${endX}px, ${endY}px) rotate(${endAngle}deg) scale(${endScale})`,
                        `translate(${endX}px, ${endY}px) rotate(${endAngle}deg) scale(${endScale})`,
                        `translate(0, 0) rotate(0) scale(1)`
                    ],
                }, {
                    duration: dur,
                    fill: 'forwards'
                });
            } else {
                imgElements[counter].animate({
                    transform: [`translate(${startX}px, ${startY}px) rotate(${startAngle}deg) scale(${startScale})`,
                        `translate(${endX}px, ${endY}px) rotate(${endAngle}deg) scale(${endScale})`
                    ],
                }, {
                    duration: dur,
                    fill: 'forwards'
                });
            }


            if (++counter > 18) {
                clearInterval(timer);
                setTimeout(() => {
                    imgElements[15].remove();
                    imgElements[16].remove();
                    imgElements[17].remove();
                    resolve();
                }, 4000);
            }
        }, 1000);
    });
}

function episode6() {
    let counter = 18;
    imgElements[18].remove();
    addFullSizeImage(15);
    addFullSizeImage(16);
    addFullSizeImage(17);
    addFullSizeImage(18);

    return new Promise(resolve => {

        const timer = setInterval(() => {
            offsetX = counter % 2 === 0 ? parseInt(width) * (-1.2) : parseInt(width) * 1.2;
            imgElements[counter].animate({
                transform: ['translate(0, 0) rotate(0) scale(1)', `translate(${offsetX}px) rotate(10deg)`],
            }, {
                duration: 1500,
                fill: 'forwards'
            });

            if (--counter < 15) {
                clearInterval(timer);
                imgElements[16].remove();
                imgElements[17].remove();
                imgElements[18].remove();
                addFullSizeImage(19);
                setTimeout(() => {
                    container.appendChild(imgElements[20]);
                    imgElements[20].animate({
                        transform: [`translate(0, -${parseInt(height) * 0.6}px) rotate(60deg)`,
                            `translate(${parseInt(width) * 0.2}px, ${parseInt(height) * 0.2}px) rotate(10deg)`],
                    }, {
                        duration: 1200,
                        fill: 'forwards'
                    });
                }, 1000);

                setTimeout(() => {
                    container.appendChild(imgElements[21]);
                    imgElements[21].animate({
                        transform: [`translate(${parseInt(width) * 0.6}px, -${parseInt(height) * 0.6}px) rotate(-60deg)`,
                            `translate(${parseInt(width) * 0.25}px, ${parseInt(height) * 0.2}px) rotate(-10deg)`],
                    }, {
                        duration: 1200,
                        fill: 'forwards'
                    });
                }, 2200);

                setTimeout(() => {
                    container.appendChild(imgElements[22]);
                    imgElements[22].animate({
                        transform: [
                            `translate(${parseInt(width) * 0.6}px, ${parseInt(height) * 0.6}px) rotate(60deg)`,
                            `translate(${parseInt(width) * 0.3}px, ${parseInt(height) * 0.2}px) rotate(10deg) scale(1.2)`,
                            `translate(${parseInt(width) * 0.2}px, ${parseInt(height) * 0.2}px) rotate(0deg) scale(1.7)`
                        ],
                    }, {
                        duration: 2000,
                        fill: 'forwards'
                    });
                }, 3400);

                setTimeout(resolve, 5400);
            }
        }, 1500)
    });
}

function episode7() {
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
                let delay = 1500 * (26 - i);
                offsetX = i % 2 === 0 ? width : `-${parseInt(width) * 1.2}px`;
                imgElements[i].animate({
                    transform: [`translate(0, 0)`,
                        `translate(${offsetX}, 0)`]
                }, {
                    duration: 1500,
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
                    transform: [`translate(0, 0)`,
                        `scale(0.5) translate(${coordX}px, ${coordY}px)`]
                }, {
                    fill: 'forwards'
                });
            }

            setTimeout(() => {
                container.animate({
                    transform: ['rotateY(0)', 'rotateY(360deg)']
                }, {
                    duration: 3000,
                    fill: 'forwards'
                });
                setTimeout(() => {
                    container.innerHTML = '';
                    addFullSizeImage(31);
                    setTimeout(resolve, 1700);
                }, 1800);
            }, 4500);
        }, 13400);
    });
}

function episode8() {
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
                        duration: 1200,
                        fill: 'forwards'
                    });
                    setTimeout(resolve, 2500);
                }, 1300);
            }
        }, 1400);
    });
}

function episode9() {
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
        duration: 4200,
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
            duration: 6500,
            fill: 'forwards'
        });
    }, 1800);

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
            duration: 6500,
            fill: 'forwards'
        });
    }, 4800);

    setTimeout(() => {
        addFullSizeImage(39);
        imgElements[39].animate({
            transform: [`scale(0.3)`,
                `translate(0) rotate(4deg) scale(0.8)`,
                `translate(0) rotate(0deg) scale(1)`,
                `translate(${parseInt(width) * 1.3}px) rotate(-10deg)`,
            ]
        }, {
            duration: 5800,
            fill: 'forwards'
        });
    }, 9000);

    setTimeout(() => {
        addFullSizeImage(40);
        imgElements[40].animate({
            transform: [`scale(0.3)`,
                `scale(1)`
            ]
        }, {
            duration: 2000,
            fill: 'forwards'
        });
    }, 13000);
}