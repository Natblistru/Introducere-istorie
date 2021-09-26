var AVATAR_HELP_TITLE_MESSAGE = "Instrucțiuni";
var AVATAR_HELP_CONTENT_MESSAGE = "Potrivește anii cu perioadele Epocii Moderne - 3 variante -  din desen.";
var AVATAR_GAME_NOT_COMPLETED_CONTENT = "Potrivește anii cu perioadele Epocii Moderne - 3 variante -  din desen.";
var AVATAR_GAME_COMPLETED_CONTENT_MESSAGE = "Bravo! Ai asociat corect fiecare an.";
var k = 0;

$(document).ready(function () {  
    setupDragDropGame(AVATAR_HELP_TITLE_MESSAGE,AVATAR_HELP_CONTENT_MESSAGE); 
});

function initializeGame(){
    appendAudio(["success","error"]);
    
    $(".elem-drag").draggable({    
        revert: true,        
        start: function(event, ui) {startDrag(ui); handleCloseAvatarBtnClickEvent()}, 
        drag: function(event, ui) {drag(ui)}
    });

    $(".targets").droppable({
        accept: ".elem-drag",    
    	drop: function( event, ui ) {
            if ( $(this).attr("class").split(" ")[1] ==  $(ui.draggable).attr("class").split(" ")[1] ) {
            	$( this ).text($(ui.draggable).text());
            	$(ui.draggable).hide();           	
            	k++;
            }
            
            if (k == 9){            	
            	playAudio("success","play");
                showGameCompletedCustomMessage(AVATAR_GAME_COMPLETED_CONTENT_MESSAGE,1);
            }
        }
    });
}

function restartGame(){
    k = 0;
	$(".elem-drag").each(function(){
		$(this).show();
		$(this).removeAttr('style').css("position", "relative");
	});

	$(".targets").each(function(){
		$(this).text("");
	})
	
	showAvatarHelp(AVATAR_HELP_TITLE_MESSAGE,AVATAR_HELP_CONTENT_MESSAGE);
}
// la terminarea jocului, se apeleaza showAvatarGameCompleted(title, mesaj, audio_path)  
// ex: showAvatarGameCompleted("", "Felicitări. Planeta e in sigurantă acum!:)", "");



