///////////// Player //////////////////
class Player{
    constructor(x, y, speed, map, bombs, items, fires, ctx){
        this.w = 50;
        this.h = 50;
        this.x = x;           
        this.y = y;
        this.x2 = this.x + this.w;           
        this.y2 = this.y + this.h;

        ////// for reborn ////////
        this.old_x = this.x;
        this.old_y = this.y;
        this.old_x2 = this.x2;
        this.old_y2 = this.y2;

        ////// for reborn /////////

        this.map = map;
        this.speed = speed;
        this.ctx = ctx;
        this.img = new Image();
        this.anime = "player_down.png";
        this.img.src = "img/player/"+this.anime;
        this.mybomb = bombs;
        this.myitem = items;

        this.win = false;
        this.gameover = false;
        this.live = 3;

        this.down = false;
        this.up = false;
        this.left = false;
        this.right = false;

        this.fires = fires;
        this.dead = false;
        this.gone = false;

        this.bomb = 1;
        this.blaze = 1;
        this.score = 0;

    }

    setblock(blocks, breakblocks){
        this.blocks = blocks;
        this.breakblocks = breakblocks;
    }

    setItem(items){
        this.myitem = items;
    }

    setFires(fires){
        this.fires = fires;
    }

    setEnemy(enemys){
        this.enemys = enemys;
    }

