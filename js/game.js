let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

// canvas.width = document.documentElement.clientWidth
// canvas.height = document.documentElement.clientHeight

let bird = new Image()
let bg = new Image()
let fg = new Image()
let pipeUp = new Image()
let pipeBottom = new Image()
var fly = new Audio();
var score_audio = new Audio();

fly.src = '../music/fly.mp3'
score_audio.src = '../music/score.mp3'

bird.src = 'https://itproger.com/img/news/flappy_bird_bird.png'
bg.src = 'https://itproger.com/img/news/flappy_bird_bg.png'
fg.src = 'https://itproger.com/img/news/flappy_bird_fg.png'
pipeUp.src = 'https://itproger.com/img/news/flappy_bird_pipeUp.png'
pipeBottom.src = 'https://itproger.com/img/news/flappy_bird_pipeBottom.png'

pipeBottom.onload = init

function init() {
    Draw()
}

let pipe = []
pipe[0] = {
    x: canvas.width,
    y: 0
}



let gap = 100,
    xPos = 10,
    yPos = 150,
    rav = 1.5,
    exit = 'false',
    score = 0

window.addEventListener('keydown', () => {
    yPos -= 40
    fly.play();
})


let Draw = () => {
    ctx.drawImage(bg, 0, 0, 288, 512)
    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)
        pipe[i].x--

        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * (pipeUp.height)) - pipeUp.height
            })
        }
        if (xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height ||
                yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= canvas.height - fg.height) {
            clearInterval(d)
            exit = 'true'
        }
        if (pipe[i].x == 2) {
            score++;
            score_audio.play();
        }

    }
    ctx.drawImage(fg, 0, canvas.height - fg.height)
    ctx.drawImage(bird, xPos, yPos)
    yPos += rav

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, canvas.height - 20);

}

const d = setInterval(Draw, 1000 / 60)