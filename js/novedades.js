$(document).ready(function(){
    var urlParams = new URLSearchParams(window.location.search);
    var parametro = urlParams.get('action');
    if (parametro == 'novedades') {
        $('#navNovedades').addClass('active');
    }
    cargaImagenes();
});

function cargaImagenes(){
    fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=13735cc8fc9f3e09d117e50d19e812e8&primary_release_year=2019&language=es")
        .then(res => res.json())
        .then(result => {
            console.log(result);
            result.results.forEach(movie => {
                let html = '<div class="card clicable" onclick="location.href = \'?action=movie&movieid=' + movie.id + '\'">' +
                    '<img class="card-img-top" src="https://image.tmdb.org/t/p/w500/' + movie.poster_path + '" alt="' + movie.title + '"/>' +
                    '<div class="card-body">' +
                    '<p class="card-title text-center h5">' + movie.title + '</p>' +
                    '</div></div>'
                $('#novedades').append(html);
            });
        });
}