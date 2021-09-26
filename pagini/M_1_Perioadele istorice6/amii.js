// correctAnswer - the index corresponding the correct answer from the answers array. Starts from 0 - the first element.
var AVATAR_HELP_TITLE_MESSAGE = "";
var AVATAR_HELP_CONTENT_MESSAGE = "Alege, după înțeles noțiunile ce se referă la fiecare perioadă istorică";
var AVATAR_GAME_NOT_COMPLETED_CONTENT = "Răspunsul nu este corect."
//var AVATAR_GAME_COMPLETED_CONTENT = "Ai ales corect toate răspunsurile!";
var AVATAR_GAME_NO_ANSWER_SELECTED = "Nu ai selectat un răspuns!";

var correct = 0;
// Imag. a: soror, sororis; cognatus, cognati; frater, fratris; socrus, socrus; 
// Imag. b: furca, furcae; caseum, casei; panis, panis; vinum, vini; fenestra, fenestrae; porta, portae
// Imag. c: arbor, arboris; prunus, pruni; malus, mali
// Imag. d: tempus, temporis; hora, horae; nox, noctis; autumnus, autumni
// Imag. e: stella, stellae; campus, campi; herba, herbae; sol, solis; mons, montis; flos, floris; caelum, caeli; aqua, aquae
// Imag. f: dare; audire; venire; videre; cantare; laudare; arare
// Imag. g (domeniul animale domestice şi sălbatice): lupus, lupi; gallina, gallinae; bos, bovis; ursus, ursi
// Imag. h (domeniul părţile corpului): humerus, humeri; brachium, brachii; manus, manus; pulpa, pulpae

var slides =
	[
		{
			question: 'Preistoria',
			answers: ['invaziile barbare', 'marile descoperiri geografice', 'primele state', 'unelte de piatră', 'cruciadele', 'apariția burgheziei', 	'prima republică', 'Renașterea', 'capitalism dezvoltat', 'invenția tiparului', 'reforma protestantă', 'revoluție industrială', 'invenția scrisului', 'formarea statelor naționale', 'răspândirea creștinismului', 'revoluția democratică', 'apariția băncilor', 'domesticirea animalelor', 'proclamarea drepturilor omului', 'dobândirea focului'],
			correctAnswer: [3, 17, 19]
		},

		{
			question: 'Antichitatea',
			answers: ['invaziile barbare', 'marile descoperiri geografice', 'primele state', 'unelte de piatră', 'cruciadele', 'apariția burgheziei', 	'prima republică', 'Renașterea', 'capitalism dezvoltat', 'invenția tiparului', 'reforma protestantă', 'revoluție industrială', 'invenția scrisului', 'formarea statelor naționale', 'răspândirea creștinismului', 'revoluția democratică', 'apariția băncilor', 'domesticirea animalelor', 'proclamarea drepturilor omului', 'dobândirea focului'],
			correctAnswer: [2, 6, 12]
		},

		{
			question: 'Evul mediu',
			answers: ['invaziile barbare', 'marile descoperiri geografice', 'primele state', 'unelte de piatră', 'cruciadele', 'apariția burgheziei', 	'prima republică', 'Renașterea', 'capitalism dezvoltat', 'invenția tiparului', 'reforma protestantă', 'revoluție industrială', 'invenția scrisului', 'formarea statelor naționale', 'răspândirea creștinismului', 'revoluția democratică', 'apariția băncilor', 'domesticirea animalelor', 'proclamarea drepturilor omului', 'dobândirea focului'],
			correctAnswer: [0, 4, 9, 14]
		},
		
		{
			question: 'Tranziție de la Evul mediu la Epoca Modernă',
			answers: ['invaziile barbare', 'marile descoperiri geografice', 'primele state', 'unelte de piatră', 'cruciadele', 'apariția burgheziei', 	'prima republică', 'Renașterea', 'capitalism dezvoltat', 'invenția tiparului', 'reforma protestantă', 'revoluție industrială', 'invenția scrisului', 'formarea statelor naționale', 'răspândirea creștinismului', 'revoluția democratică', 'apariția băncilor', 'domesticirea animalelor', 'proclamarea drepturilor omului', 'dobândirea focului'],
			correctAnswer: [1, 5, 7, 10, 16]
		}	,

		{
			question: 'Epoca Modernă',
			answers: ['invaziile barbare', 'marile descoperiri geografice', 'primele state', 'unelte de piatră', 'cruciadele', 'apariția burgheziei', 	'prima republică', 'Renașterea', 'capitalism dezvoltat', 'invenția tiparului', 'reforma protestantă', 'revoluție industrială', 'invenția scrisului', 'formarea statelor naționale', 'răspândirea creștinismului', 'revoluția democratică', 'apariția băncilor', 'domesticirea animalelor', 'proclamarea drepturilor omului', 'dobândirea focului'],
			correctAnswer: [8, 11, 13, 15, 18]
		}			

	];
