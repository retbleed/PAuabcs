var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var changeFig = true;
var pressed = false;
var x = 600, y = 350;

var dir = 0;
var t_x, t_y;
var w_x = 100, w_y = 70;
var speed = 5;
let walls = [];

function random_rgba() { var o = Math.round, r = Math.random, s = 255; return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')'; }

class Object {
    constructor(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
    }

    paint(ctx) {
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

const player = new Object(487, 487, 50, 50, "white");
const target = new Object(Math.random() * (974), Math.random() * (974), 40, 40, "orange");

walls.push(new Object(50, 200, 300, 30, "gray"));
walls.push(new Object(50, 500, 300, 30, "gray"));
walls.push(new Object(550, 500, 30, 300, "gray"));

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
    }
})

function update() {
    switch (dir) {
        case 87:
            player.y -= speed;
            if (player.y < 0) { player.y = 974 }
            //  if(y < 0){y=974;} 
            break;
        case 83:
            player.y += speed;
            if (player.y > 1024) { player.y = 50 }
            // if(y > 1024){y=50;} 
            break;
        case 65:
            player.x -= speed;
            if (player.x < 0) { player.x = 974 }
            if(x < 0){x=974;}  
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
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.paint(ctx);
    target.paint(ctx);
    for (var i = walls.length - 1; i >= 0; i--) {
        walls[i].paint(ctx);
    }
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