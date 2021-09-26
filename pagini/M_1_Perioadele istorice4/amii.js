// correctAnswer - the index corresponding the correct answer from the answers array. Starts from 0 - the first element.
var AVATAR_HELP_TITLE_MESSAGE = "";
var AVATAR_HELP_CONTENT_MESSAGE = "Trage cuvintele pe una din cele cinci table. Toate cuvintele dintr-o tablă trebuie să aparțină aceleași perioade istorice!";
var AVATAR_GAME_NOT_COMPLETED_CONTENT = "Trage cuvintele pe una din cele cinci table. Toate cuvintele dintr-o tablă trebuie să aparțină aceleași perioade istorice!"
//var AVATAR_GAME_COMPLETED_CONTENT = "Ai ales corect toate răspunsurile!";
var AVATAR_GAME_NO_ANSWER_SELECTED = "Nu ai aranjat toate cuvintele. Continuă sau reia jocul de la început apăsând butonul \„Repetă activitatea\”";

var correct = 0;

var slides = 
	[
	    {question: 'Grupează cuvintele următoare în perioade istorice.',
        	 answers:["primele state" ,"," ,//1
			 "invazii barbare", ",", //2
			 "domesticirea animalelor", "," ,//3
			 "inventarea scrisului" ,",",//6
			 "revoluția industrială" ,",", //7
			 "Umanism" ,",", //8
			 "apariția burgheziei", "," ,//10
			 "prima republică" ,",",//12
			 "dobândirea focului" ,",",//13
			 "cruciade" , "," ,//14
			 "Renașterea" ,"," ,//15
			 "formarea statelor naționale",",", //16
			 "invenția tiparului" ,"," ,//18
			 "drepturile omului",",", //20
			 "reforma protestantă"],//21
        	 correctAnswer: ["checked_mobilier" ,"," ,//1
			 "checked_meserii", ",", //2
			 "checked_stari_sufletesti", "," , //3
			 "checked_mobilier" ,",",//6
			 "checked_arte" ,",", //7
			 "checked_relief" ,",", //8
			 "checked_relief", "," ,//10
			 "checked_mobilier" ,",",//12
			 "checked_stari_sufletesti" ,",",//13
			 "checked_meserii" ,",", //14
			 "checked_relief" ,"," ,//15
			 "checked_arte" ,",",//16
			 "checked_meserii" ,"," ,//18
			 "checked_arte" ,",",//20
			 "checked_relief" ]}//21
  		];

var lastAnswerClickedId = ""
var correctVariableOfLastAnswer = -1;
var slideIndex = 1;

var correctAlternative = '';
var correct = 0;

$(document).ready(function () 
{
    setupQuizGame(AVATAR_HELP_TITLE_MESSAGE,AVATAR_HELP_CONTENT_MESSAGE);
    appendAudio(["success","error","slide"]); 
});

function initializeGame(){
	initializeCarousel();
	//$('body').on('click', '.try-again', restartGame);
    ClickAnswer();
	$("#game-content-div").show();
	$("#verifica").click(function(){
         verifica();
	});
}

function ClickAnswer() { 
	$('.answer').on('click', function() {
    		
    		$(lastAnswerClickedId).removeClass("answer-clicked");
			$(this).children(".checkbox").toggleClass("checked");
	  		$(this).addClass("answer-clicked");
	  		lastAnswerClickedId = "#" + this.id;
			correctVariableOfLastAnswer = $(this).data("correct");// 1(corect), 0(incorect)
			correctAlternative =  $(this).data("alternative");                                                   
			$(".answer").removeClass('incorrect');
			$(".answer").children("i").removeClass("fa-frown-o").addClass("fa-check");
	
		});
}

function restartGame()
{
	if( $("#start-game-div").is(":visible")){
		return;
	}
	if ($(".restart")) {
		$(".restart").remove();
	}
	$("#next-slide-image").show();
	$("#carousel-inner-id > .item").remove();
	lastAnswerClickedId = ""
    correctVariableOfLastAnswer = -1;
    slideIndex = 1;
    //from main.js
	showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, ""); 
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
		})				
}


