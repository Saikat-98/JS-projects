var score,activePlayer,roundScores,flag,previousScore1,previousScore2,finalScore;

function init(){
    scores=[0,0];
    activePlayer=0;
    roundScores=0;
    previousScore1=0;
    previousScore2=0;
    flag=true;
    finalScore=100;
    document.getElementById('score-0').innerHTML='0';
    document.getElementById('current-0').innerHTML='0';
    document.getElementById('score-1').innerHTML='0';
    document.getElementById('current-1').innerHTML='0';
    document.querySelector('#dice-1').style.display='none';
    document.querySelector('#dice-2').style.display='none';
    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
}
init();

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(flag){
        var x=Math.floor(Math.random()*6)+1;
        var y=Math.floor(Math.random()*6)+1;
        document.querySelector('#dice-1').style.display='block';
        document.querySelector('#dice-2').style.display='block';
        document.querySelector('#dice-1').src='dice-'+x+'.png';
        document.querySelector('#dice-2').src='dice-'+y+'.png';
        if((x===6&&previousScore1===6)||(y===6&&previousScore2===6)||(x+y===12)){
            scores[activePlayer]=0;
            document.querySelector('#score-'+activePlayer).innerHTML='0';
            nextPlayer();
        }
        else if(x!==1&&y!==1){
            roundScores+=x;
            roundScores+=y;
            document.querySelector('#current-'+activePlayer).innerHTML=roundScores;
        }
        else
            nextPlayer();
        previousScore1=x;
        previousScore2=y;
    }
});

function nextPlayer(){
    activePlayer===1?activePlayer=0:activePlayer=1;
    roundScores=0;
    previousScore1=0;
    previousScore2=0;
    document.getElementById('current-0').innerHTML='0';
    document.getElementById('current-1').innerHTML='0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('#dice-1').style.display='none';
    document.querySelector('#dice-2').style.display='none';
}

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(flag){
        scores[activePlayer]+=roundScores;
        document.querySelector('#score-'+activePlayer).textContent=scores[activePlayer];
        var input=document.querySelector('.final-score').value;
        if(input)
            finalScore=input;
        if(scores[activePlayer]>=finalScore){
            document.getElementById('name-'+activePlayer).innerHTML='Winner!';
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('#dice-1').style.display='none';
            document.querySelector('#dice-2').style.display='none';
            flag=false;
        }
        else
            nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click',init);
