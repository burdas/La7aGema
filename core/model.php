<?php
class Model
{
    public $string;
    public $scripts;
    public $logged;
    public $styles;

    public function __construct(){
        $this->string = "about.html";
        $this->scripts = "";
        $this->logged = FALSE;
        $this->styles = "";
        $this->message = "";
    }

    public function getHeader(){
        $salida = '';
        if ($this->logged){
            $salida =  str_replace("##USERNAME##", $_SESSION['login_user'], file_get_contents("./templates/headerLogged.html"));
        }else{
            $salida =  file_get_contents("./templates/header.html");
        }
        if ($this->message != '') {
            $salida = $salida . $this->message;
            $this->message = '';
        }
        return $salida;
    }

    public function getScripts() {
        if ($this->scripts == ""){
            return "";
        }

        return file_get_contents("./js/header.js"). "\n" .file_get_contents("./js/" . $this->scripts);
    }

    public function getStyles() {
        if ($this->styles == ""){
            return "";
        }
        return file_get_contents("./css/" . $this->styles);
    }


    public function getUserLogin($user, $pass){
        $connection = getConnection();
        $result = $connection->query("SELECT ID FROM usuarios WHERE nickname='$user' AND contrasena='$pass'");
        $rows = $result->num_rows;
        
        $connection->close();
        return $rows>0;
    }

    public function registerUser($username, $email, $pass){
        $connection = getConnection();
        $result = false;
        if ($connection->query("INSERT INTO usuarios(nickname, email, contrasena) VALUES ('$username', '$email', '$pass')")){
            //echo "Se ha registrado correctamente el usuario.";
            $result = true;
        }else{
            //echo "Error al registrar usuario: " . $connection->error;
            $result = false;
        }
        $connection->close();
        return $result;
    }

    public function getComments($movieid){
        $connection = getConnection();
        $result = $connection->query("SELECT nickname, valoracion, comentario FROM valoraciones v INNER JOIN usuarios u ON v.idUsuario = u.id WHERE idPelicula = $movieid");
        $connection->close();
        return $result;
    }

    public function setComment($idPelicula, $name, $valoracion, $comentario){
        $connection = getConnection();
        $result;
        if ($connection->query("INSERT INTO valoraciones (idPelicula, idUsuario, valoracion, comentario) VALUES ('$idPelicula', (SELECT id FROM usuarios where nickname = '$name'), '$valoracion', '$comentario')")) {
            $result = true;
        } else {
            $result = false;
        }
        $connection->close();
        return $result;
    }

    public function puntuacionMedia($movieid){
        $connection = getConnection();
        $result = $connection->query("SELECT ROUND(AVG(valoracion)) AS media FROM `valoraciones` WHERE idPelicula = '$movieid'");
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            return $row['media'];
        } else {
            return 0;
        }
        $connection->close();
        return $result;
    }
}

function getConnection() {
    //$connection = new mysqli(<Direccion>, <Usuario>, <Contraseña>, <NombreBD>);

    if ($connection->connect_error) {
        die('Error de conexión con BD ' . $connection->connect_errno . ' ' . $connection->connect_error);
    }
    return $connection;
}
?>
