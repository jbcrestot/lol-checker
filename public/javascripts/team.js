/**
 * Created by sulfa on 14/10/15.
 */
$(function() {
    // listener on row
    $('.ladderTable .row').not('.first').on('click', function(event) {

        console.log('click');
        // during the call
        $(this).append('<div class="row summary" .  . ""> ... <div>')
        $.get("/team/summary", function() {
            // success
        });
    });
});