var lastAnswerClickedId = ""
var correctVariableOfLastAnswer = -1;
var slideIndex = 1;

var correct = 0;
var aa;
$(document).ready(function () {
	setupQuizGame(AVATAR_HELP_TITLE_MESSAGE, AVATAR_HELP_CONTENT_MESSAGE);
	$('#verifica').on('click', function () {
		cc = 1;
		for (var i = 0; i < slides[cindex].answers.length; i++) {

			if ((($("#answer-" + i + "-slide-" + cindex).data("correct") == 1) && (!$("#answer-" + i + "-slide-" + cindex).hasClass("answer-clicked")))
				|| (($("#answer-" + i + "-slide-" + cindex).data("correct") == 0) && ($("#answer-" + i + "-slide-" + cindex).hasClass("answer-clicked")))) {
				cc = 0; i = slides[cindex].answers.length;
			}
		}
		if (cc == 0) {
			showGameInterCustomMessage("Răspunsul tău nu este corect. Mai încearcă.", 0);

		} else {
			showGameInterCustomMessage("Corect!", 1);

		}
	});

});

function initializeGame() {
	initializeCarousel();
	ClickAnswer();
	$("#game-content-div").show();
}

function ClickAnswer() {
	$('.answer').on('click', function () {

		if (!$(this).hasClass("answer-clicked")) {
			$(this).children(".checkbox").toggleClass("checked");
			$(this).addClass("answer-clicked");
			lastAnswerClickedId = "#" + this.id;

			$(".answer").removeClass('incorrect');
			$(".answer").children("i").removeClass("fa-frown-o").addClass("fa-check");
		}
		else {
			$(this).children(".checkbox").toggleClass("checked");
			$(this).removeClass("answer-clicked");
			lastAnswerClickedId = "#" + this.id;

			$(".answer").removeClass('incorrect');
			$(".answer").children("i").removeClass("fa-frown-o").addClass("fa-check");
		}
		cindex = slideIndex - 1;
		correctVariableOfLastAnswer = 1;
		for (var i = 0; i < slides[cindex].answers.length; i++) {

			if ((($("#answer-" + i + "-slide-" + cindex).data("correct") == 1) && (!$("#answer-" + i + "-slide-" + cindex).hasClass("answer-clicked")))
				|| (($("#answer-" + i + "-slide-" + cindex).data("correct") == 0) && ($("#answer-" + i + "-slide-" + cindex).hasClass("answer-clicked")))) {
				correctVariableOfLastAnswer = 0; i = slides[cindex].answers.length;
			}
		}

	});
}

function restartGame() {
	if ($("#start-game-div").is(":visible")) {
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
	aa = [];
	$("#restart").click(function () {
		$(this).remove();
		restartGame();
	})
}

aaa = [];

function goToNextSlide() {
	$("#verif").show();
	if (lastAnswerClickedId == "") {
		showAvatarGameNotCompleted("", AVATAR_GAME_NO_ANSWER_SELECTED, "");
	}
	else if (slideIndex == slides.length) //game ended
	{
		if (correctVariableOfLastAnswer > 0) {
			correct++;
			aa.push(slides[slideIndex - 1]['question']);
		}
		proc_correct = parseInt(correct * 100 / slides.length);
		handleCloseAvatarBtnClickEvent();
		if (proc_correct < 90) {
			t = 0;
		}
		else {
			t = 1;
		}
		if (aa.length == 0) {
			showGameCompletedCustomMessage("Nu ai identificat corect nici o noțiune istorică. Reia exercițiul.", t);
		} else
			if (aa.length == 2) {
				showGameCompletedCustomMessage("Ai identificat corect " + aa[0] + " și " + aa[1] + ".", t);
			} else
				if (aa.length == 1) {
					showGameCompletedCustomMessage("Ai identificat corect doar " + aa[0] + ".", t);
				}
				else {
					showGameCompletedCustomMessage("Bravo! Ai rezolvat corect exercițiul.", t);
				}


		RestartCompletedGame();
		$("#verifica").hide();
	}
	else {
		if ((correctVariableOfLastAnswer > 0) && (slideIndex < slides.length)) {
			correct++;
			aa.push(slides[slideIndex - 1]['question']);
		}

		$('#myCarousel').carousel('next');
		lastAnswerClickedId = "";
		slideIndex++;
		handleCloseAvatarBtnClickEvent();
	}
}


function initializeCarousel() {
	aa = [];
	for (var i = 0; i < slides.length; i++) {
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
		for (var j = 0; j < slides[i].answers.length; j++) {
			var correct = (slides[i].correctAnswer.includes(j)) ? 1 : 0;
			var answerId = '#answer-' + j + '-slide-' + i;

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
