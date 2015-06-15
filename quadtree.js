// may be easier to implement with ending x and ending y instead of widht / height math may be easier
/* child diagram
 *            --------------------
 *            |   1    |   2     |
 *            |        |         |
 *            |------------------| 
 *            |   3    |  4      |
 *            |        |         |
 *            ---------|---------|
 *
 */
    //node constructor
function Node(x,y,width,height){
    var x,
        y,
        width
        height;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    var hash = 0;
    var objects = new Array(); 
    var parent = null;
    var child1 = null;
    var child2 = null;
    var child3 = null;
    var child4 = null;
}

Node.prototype.getDim = function(self) {
    return [x,y,width,height];
}
Node.prototype.findChild = function(objectx, objecty, objectw, objecth){
    if (objectx < this.width/2){
        if (objecty < this.height/2){
            return child1;
        } else {
            return child3;
        }
    } else {
        if (objecty < this.height/2){
            return child2;
        } else {
            return child4;
        }
    }
}

Node.prototype.split = function(){
    console.log("splitting");
    this.child1 = new Node(this.x,this.y,this.width/2,this.height/2);
    this.child2 = new Node(this.x+this.width/2,this.y,this.width/2,this.height/2);
    this.child3 = new Node(this.x,this.y+this.height/2,this.width/2,this.height/2);
    this.child4 = new Node(this.x+this.width/2,this.y+this.height/2,this.width/2,this.height/2);
    console.log("child2 at" + this.child2.x +"," + this.child2.y);
    this.child1.parent=this;
    this.child2.parent=this;
    this.child3.parent=this;
    this.child4.parent=this;
    if(this.parent == null && this.objects == null){
    } else {
        this.objects.length = 0;
    }
}
Node.prototype.isLeaf = function(self) {
    if(child1 == null && child2 == null && child3 == null && child4 ==null){
        return true;
    } else {
        return false;
    }
    return true;
}
Node.prototype.update = function(){
    if(this.objects == null){
        return;
    } else {
        for(var i = 0; i < 2; i++){
            var correctchild = this.parent.findChild(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if (correctchild != this){
                var temp = objects[i];
                if(correctchild.objects.length >=2 ){
                    correctchild.split();
                    this.update();
                } else {
                    correctchild.push(objects[i]);
                }
            }
        }
    }
    
}
//remember need to give quadtree x and y beginning point.
function Quadtree(width,height){
    this.width = width;
    this.height = height;
    this.MAX_LEVELS = 4;
    this.MAX_OBJ = 2;
    var root = new Node(0,0,width,height);
    root.split();
}
Quadtree.prototype.insert= function(self, object){
    if (object == null){
        return;
    }
    var objectx,
        objecty,
        objectw,
        objecth;
    objectx = object.getDim()[0];
    objecty = object.getDim()[1];
    objectw = object.getDim()[2];
    objecth = object.getDim()[3];
    var cn = root;
    if(cn == undefined){
        console.log("asdgalkjh");
    }
    while(cn!==undefined){
        console.log('...');
        //check if empty node is a match for new object
        if(cn.isLeaf()== null){
            console.log('null');
        } else {
            var boolLeaf = cn.isLeaf();
        }

        if (boolLeaf == true){
            if ((objectx - objectw) >= cn.x){
                if((objectx+objectw) <= (cn.x+cn.width)){
                    if((objecty - objecth) >= cn.y){
                        if((objecty+objecth)<=(cn.y+ cn.height)){
                            if (cn.objects.length < 2){
                                cn.objects.push(object);
                                nodesWObjects.push(cn);
                                console.log('hello');
                                break;
                            } else {
                                cn.split(); 
                                console.log('actually splitting');
                            }
                        }
                    }
                }
            } 
        } 
        console.log('well this sucks')
        cn = cn.findChild(objectx,objecty,objectw,objecth);
    }
}

function Ball(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.height = r;
        this.width = r;
        this.xv = 2;
        this.yv = 2;
        this.color = color | "#000000";
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
var keysDown = {};
window.addEventListener("keydown", function(event){
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event){
    delete keysDown[event.keyCode];
});

Ball.prototype.update = function() {
    /*
    for(var key in keysDown) {
        console.log("hello");
        var value = Number(key);
        if(value == 37) {
            console.log("hi");
            this.move(this.xv*-1,0);
        } else if (value == 39){
            this.move(this.xv,0);
        } else if (value == 38){
            this.move(0,this.yv*-1);
        } else if (value == 40){
            this.move(0,this.yv);
        }
    }
    */
    this.x+=this.xv;
    this.y+=this.yv;
}

Ball.prototype.render = function() {
    context.fillStyle = "#000000";
    context.beginPath();
    context.arc(this.x, this.y, this.width,0, 2 * Math.PI);
    context.fill();
}

var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame||
    window.mozRequestAnimationFrame ||
    function(callback) {window.setTimeout(callback, 1000/60)};
//creating canvas
var canvas = document.createElement('canvas');
var CANVAS_WIDTH= 600;
var CANVAS_HEIGHT= 600;
canvas.width = CANVAS_WIDTH; 
canvas.height = CANVAS_HEIGHT;
var context = canvas.getContext('2d');

window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
};   
var update = function() {
    ball.update();
};

var render = function() {
        context.fillStyle = "#ff00ff";
        context.fillRect(0,0,400,400);
        ball.render();
};


var tree = new Quadtree(600,600);
var ball = new Ball(200,200,10,"#000000");
tree.insert(ball);
tree.insert(new Ball(250,250,10,"#222222"));
tree.insert(new Ball(250,250,10,"#222222"));
tree.insert(new Ball(250,250,10,"#222222"));
tree.insert(new Ball(250,250,10,"#222222"));
tree.insert(new Ball(250,250,10,"#222222"));
tree.insert(new Ball(250,250,10,"#222222"));
var step = function() {
    update();
    render();
    animate(step);
};
