function Node(object) {
    this.object = object;
    var left;
    var right;
}
//quadtree implementation to optimize colission detection
function Quadtree(xmin,xmax, ymin, ymax, max_objects, max_levels, level){
    this.max_objects = max_objects || 10;
    this.max_levels = max_levels||4;
    this.size = 0;
    this.level = level || 0;
    this.xbounds = xbounds;
    this.ybounds = ybounds;
    var tree1;
    var tree2;
    var tree3;
    var tree4;
    var nodes = [];
}
Quadtree.prototype.clear = function(){
    for(i in this.nodes) {
        nodes[i] = null;
    }
}
Quadtree.prototype.insert(newNode) = function(){
    if(newNode == NULL) {
        return 0;
    }
    if (newnode.object.x < xmax && newnode.object.y < ymax && newnode.object.x > xmin && newnode.object.y > ymin){
        if (this.size < this.max){
            nodes.push(newNode);
            this.size++;
        }
    } else {
        if(newNode.object.x < xmax/2 && newNode.object.y < ymax/2){
            if(tree1 == null){
                tree1 = new Quadtree(this.xmin,this.xmax/2,this.ymin, this.ymax/2);
                tree1.insert(newNode);
            }
            
        }
    }
    return null;
}


//main running loop is this and window.onload
var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame||
        window.mozRequestAnimationFrame ||
        function(callback) {window.setTimeout(callback, 1000/60)};

//creating canvas
var canvas = document.createElement('canvas');
var CANVAS_WIDTH= 400;
var CANVAS_HEIGHT= 400;
canvas.width = CANVAS_WIDTH; 
canvas.height = CANVAS_HEIGHT;
var context = canvas.getContext('2d');

window.onload = function() {
        document.body.appendChild(canvas);
        animate(step);
};

var step = function() {
        update();
        render();
        animate(step);
};

var update = function() {
    ball.update();
    for (var i in balls){
        balls[i].update();
    }
};

var render = function() {
        context.fillStyle = "#882288";
        context.fillRect(0,0,400,400);
        ball.render();
        for (var i in balls){
            balls[i].render();
        }
};

function Ball(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.xv = 2;
        this.yv = 2;
        this.color = color;
}
Ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 2 * Math.PI, false);
    context.fillStyle = "#000000";
    context.fill();
}
Ball.prototype.move = function(xv,yv) {
    this.x+=xv;
    this.y+=yv;
    if((this.x-this.r) < 0){
        this.x = 0 + this.r;
    } else if ((this.x + this.r)>CANVAS_WIDTH ){
        this.x = CANVAS_WIDTH-this.r;
    } else if ((this.y + this.r) > CANVAS_HEIGHT){
        this.y = CANVAS_HEIGHT-this.r;
    } else if((this.y - this.r) < 0){
        this.y = 0 + this.r;
    }
}

Ball.prototype.update = function() {
    for(var key in keysDown) {
        var value = Number(key);
        if(value == 37) {
            this.move(this.xv*-1,0);
        } else if (value == 39){
            this.move(this.xv,0);
        } else if (value == 38){
            this.move(0,this.yv*-1);
        } else if (value == 40){
            this.move(0,this.yv);
        }
    }
}

var ball= new Ball(200,200,4,"#FF00FF");
//key listener 
var keysDown = {};
window.addEventListener("keydown", function(event){
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event){
    delete keysDown[event.keyCode];
});

var balls = [];
for (var i = 0; i < 100; i++){
    balls[i] = new Ball(10*i, 8*i, 2,"#ffffff");
}

function coll(arr){
    for(var i in arr){
        
    }
}














