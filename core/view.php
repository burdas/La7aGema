<?php
class View
{
    private $model;
    private $controller;

    public function __construct($controller,$model) {
        $this->controller = $controller;
        $this->model = $model;
    }

    public function output() {
        if ($this->model->string == 'movie.html') {
            if (isset($_GET['movieid']) && $_GET['movieid'] != ''){
                return $this->outputMovie();
            }
        }
        return $this->model->getHeader().
            file_get_contents("./templates/" . $this->model->string);
    }

    public function getScripts() {
        return "<script>" . $this->model->getScripts() . "</script>";
    }

    public function getStyles() {
        return "<style>" . $this->model->getStyles() . "</style>";
    }

    private function montarComentarios($movieid){
        $comments = $this->model->getComments($movieid);
        $modeloComentario = file_get_contents('./templates/comentario.html');
        $listaComentarios = "";
        if ($comments->num_rows > 0) {
            while($row = $comments->fetch_assoc()) {
                $comment = $modeloComentario;
                $stars = $row['valoracion'];
                $starsString = $this->printStars($stars);
                $comment = str_replace('##STARS##', $starsString, $comment);
                $comment = str_replace('##USUARIO##', $row['nickname'], $comment);
                $comment = str_replace('##COMENTARIO##', $row['comentario'], $comment);
                $listaComentarios = $listaComentarios . $comment;
            }
        } else {
            $listaComentarios = str_replace('##STARS##', '', $modeloComentario);
            $listaComentarios = str_replace('card-title', 'card-title text-center', $listaComentarios);
            $listaComentarios = str_replace('##USUARIO##', 'No valorado por los usuarios', $listaComentarios);
            $listaComentarios = str_replace('##COMENTARIO##', '', $listaComentarios);
        }
        return $listaComentarios;
    }

    private function outputMovie(){
        $salida = $this->model->getHeader() . str_replace('##COMENTARIOS##', $this->montarComentarios($_GET['movieid']), file_get_contents('./templates/movie.html'));
        $boton = '';
        if ($this->model->logged) {
            $boton = '<button class="btn btn-primary btn-block btn-lg btn-comentar" id="comment" data-toggle="modal" data-target="#commentModal">Comentar</button>';
        } else {
            $boton = '<button class="btn btn-primary btn-block btn-lg btn-comentar" id="login" data-toggle="modal" data-target="#loginModal">Comentar</button>';
        }
        $cadena = str_replace('##BOTONCOMENTARIOS##', $boton, $salida);

        $valoracionMedia = $this->model->puntuacionMedia($_GET['movieid']);
        $estrellas = '';
        if ($valoracionMedia == 0) {
            $estrellas = '<p class="text-center">Pelicula sin valorar</p>';
        } else {
            $estrellas = $this->printStars($valoracionMedia);
        }
        return str_replace('##PUNTUACIONMEDIA##', $estrellas, $cadena);
    }

    private function printStars($nStars){
        $starsString = '';
        for ($i=0; $i < $nStars; $i++) { 
            $starsString = $starsString . '<span class="fa fa-star checked"></span>';
        }
        for ($i=0; $i < (5 -$nStars); $i++) { 
            $starsString = $starsString . '<span class="fa fa-star"></span>';
        }
        return $starsString;
    }
}
?>