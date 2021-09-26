
 var images	= ["f1.png","f2.png","f3.png"];
var selected = ["-1","-1","-1"];		
			
var childImg = ["dan.png", "gina.png", "victor.png"];

var AVATAR_GAME_COMPLETED_CONTENT_MESSAGE 	= "Bravo! Ai rezolvat exercițiul!";

var AVATAR_GAME_NOT_COMPLETED_TITLE_MESSAGE = "";
var AVATAR_GAME_NOT_COMPLETED_CONTENT_MESSAGE = "Mai încearcă!";

var AVATAR_HELP_CONTENT_MESSAGE = "Stabilește corespondența anii și evenimentele de mai jos.";

var counter = 0;

var wrongChoicesArray = [];
var correctChoicesArray = [];
var choisesArray		= [];
var auxImg = "frac.png";


var textContent1 = [  "476", "1492", "1453", "1640", "1789"] ;
var textContent2 = [" Căderea Imperiului Roman de Apus"," Descoperirea Americii", " Căderea Constantinopolului", " Revoluția burgheză engleză",  "Revoluția franceză" ];
var wrongAnswers = [];

var randomTextContent1 = textContent1.slice();

shuffle(randomTextContent1);



$(document).ready(function () 
{
	showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, "");
	$('#start-image').click(function()
	{
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

 	$("#help-img").click(function()
	{
		if ($("#game-content-div").is(":visible")) {
			displayTooltip();
		}
		showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, ""); 
 	});
	 	//$('body').on('click', '#next-image', finalizeGame);
		$('#next-image').on('click',finalizeGame);

	$("#unmute-img").click(handleClickMuteUnmuteEvent);


 });


function addCssClassToWrongChoices()
{
	for(var i=0; i < textContent1.length; i++)
	{
		if($.inArray(i, wrongChoicesArray) != -1)
		{
			$("#cell1" + i).addClass("wrong-answer");
		}
	}
}

function addCssClassToCorrectChoices()
{
	for(var i=0; i < textContent1.length; i++)
	{
		if($.inArray(i, correctChoicesArray) != -1)
		{
			$("#cell1" + i).addClass("correct-answer");
		}
	}
}

function initialize() 
{

	for(i=0; i<textContent1.length; i++){

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

		$('<div></div>')
		.attr("id","sentence" + i)
		.addClass("sentence")
		.appendTo("#text-div1");


		$('<div></div>')
		.attr("id", "cell" + 1 + i)
		.addClass("droppable-cell")
		.appendTo('#sentence'+ i)
		.droppable({
				accept: '.ui-draggable',
			    hoverClass: 'hovered',
			    over: addClassOver,
			    out: removeClassOver,
			    drop: handleWordDrop
		});

		$('<div>' + textContent2[i] + '</div>')
		.attr("id", "text" + 1 + i)
		.addClass("droppable-sentence")
		.appendTo('#sentence'+ i);
	
	}



/*
	for(var i = 0; i < images.length ; i++) 
	{
		
		$('<div><img src="images/'+images[i]+'"></div>')
			.attr('id', 'draggable-image' + i)
			.addClass("fraction")
			.appendTo('#fraction'+ (i + 1));

		$('<div>=</div>')
			.addClass("equal")
			.appendTo('#fraction'+ (i + 1));
		
		$('<div><img src="images/'+auxImg+'"></div>')
			.addClass("fraction-sign")
			.appendTo('#fraction'+ (i + 1));
	

		$('<div><img src="images/'+childImg[i]+'"></div>')
			.addClass("child")
			.appendTo('#fraction'+ (i + 1));
	


	}
	for(i=0; i<images.length*2; i++){
	$('<div><input type="text" id="input' + i + '" class="cell answers" maxlength="3"></div>')
			.attr('id', 'input-text' + i)
			.addClass("input-box")
			.appendTo('#fraction' + (Math.floor(i/2) + 1));
			}*/
}


function handleWordDrop(event, ui) 
{
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

	if (draggWordIndex == droppWordIndex) 
	{
	  
	    correctChoicesArray.push(parseInt(droppWordIndex));
	
	}
	else
		wrongChoicesArray.push(parseInt(droppWordIndex));
	   		 choisesArray.push(draggedWord);
	    	ui.draggable.removeClass("over");

	
}


function addClassOver(event, ui) 
{
	ui.draggable.addClass("over");
}

function removeClassOver(event, ui) 
{
	ui.draggable.removeClass("over");
}



function restartGame()
{
	
	$("#text-div0").empty();
 	$("#text-div1").empty();
	shuffle(randomTextContent1);
	wrongChoicesArray = [];
	correctChoicesArray = [];
	choisesArray		= [];
	showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, ""); 
    initialize();
}



function displayTooltip () 
{
	$("#start-game-div").show();
	$("#start-image").hide();
	$("#avatar-content-div").addClass('overlay');
	$("#game-content-div").addClass('overlaid');
}

function finalizeGame()
{

		if ( (wrongChoicesArray.length == 0 && correctChoicesArray.length == 0) || (choisesArray.length < randomTextContent1.length) )
			showAvatarGameNotCompleted("", AVATAR_GAME_NOT_COMPLETED_CONTENT_MESSAGE + " Nu ai rezolvat exercițiul!", "");
	else{	
	$('#next-image').hide();

	for(i=0; i<images.length*2; i++)
	$("#input" + i).css("background-color", "lightgreen");
	addCssClassToCorrectChoices();
	if(wrongChoicesArray.length == 0){
		showGameCompletedCustomMessage(AVATAR_GAME_COMPLETED_CONTENT_MESSAGE,1);

	}
    else{
		addCssClassToWrongChoices();
		showAvatarGameNotCompleted("", AVATAR_GAME_NOT_COMPLETED_CONTENT_MESSAGE, "");
	}
}

}