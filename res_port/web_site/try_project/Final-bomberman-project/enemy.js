///////////// Enemy //////////////////
class Enemy{
    constructor(x, y, speed, map, bombs, player, fires){
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
        this.img.src = "img/enemy/enemy_left.png";
        this.mybomb = bombs;
        this.player = player;
        this.dead = false;
        this.gone = false;
        this.direction = "";
        this.fires = fires;
    }

    setblock(blocks, breakblocks){
        this.blocks = blocks;
        this.breakblocks = breakblocks;
    }

    reborn(){
        this.x = this.old_x;
        this.x2 = this.old_x2;
        this.y = this.old_y;
        this.y2 = this.old_y2;
        this.img.src = "img/enemy/enemy_left.png";
        this.direction = "";
    }

    checkFire(){
        if(this.fires.length > 0){
            for(let i = 0; i < this.fires.length; i++){
                for(let j = 0;j < this.fires[i].length; j++){
                    if(!this.fires[i][j].iscool){
                        let dx = this.x2 - this.fires[i][j].x2;
                        let dy = this.y2 - this.fires[i][j].y2;
                        let distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance < this.w - 10){
                                if(!this.dead){
                                    this.dead = true;
                                    this.player.score += 200;
                                    this.img.src = "img/enemy/enemy_dead1.png";
                                    let that = this;
                                    setTimeout(function(){
                                        that.img.src = "img/enemy/enemy_dead2.png";
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

    randWay(){
        let allway = [];
        if(this.checkMapRight() && this.checkBlockRight()){
            allway.push("right");
        }
        if(this.checkMapLeft() && this.checkBlockLeft()){
            allway.push("left");
        }
        if(this.checkMapTop() && this.checkBlockUp()){
            allway.push("up");
        }
        if(this.checkMapDown() && this.checkBlockDown()){
            allway.push("down");
        }
        let rand = parseInt(Math.random() * allway.length);
        if(allway.length < 1){
            this.direction = "";
            return;
        }
        this.direction = allway[rand];
    }

    move(){
        this.checkFire();
        ///// init way /////////////
        if(!this.dead){
            if(this.direction == ""){
                this.randWay();
            }
            else{
                if(this.direction == "right"){
                    if(this.checkMapRight() && this.checkBlockRight()){
                        this.goRight();
                        this.img.src = "img/enemy/enemy_right.png";
                    }
                    else{
                        this.randWay();
                    }
                }
                else if(this.direction == "left"){
                    if(this.checkMapLeft() && this.checkBlockLeft()){
                        this.goLeft();
                        this.img.src = "img/enemy/enemy_left.png";
                    }
                    else{
                        this.randWay();
                    }  
                }
                else if(this.direction == "up"){
                    if(this.checkMapTop() && this.checkBlockUp()){
                        this.goUp();
                    }
                    else{
                        this.randWay();
                    }        
                }
                else if(this.direction == "down"){
                    if(this.checkMapDown() && this.checkBlockDown()){
                        this.goDown();
                    }
                    else{
                        this.randWay();
                    }           
                }
            }
        }
    }

    goRight(){
        if(this.checkMapRight() && this.checkBlockRight()){
            this.x += this.speed
            this.x2 = this.x + this.w; 
        }     
    }
    goLeft(){
        if(this.checkMapLeft() && this.checkBlockLeft()){
            this.x -= this.speed
            this.x2 = this.x + this.w;
        }      
    }
    goUp(){
        if(this.checkMapTop() && this.checkBlockUp()){
            this.y -= this.speed         
            this.y2 = this.y + this.h;
        }      
    }
    goDown(){
        if(this.checkMapDown() && this.checkBlockDown()){
            this.y += this.speed        
            this.y2 = this.y + this.h;
        }      
    }
}