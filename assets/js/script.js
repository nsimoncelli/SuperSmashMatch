$(document).ready(intializeApp);

function intializeApp() {

    var firstCardClicked = null;
    var secondCardClicked = null;
    var matches = null;
    var max_matches = 2;
    addModalCloseHandler();

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
            firstCardClicked = null;
            secondCardClicked = null;
        } else {
            console.log("cards do not match");
            setTimeout(function() {
                $(firstCardClicked).find('.back').removeClass('hidden');
                $(secondCardClicked).find('.back').removeClass('hidden');
                firstCardClicked = null;
                secondCardClicked = null;
            }, 1500);

        }

        if (matches === max_matches) {
            console.log("you win the matching game");
            myModal();
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
}