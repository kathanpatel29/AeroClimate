$(document).ready(function() {
    $('#iata-input').on('input', function() {
        var query = $(this).val();
        if (query.length > 1) {
            $.ajax({
                url: '/airport/suggestions',
                type: 'GET',
                data: { query: query },
                success: function(data) {
                    $('#iata-suggestions').empty();
                    data.forEach(function(item) {
                        $('#iata-suggestions').append('<option value="' + item.code + '">' + item.city + ' (' + item.name + ')</option>');
                    });
                }
            });
        }
    });
});
