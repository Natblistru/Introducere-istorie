// correctAnswer - the index corresponding the correct answer from the answers array. Starts from 0 - the first element.
var AVATAR_HELP_TITLE_MESSAGE 			= "";
var AVATAR_HELP_CONTENT_MESSAGE 		= "Alege varianta corectă de răspuns pentru fiecare dintre situațiile date.";
var AVATAR_GAME_NOT_COMPLETED_CONTENT 	= "Alege varianta corectă de răspuns pentru fiecare dintre situațiile date.";
var AVATAR_GAME_NO_ANSWER_SELECTED 		= "Nu ai selectat un răspuns!";

var slides = 	[
        {question: '<label>Căderea Imperiului Roman de Apus:</label>', answers: ["1492", "476","1453"], correctAnswer: [1]},
        {question: '<label>Descoperirea Americii:</label>', answers:  ["476", "1453", "1492"], correctAnswer: [2]},
  		{question: '<label>Căderea Constantinopolului:</label>', answers: ["1453", "1492", "476",], correctAnswer: [0]} ,
  		{question: '<label>Unirea sub conducerea lui Mihai Viteazul:</label>', answers: ["1640", "1600","1918"], correctAnswer: [1]},
  		{question: '<label>Revoluția burgheză engleză:</label>', answers: ["1789", "1600","1640"], correctAnswer: [2]},
        {question: '<label>Revoluția franceză:</label>', answers:  ["1789", "1600","1640"], correctAnswer: [0]},
        {question: '<label>Răscoala lui Tudor Vladimirescu:</label>', answers:  ["1821", "1600","1640"], correctAnswer: [0]},
        {question: '<label>Inceputul primulul Război Mondial:</label>', answers:  ["1821", "1918","1914"], correctAnswer: [2]},	
        {question: '<label>Marea Unire a românilor:</label>', answers:  ["1821", "1918","1914"], correctAnswer: [1]},		
		];
var lastAnswerClickedId 		= "";
var correctVariableOfLastAnswer = -1;
var slideIndex 					= 1;
var correct 					= 0;

$(document).ready(function () {
    setupQuizGame(AVATAR_HELP_TITLE_MESSAGE,AVATAR_HELP_CONTENT_MESSAGE);    
});

function initializeGame(){
	initializeCarousel();
    ClickAnswer();
	$("#game-content-div").show();
}

function ClickAnswer() {
	$('.answer').on('click', function() {
    	$(lastAnswerClickedId).removeClass("answer-clicked");
		$(this).children(".checkbox").toggleClass("checked");
		$(this).addClass("answer-clicked");
		lastAnswerClickedId = "#" + this.id;
		correctVariableOfLastAnswer = $(this).data("correct");// 1(corect), 0(incorect)
		if (correctVariableOfLastAnswer == 1) {
	          showGameInterCustomMessage("Corect!",1);
		}else {
			 showGameInterCustomMessage("Răspunsul tău nu este corect!",0);
		}
		$(".answer").removeClass('incorrect');
		$(".answer").children("i").removeClass("fa-frown-o").addClass("fa-check");	
	});
}

function restartGame(){
	if ($("#start-game-div").is(":visible")){
		return;
	}
	if ($(".restart")) {
		$(".restart").remove();
	}
	correct = 0;
	handleCloseAvatarBtnClickEvent();
	$("#next-slide-image").show();
	$("#carousel-inner-id > .item").remove();
	lastAnswerClickedId = ""
    correctVariableOfLastAnswer = -1;
    slideIndex = 1;
    
	initializeCarousel();
	ClickAnswer();
}

function RestartCompletedGame() {
	 correct = 0;
	$("#carousel-inner-id > .item").remove();
	$("#next-slide-image").hide();

	$('<button type="button"  class="btn btn-primary">REPETĂ</button>')
		.attr('id', "restart")	
		.appendTo("#game-content-div")
		
	$("#restart").click(function() {
		$(this).remove();
		restartGame();
	});				
}


function goToNextSlide() {
	if(lastAnswerClickedId == "") {	
		showAvatarGameNotCompleted("", AVATAR_GAME_NO_ANSWER_SELECTED, ""); 
	} 
	else if(slideIndex == slides.length) //game ended
	{        
        if((correctVariableOfLastAnswer > 0)) { 
         correct++;
	   	}

        proc_correct = parseInt(correct * 100 / slides.length);
		handleCloseAvatarBtnClickEvent();
		
		if (proc_correct < 90 ) {
			t = 0;
		}
		else {
			t = 1;
		}
		showGameCompletedCustomMessage("Ai răspuns corect la "+correct+" din "+slides.length+" enunțuri. " +getFeedbackByCorrectAns(proc_correct),t);
		RestartCompletedGame();
	} 	else	{
	 	if((correctVariableOfLastAnswer > 0) && (slideIndex < slides.length)) { 
         correct++;
	   	}
        $('#myCarousel').carousel('next');
		lastAnswerClickedId = "";
		slideIndex++;
		handleCloseAvatarBtnClickEvent();	
	}	
}


function initializeCarousel() {
	for(var i = 0; i < slides.length; i++) {
		var slideDivId = '#slide-div-' + i;
		$('<div class="row"></div>')
			.attr('id', 'slide-div-' + i)
			.addClass("item")
			.appendTo("#carousel-inner-id")
		$('<div></div>')
			.attr('id', 'exercise-' + i)
			.addClass("exercise")
			.addClass('col-md-12')
			.addClass('col-xs-12')
			.append(slides[i].question)
			.appendTo(slideDivId)
		$('<div></div>')
			.attr('id', 'answers-div-' + i)
			.addClass("answers")
			.appendTo(slideDivId)
		
		var answersDivId = '#answers-div-' + i;
		for(var j = 0; j < slides[i].answers.length; j++) 
		{
			var correct = (j == slides[i].correctAnswer) ? 1 : 0;
			var answerId= '#answer-' + j + '-slide-' + i;
			
			$('<div></div>')
			.attr('id', 'answer-' + j + '-slide-' + i)
			.attr('data-correct', correct)
			.addClass("answer hvr-glow")
			.append(slides[i].answers[j])
			.appendTo(answersDivId)
			
			$('<i></i>')
			.attr('id', 'check-div-' + i)
			.addClass("fa fa-check pull-left")
			.appendTo(answerId)
		}
	}
	$('#slide-div-0').addClass("active");
}
