var AVATAR_GAME_COMPLETED_CONTENT_MESSAGE 	= "Bravo! Ai rezolvat exercițiul!";
var AVATAR_GAME_NOT_COMPLETED_TITLE_MESSAGE = "";
var AVATAR_GAME_NOT_COMPLETED_CONTENT_MESSAGE = "Mai încearcă!";
var AVATAR_HELP_CONTENT_MESSAGE = "Așază etichetele în locurile potrivite, în enunțurile de mai jos.";

var counter = 0;

var wrongChoicesArray   = [];
var correctChoicesArray = [];
var choisesArray		= [];
var textContent1 = [  "epoca moderna", "monarhie absoluta" , "sistem democratic", "sistemul feudal", "sistemul capitalist", "munca manuala", "munca mecanizata"] ;
var textContent2 = [" Perioda in care progresul s-a manifestat in toate domeniile - ",". Pe plan politic: de la ", "se trece la ", ". Pe plan social: ", " se schimba cu " , ". Pe plan economic:", " se schimba cu ", "." ];
var wrongAnswers = [];

var randomTextContent1 = textContent1.slice();

shuffle(randomTextContent1);

$(document).ready(function () {
	showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, "");

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
		if ($("#game-content-div").is(":visible")) {
			displayTooltip();
		}
		showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, ""); 
 	});
	 	
	$('#next-image').on('click',finalizeGame);
	$("#unmute-img").click(handleClickMuteUnmuteEvent);
 });


function addCssClassToWrongChoices() {
	for(var i=0; i < textContent1.length; i++)	{
		if($.inArray(i, wrongChoicesArray) != -1)	{
			$("#cell1" + i).addClass("wrong-answer");
		}
	}
}

function addCssClassToCorrectChoices() {
	for(var i=0; i < textContent1.length; i++)	{
		if($.inArray(i, correctChoicesArray) != -1)	{
			$("#cell1" + i).addClass("correct-answer");
		}
	}
}

function initialize() {
	for(i=0; i < textContent1.length; i++){
		var draggIndex = textContent1.indexOf(randomTextContent1[i]);

		$('<div>' + randomTextContent1[i] + '</div>')
		.attr("id", "text" + 0 + draggIndex)
		.addClass("draggable-sentence")
		.appendTo('#text-div'+ 0)
		.draggable({
				containment: "#wrapper-div",
			    stack: '#text div',
			    revert: true,
			    start:  function(event, ui) { startDrag(ui) }, // from main.js
			    drag: function(event, ui) { drag(ui) } // from main.js
		});

		$('#text-div1').append(textContent2[i]);

		$('<div></div>')
			.attr("id", "cell" + 1 + i)
			.addClass("droppable-cell")
			.appendTo('#text-div1')
			.droppable({
					accept: '.ui-draggable',
				    hoverClass: 'hovered',
				    over: addClassOver,
				    out: removeClassOver,
				    drop: handleWordDrop
			});
	}

	for(i=textContent1.length; i < textContent2.length; i++){
		$('#text-div1').append(textContent2[i]);
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

    counter++;

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
	shuffle(randomTextContent1);
	wrongChoicesArray   = [];
	correctChoicesArray = [];
	choisesArray		= [];
	showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, ""); 
    initialize();
}

function displayTooltip () {
	$("#start-game-div").show();
	$("#start-image").hide();
	$("#avatar-content-div").addClass('overlay');
	$("#game-content-div").addClass('overlaid');
}

function finalizeGame() {
	if ( (wrongChoicesArray.length == 0 && correctChoicesArray.length == 0) || (choisesArray.length < randomTextContent1.length) )
			showAvatarGameNotCompleted("", AVATAR_GAME_NOT_COMPLETED_CONTENT_MESSAGE + " Nu ai rezolvat exercițiul!", "");
	else{	
		$('#next-image').hide();

		// for(i=0; i<images.length*2; i++)
		// $("#input" + i).css("background-color", "lightgreen");
		addCssClassToCorrectChoices();
		if(wrongChoicesArray.length == 0){
			showGameCompletedCustomMessage(AVATAR_GAME_COMPLETED_CONTENT_MESSAGE,1);	}
	    else{
			addCssClassToWrongChoices();
			showAvatarGameNotCompleted("", AVATAR_GAME_NOT_COMPLETED_CONTENT_MESSAGE, "");
		}
	}
}