var AVATAR_GAME_COMPLETED_CONTENT_MESSAGE 		= "Bravo! Ai rezolvat exercițiul!";
var AVATAR_GAME_NOT_COMPLETED_TITLE_MESSAGE 	= "";
var AVATAR_GAME_NOT_COMPLETED_CONTENT_MESSAGE 	= "Mai încearcă!";
var AVATAR_HELP_CONTENT_MESSAGE 				= "Asociază fiecare eveniment cu data la care a avut loc.";

var wrongChoicesArray   = [];
var correctChoicesArray = [];
var choisesArray		= [];
var textContent1 		= [  "1600", "1821", "1918", "1914"] ;
var textContent2 		= ["Unirea sub conducerea lui Mihai Viteazul","Răscoala lui Tudor Vladimirescu", 
"Marea Unire a românilor", "începe Primul Război Mondial" ];

var randomTextContent1 = [  "1821", "1914","1918", "1600"]; 
//var randomTextContent1 = shuffle(textContent1);

$(document).ready(function () {
	showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, "");
	//shuffle(randomTextContent1);

	addGameButtons();
	$("#mute-img").click(handleClickMuteUnmuteEvent);
	$("#try-again").hide();

	$('#start-image').click(function()	{
		$("#start-game-div").css({"height":"auto"});
    	$("#start-game-div").hide();
		 handleCloseAvatarBtnClickEvent();
    	initialize();
    	$("#game-content-div").show();
    	$("#input0").focus();
 	});

 	$("#try-again").click(function(){
    	handleCloseAvatarBtnClickEvent();
    	$('#next-image').show();
    	restartGame();
 	});

 	$("#help-img").click(function()	{
		showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, ""); 
 	});
	 
	$('#next-image').on('click',finalizeGame);
	$("#unmute-img").click(handleClickMuteUnmuteEvent);
 });

function addCssClassToWrongChoices(){
	for(var i=0; i < textContent1.length; i++)	{
		if($.inArray(i, wrongChoicesArray) != -1)		{
			$("#cell1" + i).addClass("wrong-answer");
		}
	}
}

function addCssClassToCorrectChoices(){
	for(var i=0; i < textContent1.length; i++)	{
		if($.inArray(i, correctChoicesArray) != -1)		{
			$("#cell1" + i).addClass("correct-answer");
		}
	}
}

function initialize() {
	$("#try-again").show();
	for(i=0; i<textContent1.length; i++){
		var draggIndex = textContent1.indexOf(randomTextContent1[i]);

		$('<div>' + randomTextContent1[i] + '</div>')
		.attr("id", "text" + 0 + draggIndex)
		.addClass("draggable-sentence")
		.appendTo('#text-div'+ 0)
		.draggable({
				// containment: "#wrapper-div",
			    stack: '#text div',
			    revert: true,
			    start:  function(event, ui) { startDrag(ui) }, // from main.js
			    drag: function(event, ui) { drag(ui) } // from main.js
		});

		$('<div></div>')
		.attr("id","sentence" + i)
		.addClass("sentence")
		.appendTo("#text-div1");
		if (isMobile()){
	        var tolerance = 'fit'
	    }else{
	        var tolerance = 'intersect';
	    }
		$('<div></div>')
		.attr("id", "cell" + 1 + i)
		.addClass("droppable-cell")
		.appendTo('#sentence'+ i)
		.droppable({
				accept: '.ui-draggable',
				hoverClass: 'hovered',
				tolerance,tolerance,
			    over: addClassOver,
			    out: removeClassOver,
			    drop: handleWordDrop
		});

		$('<div>' + textContent2[i] + '</div>')
		.attr("id", "text" + 1 + i)
		.addClass("droppable-sentence")
		.appendTo('#sentence'+ i);	
	}
}

function handleWordDrop(event, ui) {
	var droppWordIndex = $(this).attr('id').replace("text", "").slice(-1);
	var draggWordIndex = ui.draggable.attr('id').replace("text", "").slice(-1);

	$(this).droppable('disable');

    var draggedWord = ui.draggable.text();
    ui.draggable.draggable('disable');
    ui.draggable.hide();
    ui.draggable.addClass("done");
   
    $(this).prepend( "<div class='dragged-word'>" + draggedWord +"</div>");    
    $(this).parent().css("border","none");

	if (draggWordIndex == droppWordIndex) 	{	  
	    correctChoicesArray.push(parseInt(droppWordIndex));
	}
	else
		wrongChoicesArray.push(parseInt(droppWordIndex));	    
	choisesArray.push(draggedWord);
	ui.draggable.removeClass("over");	
}

function addClassOver(event, ui) {
	ui.draggable.addClass("over");
}

function removeClassOver(event, ui) {
	ui.draggable.removeClass("over");
}

function restartGame(){	
	$("#text-div0").empty();
 	$("#text-div1").empty();
	//shuffle(randomTextContent1);
	wrongChoicesArray 	= [];
	correctChoicesArray = [];
	choisesArray 		= [];
	showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, ""); 
    initialize();
}

function finalizeGame(){
	if ( (wrongChoicesArray.length == 0 && correctChoicesArray.length == 0) || (choisesArray.length < randomTextContent1.length) )
		showAvatarGameNotCompleted("", AVATAR_GAME_NOT_COMPLETED_CONTENT_MESSAGE + " Nu ai rezolvat exercițiul!", "");
	else{	
		$('#next-image').hide();
	
		addCssClassToCorrectChoices();
		if(wrongChoicesArray.length == 0){
			showGameCompletedCustomMessage(AVATAR_GAME_COMPLETED_CONTENT_MESSAGE,1);
		} else{
			addCssClassToWrongChoices();
			showAvatarGameNotCompleted("", AVATAR_GAME_NOT_COMPLETED_CONTENT_MESSAGE, "");
		}
	}
}
function isMobile() {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		return true
	}
	return false;
}