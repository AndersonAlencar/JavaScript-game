var timer_id = null; 

function startGame(){

	var url = window.location.search;

	var gameLevel = url.replace("?", "");

	var qtde_baloes = 80;

	var secondsTime = 0;

	switch (gameLevel){

		case '1':
			secondsTime = 120;
			break;

		case '2':
			secondsTime = 60;
			break;

		case '3':
			secondsTime = 30;
			break;
	}	


	document.getElementById('stopwatch').innerHTML = secondsTime;

	creatBalloons(qtde_baloes);

	document.getElementById('whole_balloons').innerHTML = qtde_baloes;

	document.getElementById('burst_balloons').innerHTML = 0;

	timer(secondsTime + 1);

}

function timer(seconds){

	seconds = seconds - 1;
	if(seconds == -1){
		clearTimeout(timer_id);
		gameOver();
		return false;
	}

	document.getElementById('stopwatch').innerHTML = seconds;
	timer_id = setTimeout("timer("+seconds+")",1000);
}

function gameOver(){
	removeEventsBalloons();
	alert('Fim de Jogo, Você não conseguiu estourar todos os balões a tempo');
}

function creatBalloons(qtde_baloes){

	for(var i = 1; i <= qtde_baloes; i++){

		var balloon = document.createElement("img");
		balloon.src = 'imagens/balao_azul_pequeno.png';
		balloon.style.margin = '10px';
		balloon.id = 'b' + i;
		balloon.onclick = function(){ burst(this);}
		document.getElementById('cenario').appendChild(balloon);
	}

}

function burst(e){
	var id_balloon = e.id;

	document.getElementById(id_balloon).setAttribute("onclick","");

	document.getElementById(id_balloon).src = 'imagens/balao_azul_pequeno_estourado.png';  
	punctuation(-1);
}

function punctuation(action){

	var whole_balloons  = document.getElementById('whole_balloons').innerHTML;
	var burst_balloons  = document.getElementById('burst_balloons').innerHTML;

	whole_balloons = parseInt(whole_balloons);
	burst_balloons = parseInt(burst_balloons);

	whole_balloons = whole_balloons + action;
	burst_balloons = burst_balloons - action;

	document.getElementById('whole_balloons').innerHTML = whole_balloons;
	document.getElementById('burst_balloons').innerHTML = burst_balloons;

	game_context(whole_balloons,burst_balloons);

}

function game_context(whole_balloons, burst_balloons){

	if (whole_balloons == 0) {
		alert('Parabéns você conseguiue estourar todos os balões a tempo!! ');
		stop_game();
	}
}

function stop_game(){
	clearTimeout(timer_id);
}


function removeEventsBalloons() {
    var i = 1; 
    
    
    while(document.getElementById('b'+i)) {
        
        document.getElementById('b'+i).onclick = '';
        i++;
    }
}