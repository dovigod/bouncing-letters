const canvas  = document.getElementById('canvas')
const ctx = canvas.getContext('2d');

const colors = ['red' , 'black' , 'grey'];

window.devicePixelRatio = 3;
let stageWidth = window.innerWidth;
let stageHeight = window.innerHeight;
let scale = 1;
canvas.width = stageWidth * scale;
canvas.height = stageHeight * scale;
stageWidth = canvas.width;
stageHeight = canvas.height;
const LETTER_NUMB = 10;
let letters = []
ctx.textBaseline = 'middle'; 
ctx.textAlign = 'center';

const eventListeners = () =>{
    // window.addEventListener('resize' , e => {
    //     stageWidth = window.innerWidth
    //     stageHeight = window.innerHeight
    //     canvas.width = stageWidth
    //     canvas.height = stageHeight
    // })
}

class Letter{
    constructor(color , speed , size , letter){
        this.color = color
        this.speed = speed
        this.mass = size
        this.accel = 0.08 + (this.mass /800);
        this.letter = letter
        this.x = Math.floor(Math.random()*(stageWidth))+100
        this.rot = 0;

       
       // this.x = Math.floor(Math.random())
        this.y = Math.floor(Math.random()* 20)
        this.center = this.x/2 + this.y/2
        this.xForce = 0
        this.yForce = 0


    }

    update(){


        if(this.y <= 0 && this.speed >= 1){
            this.yForce = this.speed + 1
           
  
        }
        if(this.y >= stageHeight - 0.5 && this.speed <= 0.5){
            this.speed = 0
            this.xForce = 0
            this.accel = 0
            this.yForce = 0

            
        }

        if( this.y >= canvas.height){
            this.speed = -1 * this.speed * 0.8
          
         
        }
        else{
            this.speed += this.accel

        }

        if(this.x-this.mass/2 < 0 || this.x-this.mass > canvas.width){
            this.xForce = -this.xForce/1.3


        }




        this.y += this.speed + this.yForce
        this.x += this.xForce
        this.center = this.x/2 + this.y/2
        this.xForce /= 1.1
        this.yForce /= 1.1

        

    }

    draw(){

     
        ctx.font = `${this.mass}px serif`;
        ctx.fillStyle = this.color;
        
        ctx.translate(this.x+this.mass, this.y+this.mass);
        ctx.rotate(this.rot);
        ctx.translate(-(this.x+this.mass), -(this.y+this.mass));
        ctx.fillText(this.letter, this.x ,this.y,this.size)

    }
    

}


const animate = () => {

    ctx.clearRect(0,0,stageWidth,stageHeight);

    for(let i = 0 ; i <= LETTER_NUMB ; i++){

        for(let j = 0 ; j <= LETTER_NUMB; j++){

            if(i != j){
                if(getDistance(letters[i].x,letters[i].y,letters[j].x,letters[j].y) < letters[i].mass/2 + letters[j].mass/2){
                    const distanceX = letters[i].x -letters[j].x < 0 ? -(letters[i].x -letters[j].x) : letters[i].x -letters[j].x 
                    const distanceY = letters[i].y -letters[j].y  < 0 ? -(letters[i].x -letters[j].x ) : letters[i].x -letters[j].x ;

                    if( distanceX < letters[i].mass/2 + letters[j].mass/2){ // x-axis movement
                        if(letters[i].x >= letters[j].x ){ //pointed letter is on right than comparing component
                            // i가 우측 밀림, j가 좌측 밀림
                            letters[i].xForce = Math.abs((letters[i].x - (letters[j].x+letters[j].mass)) / 23);
                            // letters[i].rot -= Math.abs((letters[i].x - (letters[j].x+letters[j].mass)) / 20)
                            letters[j].xForce = -Math.abs(((letters[i].x - (letters[j].x+letters[j].mass)) /23));
                            // letters[j].rot += Math.abs(((letters[i].x - (letters[j].x+letters[j].mass)) /20));
                        }else{
                            // i가 좌
                            letters[i].xForce = Math.abs(((letters[j].x - (letters[i].x+letters[i].mass)) / 23));
                            // letters[i].rot += Math.abs((letters[i].x - (letters[j].x+letters[j].mass)) / 20)
                            letters[j].xForce = -Math.abs((letters[j].x -  (letters[i].x+letters[i].mass))/ 23);
                            // letters[j].rot -= Math.abs(((letters[i].x - (letters[j].x+letters[j].mass)) /20));
                        }
                    }

                    if( distanceY < letters[i].mass/2 + letters[j].mass/2){
                        if(letters[i].y >= letters[j].y ){
                            // i가 우측 밀림, j가 좌측 밀림
                            letters[i].yForce = Math.abs((letters[i].y- (letters[j].y+letters[j].mass)) / 23);
                            // letters[i].rot -= Math.abs((letters[i].x - (letters[j].x+letters[j].mass)) / 20)
                            letters[j].yForce = -Math.abs(((letters[i].y - (letters[j].y+letters[j].mass)) / 23));
                            // letters[j].rot += Math.abs(((letters[i].x - (letters[j].x+letters[j].mass)) /20));
                        }else{
                            // i가 좌23);
                            letters[j].yForce = Math.abs(((letters[j].y - (letters[i].y+letters[i].mass)) / 23));
                            // letters[i].rot += Math.abs((letters[i].x - (letters[j].x+letters[j].mass)) / 20)
                            letters[i].yForce = -1*Math.abs(((letters[j].y - (letters[i].y+letters[i].mass)) / 23));
                            // letters[j].rot -= Math.abs(((letters[i].x - (letters[j].x+letters[j].mass)) /20));
                        }
                    }
                    
                }
            }

            
        }

        letters[i].update()
        letters[i].draw();
     

    }
    requestAnimationFrame(animate)
}


window.onload = () =>{

    eventListeners();

   
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*50)+20 , 'S'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*50)+20 , 'E'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*50)+20 , 'O'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*50)+20 , 'J'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*50)+20 , 'E'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*50)+20 , 'E'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*50)+20 , 'S'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*50)+20 , 'A'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*50)+20 , 'N'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*50)+20 , 'G'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*50)+20 , 'G'))

 


    
   
    animate()
}


const getDistance = (x1,y1,x2,y2) => {

    return Math.sqrt((x1-x2) * (x1-x2) + (y1-y2)*(y1-y2));

}