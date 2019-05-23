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
            firstCardClicked = $(this).find('.front').css("background-image");
        } else {
            secondCardClicked = $(this).find('.front').css("background-image");
        }
        console.log("first card click: ", firstCardClicked);
        console.log("second card click: ", secondCardClicked);

        if (firstCardClicked === secondCardClicked) {
            console.log("cards match");
            matches += 1;
        } else {
            console.log("cards do not match");
        }
    }
}