/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
var amii_file = location.pathname;
var amii_folder = (isIE() && (amii_file.indexOf(':') > 0)) ? amii_file.substring(1, amii_file.length - 9) : amii_file.substring(0, amii_file.length - 9);

var isMuted = false;
if (location.toString().indexOf("=true") > 0) {
    isMuted = true;
}

!function (a) { function f(a, b) { if (!(a.originalEvent.touches.length > 1)) { a.preventDefault(); var c = a.originalEvent.changedTouches[0], d = document.createEvent("MouseEvents"); d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), a.target.dispatchEvent(d) } } if (a.support.touch = "ontouchend" in document, a.support.touch) { var e, b = a.ui.mouse.prototype, c = b._mouseInit, d = b._mouseDestroy; b._touchStart = function (a) { var b = this; !e && b._mouseCapture(a.originalEvent.changedTouches[0]) && (e = !0, b._touchMoved = !1, f(a, "mouseover"), f(a, "mousemove"), f(a, "mousedown")) }, b._touchMove = function (a) { e && (this._touchMoved = !0, f(a, "mousemove")) }, b._touchEnd = function (a) { e && (f(a, "mouseup"), f(a, "mouseout"), this._touchMoved || f(a, "click"), e = !1) }, b._mouseInit = function () { var b = this; b.element.bind({ touchstart: a.proxy(b, "_touchStart"), touchmove: a.proxy(b, "_touchMove"), touchend: a.proxy(b, "_touchEnd") }), c.call(b) }, b._mouseDestroy = function () { var b = this; b.element.unbind({ touchstart: a.proxy(b, "_touchStart"), touchmove: a.proxy(b, "_touchMove"), touchend: a.proxy(b, "_touchEnd") }), d.call(b) } } }(jQuery);
/*************************************************/
/*************************************************/

function isIE() {
    userAgent = navigator.userAgent;
    console.log(userAgent);
    return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1 || userAgent.indexOf("Edge/") > -1;
}

var DEFAULT_HELP_TITLE = "Ajutor";
var DEFAULT_HELP_CONTENT = "";
var DEFAULT_HELP_AUDIO_PATH = "../common-resources/audio/help.mp3";

var DEFAULT_GAME_COMPLETED_TITLE = "Bravo!";
var DEFAULT_GAME_COMPLETED_CONTENT = "";
var DEFAULT_GAME_COMPLETED_AUDIO_PATH = "../common-resources/audio/correct.mp3";

var DEFAULT_GAME_NOT_COMPLETED_TITLE = "Mai încearcă!"
var DEFAULT_GAME_NOT_COMPLETED_CONTENT = ""
var DEFAULT_GAME_NOT_COMPLETED_AUDIO_PATH = "../common-resources/audio/wrong.mp3";

var DEFAULT_GAME_NOT_COMPLETED_AUDIO_NOTIF = "../common-resources/audio/notif.mp3";
var DEFAULT_GAME_SUC = "../common-resources/audio/s.mp3";
var DEFAULT_GAME_ER = "../common-resources/audio/e.mp3";
var def_au_array = [DEFAULT_GAME_COMPLETED_AUDIO_PATH,
    DEFAULT_GAME_NOT_COMPLETED_AUDIO_PATH,
    DEFAULT_GAME_NOT_COMPLETED_AUDIO_NOTIF,
    DEFAULT_HELP_AUDIO_PATH,
    DEFAULT_GAME_SUC,
    DEFAULT_GAME_ER];

var scaleFactor = 1; // 1 means no scaling
var trompi;

var isGameMuted = isMuted;

$(document).ready(function () {
    enableTooltipsIfIsNotTouchDevice();
    setAudioGameVolumFromGlobalBookVolume();
    // addGameButtons();
    appendAvatarAudio(def_au_array);
    resize();

    $(window).resize(function () {
        resize();
    });
    setTimeout(function () {
        $(window).trigger('resize');
    }, 1000);

    $('body').on('click', '#play-pause-btn', handlePlayPauseBtnClickEvent);
    $('body').on('click', '#stop-btn', handleStopBtnClickEvent);
    $('body').on('click', '#close-btn-popover', handleCloseAvatarBtnClickEvent);

    $("#muted-img").click(handleClickMuteUnmuteEvent);
});


function enableTooltipsIfIsNotTouchDevice() {
    // if is not touch device
    if (!("ontouchstart" in document.documentElement)) {
        $('[data-toggle="tooltip"]').tooltip();
    }
}

