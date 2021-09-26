var AVATAR_HELP_CONTENT_MESSAGE = " Completează enunțurile cu anii potriviți ";

var res;
var sign 			= [ "476", "3000îHr", "1492", "1914", "3000000îHr","1640"];
var text 			= [ {"answer" : "Preistoria cuprinde perioada dintre % și % .<br>Antichitatea este cuprinsa intre anii % și % .<br>Evul Mediu este cuprins intre anii % și % .<br>Perioada de tranzitie intre Evul Mediu și Epoca Moderna este cuprinsa intre anii % și % .<br>Epoca modernă este cuprinsa intre anii % și % ."} ];
var correctOrder 	= ["3000000îHr", "3000îHr", "3000îHr", "476", "476", "1492", "1492", "1640","1640","1914" ];
var choicesArray 	= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

$(document).ready(function () {
	appendAudio(['success_word','wrong_word']);

	$("#help-img").click(function()	{
		showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, ""); 
	});

	$("#unmute-img").click(handleClickMuteUnmuteEvent);
	$("#try-again").click(restartGame);

	$('#start-image').click(function(){
		$("#start-game-div").hide();
		$("#next-chain").hide();		
		handleCloseAvatarBtnClickEvent();
		initializeGame();
		$("#game-content-div").show();
	});

	$("#game-content-div").hide();
	showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, ""); 
});

function initializeGame(){
	$("#full-text").empty();
	$("#game-request").text("Potrivește semnele de punctuație în propozițiile de mai jos: ");
	
	for(var i = 0; i < sign.length; i++){
		$('<div>' +  sign[i] + '</div>')
	        .attr( 'id', i + "_" + sign[i] )  
	        .addClass('signs')
	        .appendTo( "#game-request" )
	        .draggable( {
		        containment: '#wrapper-div',	           
		        cursor: 'move',
		        revert: true,
		        start: function(event, ui){
		        	handleCloseAvatarBtnClickEvent();
		        	startDrag(ui);	                
		      	},
		      	drag: function(event, ui) {drag(ui)}	          	
	        });
	}

	var rez = "";
	var k = 0;
	for (var i = 0; i < text.length; i++) {		
		rez = ""; 
		for (var j = 0; j < text[i].answer.length; j++) {
			if (text[i].answer[j] == "%") {
				rez +="</span>&nbsp<input class='gap' id='gap-" + k + "' type='text' placeholder='' readonly >&nbsp<span>";
				k++;
			} else {
				rez += text[i].answer[j];
			}
		}
		$("<span class='exercice'><span class='answer-input'>" + rez + "</span></span>").appendTo("#full-text");		
	}

	$(".gap").droppable({
		accept: '.signs',           
		drop: handleDrop
	});		
}

function handleDrop(event, ui) {
	$(".gap").removeClass("correct-answer wrong-answer");
	var draggedWord	= ui.draggable.attr("id").split("_")[1];  
	var droppable_cell = $(this).attr("id").replace("gap-", "").match(/.{1,1}/g)[0];
	
    $(this).text(draggedWord);
	$(this).val(draggedWord);   
    $(this).droppable("option", "disabled", true );	
    choicesArray[parseInt(droppable_cell)] = draggedWord;  
}

function restartGame(){
	$("#full-text").empty();
	initializeGame();
	choicesArray = [0, 0, 0, 0, 0, 0, 0, 0];
	handleCloseAvatarBtnClickEvent();	
	showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, "");		
}

function checkAnswer(){
	var is_same = (choicesArray.length == correctOrder.length) && choicesArray.every(function(element, index) {
	    return element === correctOrder[index]; 
	});
	addCssClassToChoices();	
	if( is_same) {
		showGameCompletedCustomMessage(getFeedbackByCorrectAns(100),1);				
	}  else{		
		showGameCompletedCustomMessage(getFeedbackByCorrectAns(40),0);
	}		
}

function addCssClassToChoices() {
	for(var i = 0; i < correctOrder.length; i++)	{		
		if( ($.inArray(correctOrder[i], choicesArray) != -1) 
			&& (correctOrder[i] == choicesArray[i]) )	{
			$("#gap-" + i).addClass("correct-answer");			
		}else{
			$("#gap-" + i).addClass("wrong-answer");
		}
	}
}

