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
const LETTER_NUMB = 30;
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
        this.directionV = {x: 0 , y: 0}
        this.xc = 0 ;
        this.yc = 0;

       
       // this.x = Math.floor(Math.random())
        this.y = Math.floor(Math.random()* 20)
        this.center = this.x/2 + this.y/2
        this.xForce = 0
        this.yForce = 0
        this.tarRot = 0


    }

    update(){

        this.xc = this.x;
        this.yc = this.y;
        //v = v0 + at
        // collision => 

        if(this.speed == 0){
         
        }

        if(this.tarRot > this.rot){
            this.rot += 0.01;
        }else if(this.tarRot < this.rot){
            this.rot -= 0.01;
        }

        if(this.y >= stageHeight - 0.5 && this.speed <= 0.5){
            this.speed = 0
            this.xForce = 0
            this.accel = 0
            this.yForce = 0

            
        }

        if( this.y+this.mass/2 >= canvas.height){
            this.speed = -1 * this.speed * 0.6
          
         
        }
        else{
            this.speed += this.accel

        }

        if(this.x-this.mass/2 < 0 || this.x-this.mass > canvas.width){
            this.xForce = -this.xForce/1.5


        }




        this.y += this.speed + this.yForce
        this.x += this.xForce
        this.center = this.x/2 + this.y/2
        this.xForce /= 1.3
        this.yForce /= 1.3


        this.directionV = getNormalVector(this);
        

    }

    draw(){


        ctx.save()
        ctx.font = `${this.mass}px serif`;
        ctx.fillStyle = this.color;
        ctx.translate(this.x+this.mass, this.y+this.mass);
        ctx.rotate(this.rot);
        ctx.translate(-(this.x+this.mass), -(this.y+this.mass));
        ctx.fillText(this.letter, this.x ,this.y,this.size)
        ctx.restore();
        

    }
    

}


const animate = () => {

    ctx.clearRect(0,0,stageWidth,stageHeight);

    for(let i = 0 ; i <= LETTER_NUMB ; i++){

        for(let j = 0 ; j <= LETTER_NUMB; j++){

            if(i != j){

                let distance = getDistance(letters[i].x,letters[i].y,letters[j].x,letters[j].y);

                if(distance < letters[i].mass/2 + letters[j].mass/2){
                    const distanceX = letters[i].x -letters[j].x < 0 ? -(letters[i].x -letters[j].x) : letters[i].x -letters[j].x 
                    const distanceY = letters[i].y -letters[j].y  < 0 ? -(letters[i].x -letters[j].x ) : letters[i].x -letters[j].x ;

                

                            let dx = letters[i].x - letters[j].x;
                            let dy = letters[i].y - letters[j].y;
                            
                            let forceDirectionX = dx / distance;
                            let forceDirectionY = dy / distance;

                            let force =  1 / distance;

                            let directionX = forceDirectionX * force;
                            let directionY = forceDirectionY * force;

                            if(directionY < 0){
                                letters[i].speed /= 2;
                                if(letters[i].speed <= 0.5){
                                    letters[i].speed = 0;
                                }
                            }

                            letters[i].xForce +=directionX * 20;
                            letters[i].yForce += directionY*20;


                            if(letters[i].speed >= 0.6){
                                let angle = getCollisionAngle(letters[i] , letters[j])
                                letters[i].tarRot = angle;
                                letters[j].tarRot = -angle;

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

   
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'S'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'E'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'O'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'J'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'E'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'E'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'S'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'A'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'N'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'G'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'G'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'S'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'E'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'O'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'J'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'E'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'E'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'S'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'A'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'N'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'G'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'G'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'S'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'E'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'O'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'J'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'E'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'E'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'S'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'A'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'N'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'G'))
    letters.push(new Letter(colors[Math.floor(Math.random()*3)] , 0, Math.floor(Math.random()*100)+50 , 'G'))

 


    
   
    animate()
}


const getDistance = (x1,y1,x2,y2) => {

    return Math.sqrt((x1-x2) * (x1-x2) + (y1-y2)*(y1-y2));

}


const getNormalVector = (p1) =>{

    let v = {
        x : p1.x - p1.xc,
        y : p1.y - p1.yc
    }
    const size = Math.sqrt(v.x*v.x + v.y*v.y);

    v.x /= size;
    v.y /= size;

    return v;

}
const getCollisionAngle = (p1, p2) => {

    let adjacent = Math.sqrt((p1.directionV.x*p2.directionV.x)*(p1.directionV.x*p2.directionV.x) + (p1.directionV.y*p2.directionV.y)*(p1.directionV.y*p2.directionV.y))
    let hypotenuse = Math.sqrt(p1.directionV.x*p1.directionV.x+p1.directionV.y*p1.directionV.y)*Math.sqrt(p2.directionV.x*p2.directionV.x+p2.directionV.y*p2.directionV.y);

    let angle = Math.acos(adjacent/hypotenuse);

    return angle/2


}