function handleClickMuteUnmuteEvent() {
    $("audio").prop("muted", !isGameMuted);

    if (isGameMuted) {
        $(this).attr("id", "muted-img");
        $("#game-audio-onoff").removeClass("fa-volume-off").addClass("fa-volume-up");
        isGameMuted = false;
    }
    else {
        $(this).attr("id", "unmute-img");
        $("#game-audio-onoff").removeClass("fa-volume-up").addClass("fa-volume-off");
        isGameMuted = true;
    }
}

function setAudioGameVolumFromGlobalBookVolume() {
    var myPage = document.location.toString().split('?muted=');
    var isParentMuted = myPage[1] ? myPage[1] : '';
    if (isParentMuted === "true") {
        $("#unmute-img").attr("id", "muted-img");
        isGameMuted = true;
    }
}

//used in all games for resizing and scaling their content
//resizes the #wrapper-div width and height keeping the aspect ratio and scales the content of the #content-div
function resize() {
    var maxWidth = $('#content-div').css("width").replace("px", "");
    var maxHeight = $('#content-div').css("height").replace("px", "");

    var availableWidth = window.innerWidth;
    var availableHeight = window.innerHeight;

    //do not scale if available resolution is bigger than max resolution
    if (availableWidth >= maxWidth && availableHeight >= maxHeight) {
        $('#content-div').css({ '-webkit-transform': '' });
        $('#content-div').css({ '-moz-transform': '' });
        $('#content-div').css({ '-ms-transform': '' });
        $('#content-div').css({ '-o-transform': '' });
        $('#content-div').css({ 'transform': '' });
        $('#wrapper-div').css({ width: maxWidth, height: maxHeight });
        scaleFactor = 1;
        return;
    }

    scaleFactor = Math.min(availableWidth / maxWidth, availableHeight / maxHeight);

    $('#content-div').css({ '-webkit-transform': 'scale(' + scaleFactor + ')' });
    $('#content-div').css({ '-moz-transform': 'scale(' + scaleFactor + ')' });
    $('#content-div').css({ '-ms-transform': 'scale(' + scaleFactor + ')' });
    $('#content-div').css({ '-o-transform': 'scale(' + scaleFactor + ')' });
    $('#content-div').css({ 'transform': 'scale(' + scaleFactor + ')' });
    $('#wrapper-div').css({ width: availableWidth, height: availableHeight });
    //$('#content-div').css({'margin-left':(availableWidth - $('#content-div').width())/2*scaleFactor});
    //$('#content-div').css({'margin-top':(availableHeight - $('#content-div').height())/2*scaleFactor})
}

//used to fix the offset bug of draggable elements when the content is scaled
function startDrag(ui) {
    ui.position.left = 0;
    ui.position.top = 0;
}

//used to fix the offset bug of draggable elements when the content is scaled
function drag(ui) {
    var changeLeft = ui.position.left - ui.originalPosition.left;
    var newLeft = ui.originalPosition.left + changeLeft / scaleFactor;

    var changeTop = ui.position.top - ui.originalPosition.top;
    var newTop = ui.originalPosition.top + changeTop / scaleFactor;

    ui.position.left = newLeft;
    ui.position.top = newTop;
}

function showAvatarHelpFirst(title, content, audio_path) {
    if (title == "") title = DEFAULT_HELP_TITLE;
    if (content == "") content = DEFAULT_HELP_CONTENT;
    if (audio_path == "") audio_path = DEFAULT_HELP_AUDIO_PATH;

    emptyAvatarContent();

    $("<div></div>")
        .attr("id", "avatar-div-first")
        .attr("data-toggle", "popover")
        .attr("data-title", title)
        .attr("data-content", content)
        .attr("data-placement", "right")
        .appendTo("#avatar-content-div-first")

    if (trompi) {
        trompi.stopDrawing();
    }

    trompi = new Trompi();
    trompi.show("avatar-div-first", 0);
    trompi.startTalkingInfo();

    $('#avatar-div-first').popover({ trigger: 'manual' }).popover('show');
    $("#avatar-content-div-first > .popover > .popover-title").addClass("popover-title-help");
    $("#avatar-content-div-first > .popover > .popover-content").addClass("popover-content-help");
    $("#avatar-content-div-first > .popover").addClass("animated bounceInRight");

    appendCloseBtnToPopover();
    playAvatarAudio(3, "play");
}

