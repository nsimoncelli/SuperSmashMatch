$(document).ready(intializeApp);
// var mushroomKingdom = new Audio("./assets/images/mushroomkingdom.mp3");
// var mushroomIsPlaying = false;
// var hyruleSong = new Audio("./assets/images/hyrulecastle.mp3");
// var hyruleIsPlaying = false;
// var dreamlandSong = new Audio("./assets/images/Dreamland.mp3");
// var dreamLandIsPlaying = false;
var victorySound = new Audio("./assets/images/victorySong.mp3");
var myAudio = document.getElementById("myAudio");
var audienceDissapoint = new Audio("./assets/images/audience_dissapoint.wav");
var punchSoundOne = new Audio("./assets/images/punchsound1.wav");
var punchSoundTwo = new Audio("./assets/images/punchsound2.wav");
var punchSoundThree = new Audio("./assets/images/punchsound3.wav");
var isPlaying = false;
var firstCardClicked = null;
var firstCardImgSrc = null;
var secondCardClicked = null;
var secondCardImgSrc = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var games_played = 0;
var canBeClicked = true;

function intializeApp() {
    addCardsToBoard();
    addModalCloseHandler();
    displayStats();
    $('.card').click(handleCardClick);
    $('.gameReset').click(resetGame);
    // themeSongs();
}

// function themeSongs(){
//     isPlaying = true;
//     hyruleSong.play();
//     hyruleIsPlaying= true;
//     hyruleSong.addEventListener('ended', function(){
//         mushroomKingdom.play();
//         mushroomIsPlaying = true
//         hyruleIsPlaying = false
//     },false);
//     mushroomKingdom.addEventListener('ended', function(){
//         mushroomIsPlaying = false;
//         dreamlandSong.play();
//         dreamLandIsPlaying = true;
//     })
//     dreamlandSong.addEventListener('ended', function(){
//         dreamLandIsPlaying = false;
//         hyruleSong.play();
//         hyruleIsPlaying = true;
//     })
// }

function handleCardClick(event) {
    clickPunchSounds();
    if($(event.currentTarget).find('.back').css('display')==='block'){
        $(event.currentTarget).find('.back').addClass('hidden');
        $(event.currentTarget).find('.front').css("display", "inline-block");
        if(firstCardClicked===null){
            firstCardClicked = $(event.currentTarget);
        }else{
            attempts++
            secondCardClicked = $(event.currentTarget);
            var imgCard1 = firstCardClicked.find('.front').css('background-image');
            var imgCard2 = secondCardClicked.find('.front').css('background-image');
            if(imgCard1 === imgCard2){
                matches++;
                firstCardClicked = null;
                secondCardClicked = null;
            }else{
                audienceDissapoint.play();
                $('.card').unbind();
                setTimeout(flipCardsBack, 1000)
            }
        }
    }

    if (matches === max_matches) {
        myModal();
        resetStats();


    }
    displayStats();
}


function clickPunchSounds(){
    var randomPunchGen = Math.ceil(Math.random()*3);
    switch(randomPunchGen){
        case 1:
            punchSoundOne.play();
            break;
        case 2:
            punchSoundTwo.play();
            break;
        case 3: 
            punchSoundThree.play();
            break;
        default:
            break;
    }
}
function flipCardsBack() {
    firstCardClicked.find('.back').removeClass('hidden');
    firstCardClicked.find('.front').css("display","none");
    secondCardClicked.find('.back').removeClass('hidden');
    secondCardClicked.find('.front').css("display","none");
    firstCardClicked = null;
    secondCardClicked = null;
    $('.card').bind('click', handleCardClick);
}

function calculateAccuracy() {
    var calcAcc = Math.floor((matches / attempts) * 100);
    if (calcAcc == 0 || isNaN(calcAcc)) {
        return 0;
    } else {
        return calcAcc;
    }
}

// function stopMusic(){
//     if(hyruleIsPlaying){
//         hyruleSong.pause();
//         hyruleIsPlaying = false;
//     }else if(mushroomIsPlaying){
//         mushroomKingdom.pause();
//         mushroomIsPlaying = false;
//     }else if(dreamLandIsPlaying){
//         dreamlandSong.pause();
//         dreamLandIsPlaying = false;
//     }
// }
function myModal() {
    victorySound.play();
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
    $('.accuracy').text(accuracyResults + "%");
    $('#gamesPlayed').text(games_played);
    $('.attemptedGames').text(attempts);
}


function resetStats() {
    matches = null;
    attempts = 0;
    games_played += 1;
    displayStats();
    resetGame();
    
}

function addCardsToBoard() {
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
                    ];
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


function resetGame(){
    $('.card').remove();
    firstCardClicked = null;
    secondCardClicked = null;
    addCardsToBoard();
    $('.card').click(handleCardClick);

}
