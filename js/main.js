$(document).ready(function(){
    
    cargaImagenes();
});

function cargaImagenes(){
    fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=13735cc8fc9f3e09d117e50d19e812e8")
        .then(res => res.json())
        .then(result => {
            for (let i = 0; i < 5; i++) {
                var movie = result.results[i];
                let html = '<div class="card clicable" onclick="location.href = \'?action=movie&movieid=' + movie.id + '\'">' +
                    '<img class="card-img-top" src="https://image.tmdb.org/t/p/w500/' + movie.poster_path + '" alt="' + movie.title + '"/>' +
                    '</div>';
                $('#top5').append(html);
            }
        });
}