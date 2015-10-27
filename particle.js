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

var particleList = [];
var NUM_PARTICLES = 50;
var COUNT_PARTICLES = 0;
var MAX_PARTICLES = 2500;
var emitterOne = new Emitter(250, 250);
var emitterList = [];
emitterList.push(emitterOne);
emitterList.push(new Emitter(100, 100));
var field1 = new GravityField(300, 300, 200);
//var field2 = new GravityField(150, 300, -10);
var fieldsList = []
fieldsList.push(field1);
//fieldsList.push(field2);
setInterval(function() {
	for (var i = 0; i < emitterList.length; i++) {
		emitterList[i].spawnParticles(NUM_PARTICLES);
	}
	//emitterOne.spawnParticles(NUM_PARTICLES)}, 100);
}, 100);
var update = function() {
    for (var i = 0; i < particleList.length; i++) {
        for ( var j  = 0; j < particleList[i].length; j++) {
            particleList[i][j].update();
            if(particleList[i][j].x > CANVAS_WIDTH || particleList[i][j].y > CANVAS_HEIGHT || particleList[i][j].x < 0 || particleList[i][j].y < 0) {
                particleList[i].splice(j, 1);
				COUNT_PARTICLES--;
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
	for (var i = 0; i < emitterList.length; i++) {
		emitterList[i].render();
	}
	for (var i = 0; i < fieldsList.length; i++) {
		fieldsList[i].render();
	}
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
	this.life = 3;
}

Particle.prototype.update = function()
{
    this.x += this.xv;
    this.y += this.yv;
	this.field(fieldsList);
}

Particle.prototype.render = function()
{
    context.beginPath();
    context.arc(this.x, this.y, this.r, 2 * Math.PI, false);
    context.fillStyle = "#ff00ff";
    context.fill();
}

Particle.prototype.field = function(fields) 
{
	for (var i = 0; i < fields.length; i++) {
		var field = fields[i];
		var vectorX = field.x - this.x;
		var vectorY = field.y - this.y;
		var force = field.mass / Math.pow(Math.pow(vectorX, 2) + Math.pow(vectorY, 2), 1.5);
		this.xv += vectorX*force;
		this.yv += vectorY*force;
	}
}


/**
 * spread is a value from 0 to 2 in pi radians
 */
function Emitter(x, y, spread, speed) {
    this.x = x;
    this.y = y;
    this.spread = spread  * Math.PI | Math.PI * 2;

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

Emitter.prototype.spawnParticles = function () {
	if (COUNT_PARTICLES >= MAX_PARTICLES) {
		return;
	}
    var tempParticles = [];
	for (var i = 0; i <= this.spread; i+= 0.25) {
		var xVar = Math.random() * (Math.cos(i+1) - Math.cos(i) ) + Math.cos(i+1);
		var yVar = Math.random() * (Math.sin(i+1) - Math.sin(i) ) + Math.sin(i+1);
		var newParticle = new Particle(this.x + xVar, this.y + yVar);
		newParticle.xv = Math.abs(newParticle.xv*Math.cos(i));
		newParticle.yv = Math.abs(newParticle.yv*Math.sin(i));
		tempParticles.push(newParticle);
	}
    particleList.push(tempParticles);
	COUNT_PARTICLES += tempParticles.length;
};


function GravityField(x, y, mass) {
	this.x = x;
	this.y = y;
	this.mass = mass || 200;
}

GravityField.prototype.render = function() {
	var color = this.mass/100;
	var fillColor = "#000000";
	if (color > 0) {
		fillColor = "#ff0000";
	} else {
		fillColor = "#0000ff";
	}	
    context.beginPath();
    context.arc(this.x, this.y, 1, 0, 2 * Math.PI, false);
    context.fillStyle = fillColor;
    context.fill();
	context.closePath();

	context.beginPath();
	context.arc(this.x, this.y, Math.abs(this.mass), 0, 2*Math.PI, true);
	context.strokeStyle = fillColor;
	context.stroke();
	context.closePath();

}
