$(document).ready(intializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var games_played = null;

function intializeApp() {

    addModalCloseHandler();
    displayStats();

    $('.card').click(handleCardClick);
}

function handleCardClick(event) {
    $(this).find('.back').addClass('hidden');
    console.log("this is : ", this)
    if (firstCardClicked === null) {
        firstCardClicked = $(this)
        return;
    } else {
        secondCardClicked = $(this)
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
    } else {
        console.log("cards do not match");
        attempts += 1;
        setTimeout(function() {
            $(firstCardClicked).find('.back').removeClass('hidden');
            $(secondCardClicked).find('.back').removeClass('hidden');
            firstCardClicked = null;
            secondCardClicked = null;
        }, 1500);
        displayStats();

    }

    if (matches === max_matches) {
        console.log("you win the matching game");
        games_played += 1;
        myModal();
        setTimeout(function() {
            $('.back').removeClass('hidden');

        }, 500);
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