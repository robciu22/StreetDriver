let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
canvas.style.background = 'blue'

let startBtn = document.querySelector('#startBtn')
let startScreen = document.querySelector('#startScreen')

let bg = new Image();
bg.src = "./images/streets/multilaneHighway.jpg"

let carImage = new Image()
carImage.src = "./images/cars/myCar.jpg"

let carObstOne = new Image()
carObstOne.src = "./images/cars/silverCar.jpeg"

let carObstTwo = new Image()
carObstOne.src = "./images/cars/greyCar.jpeg"

let carObstThree = new Image()
carObstOne.src = "./images/cars/silverCar.jpeg"

let carObstFour = new Image()
carObstOne.src = "./images/cars/cabrioCar.jpg"

let carObstCrached = new Image()
carObstOne.src = "./images/cars/crashedCars.jpg"

const carWidth = 75
const carHeight = 150
const carX = 240 //X-Startposition from myCar
const carY = 450 //Y-Startposition from myCar
const carSpeedValue = 3
    /*
    const paddleWidth = 150;
    const paddleHeight = 15;
    let paddleX = canvas.width / 2 - paddleWidth / 2;
    let paddleY = canvas.height - paddleHeight;
    */
let isCarGoingLeft = false
let isCarGoingRight = false
let isCarGoingUp = false
let isCarGoingDown = false
let score = 0
let gameOver = false
let intervalId = 0
let topToBottomOne = 0
let topToBottomTwo = 0
let topToBottomThree = 0

/*
window.onload = () => {
    canvas.style.display = 'none'
    document.getElementById('startBtn').onclick = () => {
        //the next line is for proofing if connected and StartButton is working...
        console.log("Startbutton was clicked")

        startGame();
    };
*/
function drawMyCar() {
    ctx.beginPath()
    ctx.drawImage(carImage, carX, carY, carWidth, carHeight)
    ctx.closePath()
        //carX = carX - 1
    if (isCarGoingLeft) {
        if (carX > 0) {
            carX -= carSpeedValue;
        }
    } else if (isCarGoingRight) {
        if (carX < canvas.width - carWidth) {
            carX += carSpeedValue;
        }
    } else if (isCarGoingUp) {
        if (carY > 0) {
            carY -= carSpeedValue
        }
    } else if (isCarGoingDown) {
        if (carY < canvas.height - carHeight) {
            carY += carSpeedValue
        }
    }
}

function drawScore() {
    ctx.beginPath();
    ctx.font = "30px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(`Score : ${score}`, 80, 50);
    ctx.closePath();
}

function startGame() {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    drawMyCar()

    drawScore()

    if (gameOver) {
        cancelAnimationFrame(intervalId)
    } else {
        intervalId = requestAnimationFrame(startGame)
    }

}


window.addEventListener('load', () => {
    canvas.style.display = 'none'
    startBtn.addEventListener('click', () => {
        console.log('click')
        startScreen.style.display = 'none'
        canvas.style.display = 'block'

        startGame()
    })
})

document.addEventListener("keydown", event => {
    console.log('this event', event)
    if (event.code === "ArrowLeft") {
        isCarGoingLeft = true;
    }
    if (event.code === "ArrowRight") {
        isCarGoingRight = true;
    }
    if (event.code === "ArrowUp") {
        isCarGoingUp = true;
    }
    if (event.code === "ArrowDown") {
        isCarGoingDown = true;
    }
});

document.addEventListener("keyup", event => {
    isCarGoingLeft = false;
    isCarGoingRight = false;
});