//Author: Joseph Nam
//Interactive Musical Particle Generator

//animation function call once at 60fps
var animate = window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
function(callback) {window.setTimeout(callback, 1000/60)};

var canvas = document.createElement('canvas');

//setting canvas size
var CANVAS_WIDTH = 1200;
var CANVAS_HEIGHT = 900;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
var context = canvas.getContext('2d');

//the recursive call for updating and rendering
var step = function() {
    update();
    render();
    animate(step);
}

//start on load
window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
}

//Deprecated
var keysDown = {};

window.addEventListener("keydown", function(event)
{
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event)
{
    delete keysDown[event.keyCode];
});


//adding global fields for functions to access and manipulate
var particleList = [];
var NUM_PARTICLES = 50;
var COUNT_PARTICLES = 0;
var MAX_PARTICLES = 10000;
var emitterOne = new Emitter(150, 275, 0, .15);
var emitterList = [];
emitterList.push(emitterOne);
var fieldsList = []
fieldsList.push(new GravityField(300, 300, 300));

setInterval(function() {
	for (var i = 0; i < emitterList.length; i++) {
		emitterList[i].spawnParticles(NUM_PARTICLES);
	}
}, 25);

//update function that is called in step
var update = function() {
    for (var i = 0; i < particleList.length; i++) {
        for ( var j  = 0; j < particleList[i].length; j++) {
            particleList[i][j].update();
			//if age is older than its lifespan delete
			if (particleList[i][j].age > particleList[i][j].life) {
				particleList[i].splice(j,1);
				COUNT_PARTICLES--;
				//else check if off screen to delete
			} else {
				//if off screen delete	
				if(particleList[i][j].x > CANVAS_WIDTH || particleList[i][j].y > CANVAS_HEIGHT || particleList[i][j].x < 0 || particleList[i][j].y < 0) {
					particleList[i].splice(j, 1);
					COUNT_PARTICLES--;
				}
				
			}
        }
		//if one particle list is empty remove
        if (particleList[i].length == 0) {
            particleList.splice(i, 1);
            console.log("removed empty array");
        }
    }
}

//renders the background black and renders emitters fields and particles
var render = function() {
    context.fillStyle = "#000000";
    context.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    for (var i = 0; i < particleList.length; i++) {
        for ( var j  = 0; j < particleList[i].length; j++) {
            particleList[i][j].render();
        }
    }
	for (var i = 0; i < emitterList.length; i++) {
		emitterList[i].render();
	}
	for (var i = 0; i < fieldsList.length; i++) {
		fieldsList[i].render();
	}
}


//todo  - - - - implement color shift to endcolor by end of life
function Particle(x, y, r, color, endcolor, life, drift)
{
    this.x = x || 300;
    this.y = y || 300;
    this.r = r || .5;
    this.xv = 5;
    this.yv = 5;
    this.color = color || "#ffffff";
	this.life = life || 100000;
	this.age = 0;
	//0 - 1 i  think
	this.drift = drift || 0.00;
	this.endcolor = endcolor || "#ffffff";
}

Particle.prototype.update = function()
{
	var negativeDrift = 0 - this.drift;
    this.x += this.xv + Math.random()/3 - Math.random()/3; 
    this.y += this.yv + Math.random()/3 - Math.random()/3;
	this.age++;
	this.field(fieldsList);
}

Particle.prototype.render = function()
{
    context.beginPath();
    context.arc(this.x, this.y, this.r, 2 * Math.PI, false);
	var transparency = ((this.life - this.age ) / this.life) - 0.05;
	var strTransparency = transparency.toString();
	
    context.fillStyle = "rgba(255, 0, 255," + strTransparency+  " )"; 
    context.fill();
}

Particle.prototype.field = function(fields) 
{
	
	for (var i = 0; i < fields.length; i++) {
		var field = fields[i];
		var vectorX = field.x - this.x;
		var vectorY = field.y - this.y;
		//.5 for overall force makes very interesting behavior
		var force = field.mass/ (Math.pow(Math.pow(vectorX, 2) + Math.pow(vectorY, 2), 1.5)+ 125);
		this.xv += vectorX*force;
		this.yv += vectorY*force;
	}
}


/**
 * spread is a value from 0 to 2 in pi radians
 */
function Emitter(x, y, startspread, endspread, speed, thickness) {
    this.x = x;
    this.y = y;
	this.startspread = startspread* Math.PI || 0;
    this.endspread = endspread  * Math.PI || Math.PI * 2;
	console.log(this.spread);
    this.speed = speed || 1;
	this.thickness = thickness || 0.005;
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
	if (this.startspread < this.endspread) {
		for (var i = this.startspread; i < this.endspread; i+= this.thickness * Math.PI) {
			var xVar = Math.random() * (Math.cos(i+1) - Math.cos(i) ) + Math.cos(i+1);
			var yVar = Math.random() * (Math.sin(i+1) - Math.sin(i) ) + Math.sin(i+1);
			var newParticle = new Particle(this.x + xVar, this.y + yVar);
			newParticle.xv = (newParticle.xv*Math.cos(i));
			newParticle.yv = (newParticle.yv*Math.sin(i));

			tempParticles.push(newParticle);
		}
	} else {
		
		for (var i = this.startspread; i < this.startspread + this.endspread; i+= this.thickness * Math.PI) {
			var xVar = Math.random() * (Math.cos(i+1) - Math.cos(i) ) + Math.cos(i+1);
			var yVar = Math.random() * (Math.sin(i+1) - Math.sin(i) ) + Math.sin(i+1);
			var newParticle = new Particle(this.x + xVar, this.y + yVar);
			newParticle.xv = (newParticle.xv*Math.cos(i));
			newParticle.yv = (newParticle.yv*Math.sin(i));

			tempParticles.push(newParticle);
		}
	}
	
    particleList.push(tempParticles);
	COUNT_PARTICLES += tempParticles.length;
};


function GravityField(x, y, mass) {
	this.x = x;
	this.y = y;
	this.mass = mass || 200;
};

GravityField.prototype.render = function() {
	var color = this.mass/100;
	var fillColor = "#000000";
	if (color < 0) {
		fillColor = "rgba(255, 0, 0, 0.5)";
	} else {
		fillColor = "rgba(0, 0, 255, 0.5)";
	}	
    context.beginPath();
    context.arc(this.x, this.y, Math.abs(this.mass/500) + 1, 0, 2 * Math.PI, false);
    context.fillStyle = fillColor;
    context.fill();
	context.closePath();

	context.beginPath();
	context.arc(this.x, this.y, Math.abs(this.mass), 0, 2*Math.PI, true);
	context.strokeStyle = fillColor;
	context.stroke();
	context.closePath();

};