function showAvatarHelp(title, content, audio_path) {
    if (title == "") title = DEFAULT_HELP_TITLE;
    if (content == "") content = DEFAULT_HELP_CONTENT;
    if (audio_path == "") audio_path = DEFAULT_HELP_AUDIO_PATH;

    if (trompi) handleCloseAvatarBtnClickEvent();
    emptyAvatarContent();

    $("<div></div>")
        .attr("id", "avatar-div")
        .attr("data-toggle", "popover")
        .attr("data-title", title)
        .attr("data-content", content)
        .attr("data-placement", "right")
        .appendTo("#avatar-content-div")
    if (trompi) {
        trompi.stopDrawing();
    }
    trompi = new Trompi();
    trompi.show("avatar-div", 0);
    trompi.startTalkingInfo();

    $('#avatar-div').popover({ trigger: 'manual' }).popover('show');
    $("#avatar-content-div > .popover > .popover-title").addClass("popover-title-help");
    $("#avatar-content-div > .popover > .popover-content").addClass("popover-content-help");
    $("#avatar-content-div > .popover").addClass("animated bounceInRight");

    appendCloseBtnToPopover();
    playAvatarAudio(3, "play");
}

function showAvatarFeedback(title, content, audio_path, avatar_type) {
    if (title == "") title = DEFAULT_HELP_TITLE;
    if (content == "") content = DEFAULT_HELP_CONTENT;
    if (audio_path == "") audio_path = DEFAULT_HELP_AUDIO_PATH;
   
    emptyAvatarContent();

    $("<div></div>")
        .attr("id", "avatar-div")
        .attr("data-toggle", "popover")
        .attr("data-title", title)
        .attr("data-content", content)
        .attr("data-placement", "right")
        .appendTo("#avatar-content-div")
    if (trompi) {
        trompi.stopDrawing();
    }
    trompi = new Trompi();
    trompi.show("avatar-div", avatar_type);
    trompi.startTalking();

    $('#avatar-div').popover({ trigger: 'manual' }).popover('show');
    $("#avatar-content-div > .popover > .popover-title").addClass("popover-title-help");
    $("#avatar-content-div > .popover > .popover-content").addClass("popover-content-help");
    $("#avatar-content-div > .popover").addClass("animated bounceInRight");

    appendCloseBtnToPopover();
    playAvatarAudio(1, "play");
}

function showAvatarGameCompleted(title, proc_correct_ans, audio_path) {
    if (title == "") title = DEFAULT_GAME_COMPLETED_TITLE;
    if (proc_correct_ans == "") content = DEFAULT_GAME_COMPLETED_CONTENT;
    else content = getFeedbackByCorrectAns(proc_correct_ans);
    if (audio_path == "") audio_path = DEFAULT_GAME_COMPLETED_AUDIO_PATH;

    emptyAvatarContent();

    $("<div></div>")
        .attr("id", "avatar-div")
        .attr("data-toggle", "popover")
        .attr("data-title", title)
        .attr("data-content", content)
        .attr("data-placement", "right")
        .appendTo("#avatar-content-div")

    if (trompi) {
        trompi.stopDrawing();
    }
    trompi = new Trompi();

    if (proc_correct_ans != 100) {
        trompi.show("avatar-div", 3);
    } else {
        trompi.show("avatar-div", 1);
    }

    trompi.startTalking();

    $('#avatar-div').popover({ trigger: 'manual' }).popover('show');
    $("#avatar-content-div > .popover > .popover-title").addClass("popover-title-game-completed");
    $("#avatar-content-div > .popover > .popover-content").addClass("popover-content-game-completed");
    $("#avatar-content-div > .popover").addClass("animated bounceInRight");

    appendCloseBtnToPopover();
    playAvatarAudio(0, "play");
}


