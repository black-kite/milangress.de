$(document).ready(function(){"use strict";var e=!0;$("#navicon").click(function(){e===!0?($("#navicon").removeClass("inactive").addClass("active"),$("ul.menu").slideDown(250),$("body").addClass("is-yellow"),e=!1):($("#navicon").removeClass("active").addClass("inactive"),$("ul.menu").slideUp(250),$("body").removeClass("is-yellow"),e=!0)});var s=function(e){return $(e).closest("img")};$(".projects").on("click","img",function(){$("img").removeClass("is-yellow__border"),s(this).toggleClass("is-yellow__border"),$(".description").slideUp(250),$(this).closest(".projects_row").next().slideDown(250)})});