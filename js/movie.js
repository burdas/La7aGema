var urlParams;
var movieid;

$(document).ready(function () {
    urlParams = new URLSearchParams(window.location.search);
    movieid = urlParams.get('movieid');
    $('#idPelicula').val(movieid);
    $('#commentForm').attr('action', '?action=comentario&movieid=' + movieid);
    cargaPelicula();
    putHover();
    putLeave();
    putClicks();
    $('#bloqueValoraciones span').addClass('fa-2x');
    $('#btnAtras').on('click', function () {
        window.history.back();
    });
});

function cargaPelicula() {
    fetch("https://api.themoviedb.org/3/movie/" + movieid + "?api_key=13735cc8fc9f3e09d117e50d19e812e8&language=es")
        .then(res => res.json())
        .then(result => {
            console.log(result);
            $('#poster').attr('src', 'https://image.tmdb.org/t/p/w500/' + result.poster_path);
            $('#poster').attr('alt', result.title);
            $('#titulo').html(result.title);
            $('#sinopsis').html(result.overview + '<br>');
            result.genres.forEach(genero => {
                $('#generos').append('<span class="badge badge-dark">' + genero.name + '</span> ');
            });
            $('#generos').append('<br>');
            result.production_companies.forEach(productora => {
                $('#productoras').append('<span class="badge badge-dark">' + productora.name + '</span> ');
            });
            $('#productoras').append('<br>');
            $('#lanzamiento').append(' ' + result.release_date + '<br>');
            $('#web').append(' <a href="' + result.homepage + '" target="_blank">' + result.homepage + '</a><br>');
            var minutos = parseInt(result.runtime);
            var horas = Math.trunc(minutos / 60);
            minutos = minutos % 60;
            $('#duracion').append(horas + 'h ' + minutos + 'm');
            fetch(" https://api.themoviedb.org/3/movie/" + movieid + "/credits?api_key=13735cc8fc9f3e09d117e50d19e812e8")
                .then(res => res.json())
                .then(result => {
                    for (let i = 0; i < 10; i++) {
                        $('#reparto').append('<span class="badge badge-dark">' + result.cast[i].name + '</span> ');
                    }
                    if (result.cast[11].name != '') {
                        $('#reparto').append(' ...');
                    }
                    result.crew.forEach(personal => {
                        if (personal.job == 'Director') {
                            $('#directores').append('<span class="badge badge-dark">' + personal.name + '</span> ');
                        }
                    });
                });
        });
}

function resetStars() {
    $('#Estrella1').removeClass('checked');
    $('#Estrella2').removeClass('checked');
    $('#Estrella3').removeClass('checked');
    $('#Estrella4').removeClass('checked');
    $('#Estrella5').removeClass('checked');
}
function putHover() {
    $('#Estrella1').mouseover(mouseOverEstrella1);
    $('#Estrella2').mouseover(mouseOverEstrella2);
    $('#Estrella3').mouseover(mouseOverEstrella3);
    $('#Estrella4').mouseover(mouseOverEstrella4);
    $('#Estrella5').mouseover(mouseOverEstrella5);
}

function quitEvents() {
    for (let i = 1; i < 6; i++) {
        $('#Estrella' + i).off();
    }
}

function putLeave() {
    for (let i = 1; i < 6; i++) {
        $('#Estrella' + i).mouseleave(function () {
            resetStars();
            printStars();
        });
    }
}

function putClicks() {
    $('#Estrella1').click(clickEstrella1);
    $('#Estrella2').click(clickEstrella2);
    $('#Estrella3').click(clickEstrella3);
    $('#Estrella4').click(clickEstrella4);
    $('#Estrella5').click(clickEstrella5);
}

function printStars() {
    for (let i = 1; i <= $('#entradaValoracion').val(); i++) {
        $('#Estrella' + i).addClass('checked');
    }
}

function clickEstrella1() {
    $('#entradaValoracion').val(1);
    $('#btnEnviar').prop('disabled', false);
}

function mouseOverEstrella1() {
    resetStars();
    $('#Estrella1').addClass('checked');
}

function clickEstrella2() {
    $('#entradaValoracion').val(2);
    $('#btnEnviar').prop('disabled', false);
}

function mouseOverEstrella2() {
    resetStars();
    $('#Estrella1').addClass('checked');
    $('#Estrella2').addClass('checked');
}

function clickEstrella3() {
    $('#entradaValoracion').val(3);
    $('#btnEnviar').prop('disabled', false);
}

function mouseOverEstrella3() {
    resetStars();
    $('#Estrella1').addClass('checked');
    $('#Estrella2').addClass('checked');
    $('#Estrella3').addClass('checked');
}

function clickEstrella4() {
    $('#entradaValoracion').val(4);
    $('#btnEnviar').prop('disabled', false);
}

function mouseOverEstrella4() {
    resetStars();
    $('#Estrella1').addClass('checked');
    $('#Estrella2').addClass('checked');
    $('#Estrella3').addClass('checked');
    $('#Estrella4').addClass('checked');
}

function clickEstrella5() {
    $('#entradaValoracion').val(5);
    $('#btnEnviar').prop('disabled', false);
}

function mouseOverEstrella5() {
    resetStars();
    $('#Estrella1').addClass('checked');
    $('#Estrella2').addClass('checked');
    $('#Estrella3').addClass('checked');
    $('#Estrella4').addClass('checked');
    $('#Estrella5').addClass('checked');
}
