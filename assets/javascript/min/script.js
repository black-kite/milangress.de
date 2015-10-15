
//jshint jquery : true

$.fn.tclouds = function() {
    'use strict';    
    var tcEl = this;    
    $('body').append('<div id="bildbeschreibung"/>');
    $(document).mousemove(function(mTC){
        var textwith = $("#bildbeschreibung").width();
        $("#bildbeschreibung").css({top:(mTC.pageY+5)+"px",left:(mTC.pageX-textwith/2)+"px"});
    });
    tcEl.each(function(){
     var el = $(this);
     var ti = el.attr('title');   
     el.hover(function(){
        $('#bildbeschreibung').fadeTo(300, 1).html( ti );        
        el.attr('title', '');
    },function(){
        $('#bildbeschreibung').hide().html('');
        el.attr('title', ti);
    });
 });
};


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
    var row = function (that){
        return $(that).closest('img');
    };
    $('.projects').on('click', 'img', function() {
        $('img').removeClass('is-yellow__border');
        row(this).toggleClass('is-yellow__border');
        $('.description').slideUp(250);
        $(this).closest('.projects_row').next().slideDown(250);
    });
$('.projects img').tclouds();
});
