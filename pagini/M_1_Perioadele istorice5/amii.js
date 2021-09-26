var AVATAR_HELP_TITLE_MESSAGE = "Instrucțiuni";
var AVATAR_HELP_CONTENT_MESSAGE = " În fiecare perioadă istorică s-a ascuns un intrus. Descoperă-l. Atenție! Ai doar o șansă ca sa descoperi intrusul din fiecare perioadă istorică. ";
var AVATAR_GAME_NOT_COMPLETED_CONTENT = "Recitește lecția din manual și vei afla mai multe indicii. Apoi mai încearcă."
var AVATAR_GAME_COMPLETED_CONTENT = "Excelent! Ai descoperit intrusul. Dacă vrei să continui apasă butonul \„Următoarea perioadă\”."
var TEXT_GAME = " În fiecare perioadă istorică s-a ascuns un intrus. Descoperă-l. Atenție! Ai doar o șansă ca să descoperi intrusul din fiecare perioadă istorică. "

var currentChain = 0;
var elementIntruder = [1,3,4];
var correctElement = 0;
var choose = true;
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
}

function chooseElement(elem){
	if(choose){
		choose = false;
		$(elem).animate({top: "+=200"}, 2000,function(){
			
			var selectedElement = $(elem).attr('id');
			selectedElement = selectedElement.split("-");
			if(selectedElement[1] == elementIntruder[currentChain]){
				correctElement++;
				if(currentChain == elementIntruder.length -1){
					if(correctElement == elementIntruder.length){
						showGameCompletedCustomMessage("Bravo! Ai descoperit intrusul pentru fiecare lanț perioadă istorică.",1);
						setTimeout(endGame, 2000);
					}else{
						showGameCompletedCustomMessage("Ai descoperit intrusul pentru "+ correctElement +" din cele "+ elementIntruder.length +" perioade istorice.",0);
					}

				}else{
					showGameCompletedCustomMessage(AVATAR_GAME_COMPLETED_CONTENT,1);
					$('#next-chain').show();
				}	
			}else{
				if(currentChain == elementIntruder.length -1){
					showGameCompletedCustomMessage("Ai descoperit intrusul pentru "+ correctElement +" din cele "+ elementIntruder.length +" perioade istorice.",0);
					setTimeout(endGame, 2000);
				}else{
					showGameCompletedCustomMessage(AVATAR_GAME_NOT_COMPLETED_CONTENT,0);
					$('#next-chain').show();
				}	
			}
		});
	}

}

function getNextChain(){
	handleCloseAvatarBtnClickEvent();
	choose = true;
	$('.chain').css('top','190px');
	$('#next-chain').hide();
	$('#chain-'+currentChain).css('display','none');
	currentChain++;
	$('#chain-'+currentChain).css('display','block');

	
}
function restartGame(){
	handleCloseAvatarBtnClickEvent();
	$('#draggableBlocks').css('display','block');
	$('.chain').css('top','190px');
	choose = true;
	$('#next-chain').hide();
	$('#chain-'+currentChain).css('display','none');
	currentChain = 0 ;
	correctElement = 0;
	$('#chain-'+currentChain).css('display','block');

	
}
function endGame(){
	$('#draggableBlocks').css('display','none');
}




