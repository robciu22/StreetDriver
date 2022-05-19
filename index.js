let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
canvas.style.background = 'blue'
let gameOverPage = document.querySelector('#gameOverPage')



let startScreen = document.querySelector('#startScreen')

let roadImage = new Image();
roadImage.src = "./images/streets/multilaneHighway.jpg"

let carImage = new Image()
carImage.src = "./images/cars/myCar.png"

let carObstOne = new Image()
carObstOne.src = "./images/cars/silverCar.png"

let carObstTwo = new Image()
carObstTwo.src = "./images/cars/greyCar.png"

let carObstThree = new Image()
carObstThree.src = "./images/cars/yellowCar.png"

let carObstFour = new Image()
carObstFour.src = "./images/cars/cabrioCar.png"

let carObstCrashed = new Image()
carObstCrashed.src = "./images/cars/crashedCars.png"

let obstCarArr = [
    { img: carObstOne, x: Math.floor(Math.random() * (canvas.width - 100)), y: 0 },
    { img: carObstTwo, x: Math.floor(Math.random() * (canvas.width - 150)), y: -200 },
    { img: carObstThree, x: Math.floor(Math.random() * (canvas.width - 275)), y: -650 },
    { img: carObstFour, x: Math.floor(Math.random() * (canvas.width - 400)), y: -1200 },
    //{ img: carObstCrashed, x: Math.floor(Math.random() * canvas.width), y: 0 },
];

const carWidth = 70
const carHeight = 125

let carX = 240 //X-Startposition from myCar
let carY = 450 //Y-Startposition from myCar
let myCarPos = (carX, carY)


let carSpeedValue = 3
let isCarGoingLeft = false
let isCarGoingRight = false
let isCarGoingUp = false
let isCarGoingDown = false

let score = 0
let isGameOver = false
let gameOverWin = document.querySelector('.win')
let gameOverLose = document.querySelector('.lose')

let intervalId = 0
let topToBottomOne = 0
let topToBottomTwo = 0
let topToBottomThree = 0


//Music
let audio = new Audio("");
audio.volume = 0.1
let sound = new Audio("");
sound.volume = 0.2
let gameOverSong = new Audio("./audio/mixkit-game-over-trombone-1940.wav");
gameOverSong.volume = 0.1

//  Buttons
let startBtn = document.querySelector('#startBtn')
let restartBtn = document.querySelector("#restartBtn");
let soundBtn = document.querySelector("#soundBtn");
let muteBtn = document.querySelector("#muteBtn");


//Display myCar and moving with arrowKeys
function drawMyCar() {

    ctx.drawImage(carImage, carX, carY, carWidth, carHeight)

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

//obstacle cars ;-)
function drawSilverCar() {
    ctx.drawImage(carObstOne, 0, 0, 70, 125)
}

function drawGrayCar() {
    ctx.drawImage(carObstTwo, 0, 200, 70, 125)
}

function drawYellowCar() {
    ctx.drawImage(carObstThree, 200, 0, 70, 125)
}

function drawCabrioCar() {
    ctx.drawImage(carObstFour, 200, 200, 70, 125)
}

function drawCrashedCar() {
    ctx.drawImage(carObstCrashed, 400, 0, 125, 100)
}


//Scoreboard
function drawScore() {
    ctx.font = "30px sans-serif"
    ctx.fillStyle = "white"
    ctx.fillText(`Your Score : ${score}`, 80, 50)
}


//Moving the obstCars
function moving() {
    for (let i = 0; i < obstCarArr.length; i += 1) {
        let currentCar = obstCarArr[i]

        ctx.drawImage(currentCar.img, currentCar.x, currentCar.y, 70, 125)
        currentCar.y += 3

        if (currentCar.y > canvas.height) {
            currentCar.y = -200
        }

        //collision inside of for loop
        if (
            // checks if the bottom of the traffic car is touching the top of the player car
            currentCar.y + 125 >= carY + 10 &&
            //checks if the right side of the player car is more to the right than the traffic car
            carX + 125 > currentCar.x &&
            // checks if the left side of the player car is touching the left side of the traffic car
            carX < currentCar.x + 70 &&
            //checks if the bottom of the player car is touching the top of the traffic car
            carY + carHeight - 10 > currentCar.y
        ) {
            console.log('working')
            isGameOver = true;
        }

    }
}


function startGame() {

    ctx.drawImage(roadImage, 0, 0, canvas.width, canvas.height)

    drawMyCar()


    moving()


    drawScore()



    if (isGameOver) {
        cancelAnimationFrame(intervalId)
        score = 0
        carSpeedValue = 3
        gameOverSong.play()
        canvas.style.display = 'none'
        gameOverPage.style.display = 'block'
    } else {
        intervalId = requestAnimationFrame(startGame)
    }

}


window.addEventListener('load', () => {
    canvas.style.display = 'none'
    gameOverPage.style.display = 'none'
    startBtn.addEventListener('click', () => {
        startScreen.style.display = 'none'
        canvas.style.display = 'block'

        myCarPos //X- und Y-Startposition from myCar

        startGame()
        console.log('start works')
    })
    restartBtn.addEventListener('click', () => {
        console.log('click')
        startScreen.style.display = 'none'
        canvas.style.display = 'block'
        gameOverPage.style.display = 'none'
        isGameOver = false

        obstCarArr = [
            { img: carObstOne, x: Math.floor(Math.random() * (canvas.width - 100)), y: 0 },
            { img: carObstTwo, x: Math.floor(Math.random() * (canvas.width - 200)), y: -300 },
            { img: carObstThree, x: Math.floor(Math.random() * (canvas.width - 300)), y: -650 },
            { img: carObstFour, x: Math.floor(Math.random() * (canvas.width - 400)), y: -1200 },
            { img: carObstOne, x: Math.floor(Math.random() * (canvas.width - 250)), y: 0 },
            { img: carObstTwo, x: Math.floor(Math.random() * (canvas.width - 300)), y: -400 },
            { img: carObstThree, x: Math.floor(Math.random() * (canvas.width - 450)), y: -850 },
            { img: carObstFour, x: Math.floor(Math.random() * (canvas.width - 500)), y: -1500 },
        ];

        myCarPos //X- und Y-Startposition from myCar

        startGame()
        console.log('restart working')
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
    isCarGoingUp = false;
    isCarGoingDown = false;
});