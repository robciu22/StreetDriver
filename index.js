let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
canvas.style.background = 'blue'


let startScreen = document.querySelector('#startScreen')

let roadImage = new Image();
roadImage.src = "/images/streets/multilaneHighway.jpg"

let carImage = new Image()
carImage.src = "images/cars/myCar.jpg"

let carObstOne = new Image()
carObstOne.src = "images/cars/silverCar.jpeg"

let carObstTwo = new Image()
carObstTwo.src = "images/cars/greyCar.jpeg"

let carObstThree = new Image()
carObstThree.src = "images/cars/yellowCar.jpg"

let carObstFour = new Image()
carObstFour.src = "images/cars/cabrioCar.jpg"

let carObstCrashed = new Image()
carObstCrashed.src = "images/cars/crashedCars.jpg"

let obstCarArr = [
    { img: carObstOne, x: Math.floor(Math.random() * (canvas.width - 100)), y: 0 },
    { img: carObstTwo, x: Math.floor(Math.random() * (canvas.width - 150)), y: 100 },
    { img: carObstThree, x: Math.floor(Math.random() * (canvas.width - 275)), y: 150 },
    { img: carObstFour, x: Math.floor(Math.random() * (canvas.width - 400)), y: 200 },
    //{ img: carObstCrashed, x: Math.floor(Math.random() * canvas.width), y: 0 },
];

const carWidth = 70
const carHeight = 125

let carX = 240 //X-Startposition from myCar
let carY = 450 //Y-Startposition from myCar



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
let gameOverSong = new Audio("/audio/mixkit-game-over-trombone-1940.wav");
gameOverSong.volume = 0.1

//  Buttons
let startBtn = document.querySelector('#startBtn')
let restartBtn = document.querySelector("#restartBtn");
let soundBtn = document.querySelector("#soundBtn");
let muteBtn = document.querySelector("#muteBtn");




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

//obstacle cars ;-)
function drawSilverCar() {
    ctx.beginPath()
    ctx.drawImage(carObstOne, 0, 0, 70, 125)
    ctx.closePath()
}

function drawGrayCar() {
    ctx.beginPath()
    ctx.drawImage(carObstTwo, 0, 200, 70, 125)
    ctx.closePath()
}

function drawYellowCar() {
    ctx.beginPath()
    ctx.drawImage(carObstThree, 200, 0, 70, 125)
    ctx.closePath()
}

function drawCabrioCar() {
    ctx.beginPath()
    ctx.drawImage(carObstFour, 200, 200, 70, 125)
    ctx.closePath()
}

function drawCrashedCar() {
    ctx.beginPath()
    ctx.drawImage(carObstCrashed, 400, 0, 125, 100)
    ctx.closePath()
}


//Scoreboard
function drawScore() {
    ctx.beginPath()
    ctx.font = "30px sans-serif"
    ctx.fillStyle = "white"
    ctx.fillText(`Score : ${score}`, 80, 50)
    ctx.closePath()
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
            currentCar.y + currentCar.height >= carY + 10 &&
            //checks if the right side of the player car is more to the right than the traffic car
            carX + 120 > currentCar.x &&
            // checks if the left side of the player car is touching the left side of the traffic car
            carX < currentCar.x + currentCar.width &&
            //checks if the bottom of the player car is touching the top of the traffic car
            carY + carHeight - 10 > currentCar.y
        ) {
            isGameOver = true;
        }

    }

    //Car-Collision
    // function carCollision(myCar, currentCar) {
    //     if (myCar.x + myCar.width >= currentCar.x &&
    //         myCar.x <= currentCar.x + currentCar.width &&
    //         myCar.y + myCar.height >= currentCar.y &&
    //         myCar.y <= currentCar.y + currentCar.height
    //     )
    //         return true
    // }

    // if (carCollision != 'true') {
    //     isGameOver = true
    // }



    // function isColloide(a,b){
    //     return !(
    //         ((a.y + a.height) < (b.y)) ||
    //         (a.y > (b.y + b.height)) ||
    //         ((a.x + a.width) < b.x) ||
    //         (a.x > (b.x + b.width))
    //     )

    // }

    // let measureMyCar = { rect: 20, x: 75, y: 125 }
    // let measureObstCar = { rect: 20, x: 75, y: 125 }

    // let dim1 = measureMyCar.x - measureObstCar.x
    // let dim2 = measureMyCar.y - measureObstCar.y

    // let distance = Math.sqrt(dim1 * dim1 + dim2 * dim2);

    // if (distance < measureMyCar.rect + measureObstCar.rect) {
    //     isGameOver = true;
    // }

}




function startGame() {
    ctx.beginPath()
    ctx.drawImage(roadImage, 0, 0, canvas.width, canvas.height)
    ctx.closePath()

    drawMyCar()

    // for (let i = 0; i < obstCarArr.length; i += 1) {
    //     let currentCar = obstCarArr[i];

    //     drawSilverCar()
    // }
    // drawSilverCar()

    // drawGrayCar()

    // drawYellowCar()

    // drawCabrioCar()

    // drawCrashedCar()

    moving()


    drawScore()



    if (isGameOver) {
        cancelAnimationFrame(intervalId)
        score = 0
        carSpeedValue = 3
        gameOverSong.play()
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
    restartBtn.addEventListener('click', () => {
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
    isCarGoingUp = false;
    isCarGoingDown = false;
});