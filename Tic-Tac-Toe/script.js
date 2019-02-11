var finalScores=[0,0,0];
var scores=[0,0];
var activePlayer;
var markers=['X','O'];
var flag=true;
var winScores=[7,56,73,84,146,273,282,448];
var playerName=['Player-1','Player-2'];

function validate(){
    var name1=document.querySelector('.player-1').value;
    var name2=document.querySelector('.player-2').value;
    if((name1.charAt(0)===name1.charAt(0).toLowerCase())||(name2.charAt(0)===name2.charAt(0).toLowerCase())){
        if((name1.charAt(0)===name1.charAt(0).toLowerCase())||(name2.charAt(0)===name2.charAt(0).toLowerCase())){
            document.querySelector('.player-1').style.borderColor='red';
            document.querySelector('.player-2').style.borderColor='red';
        }
        else if(name1.charAt(0)===name1.charAt(0).toLowerCase()){
            document.querySelector('.player-1').style.borderColor='red';
            document.querySelector('.player-2').style.borderColor='#002E62';
        }
        else if(name2.charAt(0)===name2.charAt(0).toLowerCase()){
            document.querySelector('.player-1').style.borderColor='#002E62';
            document.querySelector('.player-2').style.borderColor='red';
        }
        document.querySelector('.error-message').style.display='block';
        document.querySelector('.error-message').textContent='Error !! Player names must start with capital letter';
    }
    else if(name1.length>7||name2.length>7){
        if(name1.length>7&&name2.length>7){
            document.querySelector('.player-1').style.borderColor='red';
            document.querySelector('.player-2').style.borderColor='red';
        }
        else if(name1.length>7){
            document.querySelector('.player-1').style.borderColor='red';
            document.querySelector('.player-2').style.borderColor='#002E62';
        }
        else if(name2.length>7){
            document.querySelector('.player-1').style.borderColor='#002E62';
            document.querySelector('.player-2').style.borderColor='red';
        }
        document.querySelector('.error-message').style.display='block';
        document.querySelector('.error-message').textContent='Error !! Player names cannot be greater than 7 characters';
    }
    else if((name1==name2)&&(name1!="")&&(name2!="")){
        document.querySelector('.player-1').style.borderColor='red';
        document.querySelector('.player-2').style.borderColor='red';
        document.querySelector('.error-message').style.display='block';
        document.querySelector('.error-message').textContent='Error !! Player names cannot be identical';
    }
    else if(name1!=""&&name2!="")
        return true;
    else{
        if(name1==""||name2==""){
            if(name1==name2){
                document.querySelector('.player-1').style.borderColor='red';
                document.querySelector('.player-2').style.borderColor='red';
            }
            if(name1==""){
            document.querySelector('.player-1').style.borderColor='red';
            document.querySelector('.player-2').style.borderColor='#002E62';
            }
            else if(name2=""){
            document.querySelector('.player-1').style.borderColor='#002E62';
            document.querySelector('.player-2').style.borderColor='red';
            }
            document.querySelector('.error-message').style.display='block';
            document.querySelector('.error-message').textContent='Error !! Player names cannot be empty';
        }
    }
}

function start(){
    if(validate()){
        reset();
        finalScores=[0,0,0];
        playerName[0]=document.querySelector(".player-1").value;
        playerName[1]=document.querySelector(".player-2").value;
        document.querySelector('.game-message').textContent=playerName[activePlayer] + "'s turn";
        onclickReset();
    }
}

function onclickReset(){
        document.querySelector('#div-1').innerHTML='';
        document.querySelector('#div-2').innerHTML='';
        document.querySelector('#div-3').innerHTML='';
        document.querySelector('#div-4').innerHTML='';
        document.querySelector('#div-5').innerHTML='';
        document.querySelector('#div-6').innerHTML='';
        document.querySelector('#div-7').innerHTML='';
        document.querySelector('#div-8').innerHTML='';
        document.querySelector('#div-9').innerHTML='';
}

function reset(){
    activePlayer=0;
    scores=[0,0];
    flag=true;
    document.querySelector('.btn').style.display='none';
    document.querySelector('.btn-1').style.display='none';
    document.querySelector('.btn-2').style.display='none';
    document.querySelector('.error-message').style.display='none';
    document.querySelector('.score-board').style.display='none';
    document.querySelector('.game-message').style.fontSize='65px';
    document.querySelector('.game-message').innerHTML=playerName[activePlayer]+"'s turn";
    document.querySelector('.board').style.display='inline';
    document.querySelector('.player-names').style.display='none';
    onclickReset();
}

function winDisplay()
{
    document.querySelector('.btn-1').style.display='block';
    document.querySelector('.game-message').style.fontSize='85px';
    document.querySelector('.board').style.display='none';
    document.querySelector('.btn-2').style.display='inline';
    document.querySelector('.score-board').style.display='inline';
    document.querySelector('.player-1-name').textContent=playerName[0];
    document.querySelector('.player-2-name').textContent=playerName[1];
    document.querySelector('.player-1-score').textContent=finalScores[0];
    document.querySelector('.player-2-score').textContent=finalScores[1];
    document.querySelector('.draw-score').textContent=finalScores[2];
    document.querySelector('.draw-name').textContent='Draw';
    flag=false;
}

function play(clickedDiv,divValue){
    if(flag){
        if(clickedDiv.innerHTML==""){
            clickedDiv.textContent=markers[activePlayer];
            scores[activePlayer]+=divValue;
            for(var i=0;i<winScores.length;i++){
                if((scores[activePlayer] & winScores[i])===winScores[i]){
                    document.querySelector('.game-message').innerHTML=playerName[activePlayer] + " Wins!";
                    finalScores[activePlayer]+=1;
                    winDisplay();
                }
            }
            if(flag){
                toggle();
                document.querySelector('.game-message').innerHTML=playerName[activePlayer] + "'s turn";
            }
            if((scores[0]+scores[1])==511&&flag==true){
                document.querySelector('.game-message').innerHTML="It's a draw!"
                finalScores[2]+=1;
                winDisplay();
            }
        }
    }
}

function toggle(){
    activePlayer===0?activePlayer=1:activePlayer=0;
}

function startNew(){
    document.querySelector('.game-message').innerHTML="Tic-Tac-Toe";
    document.querySelector('.btn').style.display='block';
    document.querySelector('.btn-1').style.display='none';
    document.querySelector('.btn-2').style.display='none';
    document.querySelector('.player-names').style.display='flex';
    document.querySelector('.score-board').style.display='none';
    document.querySelector('#player-1').value='';
    document.querySelector('#player-2').value='';
    document.querySelector('.game-message').style.fontSize='85px';
    document.querySelector('#player-1').style.borderColor='#002E62';
    document.querySelector('#player-2').style.borderColor='#002E62';
    start();
}