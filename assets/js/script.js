$(document).ready(intializeApp);

function intializeApp() {

    var firstCardClicked = null;
    var secondCardClicked = null;
    var matches = null;

    $('.card').click(handleCardClick);

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
        } else {
            console.log("cards do not match");
            setTimeout(function() {
                $('.back').removeClass('hidden');
            }, 1500);
            // $('.back').delay('1.5').removeClass('hidden');
        }
    }
}