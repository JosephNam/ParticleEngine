//Author JosephNam 2015

;(function(window, Math) {

    function Quadtree(bounds, max_objects, max_levels, region, parent_node){
        this.max_nodes = max_objects || 10;
        this.max_levels = max_levels || 4;

        /**
         * possible regions 
         * 0
         * 1
         * 2
         * 3
         */
        this.region = region;
        this.bounds = bounds;

        this.nodes = [];

        this.parent_node = parent_node || null;
    };

    
    Quadtree.prototype.split = function() {
        var newLevel = this.level + 1,
            newWidth = Math.round( this.bounds.width / 2),
            newHeight = Math.round( this.bounds.height / 2),
            x = Math.round( this.bounds.x),
            y = Math.round( this.bounds.y);
    }

})
