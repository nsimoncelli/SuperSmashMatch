$(document).ready(intializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var games_played = 0;
var canBeClicked = true;

function intializeApp() {

    addModalCloseHandler();
    displayStats();
    $('.card').click(handleCardClick);
}

function handleCardClick(event) {
    if (!canBeClicked) {
        return;
    }
    $(this).find('.back').addClass('hidden');
    console.log("this is : ", this);
    if (firstCardClicked === null) {
        firstCardClicked = $(this);
        return;
    } else {
        secondCardClicked = $(this);
        canBeClicked = false;
    }
    console.log("first card click: ", firstCardClicked);
    console.log("second card click: ", secondCardClicked);
    var firstCardImgSrc = firstCardClicked.find('.front').css("background-image");
    var secondCardImgSrc = secondCardClicked.find('.front').css("background-image");
    if (firstCardImgSrc === secondCardImgSrc) {
        console.log("cards match");
        matches += 1;
        firstCardClicked = null;
        secondCardClicked = null;
        attempts += 1;
        displayStats();
        canBeClicked = true;
    } else {
        console.log("cards do not match");
        attempts += 1;
        setTimeout(function() {
            $(firstCardClicked).find('.back').removeClass('hidden');
            $(secondCardClicked).find('.back').removeClass('hidden');
            firstCardClicked = null;
            secondCardClicked = null;
            canBeClicked = true;
        }, 1500);
        displayStats();
    }

    if (matches === max_matches) {
        console.log("you win the matching game");
        myModal();
        resetStats();

    }
    displayStats();
}

function calculateAccuracy() {
    var calcAcc = Math.floor((matches / attempts) * 100);
    if (calcAcc == 0 || isNaN(calcAcc)) {
        return 0;
    } else {
        return calcAcc;
    }
}


function myModal() {
    setTimeout(function() {
        $('.modal').css('display', 'block');

    }, 500);

}

function addModalCloseHandler() {

    $("body").click(function() {
        $(".modal").css('display', 'none');
    });
}

function displayStats() {
    var accuracyResults = calculateAccuracy();
    $('#accuracy').text(accuracyResults + "%");
    $('#gamesPlayed').text(games_played);
    $('#attemptedGames').text(attempts);


}

function resetStats() {
    matches = null;
    attempts = null;
    games_played += 1;
    displayStats();
    setTimeout(function() {
        $('.back').removeClass('hidden');

    }, 500);

}