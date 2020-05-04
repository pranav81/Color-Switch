var canvas = document.querySelector('.canvas1');
var a=1, t=0;

    
var ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 500;

let gravity = 0.5;
let colors = ['black', 'white'];
let flag = false;

var ball = {
    x : canvas.width / 2,
    y : 250,
    rad : 10,
    vel : -7,
    clr : colors[Math.floor(Math.random() * 2)]
};

var obstacle = {
    x : canvas.width / 2,
    y : 100,
    rad : 75,
    clr1 : colors[0],
    clr2 : colors[1]
};
    
    
update();


function drawBall(){
    
    ctx.beginPath();
    ctx.fillStyle = ball.clr;
    ctx.arc(ball.x, ball.y, ball.rad, 0, Math.PI * 2);
    ctx.fill();

}

function drawObstacle(ox, oy, angle=0){
    
    ctx.beginPath();
    ctx.strokeStyle = obstacle.clr1;
    ctx.lineWidth = 15;
    ctx.arc(ox, oy, obstacle.rad, angle, angle + Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = obstacle.clr2;
    ctx.arc(ox, oy, obstacle.rad, Math.PI+angle, (2*Math.PI) +angle);
    ctx.stroke();

}

function draw(){

    ctx.clearRect(0 , 0, canvas.width, canvas.height);
    drawBall();
    drawObstacle(obstacle.x, obstacle.y, a*Math.PI/180);
    drawObstacle(obstacle.x, obstacle.y - 350, a*Math.PI/180);
    
}

function ballUpdate(){

    ball.vel += gravity;
    ball.y += ball.vel;
    
}

function obstacleUpdate(){

    a += 2;  
    obstacle.y+=1.5;  
    if(obstacle.y>=600){
        obstacle.y-=350;
    }

}

function ballJump(){

    ball.vel = -7;
    
}

function update(){

    window.requestAnimationFrame(update);

    ballUpdate();
    obstacleUpdate();
    draw();

    canvas.addEventListener('click', ballJump);

}


