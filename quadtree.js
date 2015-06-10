function Node(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hash = 0;
    this.objects = [];
    this.child1;
    this.child2;
    this.child3;
    this.child4;
    this.height;
    this.depth;
}


function Quadtree(width,height){
    this.width = width;
    this.height = height;
    this.MAX_LEVELS = 4;
    this.MAX_OBJ = 2;
    this.root = new Node(0,0,width,height);
    root.child1 = new Node(0,0,width/2,height/2); 
    root.child2 = new Node(width/2,0,width/2,height/2);
    root.child3 = new Node(0,height/2,width/2,height/2);
    root.child4 = new Node(width/2,height/2,width/2,height/2);
}

Quadtree.prototype.insert(object){
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
    while(!(cn.child1 == null|| cn.child2 == null|| cn.child3== null || cn.child4 == null)){
        if (cn.height == 0){
        if ((objectx - objectw) >= cn.x){
            if((objectx+objectw) <= (cn.x+cn.width)){
                if((objecty - objecth) >= cn.y){
                    if((objecty+objecth)<=(cn.y+ cn.height)){
                        if (cn.objects.length < 2){
                            cn.objects.push(object);
                        }
                    }
                }
            }
        } 
        } else {
            if ((objectx - objectw) >= cn.x){
                if((objectx+objectw) <= (cn.x+cn.width)){
                    if((objecty - objecth) >= cn.y){
                        if((objecty+objecth)<=(cn.y+ cn.height)){
                            if (cn.objects.length < 2){
                                
                            }
                        }
                    }
                }
            }    
        }
    }
}
