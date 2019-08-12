$(document).ready(intializeApp);

var firstCardClicked = null;
var firstCardImgSrc = null;
var secondCardClicked = null;
var secondCardImgSrc = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var games_played = 0;
var canBeClicked = true;
var characterNames = ['Bowser','Bowser', 'captainFalcon','captainFalcon', 'darkSamus','darkSamus', 'jigglyPuff', 'jigglyPuff','Luigi','Luigi', 'Mario','Mario', 'Ness','Ness', 'Pikachu', 'Pikachu', 'Yoshi',  'Yoshi'];
var characterImgUrl = [
                        './assets/images/BowserHeadSSBUWebsite.png',
                        './assets/images/BowserHeadSSBUWebsite.png',
                        './assets/images/CaptainFalconHeadSSBUWebsite.png',
                        './assets/images/CaptainFalconHeadSSBUWebsite.png',  
                        './assets/images/DarkSamusHeadSSBUWebsite.png',
                        './assets/images/DarkSamusHeadSSBUWebsite.png',
                        './assets/images/JigglypuffHeadSSBUWebsite.png',
                        './assets/images/JigglypuffHeadSSBUWebsite.png',
                        './assets/images/LuigiHeadSSBUWebsite.png',
                        './assets/images/LuigiHeadSSBUWebsite.png',
                        './assets/images/MarioHeadSSBUWebsite.png',
                        './assets/images/MarioHeadSSBUWebsite.png',
                        './assets/images/NessHeadSSBUWebsite.png',
                        './assets/images/NessHeadSSBUWebsite.png',
                        './assets/images/PikachuHeadSSBUWebsite.png',
                        './assets/images/PikachuHeadSSBUWebsite.png',
                        './assets/images/YoshiHeadSSBUWebsite.png',
                        './assets/images/YoshiHeadSSBUWebsite.png'
                    ] 
// var teacherNames = ['dan', 'dan', 'cody', 'cody', 'brett', 'brett', 'andy', 'andy', 'bill', 'bill', 'scott', 'scott', 'timd', 'timd', 'timh', 'timh', 'tj', 'tj']

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
    debugger;
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
    firstCardImgSrc = firstCardClicked.find('.front').css("background-image");
    secondCardImgSrc = secondCardClicked.find('.front').css("background-image");
    // debugger;
    if (firstCardImgSrc === secondCardImgSrc) {
        matches += 1;
        firstCardImgSrc = null;
        secondCardImgSrc = null;
        firstCardClicked = null;
        secondCardClicked = null;
        attempts += 1;
        displayStats();
        canBeClicked = false;
        setTimeout(function(){
            canBeClicked = true;
        }, 1500)
        // canBeClicked = true;
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
            firstCardImgSrc = null;
            secondCardImgSrc = null;
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
    // while (teacherNames.length > 0) {
    //     var actualCard = $('<div>').addClass('card');
    //     var cardFace = $('<div>').addClass('front').hide();
    //     var cardBack = $('<div>').addClass('back');
    //     var name = teacherNames.splice(Math.floor(Math.random() * teacherNames.length - 1), 1);
    //     console.log("teacher name appending working: " + name);
    //     name = name.toString();
    //     cardFace.addClass(name);
    //     $(actualCard).append(cardBack);
    //     $(actualCard).append(cardFace);
    //     $('.cardContainer').append(actualCard);
    // }
    while(characterNames.length>0){
            var characterIndex = Math.floor(Math.random()*characterNames.length-1);
            var chosenCharacter = characterNames.splice(characterIndex, 1);
            var chosenCharacterUrl = characterImgUrl.splice(characterIndex, 1).toString();
            var actualCard = $('<div>').addClass('card');
            var cardFace = $('<div>',{
                'charName': chosenCharacter
            }).addClass('front')
            .css(
                "background-image", "url("+chosenCharacterUrl+")"
            )
            .hide();
            var cardBack = $('<div>').addClass('back');
            $(actualCard).append(cardBack);
            $(actualCard).append(cardFace);
            $('.cardContainer').append(actualCard);
            }
        


}

