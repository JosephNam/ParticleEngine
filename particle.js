//Author: Joseph Nam
//Interactive Musical Particle Generator
var animate = window.requestAnimationFrame ||

window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
function(callback) {window.setTimeout(callback, 1000/60)};

var canvas = document.createElement('canvas');
var CANVAS_WIDTH = 1200;
var CANVAS_HEIGHT = 900;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
var context = canvas.getContext('2d');

var step = function() {
    update();
    render();
    animate(step);
}

window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
}
var keysDown = {};

window.addEventListener("keydown", function(event)
{
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event)
{
    delete keysDown[event.keyCode];
});

var emitterOne = new Emitter(500, 500);

setInterval(function() {emitterOne.spawnParticles(NUM_PARTICLES)}, 100);

var update = function() {
    for (var i = 0; i < particleList.length; i++) {
        for ( var j  = 0; j < particleList[i].length; j++) {
            particleList[i][j].update();
            if(particleList[i][j].x > CANVAS_WIDTH || particleList[i][j].y > CANVAS_HEIGHT) {
                particleList[i].splice(j, 1);
            }
        }
        if (particleList[i].length == 0) {
            particleList.splice(i, 1);
            console.log("removed empty array");
        }

    }
}

var render = function() {
    context.fillStyle = "#000000";
    context.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    for (var i = 0; i < particleList.length; i++) {
        for ( var j  = 0; j < particleList[i].length; j++) {
            particleList[i][j].render();
        }
    }
}

function Particle(x, y, r, color)
{
    this.x = x || 300;
    this.y = y || 300;
    this.r = r || .5;
    this.xv = 2;
    this.yv = 2;
    this.color = color | "#ff00ff";
}

Particle.prototype.update = function()
{
    this.x += this.xv;
    this.y += this.yv;
}

Particle.prototype.render = function()
{
    context.beginPath();
    context.arc(this.x, this.y, this.r, 2 * Math.PI, false);
    context.fillStyle = "#ff00ff";
    context.fill();
}

var particleList = [];
var NUM_PARTICLES = 50;
var MAX_PARTICLES = 2000;

function Emitter(x, y, spread, speed) {
    this.x = x;
    this.y = y;
    this.spread = spread | Math.PI / 32;
    this.speed = speed | 1;
}

Emitter.prototype.update = function () {

};

Emitter.prototype.render = function () {
    context.beginPath();
    context.arc(this.x, this.y, 2, 2 * Math.PI, false);
    context.fillStyle = "#ffffff";
    context.fill();
};

Emitter.prototype.spawnParticles = function (NUM_PARTICLES) {
    var tempParticles = [];
    for (var index = 0; index < NUM_PARTICLES; index++) {
        var tempParticle = new Particle(this.x, this.y);
        var xvariance = index / NUM_PARTICLES;
        var yvariance = index / NUM_PARTICLES;
        //have to figure out max number of particles u can fit in one spot
        if (xvariance < .125) {
            tempParticle.xv = -1 + xvariance*-5;
            tempParticle.yv = -1 + yvariance*-1;
        } else if (xvariance < .25){
            tempParticle.xv = 0 + xvariance;
            tempParticle.yv = - 1+ yvariance*-1;
        } else if (xvariance < .375) {
            tempParticle.xv = 1 + xvariance;
            tempParticle.yv = -1+ yvariance*-1;
        } else if (xvariance < .5) {
            tempParticle.xv = 1 + xvariance;
            tempParticle.yv = 0 + yvariance;
        } else if (xvariance < .625) {
            tempParticle.xv = 1 + xvariance;
            tempParticle.yv = 1 + yvariance;
        } else if (xvariance < .75) {
            tempParticle.xv = 0 + xvariance;
            tempParticle.yv = 1 + yvariance;
        } else if (xvariance < .875) {
            tempParticle.xv = -1 + xvariance*-1;
            tempParticle.yv = 1 + yvariance;
        } else if (xvariance < 1) {
            tempParticle.xv = -1 + xvariance*-1;
            tempParticle.yv = 0 + yvariance;
        }
        tempParticles.push(tempParticle);
    }
    particleList.push(tempParticles);
};
