/////////// Block /////////////////////////
class Block {
    constructor(x, y, ctx){
        this.w = 50;
        this.h = 50;
        this.x = x;
        this.y = y;
        this.x2 = this.x + this.w;
        this.y2 = this.y + this.h;
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = "img/block/block.png";

    }
    drawBlock(){
        ctx.drawImage(this.img, this.x, this.y,50,50); 
    }
}