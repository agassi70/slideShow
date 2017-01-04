const images = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg',
    'photo6.jpg', 'photo7.jpg', 'photo8.jpg'];

const body = document.querySelector('body');
const container = document.querySelector('#container');
body.style.height = document.documentElement.clientHeight + 'px';
const width = container.style.width = body.offsetWidth * 90 / 100 + 'px';
const height = container.style.height = body.offsetHeight * 90 / 100 + 'px';

const imgElements = createImgElements();

let offsetX = 0;
let offsetY = 0;
let angle = 0;

episode1()
    .then(episode2)
    .then(episode3);

function createImgElements() {
    let imgElements = images.map(image => {
        const el = document.createElement('div');
        el.classList.add('wrapper');
        el.innerHTML = `<img src="./images/${image}"  width="800" height="530">`;
        return el;
    });
    return imgElements;
}

function episode1() {
    return new Promise(resolve => {
        let counter = 0;
        const timer = setInterval(() => {
            container.appendChild(imgElements[counter]);

            switch (counter) {
                case 0:
                    offsetX = 0;
                    offsetY = 50;
                    break;
                case 1:
                    offsetX = 100;
                    offsetY = 50;
                    angle = -10;
                    break;
                case 2:
                    offsetX = 150;
                    offsetY = 50;
                    angle = 10;
                    break;
                case 3:
                    offsetX = 200;
                    offsetY = 50;
                    angle = -15;
                    break;
                case 4:
                    offsetX = 50;
                    offsetY = 60;
                    angle = 3;
                    break;
            }

            imgElements[counter].animate({
                transform: ['translate(-800px, 800px)', `translate(${offsetX}px, ${offsetY}px) rotate(${angle}deg`]
            }, {
                duration: 250,
                fill: 'forwards'
            });

            if (++counter >= 5) {
                clearInterval(timer);
                resolve();
            }
        }, 1200);
    });
}

function episode2() {
    return new Promise(resolve => {
        let counter = 4;

        const timer = setInterval(() => {
            let op = counter === 0 ? 1 : 0;

            if (counter !== 4) {
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

            if (--counter < 0) {
                clearInterval(timer);
                setTimeout(resolve, 3000);
            }
        }, 1200)
    });
}

function episode3() {
    let img;
    imgElements[0].remove();
    container.appendChild(imgElements[5]);
    img = imgElements[5].querySelector('img');
    img.style.width = width;
    img.style.height = height;

    setTimeout(() => {
        container.appendChild(imgElements[6]);
        img = imgElements[6].querySelector('img');
        img.style.width = width;
        img.style.height = height;

        imgElements[6].animate({
            transform: [`translateX(-${width})`, `translateX(-${parseInt(width) / 2}px)`],
        }, {
            duration: 1000,
            fill: 'forwards'
        });

        container.appendChild(imgElements[7]);
        img = imgElements[7].querySelector('img');
        img.style.width = width;
        img.style.height = height;

        imgElements[7].animate({
            transform: [`translateX(${width})`, `translateX(${parseInt(width) / 2}px)`],
        }, {
            duration: 1000,
            fill: 'forwards'
        });

    }, 1500);
}