function goToNextSlide() {

	if(lastAnswerClickedId == "") {	
		showAvatarGameNotCompleted("", AVATAR_GAME_NO_ANSWER_SELECTED, ""); 
	} 
	else if(slideIndex == slides.length) //game ended
	{
        proc_correct = parseInt(correct * 100 / slides.length);
		handleCloseAvatarBtnClickEvent();
		showAvatarGameCompleted("", getFeedbackByCorrectAns(proc_correct), ""); 
		showGameCompletedCustomMessage("Ai corectat "+correct+" cuvinte din "+ slides.length+". "+ getFeedbackByCorrectAns(proc_correct));
		RestartCompletedGame();
	} 
	else
	{
	 	if((correctVariableOfLastAnswer > 0) && (slideIndex < slides.length)) { 
           //alert(correctAlternative + $("#canswer-slide-"+(slideIndex-1)).val());
           if (correctAlternative == $("#canswer-slide-"+(slideIndex-1)).val()){
           		correct++;
       		}
	   	}
        $('#myCarousel').carousel('next');
		lastAnswerClickedId = "";
		slideIndex++;
		handleCloseAvatarBtnClickEvent();	
	}	
}

function verifica(){
	var n = $( ".draggable" ).length -  $( ".point" ).length;
	
	if ($( ".draggable" ).length -  $( ".point" ).length  ==  $( ".draggable.checked_stari_sufletesti" ).length + $( ".draggable.checked_mobilier" ).length +$( ".draggable.checked_meserii" ).length + $( ".draggable.checked_arte" ).length +$( ".draggable.checked_relief" ).length  ) {
	var k = 0;
	var c = 0;
	$( ".draggable" ).each(function( index ) {
		if (!$(this).hasClass("point")) {
        	if ($(this).hasClass($(this).data('correct'))){
            	c++;
            }          
            else {
            	//incorrect         
            	$("."+$(this).attr("id")).addClass("incorrect");
            	k++;
            }
        }
      })
    
    if  (k == 0 ) {
    	showGameCompletedCustomMessage("Un răspuns de nota 10! Ai grupat corect toate cuvintele în câmpuri lexicale! BRAVO!",1);
        return
    }
    else {
    	showGameCompletedCustomMessage("Ai poziționat corect "+c+" cuvinte din "+n+" cuvinte! Trebuie să fii mai atent. Analizează fiecare cuvânt în parte și observă unde ai greșit. Cuvintele trase pe tabla greșită sunt marcate cu roșu.",0);
    }

    }
    else {
        	showGameCompletedCustomMessage(AVATAR_GAME_NO_ANSWER_SELECTED,0);
            return
        }
}

