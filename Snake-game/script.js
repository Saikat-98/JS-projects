var timerID;
var timerFlag=true;
document.querySelector('.header').onclick=function(){
    if(timerFlag){
        timerFlag=false;
        document.querySelector('.header').style.animationName="rubberband";
        timerID=setTimeout(function(){
            document.querySelector('.header').style.animationName="";
        },2500);
        if(timerID>=2){
            timerFlag=true;
            clearTimeout(timerID);
        }
        console.log(timerID+" "+timerFlag);
    }
}

document.onkeyup=start;
function start(event){
    if(gameFlag==true&&event.keyCode==32){
        gameFlag=false;
        document.querySelector('.game-message').style.display="none";
        document.querySelector('.game-message').classList.remove('gameover-message');
        document.querySelector('#canvas').style.display="block";
        document.querySelector('.board').style.display="none";
        document.querySelector('.food').style.display="block";
        document.querySelector('.snake').style.display="block";
        if(flag==true){
            id=setInterval(draw,100);
            flag=false;
        }
    }
}
var cvs=document.getElementById("canvas");
var ctx=cvs.getContext("2d");
var snakeWidth=10;
var snakeHeight=10;
var yourScore=0;
var highestScore=0;
var dir="right";
var flag=true;
var gameFlag=true;
function drawSnake(x,y){                //create snake
    ctx.fillStyle="beige";
    ctx.fillRect(x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
    ctx.strokeRect(x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
}
var len=4;
var snake=[];
for(var i=len-1;i>=0;i--){
    snake.push({
        x: i,
        y: 0
    });
}
document.addEventListener("keydown",controlDirection);
function controlDirection(event){
    if(event.keyCode==37&&dir!="right")
        dir="left";
    else if(event.keyCode==38&dir!="down")
        dir="up";
    else if(event.keyCode==39&dir!="left")
        dir="right";
    else if(event.keyCode==40&dir!="up")
        dir="down";
}
var food={                              //create food
    x: Math.floor(Math.random()*(cvs.width/snakeWidth)),
    y: Math.floor(Math.random()*(cvs.height/snakeHeight))
};
function drawFood(x,y){
    ctx.fillStyle="red";
    ctx.fillRect(x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
    ctx.strokeRect(x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
}
function draw(){
    ctx.clearRect(0,0,cvs.width,cvs.height);
    for(var i=0;i<snake.length;i++)
        drawSnake(snake[i].x,snake[i].y);
    drawFood(food.x,food.y);
    var snakeX=snake[0].x;              //snake head
    var snakeY=snake[0].y;
    if(dir=="right")
        snakeX++;
    else if(dir=="left")
        snakeX--;
    else if(dir=="up")
        snakeY--;
    else if(dir=="down")
        snakeY++;
    if(snakeX<-1||snakeY<-1||snakeX>=((cvs.width/snakeWidth)+1)||(snakeY>=(cvs.height/snakeHeight)+1))
        gameOver();                     //game over
    for(var i=1;i<snake.length;i++)
        if(snakeX==snake[i].x&&snakeY==snake[i].y)
            gameOver();                 //coincide game over
    if(snakeX==food.x&&snakeY==food.y){
        food={
                x: Math.floor(Math.random()*(cvs.width/snakeWidth)),
                y: Math.floor(Math.random()*(cvs.height/snakeHeight))
            };
        yourScore++;
        document.querySelector('.your-score').innerHTML=yourScore;
    }
    else
        snake.pop();
    var newHead={                       //new head
        x:snakeX,
        y:snakeY
    };
    snake.unshift(newHead);
}
function gameOver(){
    document.querySelector('.food').style.display="none";
    document.querySelector('.snake').style.display="none";
    document.querySelector('#canvas').style.display="none";
    document.querySelector('.board').style.display="block";
    document.querySelector('.game-message').classList.add('gameover-message');
    if(yourScore>=highestScore){
        highestScore=yourScore;
    }
    document.querySelector('.highest-score').innerHTML=highestScore;
    document.querySelector('.game-message').style.display="block";
    document.querySelector('.btn').style.display="block";
    document.querySelector('.game-message').innerHTML="Game - over!";
    gameFlag=true;
}

function reset(){
    len=4;
    snakeHeight=10;
    snakeWidth=10;
    snake=[];
    for(var i=len-1;i>=0;i--){
        snake.push({
            x: i,
            y: 0
        });
    }
    yourScore=0;
    dir="right";
    document.querySelector('.game-message').classList.remove('gameover-message');
    document.querySelector('.btn').style.display="none";
    document.querySelector('.your-score').innerHTML="0";
    document.querySelector('.game-message').innerHTML="Press 'Space' to begin";
    clearInterval(id);
    flag=true;
    document.onkeydown=start;
}