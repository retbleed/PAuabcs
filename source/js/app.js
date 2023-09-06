var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var changeFig = true;
var isPaused = false;
var x = 600, y = 350;

var dir = 0;
var t_x, t_y;
var w_x = 100, w_y = 70;
var speed = 5;
var score = 0;
let walls = [];

let playerImg = new Image(); playerImg.src = "source/images/luffyEat.jpg";
let targetImg = new Image(); targetImg.src = "source/images/luffyMeat.png";
const sound1 = new Audio("source/sound/luffyEatSound.mp3");

class Object {
    constructor(x, y, w, h, c = null, i = null) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.i = i;
    }

    paint(ctx) {
        if (this.i != null) { return; }
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    }

    itCollides(target) {

        if (this.x < target.x + target.w &&
            this.x + this.w > target.x &&
            this.y < target.y + target.h &&
            this.y + this.h > target.y) {
            return true;
        }
        return false;
    }
}

const player = new Object(487, 487, 50, 50, null, playerImg);
const target = new Object(Math.random() * (974), Math.random() * (974), 40, 40, null, targetImg);

walls.push(new Object(50, 200, 300, 30, "rgb(221,195,138)"));
walls.push(new Object(50, 500, 300, 30, "rgb(221,195,138)"));
walls.push(new Object(550, 500, 30, 300, "rgb(221,195,138)"));

document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 87:
            dir = e.keyCode;
            break;
        case 83:
            dir = e.keyCode;
            break;
        case 65:
            dir = e.keyCode;
            break;
        case 68:
            dir = e.keyCode;
            break;
        case 13:
            isPaused = !isPaused;
            break;
        case 82:
            if (isPaused) {
                player.x = 487;
                player.y = 487;
                speed = 5;
                score = 0;
                t_x = Math.random() * (974);
                t_y = Math.random() * (974);
                target.x = t_x;
                target.y = t_y;
                for (var i = walls.length - 1; i >= 0; i--) {
                    if (target.itCollides(walls[i])) {
                        t_x = Math.random() * (974);
                        t_y = Math.random() * (974);
                        target.x = t_x;
                        target.y = t_y;
                    }
                }
                isPaused = false;
            }
            break;
    }
})

function update() {
    if (isPaused) { repaint(); window.requestAnimationFrame(update); return; }

    switch (dir) {
        case 87:
            player.y -= speed;
            if (player.y < 0) { player.y = 974 }
            break;
        case 83:
            player.y += speed;
            if (player.y > 1024) { player.y = 50 }
            break;
        case 65:
            player.x -= speed;
            if (player.x < 0) { player.x = 974 }
            break;
        case 68:
            player.x += speed;
            if (player.x > 1024) { player.x = 50 }
            break;
    }

    if (player.itCollides(target)) {
        t_x = Math.random() * (974);
        t_y = Math.random() * (974);
        target.x = t_x;
        target.y = t_y;
        speed += 1;
        score += 5;
        playSound(sound1);
    }

    for (var i = walls.length - 1; i >= 0; i--) {
        walls[i].paint(ctx);
        if (player.itCollides(walls[i])) {
            switch (dir) {
                case 87:
                    player.y += speed;
                    break;
                case 83:
                    player.y -= speed;
                    break;
                case 68:
                    player.x -= speed;
                    break;
                case 65:
                    player.x += speed;
                    break;
            }
            dir = 0;
        }

        if (target.itCollides(walls[i])) {
            t_x = Math.random() * (974);
            t_y = Math.random() * (974);
            target.x = t_x;
            target.y = t_y;
        }
    }

    repaint();
    window.requestAnimationFrame(update);
}

function repaint() {
    ctx.fillStyle = "rgb(235,186,120)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 50, 50);

    player.paint(ctx);
    ctx.drawImage(player.i, player.x, player.y, player.w, player.h);
    target.paint(ctx);
    ctx.drawImage(target.i, target.x, target.y, target.w * 2, target.h * 2);

    for (var i = walls.length - 1; i >= 0; i--) {
        walls[i].paint(ctx);
    }

    if (isPaused) {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Game Paused", 487, 487);
    }
}

function playSound(sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
}

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        };
}());
window.requestAnimationFrame(update);