/////// BreakBlock ////////////
class BreakBlock {
    constructor(x, y, ctx, name, isdoor){
        this.w = 50;
        this.h = 50;
        this.x = x;
        this.y = y;
        this.x2 = this.x + this.w;
        this.y2 = this.y + this.h;
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = "img/breakblock/breakblock.png";
        this.isbreak = false;
        this.name = name;
        this.isdoor = isdoor;

    }
    breakbox(){
        this.img.src = "img/breakblock/breakblock_break.png";
    }
    drawBlock(){
        ctx.drawImage(this.img, this.x, this.y,50,50); 
    }
    setDoor(isdoor){
        this.isdoor = isdoor;
    }
}