function showAvatarGameNotCompleted(title, content, audio_path) {

    handleCloseAvatarBtnClickEvent();
    if (title == "") title = DEFAULT_GAME_NOT_COMPLETED_TITLE;
    if (content == "") content = DEFAULT_GAME_NOT_COMPLETED_CONTENT;
    if (audio_path == "") audio_path = DEFAULT_GAME_NOT_COMPLETED_AUDIO_PATH;

    if (trompi) {
        trompi.stopDrawing();
    }

    emptyAvatarContent();

    $("<div></div>")
        .attr("id", "avatar-div")
        .attr("data-toggle", "popover")
        .attr("data-title", title)
        .attr("data-content", content)
        .attr("data-placement", "right")
        .appendTo("#avatar-content-div")

    trompi = new Trompi();
    trompi.show("avatar-div", 2);
    trompi.startTalking();

    $('#avatar-div').popover({ trigger: 'manual' }).popover('show');
    $("#avatar-content-div > .popover > .popover-title").addClass("popover-title-game-not-completed");
    $("#avatar-content-div > .popover > .popover-content").addClass("popover-content-game-not-completed");
    $("<img>")
        .attr("id", "try-again-avatar-btn")
        .attr("src", "../common-resources/images/repeta.png")
        .addClass("try-again")
        .appendTo("#avatar-content-div > .popover > .popover-title");
    $("#avatar-content-div > .popover").addClass("animated bounceInRight");

    appendCloseBtnToPopover();
    playAvatarAudio(1, "play");
}

function appendCloseBtnToPopover() {
    $("<img></img>")
        .attr("id", "close-btn-popover")
        .attr("src", "../common-resources/images/close.png")
        .appendTo("#avatar-content-div > .popover > .popover-content")
}

function appendAvatarAudio1(audio_path) {
    var $player = $("<audio></audio>")
        .attr("id", "avatar-audio")
        .attr("onended", "handleAudioEndedEvent()")
        .attr("ontimeupdate", "updateProgressBar()")
        .attr("preload", "none")
        .addClass("avatar-player")
        .appendTo("#game-content-div")

    $("<source></source>")
        .attr("src", audio_path)
        .attr("type", "audio/mpeg")
        .appendTo("#avatar-audio")

    $player.prop("muted", isGameMuted);
    playAvatarAudio();
}

function appendAvatarAudio(audio_array) {
    for (var i = 0; i < audio_array.length; i++) {
        var id = audio_array[i];
        var $player = $("<audio></audio>")
            .attr("id", "av-game-audio-" + i)
            .appendTo("#game-content-div")

        $("<source></source>")
            .attr("src", id)
            .attr("type", "audio/mpeg")
            .appendTo("#av-game-audio-" + i)

        $player.prop("muted", isGameMuted);
        $("#av-game-audio-" + i).trigger('load');
    }
}

function appendAvatarPlayerControls() {
    $("<div></div>")
        .attr("id", "avatar-player-controls-div")
        .appendTo("#avatar-div")

    $("<img></img>")
        .attr("id", "play-pause-btn")
        .attr("src", "../common-resources/images/play.png")
        .attr('data-toggle', "tooltip")
        .attr('data-placement', "right")
        .attr('title', "Start/Pauza")
        .addClass("avatar-player-controls play-pause-btn-class")
        .appendTo("#avatar-player-controls-div")

    $("<img></img>")
        .attr("id", "stop-btn")
        .attr("src", "../common-resources/images/stop.png")
        .attr('data-toggle', "tooltip")
        .attr('data-placement', "right")
        .attr('title', "Stop")
        .addClass("avatar-player-controls stop-btn-class")
        .appendTo("#avatar-player-controls-div")

    $("<progress></progress>")
        .attr("id", "progress-bar-audio-avatar")
        .attr("value", 0)
        .attr("max", 1)
        .appendTo("#avatar-player-controls-div")
}

function emptyAvatarContent() {
    $("#avatar-audio").remove();
    $("#avatar-content-div").empty();
}

function handlePlayPauseBtnClickEvent() {
    if ($(this).attr("src") == "../common-resources/images/play.png") {
        trompi.startTalking();
    }
    else {
        pauseAvatarAudio();
        trompi.stopTalking();
    }
}

function handleStopBtnClickEvent() {
    $("#avatar-audio").trigger("pause");
    $("#avatar-audio").attr("currentTime", 0);
    $("#play-pause-btn").attr("src", "../common-resources/images/play.png");
    t.stopTalking();
}

function playAvatarAudio1() {
    $("#avatar-audio").trigger("play");
    $("#play-pause-btn").attr("src", "../common-resources/images/pause.png");
}

function playAvatarAudio(audio, task) {
    //audio 0 - success, 1 error, 2 - notif, 3 - help
    $("#av-game-audio-" + audio).prop("muted", isGameMuted);
    if (task == 'play') {
        $("#av-game-audio-" + audio).trigger('play');
    }
    if (task == 'stop') {
        $("#av-game-audio-" + audio).trigger('pause');
        $("#av-game-audio-" + audio).attr("currentTime", 0);
        $("#av-game-audio-" + audio).currentTime = 0;
        try {
            document.getElementById("av-game-audio-" + audio).currentTime = 0;
        } catch (e) {
        }
    }
}

