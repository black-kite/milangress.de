$(document).ready(function () {
    var active;
    active = true;
    $('#navicon').click(function () {
        if (active === true) {
            $('#navicon')
            .removeClass('inactive')
            .addClass('active');

            $('ul.menu')
            .slideDown(250);

            active = false;
            return console.log(active);
        } else {
            $('#navicon')
            .removeClass('active')
            .addClass('inactive');

            $('ul.menu')
            .slideUp(250);

            active = true;
            return console.log(active);
        }
    });
});
