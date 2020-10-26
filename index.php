<?php
    include './core/controller.php';
    include './core/model.php';
    include './core/view.php';

    $model = new Model();
    $controller = new Controller($model);
    $view = new View($controller, $model);
    session_start();
    if (isset($_GET['action']) && !empty($_GET['action'])) {
        $controller->{$_GET['action']}();
    }else{
        $controller->{"mainPage"}();
    }
?>

<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>La Séptima Gema</title>
    <meta name="robots" content="noindex">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Importamos bootstrap -->
    <link rel="stylesheet" href="./css/bootstrap/bootstrap.min.css">
    <link rel="icon" href="./img/favicon.ico">
    <!-- <link rel="stylesheet" href="./css/aplicacion.css"> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <?php
        echo $view->getStyles();
    ?>
</head>
<body>
    <!-- Mostramos lo que nos indique la vista dada la acción realizada -->
    <?php 
        echo $view->output();
    ?>

    <!-- Importamos las librerías de jquery, popper y bootstrap de javascript -->
    <script src="./js/bootstrap/jquery-3.4.0.min.js"></script>
    <script src="./js/bootstrap/popper.min.js"></script>
    <script src="./js/bootstrap/bootstrap.min.js"></script>

    <!-- Añadimos los scripts del usuario -->
    <?php
        echo $view->getScripts();
    ?>
</body>
</html>