function pauseAvatarAudio1() {
    $("#avatar-audio").trigger("pause");
    $("#play-pause-btn").attr("src", "../common-resources/images/play.png");
}

function pauseAvatarAudio() {
    for (var i = 0; i < 4; i++) {
        playAvatarAudio(i, "stop");
    }
}

function handleAudioEndedEvent() {
    $("#play-pause-btn").attr("src", "../common-resources/images/play.png");
}

function handleCloseAvatarBtnClickEvent() {
    if (trompi) {
        trompi.stopTalking();
    }
    $("#avatar-audio").remove();
    $("#avatar-content-div").empty();
    pauseAvatarAudio();
}

function updateProgressBar() {
    var currentTime = $("#avatar-audio").attr("currentTime");
    var duration = $("#avatar-audio").prop("duration");
    $('#progress-bar-audio-avatar').attr("value", currentTime / duration);
}

function shuffle(array) {
    var counter = array.length, temp, index;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        if (index != counter) {
            counter--;
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
    }
    return array;
}

function getFeedbackByCorrectAns(p) {
    str_message = '';
    if (p < 30) {
        str_message = 'Sunt sigur că poți mai mult!';
    } else
        if (p < 50) {
            str_message = 'Sunt sigur că poți mai mult!';
        }
        else
            if (p < 80) {
                str_message = 'E destul de bine!';
            } else
                if (p < 100) {
                    str_message = 'E bine!';
                } else
                    if (p == 100) {
                        str_message = 'Ai răspuns de nota 10! Bravo!';
                    }
    return str_message;
}

function addGameButtons() {
    var idx_pag = amii_file.indexOf("pag") + 3;
    var amii_page = Math.abs(parseInt(amii_file.substring(idx_pag, idx_pag + 3)));

    if (!isMuted) {
        a = "volume-up";
    }
    else {
        a = "volume-off";
    }

    var html_btns = '<div id="top-bar-div">' +

        '<a  id="help-img" data-toggle="tooltip" data-placement="right" title="Ajutor" href="#">' +
        '<span class="fa-stack fa-2x">' +
        '<i class="fa fa-square-o fa-stack-2x"></i>' +
        '<i class="fa fa-align-left fa-stack-1x"></i>' +
        '</span>' +
        '</a>' +

        '<a  id="try-again" data-toggle="tooltip" data-placement="right" title="Repet&#259; activitatea" href="#">' +
        '<span class="fa-stack fa-2x">' +
        '<i class="fa fa-square-o fa-stack-2x"></i>' +
        '<i class="fa fa-repeat fa-stack-1x"></i>' +
        ' </span>' +
        '</a>' +

        '</div>' +
        '<div id="bottom-bar-div">' +
        '<a  id="unmute-img" data-toggle="tooltip" data-placement="right" title="Activare/Dezactivare sunet" href="#">' +
        '<span class="fa-stack fa-2x">' +
        '<i class="fa fa-square-o fa-stack-2x"></i>' +
        '<i class="fa fa-' + a + ' fa-stack-1x" id="game-audio-onoff"></i>' +
        '</span>' +
        '</a>' +
        '</div>';

    $("#btns").html(html_btns);
}

function appendAudio(audio_array) {
    for (var i = 0; i < audio_array.length; i++) {
        var id = audio_array[i];
        var $player = $("<audio></audio>")
            .attr("id", "game-audio-" + id)
            .appendTo("#game-content-div")

        $("<source></source>")
            .attr("src", amii_folder + 'audio/' + id + '.mp3')
            .attr("type", "audio/mpeg")
            .appendTo("#game-audio-" + id)

        $("<source></source>")
            .attr("src", amii_folder + 'audio/' + id + '.ogg')
            .attr("type", "audio/mpeg")
            .appendTo("#game-audio-" + id)

        $("#game-audio-" + id).trigger('load');
    }
}

function playAudio(audio, task) {
    $("#game-audio-" + audio).prop("muted", isGameMuted);
    if (task == 'play') {
        $("#game-audio-" + audio).trigger('play');
    }
    if (task == 'stop') {
        $("#game-audio-" + audio).trigger('pause');
        $("#game-audio-" + audio).attr("currentTime", 0);
        $("#game-audio-" + audio).currentTime = 0;
        try {
            document.getElementById("game-audio-" + audio).currentTime = 0;
        } catch (e) { }
    }
}


