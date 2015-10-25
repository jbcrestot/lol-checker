/**
 * Created by sulfa on 14/10/15.
 */
$(function() {
    // listener on row
    $('.ladderTable .row').not('.first').on('click', function(event) {
        // during the call
        var $this = $(this);
        $columns = $this.find('.columns');
        // check if summary exist
        if ($this.children('.summary').length) {
            switchIcon($this);
            $this.find('.summary').toggle();

            return;
        }

        $.get("/team/summary", function(data, textStatus) {
            switchIcon($this);
            // add new line under
            $this.append('<div class="column small-12 summary">'+ data +'</div>');
        });
    });
});

// reverse icon
var switchIcon = function($this) {
    $i = $this.find('.icon .fa');
    if ($i.hasClass('fa-sort-desc')) {
        $i.removeClass('fa-sort-desc').addClass('fa-sort-asc');
    } else {
        $i.removeClass('fa-sort-asc').addClass('fa-sort-desc');
    }
};