$(function() {
    $('.controllButton').each(function(_, e) {
        $(e).click(function() {
            var id = $(e).attr('id');
            $.post('/send_key', {id: id}, function() {});
        });
    });
});
