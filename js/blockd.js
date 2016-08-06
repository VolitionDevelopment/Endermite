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
            },
            controls: {
                toggleFilterButtons: true,
                toggleLogic: 'and'
            }
        });
    });

    // To keep our code clean and modular, all custom functionality will be contained inside a single object literal called "buttonFilter".

    var buttonFilter = {

        // Declare any variables we will need as properties of the object

        $filters: null,
        $reset: null,
        groups: [],
        outputArray: [],
        outputString: '',

        // The "init" method will run on document ready and cache any jQuery objects we will need.

        init: function(){
            var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.

            self.$filters = $('#Filters');
            self.$reset = $('#Reset');
            self.$container = $('#Container');

            self.$filters.find('fieldset').each(function(){
                self.groups.push({
                    $buttons: $(this).find('.filter'),
                    active: ''
                });
            });

            self.bindHandlers();
        },

        // The "bindHandlers" method will listen for whenever a button is clicked.

        bindHandlers: function(){
            var self = this;

            // Handle filter clicks

            self.$filters.on('click', '.filter', function(e){
                e.preventDefault();

                var $button = $(this);

                // If the button is active, remove the active class, else make active and deactivate others.

                $button.hasClass('btn-fill') ?
                    $button.removeClass('btn-fill') :
                    $button.addClass('btn-fill').siblings('.filter').removeClass('btn-fill');

                self.parseFilters();
            });

            // Handle reset click

            self.$reset.on('click', function(e){
                e.preventDefault();

                self.$filters.find('.filter').removeClass('btn-fill');

                self.parseFilters();
            });
        },

        // The parseFilters method checks which filters are active in each group:

        parseFilters: function(){
            var self = this;

            // loop through each filter group and grap the active filter from each one.

            for(var i = 0, group; group = self.groups[i]; i++){
                group.active = group.$buttons.filter('.btn-fill').attr('data-filter') || '';
            }

            self.concatenate();
        },

        // The "concatenate" method will crawl through each group, concatenating filters as desired:

        concatenate: function(){
            var self = this;

            self.outputString = ''; // Reset output string

            for(var i = 0, group; group = self.groups[i]; i++){
                self.outputString += group.active;
            }

            // If the output string is empty, show all rather than none:

            !self.outputString.length && (self.outputString = 'all');

            console.log(self.outputString);

            // ^ we can check the console here to take a look at the filter string that is produced

            // Send the output string to MixItUp via the 'filter' method:

            if(self.$container.mixItUp('isLoaded')){
                self.$container.mixItUp('filter', self.outputString);
            }
        }
    };

// On document ready, initialise our code.

    $(function(){

        // Initialize buttonFilter code

        buttonFilter.init();

        // Instantiate MixItUp

        $('#Container').mixItUp({
            controls: {
                enable: false // we won't be needing these
            },
            callbacks: {
                onMixFail: function(){
                }
            }
        });
    });

    $('#staffModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var username = button.data('username'); // Extract info from data-* attributes
        var description = button.data('desc'); // Extract info from data-* attributes
        var modal = $(this);
        modal.find('.modal-title').text('Viewing Profile: ' + username);
        modal.find('.modal-body').html("<img style='margin: auto; display: block;' src='https://mc-heads.net/avatar/" + username + "/100'><hr><p>" + description + "</p>");
    })
});