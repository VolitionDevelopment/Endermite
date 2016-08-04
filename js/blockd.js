/**
 * Created by Jackson on 7/31/16.
 */

$(document).ready(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });

    var mainbottom = $('.top').offset().top + $('.top').height() - 250;

    // on scroll,
    $(window).on('scroll',function(){
        // we round here to reduce a little workload
        var stop = Math.round($(window).scrollTop());

        if (stop > mainbottom) {
            $('.navigation').addClass('nav-fixed');
            $('.brand').removeClass('hidden');
        } else {
            $('.navigation').removeClass('nav-fixed');
            $('.brand').addClass('hidden');
        }

    });

    $(function(){
        $('.mixitup').mixItUp({
            animation: {
                duration: 390,
                effects: 'fade stagger(34ms) scale(0.45)',
                easing: 'ease'
            }
        });
    });

    $('#staffModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var username = button.data('username'); // Extract info from data-* attributes
        var description = button.data('desc'); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        modal.find('.modal-title').text('Viewing Profile: ' + username);
        modal.find('.modal-body').html("<img style='margin: auto; display: block;' src='https://mc-heads.net/avatar/" + username + "/100'><hr><p>" + description + "</p>");
    })
});