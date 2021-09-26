var AVATAR_GAME_NOT_COMPLETED_CONTENT_MESSAGE = "Înca nu ai terminat exercițiul!";
var AVATAR_HELP_CONTENT_MESSAGE = "Pune semne de punctuație acolo unde au fost omise, trăgându-le în căsuța corespunzătoare.";
var DELETE_ICON = '../common-resources/images/close.png';

var correctAnswer = new Array(4).fill(false);

var choicesArray = [

    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],	
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", ""],	
    ["", "", "", ""]

];
var textContent1 = [
    ["3000000îHr", "3000îHr", "476", "1492", "1640", "1914"],
    ["3000000îHr", "3000îHr", "476", "1492", "1640", "1914"],
    ["3000000îHr", "3000îHr", "476", "1492", "1640", "1914"],
    ["3000000îHr", "3000îHr", "476", "1492", "1640", "1914"],
    ["3000000îHr", "3000îHr", "476", "1492", "1640", "1914"]
];

var correctOrder = [

    ["", "", "", "", "3000îHr", "476", ""],
    ["", "", "", "", "", "1640", "1914", ""],	
    ["", "", "", "", "", "476", "1492", ""],
	["", "", "", "3000000îHr", "3000îHr", ""],
    ["", "1492", "1640", ""]
];
var textContent2 = [

    ["Antichitatea", "este", "cuprinsa", "intre", "anii", "și", "."],
    ["Epoca", "modernă", "este", "cuprinsa", "intre", "anii", "și", "."],	
    ["Evul", "Mediu", "este", "cuprins", "între", "anii", "și", "."],
    ["Preistoria", "cuprinde", "perioada", "dintre", "și", "."],
    ["Perioada de tranzitie intre Evul Mediu și Epoca Moderna este cuprinsa", " intre anii", "si", "."]
];

var ex = 0;
$(document).ready(function () {
    showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, "");

    addGameButtons();
    $("#mute-img").click(handleClickMuteUnmuteEvent);
    $("#try-again").hide();

    $('#start-image').click(function () {
        $("#start-game-div").css({"height": "auto"});
        $("#start-game-div").hide();
        handleCloseAvatarBtnClickEvent();
        initialize();
        $("#game-content-div").show();
        $("#try-again").show();
    });

    $("#try-again").click(function () {
        handleCloseAvatarBtnClickEvent();
        $('#verify').show();
        restartGame();
    });

    $("#help-img").click(function () {
        showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, "");
    });

    $('#verify').on('click', verifyGame);
    $('#next-button').on('click', nextSlide);
    $('#before-button').on('click', beforeSlide);
    $('#finish-button').on('click', nextSlide);
    $("#unmute-img").click(handleClickMuteUnmuteEvent);
});

function addCssClassToChoices() {
    for (var i = 0; i < correctOrder[ex].length; i++) {
        if (choicesArray[ex][i] != "") {
            if (($.inArray(correctOrder[ex][i], choicesArray[ex]) != -1)
                && (correctOrder[ex][i] == choicesArray[ex][i])) {
                $("#cell1" + i).addClass("correct-answer");
                $("#cell1" + i).removeClass("wrong-answer");
            } else {
                $("#cell1" + i).removeClass("correct-answer");
                $("#cell1" + i).addClass("wrong-answer");
            }
        } else {
            $("#cell1" + i).removeClass("wrong-answer");
            $("#cell1" + i).removeClass("correct-answer");
        }
    }
}

function initialize() {
    $('#finish-button').hide();
    if (ex == 0) {
        $('#before-button').hide();
        $('#next-button').show();
    } else if (ex == textContent2.length - 1) {
        $('#before-button').show();
        $('#next-button').hide();
        $('#finish-button').show();
    } else {
        $('#before-button').show();
        $('#next-button').show();
    }
    for (i = 0; i < textContent1[ex].length; i++) {
        var draggIndex = textContent1[ex].indexOf(textContent1[ex][i]);

        $('<div>' + textContent1[ex][i] + '</div>')
            .attr("id", "text" + 0 + draggIndex)
            .addClass("draggable-sentence")
            .appendTo('#text-div' + 0)
            .draggable({
                stack: '#text div',
                revert: true,
                start: function (event, ui) {
                    startDrag(ui)
                }, // from main.js
                drag: function (event, ui) {
                    drag(ui)
                } // from main.js
            });
    }
    for (i = 0; i < textContent2[ex].length; i++) {
        $('<div></div>')
            .attr("id", "sentence" + i)
            .addClass("sentence")
            .appendTo("#text-div1");

        if (isMobile()) {
            var tolerance = 'fit'
        } else {
            var tolerance = 'intersect';
        }

        $('<p >' + textContent2[ex][i] + '</p>')
            .attr("id", "text" + 1 + i)
            .addClass("droppable-sentence")
            .appendTo('#sentence' + i);

        $('<div></div>')
            .attr("id", "cell" + 1 + i)
            .addClass((correctOrder[ex][i] != "" ? "droppable-cell" : "non-droppable-cell"))
            .appendTo('#sentence' + i)
            .droppable({
                accept: '.ui-draggable',
                hoverClass: 'hovered',
                tolerance: tolerance,
                over: addClassOver,
                out: removeClassOver,
                drop: handleWordDrop
            });
        if (choicesArray[ex][i] != "") {
            $("#cell" + 1 + i).append("<div class='dragged-word'>" + choicesArray[ex][i] + "<img src=" + DELETE_ICON + " id='close-btn-popover' onclick=removeItem(" + i + ")></img></div>");
        }
    }
}