function initializeCarousel() 
{

	for(var i = 0; i < slides.length; i++) {
		var slideDivId = '#slide-div-' + i;
		$('<div class="row" style="width: 930px;height:500px ;margin-left: 45px; margin-top: 122px; z-index:1"></div>')
			.attr('id', 'slide-div-' + i)
			.addClass("item")
			.appendTo("#carousel-inner-id")
	
		$('<div></div>')
			.attr('id', 'answers-div-' + i)
			.addClass("answers")
			.appendTo(slideDivId)
		
		var answersDivId = '#answers-div-' + i;
		for(var j = 0; j < slides[i].answers.length; j++) 
		{
			var correct = slides[i].correctAnswer[j]; //(j == slides[i].correctAnswer) ? 1 : 0;
			var answerId= '#answer-' + j + '-slide-' + i;
			
			$('<div></div>')
			.attr('id', 'answer-' + j + '-slide-' + i)
			.attr('data-correct', correct)
			.attr('data-alternative', slides[i].r)
			.addClass("answer hvr-glow draggable")
			.append(slides[i].answers[j])
			.appendTo(answersDivId)
		
           if ((slides[i].answers[j] == ".") || (slides[i].answers[j] == ","))  {
           	$('#answer-' + j + '-slide-' + i).addClass("point");	
           }else {
           	 $('#answer-' + j + '-slide-' + i).draggable({
           	 	 revert: true,
           	 	 start: function(event, ui) {
			        ui.helper.data('dropped', false);
			    },
			    stop: function(event, ui)
			    {
			        //alert('stop: dropped=' + ui.helper.data('dropped'));
			        // Check value of ui.helper.data('dropped') and handle accordingly...
			    }
			});
           }

           $('<div id="stari_sufletesti"></div>').appendTo(answersDivId);
           $('<div id="meserii"></div>').appendTo(answersDivId) ; 
           $('<div id="arte"></div>').appendTo(answersDivId);
           $('<div id="relief"></div>').appendTo(answersDivId) ; 
           $('<div id="mobilier"></div>').appendTo(answersDivId);

			// $('<i></i>')
			// .attr('id', 'check-div-' + i)
			// .addClass("fa fa-check pull-left")
			// .appendTo(answerId)
		}
		
		$('<div id="header_stari_sufletesti">Preistoria</div>').appendTo(answersDivId)
		$('<div id="header_mobilier">Antichitate</div>').appendTo(answersDivId)
		$('<div id="header_meserii">Evul Mediu</div>').appendTo(answersDivId)
		$('<div id="header_relief">Tranziția</div>').appendTo(answersDivId)
		$('<div id="header_arte">Epoca Modernă</div>').appendTo(answersDivId)
	}
	 $("#stari_sufletesti").droppable({
                accept: '.draggable',
                drop: function (event, ui) {
                        playAudio("slide","play");
                        ui.helper.data('dropped', true);
                        $("#stari_sufletesti").html($("#stari_sufletesti").html() + "<div class='dragged "+$(ui.helper).attr('id')+"'>"+$(ui.helper).html()+"</p>");
                        $(ui.helper).addClass("checked_stari_sufletesti");
                        $(ui.helper).draggable( 'disable' );

                },
                over: function (event, ui) {},
                out: function (event, ui) { }
        });
	 $("#meserii").droppable({
	 	        accept: '.draggable',
                drop: function (event, ui) {
                	    playAudio("slide","play");
                        $("#info").html("dropped!");
                         ui.helper.data('dropped', true);
                         $("#meserii").html($("#meserii").html() + "<div class='dragged "+$(ui.helper).attr('id')+"'>"+$(ui.helper).html()+"</p>");
                        $(ui.helper).addClass("checked_meserii");
                        $(ui.helper).draggable( 'disable' );

                },
                over: function (event, ui) {},
                out: function (event, ui) { }
        }); 
	 $("#arte").droppable({
	 	        accept: '.draggable',
                drop: function (event, ui) {
                	    playAudio("slide","play");
                        $("#info").html("dropped!");
                         ui.helper.data('dropped', true);
                         $("#arte").html($("#arte").html() + "<div class='dragged "+$(ui.helper).attr('id')+"'>"+$(ui.helper).html()+"</p>");
                        $(ui.helper).addClass("checked_arte");
                        $(ui.helper).draggable( 'disable' );

                },
                over: function (event, ui) { },
                out: function (event, ui) {}
        }); 
	 $("#relief").droppable({
	 	        accept: '.draggable',
                drop: function (event, ui) {
                	    playAudio("slide","play");
                        $("#info").html("dropped!");
                         ui.helper.data('dropped', true);
                         $("#relief").html($("#relief").html() + "<div class='dragged "+$(ui.helper).attr('id')+"'>"+$(ui.helper).html()+"</p>");
                        $(ui.helper).addClass("checked_relief");
                        $(ui.helper).draggable( 'disable' );

                },
                over: function (event, ui) {},
                out: function (event, ui) {}
        }); 
	 $("#mobilier").droppable({
	 	        accept: '.draggable',
                drop: function (event, ui) {
                	    playAudio("slide","play");
                        $("#info").html("dropped!");
                         ui.helper.data('dropped', true);
                         $("#mobilier").html($("#mobilier").html() + "<div class='dragged "+$(ui.helper).attr('id')+"'>"+$(ui.helper).html()+"</p>");
                        $(ui.helper).addClass("checked_mobilier");
                        $(ui.helper).draggable( 'disable' );

                },
                over: function (event, ui) { },
                out: function (event, ui) {  }
        }); 
	$('#slide-div-0').addClass("active");
}