function setupQuizGame(AVATAR_HELP_TITLE_MESSAGE, AVATAR_HELP_CONTENT_MESSAGE) {
    addGameButtons();
    $("#help-img").click(function () {
        showAvatarHelp(AVATAR_HELP_TITLE_MESSAGE, AVATAR_HELP_CONTENT_MESSAGE, "");
    });
    $("#unmute-img").click(handleClickMuteUnmuteEvent);
    $("#try-again").click(function () {
        restartGame(); $("#restart").hide();
        if ($("#restart")) {
            $("#restart").remove();
        }
    });
    $('#start-image').click(function () {
        $("#start-game-div").hide();
        handleCloseAvatarBtnClickEvent();
        initializeGame();

        $("#game-content-div").show();
    });

    $("#game-content-div").hide();
    showAvatarHelp(AVATAR_HELP_TITLE_MESSAGE, AVATAR_HELP_CONTENT_MESSAGE, "");
    $("#next-slide-image").click(goToNextSlide);
}

function setupDragDropGame(AVATAR_HELP_TITLE_MESSAGE, AVATAR_HELP_CONTENT_MESSAGE) {
    addGameButtons();
    $("#help-img").click(function () {
        showAvatarHelp(AVATAR_HELP_TITLE_MESSAGE, AVATAR_HELP_CONTENT_MESSAGE, "");
    });

    $("#unmute-img").click(handleClickMuteUnmuteEvent);
    $("#try-again").click(function () { restartGame(); $("#restart").hide() });
    $('#start-image').click(function () {
        $("#start-game-div").hide();
        handleCloseAvatarBtnClickEvent();
        initializeGame();

        $("#game-content-div").show();
    });

    $("#game-content-div").hide();
    showAvatarHelp(AVATAR_HELP_TITLE_MESSAGE, AVATAR_HELP_CONTENT_MESSAGE, "");
}

function showGameCompletedCustomMessage(content, tip_avatar) {
    handleCloseAvatarBtnClickEvent();
    var audio_path = DEFAULT_GAME_NOT_COMPLETED_AUDIO_PATH;

    if (typeof (tip_avatar) == "undefined") {
        audio_path = DEFAULT_GAME_NOT_COMPLETED_AUDIO_NOTIF;
        playAvatarAudio(2, "play");

    } else
        if (tip_avatar == 1) {
            audio_path = DEFAULT_GAME_COMPLETED_AUDIO_PATH;
            playAvatarAudio(0, "play");
        } else {
            playAvatarAudio(1, "play");
        }
    if (trompi) {
        trompi.stopDrawing();
    }

    emptyAvatarContent();

    $("<div></div>")
        .attr("id", "avatar-div")
        .attr("data-toggle", "popover")
        .attr("data-content", content)
        .attr("data-placement", "right")
        .appendTo("#avatar-content-div")

    trompi = new Trompi();
    trompi.show("avatar-div", tip_avatar);
    trompi.startTalking();


    $('#avatar-div').popover({ trigger: 'manual' }).popover('show');
    $("#avatar-content-div > .popover > .popover-title").addClass("popover-title-game-completed");
    $("#avatar-content-div > .popover > .popover-content").addClass("popover-content-game-completed");
    $("#avatar-content-div > .popover").addClass("animated bounceInRight");

    appendCloseBtnToPopover();
}

function showGameInterCustomMessage(content, tip_avatar) {

    if (tip_avatar == 1) {
        playAvatarAudio(4, "play");
    } else {
        playAvatarAudio(5, "play");
    }

    if (trompi) {
        trompi.stopDrawing();
    }

    handleCloseAvatarBtnClickEvent();
    emptyAvatarContent();

    $("<div></div>")
        .attr("id", "avatar-div")
        .attr("data-toggle", "popover")
        .attr("data-content", content)
        .attr("data-placement", "right")
        .appendTo("#avatar-content-div");

    trompi = new Trompi();
    trompi.show("avatar-div", tip_avatar);
    trompi.startTalking();

    $('#avatar-div').popover({ trigger: 'manual' }).popover('show');
    $("#avatar-content-div > .popover > .popover-title").addClass("popover-title-game-completed");
    $("#avatar-content-div > .popover > .popover-content").addClass("popover-content-game-completed");
    $("#avatar-content-div > .popover").addClass("animated bounceInRight");

    appendCloseBtnToPopover();
}