function handleWordDrop(event, ui) {
    var droppWordIndex = $(this).attr('id').replace("text", "").slice(-1);


    var draggedWord = ui.draggable.text();
    if ($(this).context.firstChild) {
        $(this).context.firstChild.remove();
    }
    $(this).prepend("<div class='dragged-word'>" + draggedWord + "<img src=" + DELETE_ICON + " id='close-btn-popover' onclick=removeItem(" + droppWordIndex + ")></img></div>");

    $(this).parent().css("border", "none");

    choicesArray[ex][parseInt(droppWordIndex)] = draggedWord;

    ui.draggable.removeClass("over");
}

function removeItem(index) {
    $("#cell1" + index).empty();
    choicesArray[ex][parseInt(index)] = "";
    addCssClassToChoices()
}

function addClassOver(event, ui) {
    ui.draggable.addClass("over");
}

function removeClassOver(event, ui) {
    ui.draggable.removeClass("over");
}

function restartGame() {
    $("#text-div0").empty();
    $("#text-div1").empty();
    $("#restart").remove();
    choicesArray = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],	
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", ""],	
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
    ];
    showAvatarHelp("", AVATAR_HELP_CONTENT_MESSAGE, "");
    initialize();
}

function verifyGame() {

    if (choicesArray[ex].findIndex((choice) => choice !== "") == -1) {
        showGameInterCustomMessage(AVATAR_GAME_NOT_COMPLETED_CONTENT_MESSAGE, 2);
    } else {
        var is_same = (choicesArray[ex].length == correctOrder[ex].length) && choicesArray[ex].every(function (element, index) {
            return element === correctOrder[ex][index];
        });
        addCssClassToChoices();
        if (is_same) {
            showGameInterCustomMessage(getFeedbackByCorrectAns(99), 1);
            correctAnswer[ex] = true;
        } else {
            correctAnswer[ex] = false;
            showGameInterCustomMessage(getFeedbackByCorrectAns(20), 2);
        }
    }
}

function nextSlide() {
    var is_same = (choicesArray[ex].length == correctOrder[ex].length) && choicesArray[ex].every(function (element, index) {
        return element === correctOrder[ex][index];
    });

    if (is_same) {
        correctAnswer[ex] = true;
    }
    $("#text-div0").empty();
    $("#text-div1").empty();
    if (ex + 1 <= textContent2.length - 1) {
        ex = ex + 1;
        initialize();
        handleCloseAvatarBtnClickEvent()
    } else {
        ex = 0;
        var correctAnswerPecentage = nrOfCorrectAnswers() * 100 / textContent2.length;
        RestartCompletedGame();
        showGameCompletedCustomMessage("Ai răspuns  corect la " + nrOfCorrectAnswers() + " enunț din " + (textContent2.length) + ". " + getFeedbackByCorrectAns(correctAnswerPecentage), correctAnswerPecentage > 99 ? 1 : 2);

    }
}

function beforeSlide() {
    var is_same = (choicesArray[ex].length == correctOrder[ex].length) && choicesArray[ex].every(function (element, index) {
        return element === correctOrder[ex][index];
    });

    if (is_same) {
        correctAnswer[ex] = true;
    }

    if (ex > 0) {
        $("#text-div0").empty();
        $("#text-div1").empty();
        ex = ex - 1;
        initialize();
    }
    handleCloseAvatarBtnClickEvent()
}

function nrOfCorrectAnswers() {
    nrOfCorrAns = 0;
    correctAnswer.forEach((answer) => {
        if (answer) {
            nrOfCorrAns++;
        }
    });
    return nrOfCorrAns;
}

function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
    }
    return false;
}

function RestartCompletedGame() {
    $('<button type="button"  class="btn btn-primary">REPETĂ</button>')
        .attr('id', "restart")
        .appendTo("#next-div-content");
    $('#finish-button').hide();
    $('#verify').hide();
    $('#next-button').hide();
    $('#before-button').hide();

    $("#restart").click(function () {
        $(this).remove();
        ex = 0;
        $('#verify').show();
        restartGame();
    });
}
