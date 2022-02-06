/////////// item /////////////////////////
class Item {
    constructor(x, y, player, ctx, myitem, isdoor, sound){
        this.w = 50;
        this.h = 50;
        this.x = x;
        this.y = y;
        this.x2 = this.x + this.w;
        this.y2 = this.y + this.h;
        this.ctx = ctx;
        this.player = player;
        this.img = new Image();
        this.myitem = myitem;
        this.isdoor = isdoor;
        if(this.isdoor && this.myitem == "door"){
            this.img.src = "img/item/item_door.png";
        }
        else{
            if(myitem == "blaze")
            {
                this.img.src = "img/item/item_blaze.png";
            }
            else if(myitem == "bomb"){
                this.img.src = "img/item/item_bomb.png";
            }
        }

        this.sound = sound
    }
    drawItem(){
        ctx.drawImage(this.img, this.x, this.y,50,50); 
    }
    itemActive(){
        if(this.isdoor){
            this.player.win = true;
        }
        else{
            if(this.myitem == "blaze"){
                this.player.blaze++;
            }
            else if(this.myitem == "bomb"){
                this.player.bomb++;
            }
            this.sound.play();
        }
        
    }
}