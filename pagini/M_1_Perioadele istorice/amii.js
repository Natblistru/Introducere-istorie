// correctAnswer - the index corresponding the correct answer from the answers array. Starts from 0 - the first element.
var AVATAR_HELP_TITLE_MESSAGE = "";
var AVATAR_HELP_CONTENT_MESSAGE = "Potrivește cuvintele date în spațiile libere din enunțuri.";
var AVATAR_GAME_NOT_COMPLETED_CONTENT = "Potrivește cuvintele date în spațiile libere din enunțuri.";
var AVATAR_GAME_NO_ANSWER_SELECTED = "Nu ai selectat un răspuns!";
var AVATAR_GAME_PARTIAL_COMPLETED_CONTENT = "Bravo! Ai răspuns corect, poți trece la următoarul enunț.";

var slides = [
        {question: 'Preistoria cuprinde perioada dintre % și % .', 
        	answers: ["3000000îHr","3000îHr"]},
  		{question: 'Antichitatea este cuprinsa intre anii % și % .', 
  			answers: ["3000îHr","476"]},
  		{question: 'Evul Mediu este cuprins intre anii % și % .', 
  			answers: ["476","1492"]},
        {question: 'Perioada de tranzitie intre Evul Mediu și Epoca Moderna este cuprinsa intre anii % și % .', 
        	answers:  ["1492","1640"]},
  		{question: 'Epoca modernă este cuprinsa intre anii % și % .', 
  			answers: ["1640","1914"]},
  		{question: 'Epoca modernă este cuprinsa intre anii % și % .', 
  			answers: ["1640","1914"]} ];

var slideIndex = 1;
var k = 0;

$(document).ready(function () {
    setupDragDropGame(AVATAR_HELP_TITLE_MESSAGE,AVATAR_HELP_CONTENT_MESSAGE);
    $("#next-slide-image").on("click", goToNextSlide);
    appendAudio(["success", "error"]); 
});

function initializeGame(){
	initializeAnswers();
	initializeCarousel();	
	handleCloseAvatarBtnClickEvent();

	$(".answer").draggable({    
        revert: true,        
        start: function(event, ui) {startDrag(ui); handleCloseAvatarBtnClickEvent();}, 
        drag: function(event, ui) {drag(ui)}
    });

    $(".gap").droppable({
        accept: ".answer",    
    	drop: function( event, ui ) { 	
    		if(slideIndex == slides.length){
    			if ( $.inArray($(ui.draggable).attr("id"), slides[slideIndex-1].answers) > -1 ) {
    				if( ($(ui.draggable).attr("id") =="1914") && (parseInt( $(this).attr('id').replace("gap", "")) == 2 ) ){
    					$( this ).css("border-color", "");
		            	$( this ).text($(ui.draggable).text());
		            	$( this ).val($(ui.draggable).text());
		            	$(ui.draggable).hide();           	
		            	k++;
    				}else{
		    			if ( ($.inArray($(ui.draggable).attr("id"), slides[slideIndex-1].answers) > -1) && 
		    				( ($(ui.draggable).attr("id") =="patru") && 
		    					( ( parseInt( $(this).attr('id').replace("gap", "")) == 0 ) || (parseInt( $(this).attr('id').replace("gap", "") ) == 1 ) ) 
		    				) ) {
			            	$( this ).css("border-color", "");
			            	$( this ).text($(ui.draggable).text());
			            	$( this ).val($(ui.draggable).text());
			            	$(ui.draggable).hide();           	
			            	k++;
			            }
			        }
    			}
    		}else{
    			if ( $.inArray($(ui.draggable).attr("id"), slides[slideIndex-1].answers) > -1 ) {
	            	$( this ).css("border-color", "");
	            	$( this ).text($(ui.draggable).text());
	            	$( this ).val($(ui.draggable).text());
	            	$(ui.draggable).hide();           	
	            	k++;
	            }
    		}
                        
            if ( (k == slides[slideIndex-1].answers.length) && (slideIndex < slides.length) ){ 
                showGameCompletedCustomMessage(AVATAR_GAME_PARTIAL_COMPLETED_CONTENT,1);
            }
        }
    });
	$("#game-content-div").show();	
}

function restartGame() {
	if ($("#start-game-div").is(":visible")){
		return;
	}

	if ($(".restart")) {
		$(".restart").remove();
	}
	
	handleCloseAvatarBtnClickEvent();	
	$("#carousel-inner-id > .item").remove(); 
	$("#answers > .answer").remove();     
    slideIndex = 1;
    k = 0;   
    initializeGame();
    $("#next-slide-image").show();
}

function RestartCompletedGame() {
	k = 0;
	$("#carousel-inner-id > .item").remove();
	$("#next-slide-image").hide();

	$('<button type="button"  class="btn btn-primary">REPETĂ</button>')
		.attr('id', "restart")	
		.appendTo("#game-content-div");
		
	$("#restart").click(function() {
		$(this).remove();
		restartGame();
	});			
}

function goToNextSlide() {
	var user_answers = $("#exercise-" + (slideIndex -1) + " .gap");
	
	for(var i = 0; i < user_answers.length; i++){
		if( $(user_answers[i]).text() == ""){
			$(user_answers[i]).css("border-color", "red");
			return;
		}
	}

	if(slideIndex < slides.length){
		$('#myCarousel').carousel('next');		
		slideIndex++;
		k = 0;
		handleCloseAvatarBtnClickEvent();
	}else{
		showGameCompletedCustomMessage("Bravo! Ai potrivit corect toate cuvintele. ", 1);
		RestartCompletedGame();
	}
}

function initializeCarousel() {
	for(var i = 0; i < slides.length; i++) {
		var slideDivId = '#slide-div-' + i;
		$('<div></div>')
			.attr('id', 'slide-div-' + i)
			.addClass("item")
			.addClass( "row")
			.appendTo("#carousel-inner-id");

		var quest = getQuestion(i);
		$('<div></div>')
			.attr('id', 'exercise-' + i)
			.addClass("exercise")
			.addClass('col-md-12')
			.addClass('col-xs-12')
			.append(quest)
			.appendTo(slideDivId);
		$('<div></div>')
			.attr('id', 'answers-div-' + i)
			.addClass("answers")
			.appendTo(slideDivId);	
	}
	$('#slide-div-0').addClass("active");
}

function getQuestion(i){
	var rez = '', k = 0;	
	for (var j = 0; j < slides[i].question.length; j++) {			
		if (slides[i].question[j] == "%") {
			rez +="</span>&nbsp<input class='gap' id='gap"+k+"' type='text' placeholder='' readonly>&nbsp<span>";
			k++;
		} else {
			rez += slides[i].question[j];
		}
	}		
	return rez;
}

function initializeAnswers(){
	for (var i = 0; i < slides.length; i++) {
		for (var j = 0; j < slides[i].answers.length; j++) {
			$('<div></div>')
			.attr('id', slides[i].answers[j])
			.addClass("answer")			
			.append(slides[i].answers[j])
			.appendTo("#answers");
		}
	}

	//suffle answers
	var divs = $("#answers").children();
    while (divs.length) {
        $("#answers").append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
}