var canvas = document.querySelector('.canvas1');
var start = document.querySelector('.startbtn');
var scores=[];
var best = 0;
//window.localStorage.setItem('best', best);
var ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 500;


start.addEventListener('click', function(){
    setTimeout(init, 1000);
    
});

function init(){
    var t=0, score = 0, i=0;
    //var best = 0;
    let gravity = 0.5;
    let colors = ['red', 'green'];
    let flag = false;


    var ball = {
        x : canvas.width / 2,
        y : 100,
        rad : 10,
        vel : -7,
        clr : colors[Math.floor(Math.random() * 2)]
    };
        




    class Obstacle {
        
        constructor(x,y){
            this.a=0;
            this.x = x;
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

        drawObs(angle = 0){
            ctx.beginPath();
            ctx.strokeStyle = this.clr1;
            ctx.lineWidth = 15;
            ctx.arc(this.x, this.y, this.rad, angle, angle + Math.PI);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = this.clr2;
            ctx.arc(this.x, this.y, this.rad, Math.PI+angle, (2*Math.PI) +angle);
            ctx.stroke();
        }

        obsUpdate(){
            this.a += 2;  
            this.y+=1.5;
        }
    }

    var o = new Array();
    o[i] = new Obstacle(canvas.width/2,-65);

    // var obstacle = {
    //     x : canvas.width / 2,
    //     y : 100,
    //     rad : 75,
    //     clr1 : colors[0],
    //     clr2 : colors[1]
    // };
        
        
    update();
    //drawText();

    function drawBall(){
        
        ctx.beginPath();
        ctx.fillStyle = ball.clr;
        ctx.arc(ball.x, ball.y, ball.rad, 0, Math.PI * 2);
        ctx.fill();

    }

    // function drawObstacle(ox, oy, angle=0){
        
    //     ctx.beginPath();
    //     ctx.strokeStyle = obstacle.clr1;
    //     ctx.lineWidth = 16;
    //     ctx.arc(ox, oy, obstacle.rad, angle, angle + Math.PI);
    //     ctx.stroke();

    //     ctx.beginPath();
    //     ctx.strokeStyle = obstacle.clr2;
    //     ctx.arc(ox, oy, obstacle.rad, Math.PI+angle, (2*Math.PI) +angle);
    //     ctx.stroke();

    // }

    function draw(){

        ctx.clearRect(0 , 0, canvas.width, canvas.height);
        drawBall();
        o[i].drawObs(o[i].a*Math.PI/180);
        
        if(o.length>1){
            o[i+1].drawObs(o[i+1].a*Math.PI/180);
        }
        //drawObstacle(obstacle.x, obstacle.y, a*Math.PI/180);
        //drawObstacle(obstacle.x, obstacle.y - 350, a*Math.PI/180);
        
    }

    function ballUpdate(){

        ball.vel += gravity;
        ball.y += ball.vel;
        
    }

    // function obstacleUpdate(){

    //     a += 2;  
    //     obstacle.y+=1.5;  
    //     if(obstacle.y>=575){
    //         obstacle.y-=350;
    //     }

    // }

    function ballJump(){

        ball.vel = -7;
        
    }

    function colorCheck(){
            
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
                }
            }

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
        if(ball.y>500 || ball.y<0){
            flag=true;
        }

        if (flag == true){
            scores.push(score);
            best = Math.max(...scores);
            if(best>window.localStorage.getItem('best')){
            window.localStorage.setItem('best', JSON.stringify(best));
            }
        }
    }



    /*function colorCheck(){

        if (((ball.y - obstacle.y)<90) && (ball.y - obstacle.y)>60){
            if (a%360>90 && a%360<270){
                if (ball.clr == 'black'){
                    flag = true;
                }
            }
            else{
                if(ball.clr == 'white'){
                    flag = true;
                }
            }
            
        }

        if ((ball.y - obstacle.y)>(-90) && (ball.y - obstacle.y)<(-60)){
            if (a%360>90 && a%360<270){
                if (ball.clr == 'white'){
                    flag = true;
                }
            }
            else{
                if(ball.clr == 'black'){
                    flag = true;
                }
            }
        }

        
    }
    */

    function drawText(){
        
        ctx.strokeStyle = '#007eaf';
        ctx.textAlign = 'left';
        ctx.lineWidth = 1;
        ctx.font = '20px sans-serif';
        ctx.strokeText('SCORE',5,25);
        ctx.strokeText(score,5,50);

        ctx.strokeText('BEST', 5, 75);
        //ctx.strokeText(window.localStorage.getItem('best'), 5, 100);
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
        }
    }

    function update(){

        if (flag==false){
            window.requestAnimationFrame(update);
        }

        ballUpdate();
        //obstacleUpdate();
        o[i].obsUpdate();

        if(o.length>1){
            o[i+1].obsUpdate();
        }
        if(o[i].y>250){
            o.push(new Obstacle(canvas.width/2, -65));
        }

        if(o[i].y>565){
            i++;
            score+=10;
            console.log(score);
            
        }

        
        
        draw();
        drawText();
        colorCheck();

        //console.log(obstacle.y);

        canvas.addEventListener('click', ballJump);

    }

    //canvas.addEventListener('click', ballJump);

}