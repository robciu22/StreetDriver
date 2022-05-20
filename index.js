let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
    //canvas.style.border = '2px solid black'
    //canvas.style.background = 'blue'
let gameOverPage = document.querySelector('#gameOverPage')



let startScreen = document.querySelector('#splashScreen')
let headlineDiv = document.querySelector('.headline-container')

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
    { img: carObstOne, x: 50, y: -300 },
    { img: carObstTwo, x: 185, y: -400 },
    { img: carObstThree, x: 300, y: -650 },
    { img: carObstFour, x: 430, y: -1200 },
    { img: carObstOne, x: 560, y: -100 },
    { img: carObstTwo, x: 50, y: -600 },
    { img: carObstThree, x: 185, y: -850 },
    { img: carObstFour, x: 300, y: -900 },
    { img: carObstOne, x: 50, y: -1000 },
    { img: carObstTwo, x: 185, y: -1300 },
    { img: carObstThree, x: 300, y: -1550 },
    { img: carObstFour, x: 430, y: -1800 },
    { img: carObstOne, x: 50, y: -2250 },
    { img: carObstTwo, x: 185, y: -2200 },
    { img: carObstThree, x: 300, y: -2800 },
    { img: carObstFour, x: 430, y: -3000 },
    { img: carObstOne, x: 560, y: -3300 },
    { img: carObstTwo, x: 50, y: -3500 },
    { img: carObstThree, x: 185, y: -3750 },
    { img: carObstFour, x: 300, y: -4000 },
    { img: carObstOne, x: 560, y: -4200 },
    { img: carObstTwo, x: 50, y: -4500 },
    { img: carObstThree, x: 185, y: -4700 },
    { img: carObstFour, x: 300, y: -5000 },
    { img: carObstOne, x: 560, y: -5200 },
    { img: carObstTwo, x: 50, y: -5300 },
    { img: carObstThree, x: 185, y: -5850 },
    { img: carObstFour, x: 300, y: -6000 },
    { img: carObstOne, x: 560, y: -6250 },
    { img: carObstTwo, x: 50, y: -6450 },
    { img: carObstThree, x: 185, y: -6600 },
    { img: carObstFour, x: 300, y: -6850 },
];

const carWidth = 130
const carHeight = 200

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
let audioStart = new Audio("./audio/blast-o-beat_(underscore_version)_proud_music_preview.mp3");
audioStart.volume = 0.1
let audioGame = new Audio("./audio/fire_funk_proud_music_preview.mp3")
let sound = new Audio("");
sound.volume = 0.05
let gameOverSong = new Audio("./audio/mixkit-game-over-trombone-1940.wav");
gameOverSong.volume = 0.1

audioStart.play()

//  Buttons
let startBtn = document.querySelector('#startBtn')
let restartBtn = document.querySelector("#restartBtn2");
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


//Scoreboard
function drawScore() {
    ctx.font = "30px sans-serif"
    ctx.fillStyle = "white"
    ctx.fillText(`Your Score : ${score}`, 80, 100)
}


//Moving the obstCars
function moving() {
    for (let i = 0; i < obstCarArr.length; i += 1) {
        let currentCar = obstCarArr[i]

        ctx.drawImage(currentCar.img, currentCar.x, currentCar.y, 130, 200)
        currentCar.y += 3

        if (currentCar.y > canvas.height && currentCar.y <= canvas.height + 3) {
            currentCar.y = -7000
            score += 1
        }

        //collision inside of for loop
        if (
            // checks if the bottom of the traffic car is touching the top of the player car
            currentCar.y + 200 >= carY + 30 &&
            //checks if the right side of the player car is more to the right than the traffic car
            carX + carWidth - 60 > currentCar.x &&
            // // checks if the left side of the player car is touching the left side of the traffic car
            carX < currentCar.x + 90 &&
            // //checks if the bottom of the player car is touching the top of the traffic car
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

    audioStart.pause()
    audioGame.play()


    if (isGameOver) {
        cancelAnimationFrame(intervalId)
        startScreen.style.display = 'none'
        score = 0
        carSpeedValue = 3
        audioStart.pause()
        audioGame.pause()
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
        headlineDiv.style.display = 'block'

        myCarPos //X- und Y-Startposition from myCar

        startGame()
        console.log('start works')
    })

    restartBtn.addEventListener('click', () => {
        console.log('restart working')
        startScreen.style.display = 'none'
        canvas.style.display = 'block'
        gameOverPage.style.display = 'none'
        isGameOver = false

        obstCarArr = [
            { img: carObstOne, x: 50, y: -300 },
            { img: carObstTwo, x: 185, y: -400 },
            { img: carObstThree, x: 300, y: -650 },
            { img: carObstFour, x: 430, y: -1200 },
            { img: carObstOne, x: 560, y: -100 },
            { img: carObstTwo, x: 50, y: -600 },
            { img: carObstThree, x: 185, y: -850 },
            { img: carObstFour, x: 300, y: -900 },
            { img: carObstOne, x: 50, y: -1000 },
            { img: carObstTwo, x: 185, y: -1300 },
            { img: carObstThree, x: 300, y: -1550 },
            { img: carObstFour, x: 430, y: -1800 },
            { img: carObstOne, x: 50, y: -2250 },
            { img: carObstTwo, x: 185, y: -2200 },
            { img: carObstThree, x: 300, y: -2800 },
            { img: carObstFour, x: 430, y: -3000 },
            { img: carObstOne, x: 560, y: -3300 },
            { img: carObstTwo, x: 50, y: -3500 },
            { img: carObstThree, x: 185, y: -3750 },
            { img: carObstFour, x: 300, y: -4000 },
            { img: carObstOne, x: 560, y: -4200 },
            { img: carObstTwo, x: 50, y: -4500 },
            { img: carObstThree, x: 185, y: -4700 },
            { img: carObstFour, x: 300, y: -5000 },
            { img: carObstOne, x: 560, y: -5200 },
            { img: carObstTwo, x: 50, y: -5300 },
            { img: carObstThree, x: 185, y: -5850 },
            { img: carObstFour, x: 300, y: -6000 },
            { img: carObstOne, x: 560, y: -6250 },
            { img: carObstTwo, x: 50, y: -6450 },
            { img: carObstThree, x: 185, y: -6600 },
            { img: carObstFour, x: 300, y: -6850 },
        ];


        myCarPos //X- und Y-Startposition from myCar

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
    isCarGoingUp = false;
    isCarGoingDown = false;
});