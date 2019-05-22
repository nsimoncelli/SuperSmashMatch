$(document).ready(intializeApp);

function intializeApp() {

    $('.card').click(handleCardClick);

    function handleCardClick(event) {
        $(this).find('.back').addClass('hidden');
    }
}