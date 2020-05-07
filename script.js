var canvas = document.querySelector('.canvas1');     //Selecting DOM elements   
var start = document.querySelector('.startbtn');

var scores=[];                                       //Global variables
var best = 0;

var game = new Audio('game.mp3');                    //Declaring audio variables
var gameover = new Audio('gameover.mp3');
var beep = new Audio('beep.mp3');

var ctx = canvas.getContext('2d');                   
canvas.width = 250;                                  //Setting canvas width and height
canvas.height = 500;


start.addEventListener('click', function(){          //Starting the game on clicking START button
    
    setTimeout(function(){
        init();                                      //Game starts 1sec after clicking on START
        game.play();
        game.loop = 'true';
    }, 1000);
    
});

function init(){                                     //All gameplay code is inside init()
    
    var score = 0, i=0;                         //Game  variables
    let gravity = 0.5;
    let colors = ['red', 'green'];
    let flag = false;                                //To check if game is in progress

    var ball = {                                     
        
        x : canvas.width / 2,                        //Declaring ball variables
        y : 100,
        rad : 10,
        vel : -7,
        clr : colors[Math.floor(Math.random() * 2)]
    
    };

    function drawBall(){                             //Draws a ball onto the canvas   
        
        ctx.beginPath();
        ctx.fillStyle = ball.clr;
        ctx.arc(ball.x, ball.y, ball.rad, 0, Math.PI * 2);
        ctx.fill();

    }

    function ballUpdate(){                           //Updates position variables of ball

        ball.vel += gravity;
        ball.y += ball.vel;
        
    }

    function ballJump(){                             //Create the jump effect on click

        ball.vel = -7;
        beep.volume = 0.05;
        beep.play();
        
    }


    class Obstacle {                                 //Creating a class for Obstacle
        
        constructor(x,y){
            
            this.a=0;
            this.x = x;                              //Initialising obstacle properties
            this.y = y;
            this.rad = 60;
            
            this.clr1 = colors[Math.floor(Math.random() * 2)];
            if(this.clr1=='red'){
                this.clr2='green';
            }
            else{
                this.clr2='red';
            }

        }

        drawObs(angle = 0){                          //Draws an obstacle onto the screen
            
            ctx.beginPath();
            ctx.strokeStyle = this.clr1;
            ctx.lineWidth = 16;
            ctx.arc(this.x, this.y, this.rad, angle, angle + Math.PI);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = this.clr2;
            ctx.arc(this.x, this.y, this.rad, Math.PI+angle, (2*Math.PI) +angle);
            ctx.stroke();
        
        }

        obsUpdate(){                                 //Updates the position variable of an Obstacle 
            
            this.a += 2;  
            this.y+=1.5;
        
        }
    }

    var o = new Array();                             //Array of Obstacles
    
    o[i] = new Obstacle(canvas.width/2,-65);         //Creating a new obstacle

    update();                                        //Calling update() to initiate the animation

    function draw(){                                 //Clears the canvas, draws the ball and obstacles

        ctx.clearRect(0 , 0, canvas.width, canvas.height);
        drawBall();
        o[i].drawObs(o[i].a*Math.PI/180);
        
        if(o.length>1){                              //If there are 2 obstacles, draws both
            o[i+1].drawObs(o[i+1].a*Math.PI/180);
        }
        
    }

    function colorCheck(){                           //Checks for collision 
            
        for(var j=0;j<o.length;j++){
            if (((ball.y - o[j].y)<75) && (ball.y - o[j].y)>50){
                if (o[j].a%360>90 && o[j].a%360<270){
                    if (ball.clr == o[j].clr1){
                        flag = true;
                    }
                }                            
                                                                
                else{
                    if(ball.clr == o[j].clr2){
                        flag = true;
                    }
                }                   //If there's a collision of differenr colors, game over
            }                       //2 if statements to check for bottom and top part of obstacle
                                            
            if ((ball.y - o[j].y)>(-75) && (ball.y - o[j].y)<(-50)){
                if (o[j].a%360>90 && o[j].a%360<270){
                    if (ball.clr == o[j].clr2){
                        flag = true;
                    }
                }
                else{
                    if(ball.clr == o[j].clr1){
                        flag = true;
                    }
                }
            }
        }

        if(ball.y>500 || ball.y<0){                  //If ball goes out of the canvas, game over
            flag=true;
        }

        if (flag == true){                           //If game over, push the score to scores[]
            
            scores.push(score);                         
            best = Math.max(...scores);              //Update best if applicable
            if(best>window.localStorage.getItem('best')){
            window.localStorage.setItem('best', JSON.stringify(best));
            }

        }

    }


    function drawText(){                             //Drawing the score and best onto the canvas
        
        ctx.strokeStyle = '#007eaf';
        ctx.textAlign = 'left';
        ctx.lineWidth = 1;
        ctx.font = '20px sans-serif';
        ctx.strokeText('SCORE',5,25);
        ctx.strokeText(score,5,50);

        ctx.strokeText('BEST', 5, 75);
        if (window.localStorage.getItem == null){
            ctx.strokeText('0', 5, 100);
        }
        else{
            ctx.strokeText(window.localStorage.getItem('best'), 5, 100);
        }

        if(flag==true){
            
            ctx.fillStyle = '#00316e';            
            ctx.textAlign = 'center';
            ctx.font = '30px sans-serif';
            
            ctx.fillText('GAME OVER!', canvas.width/2, canvas.height/2);
            game.pause();
            game.currentTime = 0;
            gameover.play();
        
        }
    }

    function update(){                               //Updates everything on the canvas

        if (flag==false){
            window.requestAnimationFrame(update);    //If game is not over, call update
        }

        ballUpdate();
        o[i].obsUpdate();

        if(o.length>1){
            o[i+1].obsUpdate();
        }
        
        if(o[i].y>250){                              //If an obstacle crosses 250, send new obstacle
            o.push(new Obstacle(canvas.width/2, -65));
        }

        if(o[i].y>565){                              //If obstacle is out of canvas, update score
            
            i++;                                     //Increasing i forgets the past obstacle   
            score+=10;
            
        }
             
        draw();
        drawText();
        colorCheck();

        canvas.addEventListener('click', ballJump);

    }

}