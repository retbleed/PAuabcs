var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
/* var blueColor = "rgb(92,171,219)"
var yellowColor = "rgb(218,163,58)"
var redColor = "rgb(136,43,37)"
var skinColor = "rgb(225,186,141)"
var pinkColor = "rgb(227,108,115)"
var whiteColor = "rgb(255,255,255)"
var blackColor = "rgb(0,0,0)"


ctx.fillStyle = blueColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fill();

//Parte del sombrero inferior
ctx.fillStyle = yellowColor;
ctx.beginPath();
ctx.ellipse(512, 200, 850, 650, Math.PI / 1, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();

// Brazo derecho
ctx.fillStyle = skinColor;
ctx.beginPath();
ctx.ellipse(200, 900, 150, 275, Math.PI / 4, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();

// Brazo izquierdo
ctx.fillStyle = skinColor;
ctx.beginPath();
ctx.ellipse(850, 900, 150, 275, Math.PI / -4, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();

// Ropa
ctx.fillStyle = redColor;
ctx.beginPath();
ctx.ellipse(512, 800, 350, 275, Math.PI / 1, 0, 2 * Math.PI);
ctx.fillRect(162, 800, 700, 275);
ctx.fill();
ctx.closePath();

// Oreja derecha
ctx.fillStyle = skinColor;
ctx.beginPath();
ctx.ellipse(120, 612, 130, 90, Math.PI / 4, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();

// Oreja izquierda
ctx.fillStyle = skinColor;
ctx.beginPath();
ctx.ellipse(920, 612, 130, 90, Math.PI / -4, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();

// Cabeza
ctx.fillStyle = skinColor;
ctx.beginPath();
ctx.ellipse(512, 512, 400, 340, Math.PI / 1, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();

// Ojo derecho
ctx.fillStyle = whiteColor;
ctx.beginPath();
ctx.ellipse(320, 512, 130, 120, Math.PI / 2, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();

// Pupila derecho
ctx.fillStyle = blackColor;
ctx.beginPath();
ctx.ellipse(320, 512, 65, 60, Math.PI / 2, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();

// Ojo izquierdo
ctx.fillStyle = whiteColor;
ctx.beginPath();
ctx.ellipse(720, 512, 130, 120, Math.PI / 2, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();

// Pupila izquierdo
ctx.fillStyle = blackColor;
ctx.beginPath();
ctx.ellipse(720, 512, 65, 60, Math.PI / 2, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();

// Sonrisa
ctx.fillStyle = whiteColor;
ctx.strokeStyle = whiteColor;
ctx.beginPath();
ctx.moveTo(225, 664);
ctx.lineTo(825, 664);
ctx.moveTo(825, 664);
ctx.bezierCurveTo(712, 900, 312, 900, 225, 664);
ctx.fill();
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.strokeStyle = blackColor;
ctx.moveTo(293, 764);
ctx.lineTo(747, 764);
ctx.stroke();
ctx.closePath();

// Cabello
ctx.fillStyle = blackColor
ctx.strokeStyle = blackColor;
ctx.beginPath();
ctx.moveTo(108, 504);
ctx.lineTo(143, 577)
ctx.lineTo(144, 481);
ctx.lineTo(221, 346);
ctx.lineTo(225, 410);
ctx.lineTo(293, 322);
ctx.lineTo(480, 513);
ctx.lineTo(598, 322);
ctx.lineTo(598, 322);
ctx.lineTo(639, 415);
ctx.lineTo(718, 333);
ctx.lineTo(826, 465);
ctx.lineTo(845, 428);
ctx.lineTo(913, 562);
ctx.lineTo(996, 508);
ctx.lineTo(847, 217);
ctx.lineTo(863, 170);
ctx.lineTo(724, 163);
ctx.lineTo(210, 181);
ctx.lineTo(56, 478);
ctx.lineTo(108, 504);
ctx.fill();
ctx.stroke();
ctx.closePath();
 */


var changeFig = true;
var pressed = false;
var x = 600, y = 350;
var dir = 0;

function random_rgba() { var o = Math.round, r = Math.random, s = 255; return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')'; }


document.addEventListener("keydown", (e) => {
    switch(e.keyCode){
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

function update(){
    switch(dir){
        case 87:
            y -= 10;
            if(y < 0){y=974;} 
            break;
        case 83:
            y += 10;
            if(y > 1024){y=50;} 
            break;
        case 65:
            x -= 10;
            if(x < 0){x=974;}  
            break;
        case 68:
            x += 10;
            if(x > 1024){x=50;}
            break;
    }
    repaint();
    window.requestAnimationFrame(update);
}


function repaint() {
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(x - 25, y - 25, 50, 50);
    ctx.fill();
    ctx.closePath();
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


/* canvas.addEventListener("mousemove", (event) => {
    ctx.fillStyle = random_rgba(); 
    changeFig = !changeFig;
    if(pressed){
        switch(changeFig){
                case true:
                    ctx.beginPath();
                    ctx.arc(event.x, event.y, 25, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.closePath();
                    break;
                case false:
                    ctx.beginPath();
                    ctx.fillRect(event.x-25,event.y-25,50,50);
                    ctx.fill();
                    ctx.closePath();
                    break;
        } 
    }
})
 
canvas.addEventListener("mousedown", (event) => {pressed=true})
canvas.addEventListener("mouseup", (event) => {pressed=false}) */

/* ctx.fillStyle = "#fa6445";
ctx.fillRect(50, 200, 150, 150);

ctx.fillStyle = "#4444a3CC";
ctx.fillRect(100,240,150,150);
 
ctx.strokeStyle = "#4444a3";
ctx.lineWidth = "5";

ctx.beginPath();
ctx.moveTo(300,300);
ctx.lineTo(570,300);
ctx.lineTo(545,230);
ctx.lineTo(300,300);
ctx.fill();

ctx.fillStyle = "#fa6445";
ctx.beginPath();
ctx.moveTo(570,300);
ctx.lineTo(670,400);
ctx.fill();

ctx.beginPath();
ctx.arc(100, 500, 70, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.arc(250, 500, 70, 0, 2 * Math.PI);
ctx.stroke();

ctx.font = "50px Verdana";
ctx.fillText("Hello World!", 300, 50);
ctx.strokeStyle = "#4444a3";
ctx.lineWidth = "1";
ctx.strokeText("Hello World!", 305, 55);

const grd = ctx.createLinearGradient(300, 0, 450, 0);
grd.addColorStop(0, "red");
grd.addColorStop(0.5, "orange");
grd.addColorStop(1, "yellow");

ctx.fillStyle = grd;
ctx.fillRect(300, 100, 150, 100);


const grd2 = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
grd2.addColorStop(0, "blue");
grd2.addColorStop(1, "pink");

ctx.fillStyle = grd2;
ctx.fillRect(10, 10, 150, 100);

img = new Image();
img.src = "source/images/onepiece.jpg";
img.onload = function ()
{
    ctx.drawImage(img, 500, 350, 200, 140);
} */