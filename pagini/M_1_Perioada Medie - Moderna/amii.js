// correctAnswer - the index corresponding the correct answer from the answers array. Starts from 0 - the first element.
var AVATAR_HELP_TITLE_MESSAGE = "";
var AVATAR_HELP_CONTENT_MESSAGE = "Trage cuvintele pe una din cele trei table. Toate cuvintele dintr-o tablă trebuie să aparțină aceleiași perioade istorice!";
var AVATAR_GAME_NOT_COMPLETED_CONTENT = "Trage cuvintele pe una din cele trei table. Toate cuvintele dintr-o tablă trebuie să aparțină aceleiași perioade istorice!"
//var AVATAR_GAME_COMPLETED_CONTENT = "Ai ales corect toate răspunsurile!";
var AVATAR_GAME_NO_ANSWER_SELECTED = "Nu ai aranjat toate cuvintele. Continuă sau reia jocul de la început apăsând butonul \„Repetă activitatea\”";

var correct = 0;

var slides = 
	[
	    {question: 'Grupează cuvintele următoare în câmpuri lexicale.',
        	 answers:["Marile descoperiri geografice" ,"," //1
			 ,"apariției burgheziei", ",", //2
			 "invenția tiparului", "," //3
			 ,"cruciadele" ,"," //4
			 ,"Umanismul" ,","//5
			 ,"revoluția industrială" ,",",//6
				"reforma protestantă" ,",", //7
				"formarea statelor nationale", "," ,//8
				"invaziile barbare", "," ,//9
				"proclamarea drepturilor și libertăților" ,",", //10
				"Renașterea" ,",",//11
				"raspândirea creștinismului", "," ,//12
				"revoluții democratice"],//13
        	 correctAnswer: ["checked_dans_salon" ,"," ,//1
			 "checked_dans_salon", ",", //2
			 "checked_dans_romanesc", "," , //3
			 "checked_dans_romanesc" ,"," ,//4
			 "checked_dans_salon" ,",",//5
			 "checked_dans_modern" ,",",//6
			"checked_dans_salon" ,",", //7
			"checked_dans_modern" ,",", //8
			"checked_dans_romanesc", "," ,//9
			"checked_dans_modern", "," ,//10
			"checked_dans_salon" ,",", //11
			"checked_dans_romanesc" ,",",//12
			"checked_dans_modern" ]}//13
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
	
	if ($( ".draggable" ).length -  $( ".point" ).length  ==  $( ".draggable.checked_dans_romanesc" ).length + $( ".draggable.checked_dans_salon" ).length +$( ".draggable.checked_dans_modern" ).length  ) {
	var k = 0;
	var c = 0;
	$( ".draggable" ).each(function( index ) {
		if (!$(this).hasClass("point")) {
		console.log($(this).data('correct'));
        //if ( $(this).hasClass("checked_mono") ||  $(this).hasClass("checked_mono") ){
            
            if ($(this).hasClass($(this).data('correct'))){
            	//$("."+$(this).attr("id")).addClass("incorrect");
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
    	showGameCompletedCustomMessage("Un răspuns de nota 10! Ai grupat corect toate cuvintele pe perioade istorice! BRAVO!",1);
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

           $('<div id="dans_romanesc"></div>').appendTo(answersDivId);
           $('<div id="dans_salon"></div>').appendTo(answersDivId) ; 
           $('<div id="dans_modern"></div>').appendTo(answersDivId);

		}
		
		$('<div id="header_dans_romanesc">Evul Mediu</div>').appendTo(answersDivId)
		$('<div id="header_dans_salon">Perioada de tranziție</div>').appendTo(answersDivId)
		$('<div id="header_dans_modern">Epoca Modernă</div>').appendTo(answersDivId)
		
	}
	 $("#dans_romanesc").droppable({
                accept: '.draggable',
                drop: function (event, ui) {
                        playAudio("slide","play");
                        ui.helper.data('dropped', true);
                        $("#dans_romanesc").html($("#dans_romanesc").html() + "<div class='dragged "+$(ui.helper).attr('id')+"'>"+$(ui.helper).html()+"</p>");
                        $(ui.helper).addClass("checked_dans_romanesc");
                        $(ui.helper).draggable( 'disable' );

                },
                over: function (event, ui) {},
                out: function (event, ui) { }
        });
	 $("#dans_salon").droppable({
	 	        accept: '.draggable',
                drop: function (event, ui) {
                	    playAudio("slide","play");
                        $("#info").html("dropped!");
                         ui.helper.data('dropped', true);
                         $("#dans_salon").html($("#dans_salon").html() + "<div class='dragged "+$(ui.helper).attr('id')+"'>"+$(ui.helper).html()+"</p>");
                        $(ui.helper).addClass("checked_dans_salon");
                        $(ui.helper).draggable( 'disable' );

                },
                over: function (event, ui) {},
                out: function (event, ui) { }
        }); 
	 $("#dans_modern").droppable({
	 	        accept: '.draggable',
                drop: function (event, ui) {
                	    playAudio("slide","play");
                        $("#info").html("dropped!");
                         ui.helper.data('dropped', true);
                         $("#dans_modern").html($("#dans_modern").html() + "<div class='dragged "+$(ui.helper).attr('id')+"'>"+$(ui.helper).html()+"</p>");
                        $(ui.helper).addClass("checked_dans_modern");
                        $(ui.helper).draggable( 'disable' );

                },
                over: function (event, ui) { },
                out: function (event, ui) {}
        }); 
	
	$('#slide-div-0').addClass("active");
}
