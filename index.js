let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
    //canvas.style.border = '2px solid black'
    //canvas.style.background = 'blue'
let gameOverPage = document.querySelector('#gameOverPage')



let startScreen = document.querySelector('#splashScreen')

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
    { img: carObstOne, x: 45, y: -300 },
    { img: carObstTwo, x: 190, y: -300 },
    { img: carObstThree, x: 300, y: -650 },
    { img: carObstFour, x: 430, y: -1200 },
    { img: carObstOne, x: 560, y: -100 },
    { img: carObstTwo, x: 45, y: -400 },
    { img: carObstThree, x: 190, y: -850 },
    { img: carObstFour, x: 300, y: -1500 },
    { img: carObstOne, x: 45, y: -1800 },
    { img: carObstTwo, x: 190, y: -2400 },
    { img: carObstThree, x: 300, y: -2800 },
    { img: carObstFour, x: 430, y: -3500 },
    { img: carObstOne, x: 560, y: -4000 },
    { img: carObstTwo, x: 45, y: -4500 },
    { img: carObstThree, x: 190, y: -5000 },
    { img: carObstFour, x: 300, y: -6500 },
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
let audioStart = new Audio("./audio/fire_funk_proud_music_preview.mp3");
audioStart.volume = 0.1
let audioGame = new Audio("./audio/the_big_crush_proud_music_preview.mp3")
let sound = new Audio("");
sound.volume = 0.2
let gameOverSong = new Audio("./audio/mixkit-game-over-trombone-1940.wav");
gameOverSong.volume = 0.1

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

//obstacle cars ;-)
function drawSilverCar() {
    ctx.drawImage(carObstOne, 0, 0, 100, 150)
}

function drawGrayCar() {
    ctx.drawImage(carObstTwo, 0, 200, 100, 150)
}

function drawYellowCar() {
    ctx.drawImage(carObstThree, 200, 0, 100, 150)
}

function drawCabrioCar() {
    ctx.drawImage(carObstFour, 200, 200, 100, 150)
}

function drawCrashedCar() {
    ctx.drawImage(carObstCrashed, 400, 0, 100, 150)
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
            currentCar.y = -6000
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

    audioStart.play()


    if (isGameOver) {
        cancelAnimationFrame(intervalId)
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
            { img: carObstOne, x: 45, y: 0 },
            { img: carObstTwo, x: 190, y: -300 },
            { img: carObstThree, x: 300, y: -650 },
            { img: carObstFour, x: 430, y: -1200 },
            { img: carObstOne, x: 560, y: -100 },
            { img: carObstTwo, x: 45, y: -400 },
            { img: carObstThree, x: 190, y: -850 },
            { img: carObstFour, x: 300, y: -1500 },
            { img: carObstOne, x: 45, y: -1800 },
            { img: carObstTwo, x: 190, y: -2400 },
            { img: carObstThree, x: 300, y: -2800 },
            { img: carObstFour, x: 430, y: -3500 },
            { img: carObstOne, x: 560, y: -4000 },
            { img: carObstTwo, x: 45, y: -4500 },
            { img: carObstThree, x: 190, y: -5000 },
            { img: carObstFour, x: 300, y: -6500 },
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