    checkEnemy(){
        if(this.enemys.length > 0){
            for (let i = 0; i < this.enemys.length; i++){
                if(!this.enemys[i].dead){
                    let dx = this.x +this.w  - this.enemys[i].x2;
                    let dy = this.y2 - this.enemys[i].y2;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < this.w - 10){
                            if(!this.dead){
                                this.live--;
                                this.dead = true;
                                this.img.src = "img/player/player_dead1.png";
                                let that = this;
                                setTimeout(function(){
                                    that.img.src = "img/player/player_dead2.png";
                                }, 500);
                                setTimeout(function(){
                                    that.gone = true;
                                }, 1000);
                            }
                        }
                }
            }
        }
    }

    reborn(){
        this.x = this.old_x;
        this.x2 = this.old_x2;
        this.y = this.old_y;
        this.y2 = this.old_y2;

        this.dead = false;
        this.gone = false;
        this.img.src = "img/player/player_down.png";
    }

    checkFire(){
        if(this.fires.length > 0){
            for(let i = 0; i < this.fires.length; i++){
                for(let j = 0;j < this.fires[i].length; j++){
                    if(!this.fires[i][j].iscool){
                        let dx = this.x +this.w  - this.fires[i][j].x2;
                        let dy = this.y2 - this.fires[i][j].y2;
                        let distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance < this.w - 10){                
                                if(!this.dead){
                                    this.live--;
                                    this.dead = true;
                                    this.img.src = "img/player/player_dead1.png";
                                    let that = this;
                                    setTimeout(function(){
                                        that.img.src = "img/player/player_dead2.png";
                                    }, 500);
                                    setTimeout(function(){
                                        that.gone = true;
                                    }, 1000);
                                }
                            }
                    }
                }
            }
        }
    }

    checkItem(){
        if(this.myitem.length > 0){
            for (let i = 0; i < this.myitem.length; i++){
                let dx = this.x2 - this.myitem[i].x2;
                let dy = this.y2 - this.myitem[i].y2;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.w - 10){
                        this.myitem[i].itemActive();
                        if(this.myitem[i].isdoor == false){
                            this.myitem.splice(i, 1);
                            break;
                        }
                    }
            }
        }
    }

    checkBlockRight(){
        if(this.mybomb.length > 0){
            for (let i = 0; i < this.mybomb.length; i++){
                //// Right //////
                if(this.x2 == this.mybomb[i].x
                && this.y2 <= this.mybomb[i].y2
                && this.y2 > this.mybomb[i].y){
                    return false;
                }
                else if(this.x2 == this.mybomb[i].x
                && this.y >= this.mybomb[i].y
                && this.y < this.mybomb[i].y2){
                    return false;
                }
            }
            for (let i = 0; i < this.mybomb.length; i++){
                //// Right //////
                if(this.x2 == this.mybomb[i].x
                && this.y2 <= this.mybomb[i].y2
                && this.y2 > this.mybomb[i].y){
                    return false;
                }
                else if(this.x2 == this.mybomb[i].x
                && this.y >= this.mybomb[i].y
                && this.y < this.mybomb[i].y2){
                    return false;
                }
            }
        }
        for (let i = 0; i < this.blocks.length; i++){
            //// Right //////
            if(this.x2 == this.blocks[i].x
            && this.y2 <= this.blocks[i].y2
            && this.y2 > this.blocks[i].y){
                return false;
            }
            else if(this.x2 == this.blocks[i].x
            && this.y >= this.blocks[i].y
            && this.y < this.blocks[i].y2){
                return false;
            }
        }
        if(this.breakblocks.length > 0){
            for (let i = 0; i < this.breakblocks.length; i++){
                //// Right //////
                if(this.x2 == this.breakblocks[i].x
                && this.y2 <= this.breakblocks[i].y2
                && this.y2 > this.breakblocks[i].y){
                    return false;
                }
                else if(this.x2 == this.breakblocks[i].x
                && this.y >= this.breakblocks[i].y
                && this.y < this.breakblocks[i].y2){
                    return false;
                }
            }
        }
        return true;
    }

    checkBlockLeft(){
        if(this.mybomb.length > 0){
            for (let i = 0; i < this.mybomb.length; i++){
                //// Left ///////////
                if(this.x == this.mybomb[i].x2
                && this.y2 <= this.mybomb[i].y2
                && this.y2 > this.mybomb[i].y){
                    return false;
                }
                else if(this.x == this.mybomb[i].x2
                && this.y >= this.mybomb[i].y
                && this.y < this.mybomb[i].y2){
                    return false;
                }
            }
            for (let i = 0; i < this.mybomb.length; i++){
                //// Left ///////////
                if(this.x == this.mybomb[i].x2
                && this.y2 <= this.mybomb[i].y2
                && this.y2 > this.mybomb[i].y){
                    return false;
                }
                else if(this.x == this.mybomb[i].x2
                && this.y >= this.mybomb[i].y
                && this.y < this.mybomb[i].y2){
                    return false;
                }
            }
        }
        for (let i = 0; i < this.blocks.length; i++){
            //// Left ///////////
            if(this.x == this.blocks[i].x2
            && this.y2 <= this.blocks[i].y2
            && this.y2 > this.blocks[i].y){
                return false;
            }
            else if(this.x == this.blocks[i].x2
            && this.y >= this.blocks[i].y
            && this.y < this.blocks[i].y2){
                return false;
            }
        }
        for (let i = 0; i < this.breakblocks.length; i++){
            //// Left ///////////
            if(this.x == this.breakblocks[i].x2
            && this.y2 <= this.breakblocks[i].y2
            && this.y2 > this.breakblocks[i].y){
                return false;
            }
            else if(this.x == this.breakblocks[i].x2
            && this.y >= this.breakblocks[i].y
            && this.y < this.breakblocks[i].y2){
                return false;
            }
        }

        return true;
    }


    checkBlockUp(){
        if(this.mybomb.length > 0){
            for (let i = 0; i < this.mybomb.length; i++){
                //// Up ///////////
                if(this.y == this.mybomb[i].y2
                && this.x2 <= this.mybomb[i].x2
                && this.x2 > this.mybomb[i].x){
                    return false;
                }
                else if(this.y == this.mybomb[i].y2
                && this.x >= this.mybomb[i].x
                && this.x < this.mybomb[i].x2){
                    return false;
                }
            }

            for (let i = 0; i < this.mybomb.length; i++){
                //// Up ///////////
                if(this.y == this.mybomb[i].y2
                && this.x2 <= this.mybomb[i].x2
                && this.x2 > this.mybomb[i].x){
                    return false;
                }
                else if(this.y == this.mybomb[i].y2
                && this.x >= this.mybomb[i].x
                && this.x < this.mybomb[i].x2){
                    return false;
                }

            }
        }
        for (let i = 0; i < this.blocks.length; i++){
            //// Up ///////////
            if(this.y == this.blocks[i].y2
            && this.x2 <= this.blocks[i].x2
            && this.x2 > this.blocks[i].x){
                return false;
            }
            else if(this.y == this.blocks[i].y2
            && this.x >= this.blocks[i].x
            && this.x < this.blocks[i].x2){
                return false;
            }
        }

        for (let i = 0; i < this.breakblocks.length; i++){
            //// Up ///////////
            if(this.y == this.breakblocks[i].y2
            && this.x2 <= this.breakblocks[i].x2
            && this.x2 > this.breakblocks[i].x){
                return false;
            }
            else if(this.y == this.breakblocks[i].y2
            && this.x >= this.breakblocks[i].x
            && this.x < this.breakblocks[i].x2){
                return false;
            }

        }
        return true;
    }

    checkBlockDown(){
        if(this.mybomb.length > 0){
            for (let i = 0; i < this.mybomb.length; i++){
                //// Up ///////////
                if(this.y2 == this.mybomb[i].y
                && this.x2 <= this.mybomb[i].x2
                && this.x2 > this.mybomb[i].x){
                    return false;
                }
                else if(this.y2 == this.mybomb[i].y
                && this.x >= this.mybomb[i].x
                && this.x < this.mybomb[i].x2){
                    return false;
                }
            }
            for (let i = 0; i < this.mybomb.length; i++){
                //// Up ///////////
                if(this.y2 == this.mybomb[i].y
                && this.x2 <= this.mybomb[i].x2
                && this.x2 > this.mybomb[i].x){
                    return false;
                }
                else if(this.y2 == this.mybomb[i].y
                && this.x >= this.mybomb[i].x
                && this.x < this.mybomb[i].x2){
                    return false;
                }
            }
        }
        for (let i = 0; i < this.blocks.length; i++){
            //// Up ///////////
            if(this.y2 == this.blocks[i].y
            && this.x2 <= this.blocks[i].x2
            && this.x2 > this.blocks[i].x){
                return false;
            }
            else if(this.y2 == this.blocks[i].y
            && this.x >= this.blocks[i].x
            && this.x < this.blocks[i].x2){
                return false;
            }
        }
        for (let i = 0; i < this.breakblocks.length; i++){
            //// Up ///////////
            if(this.y2 == this.breakblocks[i].y
            && this.x2 <= this.breakblocks[i].x2
            && this.x2 > this.breakblocks[i].x){
                return false;
            }
            else if(this.y2 == this.breakblocks[i].y
            && this.x >= this.breakblocks[i].x
            && this.x < this.breakblocks[i].x2){
                return false;
            }
        }
        return true;
    }

    checkMapRight(){
        let right = this.x + this.w
        if(right >= this.map.offsetWidth){
            return false
        }
        return true
    }

    checkMapLeft(){
        if(this.x <= 0){
            return false
        }
        return true
    }

    checkMapTop(){
        if(this.y <= 0){
            return false
        }
        return true
    }

    checkMapDown(){
        let bottom = this.y + this.h
        if(bottom  >= this.map.offsetWidth){
            return false
        }
        return true
    }

    goRight(){
        this.checkItem();
        if(this.checkMapRight() && this.checkBlockRight()){
            this.x += this.speed
            this.x2 = this.x + this.w; 
        }     
    }
    goLeft(){
        this.checkItem();
        if(this.checkMapLeft() && this.checkBlockLeft()){
            this.x -= this.speed
            this.x2 = this.x + this.w;
        }      
    }
    goUp(){
        this.checkItem();
        if(this.checkMapTop() && this.checkBlockUp()){
            this.y -= this.speed         
            this.y2 = this.y + this.h;
        }      
    }
    goDown(){ 
        this.checkItem();
        if(this.checkMapDown() && this.checkBlockDown()){
            this.y += this.speed        
            this.y2 = this.y + this.h;
        }      
    }

    doAnime(){
        this.downAnime();
        this.upAnime();
        this.rightAnime();
        this.leftAnime();
    }

    downAnime(){
        let that = this;     
        setInterval(() => {
            if(that.down && !that.dead){
                if(that.anime == "player_down_walk1.png"){
                    that.anime = "player_down_walk2.png";
                }
                else{
                    that.anime = "player_down_walk1.png";
                }
                that.img.src = "img/player/"+that.anime;
            }
        }, 150);      
    }

    upAnime(){
        let that = this;     
        setInterval(() => {
            if(that.up && !that.dead){
                if(that.anime == "player_up_walk1.png"){
                    that.anime = "player_up_walk2.png";
                }
                else{
                    that.anime = "player_up_walk1.png";
                }
                that.img.src = "img/player/"+that.anime;
            }
        }, 150);      
    }

    leftAnime(){
        let that = this;     
        setInterval(() => {
            if(that.left && !that.dead){
                if(that.anime == "player_left_walk1.png"){
                    that.anime = "player_left_walk2.png";
                }
                else{
                    that.anime = "player_left_walk1.png";
                }
                that.img.src = "img/player/"+that.anime;
            }
        }, 150);      
    }

    rightAnime(){
        let that = this;     
        setInterval(() => {
            if(that.right && !that.dead){
                if(that.anime == "player_right_walk1.png"){
                    that.anime = "player_right_walk2.png";
                }
                else{
                    that.anime = "player_right_walk1.png";
                }
                that.img.src = "img/player/"+that.anime;
            }
        }, 150);      
    }
}