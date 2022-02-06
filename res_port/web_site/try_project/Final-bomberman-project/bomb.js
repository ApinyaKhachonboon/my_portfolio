//////////////// Bomb ///////////////
class Bomb { 
    constructor(x, y, bombs, index, fires, myitem, player, ctx, map ,sound_item){
        this.w = 50;
        this.h = 50;
        this.x = x;
        this.y = y;
        this.x2 = this.x + this.w;
        this.y2 = this.y + this.h;
        this.index = index;
        this.bombs = bombs;
        this.fires = fires;
        this.player = player;
        this.ctx = ctx;
        this.map = map;
        this.img = new Image();
        this.img.src = "img/bomb/bomb1.png";
        this.isexplode = false;
        this.myfire = [];
        this.myitem = myitem;

        ////////// sound ///////////
        this.sound_item = sound_item;
    }

    drawBomb(){
        ctx.drawImage(this.img, this.x, this.y,50,50);
    }

    checkBlock(x, y){
        let breaklist = [];
        if(x >= map.width || x < 0 || y >= map.height || y < 0){
            return false;
        }
        for (let i = 0; i < this.player.blocks.length; i++){
            if(x == this.player.blocks[i].x && y == this.player.blocks[i].y){
                return false;
            }
        }
        for (let i = 0; i < this.player.breakblocks.length; i++){
            if(x == this.player.breakblocks[i].x && y == this.player.breakblocks[i].y){           
                this.player.breakblocks[i].breakbox();
                breaklist.push(this.player.breakblocks[i]);    
                
                let that = this;  
                setTimeout(function() {     
                    for (let i = 0; i < breaklist.length; i++){                                            
                        for (let j = 0; j < that.player.breakblocks.length; j++){
                            if(breaklist[i].name == that.player.breakblocks[j].name){
                                that.player.breakblocks.splice(j, 1);
                                ////// rand for item /////////
                                let item = "";
                                if(breaklist[i].isdoor == true){
                                    item = "door";
                                    let newitem = new Item(breaklist[i].x, breaklist[i].y, that.player, that.ctx, item, true, that.sound_item);
                                    that.myitem.push(newitem);
                                }
                                else{
                                    let rand = Math.random();         
                                    if(rand > 0.7){
                                        if(rand > 0.8){
                                            item = "bomb";
                                        }
                                        else{
                                            item = "blaze";
                                        }
                                        let newitem = new Item(breaklist[i].x, breaklist[i].y, that.player, that.ctx, item, false, that.sound_item);
                                        that.myitem.push(newitem);
                                    }    
                                }           
                            }
                        }
                    }
                    breaklist = [];       

                }, 1500);
                
                return false;
            }
        }

        return true;
    }

    explode(explode_sound){
        let that = this

        setTimeout(function(){
            explode_sound.play();
            that.isexplode = true;
            that.bombs.splice(that.index, 1);
            player.bomb++;

            let fire = new Fire(that.x, that.y, that.player, that.ctx, "center", false);
            fire.setIndex(that.fires.length);
            that.myfire.push(fire);

            /////// left /////////
            for (let i = 1; i <= that.player.blaze; i++){
                if(!that.checkBlock(that.x - 50 * i, that.y)){
                    break;
                }
                if(i != that.player.blaze){
                    fire = new Fire(that.x - 50 * i, that.y, that.player, that.ctx, "left", false);
                }
                else{
                    fire = new Fire(that.x - 50 * i, that.y, that.player, that.ctx, "left", true);
                }
                fire.setIndex(that.fires.length);
                that.myfire.push(fire);                   
            }
            
            /////// Right ///////////
            for (let i = 1; i <= that.player.blaze; i++){
                if(!that.checkBlock(that.x + 50 * i, that.y)){
                    break;
                }
                if(i != that.player.blaze){
                    fire = new Fire(that.x + 50 * i, that.y, that.player, that.ctx, "right", false);
                }
                else{
                    fire = new Fire(that.x + 50 * i, that.y, that.player, that.ctx, "right", true);
                }
                fire.setIndex(that.fires.length); 
                that.myfire.push(fire);                
            }

            /////// up ///////////
            for (let i = 1; i <= that.player.blaze; i++){
                if(!that.checkBlock(that.x, that.y - 50 * i)){
                    break;
                }
                if(i != that.player.blaze){
                    fire = new Fire(that.x, that.y - 50 * i, that.player, that.ctx, "up", false);
                }
                else{
                    fire = new Fire(that.x, that.y - 50 * i, that.player, that.ctx, "up", true);
                }
                fire.setIndex(that.fires.length);
                that.myfire.push(fire);      
            }
            /////// down ///////////
            for (let i = 1; i <= that.player.blaze; i++){
                if(!that.checkBlock(that.x, that.y + 50 * i)){
                    break;
                }
                if(i != that.player.blaze){
                    fire = new Fire(that.x, that.y + 50 * i, that.player, that.ctx, "down", false);
                }
                else{
                    fire = new Fire(that.x, that.y + 50 * i, that.player, that.ctx, "down", true);
                }
                fire.setIndex(that.fires.length);
                that.myfire.push(fire);                  
            }
            that.fires.push(that.myfire);

            setTimeout(function(){
                for (let i = 0; i < that.myfire.length; i++){
                    that.myfire[i].iscool = true;                                      
                }
                that.fires.slice(0);       
            }, 1000);
        }, 2000);
    }
}