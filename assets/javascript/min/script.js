
//jshint jquery : true

/*
*
* Beschreibung - jQuery-Plugin
*
* adds the Title-Attribute from the element
* as a DOM element at the mouseposition
*
* @author: Milan Gress, dev@milangress.de
* @use: $('sector').beschreibung();
*/
$.fn.beschreibung = function() {
    'use strict';    
    var bsElement = this;    
    $('body').append('<div id="bildbeschreibung"/>');
    $(document).mousemove(function(mTC){
        var textwith = $('#bildbeschreibung').width();
        $('#bildbeschreibung').css({top:(mTC.clientY+1)+'px',left:(mTC.clientX-textwith/2)+'px'});
    });
    bsElement.each(function(){
     var bsSub = $(this);
     var bsTitel = bsSub.attr('title');   
     bsSub.hover(function(){
        $('#bildbeschreibung').fadeTo(300, 1).html( bsTitel );        
        bsSub.attr('title', '');
    },function(){
        $('#bildbeschreibung').hide().html('');
        bsSub.attr('title', bsTitel);
    });
 });
};
/*
* END (Beschreibung - jQuery-Plugin)
*/


$(document).ready(function () {
    'use strict';
    var active = true;
    $('#navicon').click(function () {
        if (active === true) {
            $('#navicon')
            .removeClass('inactive')
            .addClass('active');

            $('ul.menu')
            .slideDown(250);

            $('body').addClass('is-yellow');
            active = false;
        } else {
            $('#navicon')
            .removeClass('active')
            .addClass('inactive');

            $('ul.menu')
            .slideUp(250);

            $('body').removeClass('is-yellow');

            active = true;
        }
    });
    /*
    var row = function (that){
        return $(that).closest('img');
    };
    $('.projects').on('click', 'img', function() {
        $('img').removeClass('is-yellow__border');
        row(this).toggleClass('is-yellow__border');
        $('.description').slideUp(250);
        $(this).closest('.projects_row').next().slideDown(250);
    });
    */

    $('.projects img').beschreibung();
});
