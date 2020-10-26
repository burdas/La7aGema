$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var parametro = urlParams.get('action');
    if (parametro == 'about') {
        $('#navAbout').addClass('active');
    }
});