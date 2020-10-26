<?php
class Controller{
    private $model;

    public function __construct($model){
		$this->model = $model;
	}

	public function novedades() {
		$this->model->string = "novedades.html";
		$this->model->scripts = "novedades.js";
		$this->model->styles = "novedades.css";
		if (isset($_SESSION['login_user'])){
			$this->model->logged = TRUE;
		}
	}

	public function buscar() {
		$this->model->string = "buscar.html";
		$this->model->scripts = "buscar.js";
		$this->model->styles = "buscar.css";
		if (isset($_SESSION['login_user'])){
			$this->model->logged = TRUE;
		}
	}

	public function about() {
		$this->model->string = "about.html";
		$this->model->scripts = "about.js";
		$this->model->styles = "about.css";
		if (isset($_SESSION['login_user'])){
			$this->model->logged = TRUE;
		}
	}

	public function movie(){
		$this->model->string = "movie.html";
		$this->model->scripts = "movie.js";
		$this->model->styles = "movie.css";
		if (isset($_SESSION['login_user'])){
			$this->model->logged = TRUE;
		}
	}

	public function mainPage(){
		$this->model->string = "main.html";
		$this->model->scripts = "main.js";
		$this->model->styles = "main.css";
		if (isset($_SESSION['login_user'])){
			$this->model->logged = TRUE;
		}
	}

	public function comentario(){
		$result = $this->model->setComment($_POST['idPelicula'], $_SESSION['login_user'], $_POST['entradaValoracion'], $_POST['comentario']);
		if ($result) {
			$this->model->message = '<div class="alert alert-success text-center" role="alert">
			Has comentado la pelicula
		</div>';
		} else {
			$this->model->message = '<div class="alert alert-danger text-center" role="alert">
			No se pudo comentar la pelicula
		</div>';
		}
		$this->movie();
	}

	public function login() {
		// Verificamos que se hayan introducido los datos esperados.
		// Estos datos nos vienen por POST y deben ser el usuario y la contraseña
		// En ningún momento guardamos la contraseña, una vez nos llega obtenemos directamente su hash
		if (!isset($_POST['username']) || $_POST['username'] == ''){
			die();
		}
		if (!isset($_POST['pass']) || $_POST['pass'] == ''){
			die();
		}

		// Aquí damos por hecho que han introducido un usuario y una contraseña, comprobamos estos con los de la base de datos
		$user = $_POST['username'];
		$pass = getHash($_POST['pass']);
		
		$loginResult = $this->model->getUserLogin($user, $pass);
		if ($loginResult){
			session_abort();
			echo '1';
			session_start();
			$_SESSION['login_user'] = $user;
			$this->model->logged = TRUE;
		}else{
			echo '2';
		}
		die();
	}

	public function register(){
		// Verificamos que se hayan introducido los datos esperados.
		// Estos datos nos vienen por POST y deben ser el usuario, el email, y la contraseña repetida 2 veces
		// En ningún momento guardamos la contraseña, una vez nos llega obtenemos directamente su hash

		if (!isset($_POST['usernameR']) || $_POST['usernameR'] == ''){
			echo "Campo usuario obligatorio.";
			die();
		}
		if (!isset($_POST['passR']) || $_POST['passR'] == ''){
			echo "Campo contraseña obligatorio.";
			die();
		}
		if (!isset($_POST['passR2']) || $_POST['passR2'] == ''){
			echo "Campo repetir usuario obligatorio.";
			die();
		}
		if (!isset($_POST['email']) || $_POST['email'] == ''){
			echo "Campo email obligatorio.";
			die();
		}

		// A partir de aquí significa que ya tenemos rellenados los campos. Primero comprobamos que las contraseñas coiniciden.
		if ($_POST['passR'] != $_POST['passR2']){
			echo "Las contraseñas no coinciden.";
			die();
		}

		if (strlen($_POST['passR']) < 5){
			echo "La contraseña debe contener al menos 5 caracteres";
			die();
		}

		// A partir de aquí consideramos que los datos son válidos y los introducimos en la BD como un nuevo usuario
		if ($this->model->registerUser($_POST['usernameR'], $_POST['email'], getHash($_POST['passR']))){
			echo "1";
		}else{
			echo "Error en el registro. Datos incorrectos o repetidos.";
		}
		die();
	}
}

function getHash($password){
	return sha1($password);
}
?>