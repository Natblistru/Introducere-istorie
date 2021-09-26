var counter = 0;
var draggableWordsArray1 = [
 							"Domesticirea animalelor","Invenția scrisului",
 							"Invenția tiparului", 
 							
 							"Descoperirea Americii","Revoluția industrială",
 							];

var draggableWordsArray2 = [ 
 							"Invenția scrisului","Domesticirea animalelor",
 							
 							"Descoperirea Americii","Invenția tiparului",
 							"Revoluția industrială",
 							];

var droppableWordsArray = ["    ", "    ", "	", "	", "	"];

var AVATAR_HELP_TITLE_MESSAGE = "Ajutor";
var AVATAR_HELP_CONTENT_MESSAGE = "Așază pe axa timpului, casetele de mai jos.";

var AVATAR_GAME_COMPLETED_TITLE_MESSAGE = "BRAVO!";
var AVATAR_GAME_COMPLETED_CONTENT_MESSAGE = "BRAVO! Acestea sunt pozițiile corecte pe axa timpului.";

var AVATAR_GAME_NOT_COMPLETED_TITLE_MESSAGE = "Mai încearcă!";
var AVATAR_GAME_NOT_COMPLETED_CONTENT_MESSAGE = "Mai încearcă! Casetele marcate cu roșu nu sunt la locul lor pe axa timpului.";

var wrongChoicesArray = [];

var randomDraggableWordsArray1 = draggableWordsArray1.slice();

shuffle(randomDraggableWordsArray1);


$(document).ready(function() 
{	
  	appendAudio(["success","error"]); 
  	$("#game-content-div").hide();
	showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, ""); 
	
	$('#start-image').click(function(){
	    populateWithData();
		handleCloseAvatarBtnClickEvent();
		
		$("#start-game-div").hide();
		
		$("#game-content-div").show();

		$('body').on('click', '#try-again', restartGame);
		
 	});
   
	$("#help-img").click(function()
	{
		showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, ""); 
 	});
 	
	$("#unmute-img").click(handleClickMuteUnmuteEvent);
});



function restartGame()
{
	$("#draggable-words-div").empty();
	$("#droppable-words-div").empty();
    $("#res").fadeOut( 2000 );
	//from main.js
	showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, ""); 
//shuffle(randomDraggableWordsArray1);
	counter = 0;
	wrongChoicesArray = [];
	populateWithData();
}

function addCssClassToWrongChoices()
{
	for(var i=0; i < droppableWordsArray.length; i++)
	{
		if($.inArray(i, wrongChoicesArray) != -1)
		{
			$("#droppable-word" + i).addClass("wrong-choice");
		}
	}
}

function populateWithData() 
{
	
	for(var i = 0; i < draggableWordsArray1.length ; i++) {

		var draggableWordIndex = draggableWordsArray1.indexOf(draggableWordsArray2[i]);
       if (draggableWordIndex == -1) draggableWordIndex=1;
		
		$('<div>' + draggableWordsArray2[i] + '</div>')
			.attr('id', 'draggable-word' + draggableWordIndex)
			.addClass("cell posbottom"+i+' draggable-cell' )
			.appendTo('#draggable-words-div')
			.draggable({
			    stack: '#droppable-words-div div',
			    revert: true,
			    start:  function(event, ui) { startDrag(ui) }, // from main.js
			    drag: function(event, ui) { drag(ui) } // from main.js
		});
        

		var wrongChoiceClass = ($.inArray(i, wrongChoicesArray) == -1) ? "" : " wrong-choice";

		$('<div>' + droppableWordsArray[i] + '</div>')
			.attr('id', 'droppable-word' + i)
			.addClass("cell droppable-cell" + wrongChoiceClass)
			.appendTo('#droppable-words-div')
			.droppable({
				accept: '#draggable-words-div div',
			    hoverClass: 'hovered',
			    over: addClassOver,
			    out: removeClassOver,
			    drop: handleWordDrop
		});
	}
}

function handleWordDrop(event, ui) 
{
	var droppWordIndex = $(this).attr('id').replace("droppable-word", "");
	var draggWordIndex = ui.draggable.attr('id').replace("draggable-word", "");

	$(this).droppable('disable');

    var draggedWord = ui.draggable.html();
    // ui.draggable.remove();

    $(this).append( "<div class='dragged-word'>" + draggedWord +"</div>").addClass('animated swing');;

    counter++;

	if (droppWordIndex != draggWordIndex) 
	{
	    wrongChoicesArray.push(parseInt(droppWordIndex));
		// ui.draggable.removeClass("over");
	}

	//if all the words has been associated
	if(counter == draggableWordsArray1.length) 
	{
		if(wrongChoicesArray.length == 0)
		{
			//from main.js
			showGameCompletedCustomMessage(AVATAR_GAME_COMPLETED_CONTENT_MESSAGE);
			 $(".resp").show();
			 var cells = document.getElementsByClassName('cell droppable-cell');
			 for(i=0; i<cells.length; i++){
				$(cells[i]).css("border", "2px solid green");
				// console.log(cells[i]);
			}
			playAudio("success","play");
			$("#res").fadeIn( 2000 );
		}
		else
		{
			//from main.js
			showAvatarGameNotCompleted("", AVATAR_GAME_NOT_COMPLETED_CONTENT_MESSAGE,"");
			var cells = document.getElementsByClassName('cell droppable-cell');
			for(i=0; i<cells.length; i++)
				$(cells[i]).css("border", "2px solid green");
			addCssClassToWrongChoices();
			playAudio("error","play");
		}
	}
}

function addClassOver(event, ui) 
{
	ui.draggable.addClass("over");
}

function removeClassOver(event, ui) 
{
	ui.draggable.removeClass("over");
}
