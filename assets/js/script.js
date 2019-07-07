$(document).ready(intializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var games_played = 0;
var canBeClicked = true;
var teacherNames = ['dan', 'dan', 'cody', 'cody', 'brett', 'brett', 'andy', 'andy', 'bill', 'bill', 'scott', 'scott', 'timd', 'timd', 'timh', 'timh', 'tj', 'tj']

function intializeApp() {

    addCardsToBoard();
    addModalCloseHandler();
    displayStats();
    $('.card').click(handleCardClick);
}

function handleCardClick(event) {
    if (!canBeClicked) {
        return;
    }
    
    $(this).find('.back').hide();
    $(this).find('.front').show();
    if (firstCardClicked === null) {
        firstCardClicked = $(this);
        firstCardClicked.off();
        return;
    } else {
        secondCardClicked = $(this);
        canBeClicked = false;
    }
    var firstCardImgSrc = firstCardClicked.find('.front').css("background-image");
    var secondCardImgSrc = secondCardClicked.find('.front').css("background-image");
    if (firstCardImgSrc === secondCardImgSrc) {
        matches += 1;
        firstCardClicked = null;
        secondCardClicked = null;
        attempts += 1;
        displayStats();
        canBeClicked = true;
    } else {
        attempts += 1;
        setTimeout(function() {
            $(firstCardClicked).find('.back').show();
            $(firstCardClicked).click(handleCardClick)
            $(firstCardClicked).find('.front').hide();
            $(secondCardClicked).find('.back').show();
            $(firstCardClicked).click(handleCardClick);
            $(secondCardClicked).find('.front').hide();
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

function addCardsToBoard() {
    while (teacherNames.length > 0) {
        var actualCard = $('<div>').addClass('card');
        var cardFace = $('<div>').addClass('front').hide();
        var cardBack = $('<div>').addClass('back');
        var name = teacherNames.splice(Math.floor(Math.random() * teacherNames.length - 1), 1);
        console.log("teacher name appending working: " + name);
        name = name.toString();
        cardFace.addClass(name);
        // $(actualCard).append(cardFace);
        $(actualCard).append(cardBack);
        $(actualCard).append(cardFace);
        $('.cardContainer').append(actualCard);
    }
}