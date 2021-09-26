AV_IMAGES_PATH = '../common-resources/images/av/';
var closedAvatar;

var Trompi = function () {
    var canvas;
    var images = {};

    var timeBtwBlinks = 800;
    var numFramesDrawn = 0;

    var blinkTimer;
    var talkTimer;

    var mouth_opened = false;
    var timeToTalk = false;
    var redrawTimer;

    var imgNrWrong = 0;

    function updateFPS() {
        curFPS = numFramesDrawn;
        numFramesDrawn = 0;
    }

    function show(canvasParentId, imageType) {
        //imageType => 0 - instructiuni, 1 - success, 2 - gresit, 3 - partial gresit, 4 - pasiv
        $("#trompi-canvas").remove();
        canvasParent = document.getElementById(canvasParentId);
        canvas = document.createElement('div');
        canvas.setAttribute('id', 'trompi-canvas');
        canvasParent.appendChild(canvas);

        switch (imageType) {
            case 0: $(canvas).addClass("avatar_anim");
                break;
            case 1: $(canvas).addClass("avatar_anim_happy");
                break;
            case 2: $(canvas).addClass("avatar_anim_sad");
                break;
            case 3: $(canvas).addClass("avatar_anim_partially_wrong");
                break;
            case 4: $(canvas).addClass("avatar_anim_passive");
                break;
            default: $(canvas).addClass("avatar_anim");
        }
    }

    function loadImage(name) {
        images[name] = new Image();
        images[name].src = "../common-resources/images/robotel/" + name + ".png";
    }

    function redraw() {
        if (timeToTalk) {
            if (mouth_opened) {
                mouth_opened = false;
                $("#trompi-canvas").css("background-position-y", "0px");
            }
            else {
                mouth_opened = true;
                $("#trompi-canvas").css("background-position-y", "154px");
            }
            timeToTalk = false;
        }

        timeToBlink = false;
        ++numFramesDrawn;
    }

    function startTalking() {
        closedAvatar = false;
        imgNrWrong = 0
        clearInterval(talkTimer);
        //talkTimer = setInterval(ShowWrongAvatar, 100);
    }

    function startTalkingInfo() {
        closedAvatar = false;
        imgNrWrong = 0
        clearInterval(talkTimer);
        //$('.avatar_anim').css("background-position-x", 1056);
    }

    function startBlinking() {
        blinkTimer = setInterval(updateBlink, timeBtwBlinks);
    }

    function stopTalking() {
        clearInterval(talkTimer);
    }

    function stopBlinking() {
        clearInterval(blinkTimer);
        clearInterval(redrawTimer);
        timeToBlink = false;
    }

    function updateBlink() {
        timeToBlink = true;
    }

    function updateTalk() {
        timeToTalk = true;
    }

    function stopDrawing() {
        clearInterval(redrawTimer);
    }

    return _this = {
        show: show,
        startTalking: startTalking,
        stopTalking: stopTalking,
        startBlinking: startBlinking,
        stopBlinking: stopBlinking,
        stopDrawing: stopDrawing,
        startTalkingInfo: startTalkingInfo
    }

    function ShowSuccessAvatar(maxImg, nameImg) {
        maxSuccess = maxImg;
        imgNrSuccess = 1;
        $('#image').attr('src', nameImg + '0.png')
        if (imgNrSuccess < maxSuccess) {
            setTimeout(function () {
                $('#image').attr('src', AV_IMAGES_PATH + nameImg + imgNrSuccess + '.png')
                imgNrSuccess++;
                showSuccessImg(nameImg);
            }, 50);

        }
    }

    function showSuccessImg(nameImg) {
        if (imgNrSuccess < maxSuccess) {
            setTimeout(function () {
                $('#image').attr('src', AV_IMAGES_PATH + nameImg + imgNrSuccess + '.png')
                imgNrSuccess++;
                showSuccessImg(nameImg);
            }, 50);

        }
    }

    function ShowWrongAvatar(e) {
        var nameImg = 'e';
        var maxWrong = 8;
        if (imgNrWrong < maxWrong) {
            pos = (132 * imgNrWrong) * -1;
            $('.avatar_anim').css("background-position-x", pos);
            imgNrWrong++;
        } else {
            imgNrWrong = 0;
            $('.avatar_anim').css("background-position-x", imgNrWrong);
            imgNrWrong++;
        }
    }
}