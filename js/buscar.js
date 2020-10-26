
$(document).ready(function(){
    
    $("#resultados").hide();
    cargarGeneros();
    fechaMinima();
    fechaMaxima();
    enterPressed();
    buscar();
    buscar2();
    ordenar();
    reset();
    modificar();

          
});

function buscar(){
    $("#buscar").on("click", function() {
        $('#resultados').show();
        $('#menuBusqueda').hide();
        var url="https://api.themoviedb.org/3/discover/movie?&api_key=13735cc8fc9f3e09d117e50d19e812e8&language=es";
        //Obtener los parametros de descubre
        var params="";
        if($("#desde").val()!=""){
            params+="&primary_release_date.gte="+$("#desde").val();
        }
        
        if($("#hasta").val()!=""){
            params+="&primary_release_date.lte="+$("#hasta").val();
        }
        if($("input:checked").length>0){
            var check=[];
            $("input:checked").get().forEach(opt=>
                check.push(opt.value));
            params+="&with_genres="+check.join(",");
        }
        if($("#minima").val()!=""){
            params+="&vote_average.gte="+$("#minima").val();
        }
        if($("#maxima").val()!=""){
            params+="&vote_average.lte="+$("#maxima").val();
        }
        url+=params;
        if(params!=""){
            
            var value = $("#query").val().toLowerCase();
            
            fetch(url)
            .then(res => res.json())
            .then(result => {
                result.results.forEach(movie => {
                    if(movie.title.toLowerCase().includes(value)){
                        let html = '<a class="link-peli" href="?action=movie&movieid='+movie.id+'"><div class="jumbotron jumbotron-fluid py-0" role="listitem">' +
                            '<div class="row">' +
                            '<div class="col">' +
                            '<img width="500px" class="card-img-top" src="https://image.tmdb.org/t/p/w500/' + movie.poster_path + '" alt="' + movie.title + '"/>' +
                            '</div>' +
                            '<div class="col-9">' +
                            '<div class="card-block">' +  
                            '<h5 class="card-title">' + movie.title + '</h5>' +
                            '<p class="card-text">' + movie.overview + '</p>' +
                            '</div></div></div></div></a>'
                        
                        $('#busqueda').append(html);   
                    }
                    
                
                });
            
            });
        }else{
            if($("#query").val()!=null){
                var query=$("#query").val().replace(" ","+");
                fetch("https://api.themoviedb.org/3/search/movie?&api_key=13735cc8fc9f3e09d117e50d19e812e8&language=es&page=1&query="+query)

                .then(res => res.json())
                .then(result => {
                
                    result.results.forEach(movie => {

                        let html = '<a class="link-peli" href="?action=movie&movieid='+movie.id+'"><div class="jumbotron jumbotron-fluid py-0" role="listitem">' +
                            '<div class="row">' +
                            '<div class="col">' +
                            '<img width="500px" class="card-img-top" src="https://image.tmdb.org/t/p/w500/' + movie.poster_path + '" alt="' + movie.title + '"/>' +
                            '</div>' +
                            '<div class="col-9">' +
                            '<div class="card-block">' +  
                            '<h5 class="card-title">' + movie.title + '</h5>' +
                            '<p class="card-text">' + movie.overview + '</p>' +
                            '<p class="card-text" hidden>' + movie.release_date + '</p>' +
                            '</div></div></div></div></a>'
                        
                        $('#busqueda').append(html);
                        
                    
                    });
                
                });
                
            }
        }
        
    });


    
} 

function ordenar(){
    $("#ordenar .dropdown-item").on("click",function(){
        var option=$(this).attr('id');
        var ordenados=$("#busqueda .jumbotron").sort(function(a,b){
            if ($(a).find("h5").text().toLowerCase() > $(b).find("h5").text().toLowerCase()) {
                return 1;
              }
              if ($(a).find("h5").text().toLowerCase() < $(b).find("h5").text().toLowerCase()) {
                return -1;
              }
              return 0;
        });
        if(option=="desc"){
           $('#busqueda').append(ordenados.get().reverse());
        }else{
            $('#busqueda').append(ordenados);
        }
        
        
        
    });
}



function cargarGeneros(){
    $('#generos').append('<div class="row">');
    var url="https://api.themoviedb.org/3/genre/movie/list?api_key=13735cc8fc9f3e09d117e50d19e812e8&language=es";
    fetch(url)
    .then(res => res.json())
    .then(result => {
        
        result.genres.forEach(genre => {
            let html = '<div class="col-2 form-check form-check-inline"><input type="checkbox" name="'+genre.name+'" value="'+genre.id+'" class="form-check-input"><label for="'+genre.name + ' class="form-check-label">' + genre.name + '</label>' + '</div>';    
            $('#generos').append(html);
            
            
        });
        
    });
    $('#generos').append('</div>');
        
}

function fechaMinima(){
    $("#hasta").on("click",function(){
        if($("#desde").val()!=null){
            $(this).attr("min",$("#desde").val());
        }
    });
}

function fechaMaxima(){
    $("#desde").on("click",function(){
        if($("#hasta").val()!=null){
            $(this).attr("max",$("#hasta").val());
        }
    });
}
function enterPressed(){
    $(document).keypress(function(event) {
    if (event.keyCode === 13) {
        $("#buscar").click();
    }
});
}
function buscar2(){
    $("#buscar2").on("click", function() {
        $("#buscar").click();
    });
}

function reset(){
    $('#nueva').on("click",function(){
        location.reload();
    });
}
function modificar(){
    $('#modificar').on("click",function(){
        $("#resultados").hide();
        $('#menuBusqueda').show();
    });
}