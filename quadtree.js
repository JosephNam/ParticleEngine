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
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    var hash = 0;
    var objects = [];
    var parent = null;
    var child1 = null;
    var child2 = null;
    var child3 = null;
    var child4 = null;
    var height;
    var depth;
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
    this.child1 = new Node(this.x,this.y,this.width/2,this.height/2);
    this.child2 = new Node(this.x+this.width/2,this.y,this.width/2,this.height/2);
    this.child3 = new Node(this.x,this.y+this.height/2,this.width/2,this.height/2);
    this.child4 = new Node(this.x+this.width/2,this.y+this.height/2,this.width/2,this.height/2);
    this.child1.parent=this;
    this.child2.parent=this;
    this.child3.parent=this;
    this.child4.parent=this;
}
Node.prototype.isLeaf= function() {
    if(this.child1 == null && child2 == null && child3 == null && child4 ==null){
        return true;
    } else {
        return false;
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
Quadtree.prototype.insert= function(object){
    var objectx,
        objecty,
        objectw,
        objecth;
    objectx = object.x;
    objecty = object.y;
    objectw = object.width;
    objecth = object.height;
    //cn = current node
    var cn = this.root;
    if(cn == undefined)
    while(cn && (cn.child1 || cn.child2 || cn.child3 || cn.child4)){
        //check if empty node is a match for new object
        if (cn.isLeaf() == true){
            if ((objectx - objectw) >= cn.x){
                if((objectx+objectw) <= (cn.x+cn.width)){
                    if((objecty - objecth) >= cn.y){
                        if((objecty+objecth)<=(cn.y+ cn.height)){
                            if (cn.objects.length < 2){
                                cn.objects.push(object);
                                break;
                            } else {
                                cn.split(); 
                            }
                        }
                    }
                }
            } 
        } 
        cn = cn.findChild(objectx,objecty,objectw,objecth);
    }
}

function Circle(x,y,r) {
    this.x = x;
    this.y = y;
    this.width=r;
    this.height=r;
}

var tree = new Quadtree(600,600);
tree.insert(new Circle(200,200,10));
    
