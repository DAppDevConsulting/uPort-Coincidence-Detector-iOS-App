$(function() {
    var query = window.location.search; // ?requestId=...
    query += '&'+window.location.hash.substr(1); // &access_token=...

    $.get('/save-access-token'+query).then(function(){
        $('#status').text('Profile saved!');

        var cdDemoAppUrl = 'cdUportDemoCustomURLScheme://profile'+window.location.search;
        $('#app-switch').attr('href', cdDemoAppUrl);
        $('#get-profile').attr('href', '/profile'+window.location.search);
        location.assign(cdDemoAppUrl);
    })
})
