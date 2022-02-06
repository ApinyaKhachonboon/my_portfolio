///////// Fire //////////////
class Fire{
    constructor(x, y, player, ctx, way, end){
        this.w = 50;
        this.h = 50;
        this.x = x;
        this.y = y;
        this.x2 = this.x + this.w;
        this.y2 = this.y + this.h;
        this.fires = fires;
        this.player = player;
        this.ctx = ctx;
        this.iscool = false;
        if(way == "center"){
            this.path = "img/fire/fire_center.png";
        }
        else if(way == "left"){
            if(end){
                this.path = "img/fire/fire_left_last.png";
            }
            else{
                this.path = "img/fire/fire_row.png";
            }                   
        }
        else if(way == "right"){
            if(end){
                this.path = "img/fire/fire_right_last.png";
            }
            else{
                this.path = "img/fire/fire_row.png";
            }             
        }
        else if(way == "up"){
            if(end){
                this.path = "img/fire/fire_up_last.png";
            }
            else{
                this.path = "img/fire/fire_column.png";
            }             
        }
        else if(way == "down"){
            if(end){
                this.path = "img/fire/fire_down_last.png";
            }
            else{
                this.path = "img/fire/fire_column.png";
            }             
        }
        this.img = new Image();
        this.img.src = this.path;

    }
    drawFire(){
        ctx.drawImage(this.img, this.x, this.y,50,50);
    }

    setIndex(index){
        this.index = index;
    }
}
