function Particle(x, y, r, color)
{
    this.x = x;
    this.y = y;
    this.r = r;
    this.xv = 2;
    this.yv = 2;
    this.color = color | "#000000";
}

Particle.prototype.update = function()
{
    this.x += this.xv;
    this.y += this.yv;
    if((this.x-this.r) < 0) {
        this.x = 0 + this.r;
    } else if ((this.x + this.r)>CANVAS_WIDTH ) {
        this.x = CANVAS_WIDTH-this.r;
    } else if ((this.y + this.r) > CANVAS_HEIGHT) {
        this.y = CANVAS_HEIGHT-this.r;
    } else if((this.y - this.r) < 0) {
        this.y = 0 + this.r;
    }
}

Particle.prototype.render = function()
{
    context.beginPath();
    context.arc(this.x, this.y, this.r, 2 * Math.PI, false);
    context.fillStyle = "#000000";
    context.fill();
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

var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {window.setTimeout(callback, 1000/60)};

var canvas = document.createElement('canvas');
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 600;
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

var update = function() {
    particle.update();
}

var render = function() {
    context.fillStyle = "#ff00ff";
    context.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    particle.render();
}

var particle = new Particle(200, 200, 10, "#000000");
