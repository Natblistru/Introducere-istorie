var AVATAR_HELP_TITLE_MESSAGE = "Instrucțiuni";
var AVATAR_HELP_CONTENT_MESSAGE = "Ordonează evenimentele ce marchează cele 2 perioade ale epocii moderne pe axa timpului. Așază-le pe poziția corectă, trăgând etichetele în locurile potrivite. Atenție! Ai doar 3 mișcări pentru a le ordona corect. ";
var AVATAR_GAME_NOT_COMPLETED_CONTENT = "Evenimentele nu sunt ordonate corect. Atenție! Ai avut 3 mișcări pentru a le ordona corect.";
var AVATAR_GAME_COMPLETED_CONTENT = "Excelent! Dacă vrei să continui apasă butonul \„Înainte\”."
var TEXT_GAME = "Ordonează evenimentele ce marchează cele 2 perioade ale epocii moderne pe axa timpului. Așază-le pe poziția corectă, trăgând etichetele în locurile potrivite. Atenție! Ai doar 3 mișcări pentru a le ordona corect. ";


var nrMove = 0;
var nrMaxMove = 3;
var currentChain = 0;
var draggableItems = [
	 ["Revoluția franceză", "Primul război mondial","Descoperirea Americii"],
	 ["Revoluția burgheză engleză","Primul război mondial","Căderea Constantinopolului"],
	 ["Primul război mondial", "Perioada de tranziție","Revoluția burgheză engleză"]];
var correctOrder = [
	 ["Descoperirea Americii", "Revoluția franceză", "Primul război mondial"],
	 ["Căderea Constantinopolului", "Revoluția burgheză engleză", "Primul război mondial"],
	 [ "Perioada de tranziție","Revoluția burgheză engleză","Primul război mondial"]];

$(document).ready(function () {
	appendAudio(['success_word','wrong_word']);

	$("#help-img").click(function()	{
		showAvatarHelp(AVATAR_HELP_TITLE_MESSAGE, TEXT_GAME, ""); 
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
	showAvatarHelp(AVATAR_HELP_TITLE_MESSAGE, TEXT_GAME, ""); 
});

function initializeGame(){
	 nrMove = 0;
	 var old_left;var old_top;
	 $('#draggableBlocks').html( '' );
	 for ( var i=1; i<=draggableItems[currentChain].length; i++ ) {
        $('<div>' + draggableItems[currentChain][i-1] + '</div>')
        	.data( 'content', draggableItems[currentChain][i-1])
        	.attr( 'id', 'target-'+ i )
        	.attr('class','ecosistem b'+i+'-'+draggableItems[currentChain].length+' ecosistem'+currentChain)
        	.appendTo( '#draggableBlocks' ).draggable( {
	            containment: '#content',
	            stack: '#draggableBlocks div',
	            cursor: 'move',
	            // revert: true,
	            revert: function(event, ui){	            	
		             $(this).data("uiDraggable").originalPosition = {
		             	top: old_top,
		                left : old_left
		            };		            
		            // return boolean
		            return true;
		        },
	            start: function(event, ui){
	            	old_left = parseInt($("." + $(this).attr("class").split(" ")[1]).css("left").slice(0, -2) );
	            	old_top = parseInt($("." + $(this).attr("class").split(" ")[1]).css("top").slice(0, -2) );	            
	            	$("#targetArea div").removeClass("incorrect");
	            	startDrag(ui);	                
	          	},
	          	drag: function(event, ui) {drag(ui)}
        	});

        $('#target-'+ i).droppable( {
            accept: '#draggableBlocks div',
            hoverClass: 'hovered',
            drop: handleDrop
        });
    }
}

function handleDrop( event, ui ) {
	var ok = true;
    var dragText = ui.draggable[0].innerText;
    var dropText = event.target.innerText;
    $("#"+ui.draggable[0].id).html(dropText);
    // $("#"+ui.draggable[0].id).draggable('option','revert',true);
    $("#"+event.target.id).html(dragText);
    nrMove++;
    for ( var i=1; i<=draggableItems[currentChain].length; i++ ) {
    	if($('#target-'+i).text() != correctOrder[currentChain][i-1]){
    		ok = false;
    	}
    }
    if(ok){
    	
		//$("#game").hide();
		currentChain++;
		$('.ecosistem').draggable({ disabled: true }); 
		if(currentChain == draggableItems.length){
			// $("#finish").show();
			playAudio('success_word','play');
			showGameCompletedCustomMessage("Bravo! Ai ordonat corect evenimentele istorice pe axa timpului." ,1);
		
		}else{
			
			playAudio('success_word','play');
			showGameCompletedCustomMessage(AVATAR_GAME_COMPLETED_CONTENT,1);
			$("#next-chain").show();
		}
    } else if(nrMove == nrMaxMove){
    	$('.ecosistem').draggable({ disabled: true });
    	playAudio('wrong_word','play');
		showGameCompletedCustomMessage(AVATAR_GAME_NOT_COMPLETED_CONTENT,0);
    }
}

function getNextChain(){
	    handleCloseAvatarBtnClickEvent();
		$("#next-chain").hide();
		initializeGame();
		$("#game").show();
}

function restartGame(){
	handleCloseAvatarBtnClickEvent();
	currentChain = 0;
	initializeGame();
	$("#next-chain").hide();
	showAvatarHelp(AVATAR_HELP_TITLE_MESSAGE, TEXT_GAME, "");
}

function getNewWord(){
	
}




