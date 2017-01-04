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
    .then(() => episode5(15));

function createImgElements() {
    let imgElements = images.map(image => {
        const el = document.createElement('div');
        el.classList.add('wrapper');
        el.innerHTML = `<img src="./images/${image}"  width="800" height="450">`;
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
        const timer = setInterval(() => {
            container.appendChild(imgElements[counter]);

            switch (counter) {
                case (number):
                    offsetX = 50;
                    offsetY = 60;
                    break;
                case (number + 1):
                    offsetX = 100;
                    offsetY = 60;
                    angle = -10;
                    break;
                case (number + 2):
                    offsetX = 150;
                    offsetY = 60;
                    angle = 10;
                    break;
                case (number + 3):
                    offsetX = 200;
                    offsetY = 60;
                    angle = -15;
                    break;
                case (number + 4):
                    offsetX = 50;
                    offsetY = 70;
                    angle = 3;
                    break;
            }

            imgElements[counter].animate({
                transform: ['translate(-800px, 800px) rotate(-60deg)',
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
                transform: ['scale(1)', 'scale(2.5)'],
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
    img.style.width = parseInt(width) * 0.59 + 'px';
    img.style.height = parseInt(height) * 0.6 + 'px';

    imgElements[9].animate({
        transform: [`translate(${parseInt(width) * 0.205}px, ${height})`,
            `translate(${parseInt(width) * 0.205}px, ${-parseInt(height) * 0.65}px)`],
    }, {
        duration: 3600,
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
            }, 2200);

        }, 3600);
    })
}

function episode5(number) {
    imgElements[10].remove();
    let counter = number;
    let dur = 300;
    let endY = 60;
    let startX, startY, endX;
    let startAngle, endAngle, startScale, endScale;

    const timer = setInterval(() => {
        switch (counter) {
            case (number):
                startX = 0;
                startY = - 800;
                endX = 50;
                startScale = 1;
                endScale = 1;
                startAngle = 15;
                endAngle = -3;
                break;
            case (number + 1):
                startX = -500;
                startY = 0;
                endX = 50;
                startScale = 0.5;
                endScale = 1;
                startAngle = -5;
                endAngle = 5;
                break;
            case (number + 2):
                startX = 800;
                startY = 0;
                endX = 50;
                startScale = 0.5;
                endScale = 1;
                startAngle = 5;
                endAngle = -5;
                break;
            case (number + 3):
                startX = 800;
                startY = 0;
                endX = 0;
                startScale = 0.5;
                endScale = 1.8;
                startAngle = 15;
                endAngle = 0;
                dur = 4600;
                break;

        }

        container.appendChild(imgElements[counter]);
        imgElements[counter].animate({
            transform: [`translate(${startX}px, ${startY}px) rotate(${startAngle}deg) scale(${startScale})`,
                `translate(${endX}px, ${endY}px) rotate(${endAngle}deg) scale(${endScale})`],
        }, {
            duration: dur,
            fill: 'forwards'
        });

        if (++counter > number + 3) {
            clearInterval(timer);
        }
    }, 1000);
}
