// En este archivo se encuentra la lógica del login y registro en la parte cliente
$("#loginForm").submit(function (e) {
    e.preventDefault(); // Para que no se ejecute el submit, puesto que vamos a realizarlo a través de ajax

    var form = $(this);
    var url = "?action=login";

    $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(),
        success: function (data) {
            // Login realizado correctamente
            //alert(data);
            //location.reload();
            $('#loginModal').modal('toggle');
            $('.alert').remove();
            if (data == '1') {
                $('#cabecera').after('<div class="alert alert-success text-center" role="alert">' +
                'Login realizado correctamente</div>');
                setTimeout(function () {
                    location.reload();
                }, 4000);
            } else {
                $('#cabecera').after('<div class="alert alert-danger text-center" role="alert">' +
                'Usuario o contraseña incorrectos</div>');
            }
        },
        error: function (e) {
            console.log("Se ha producido un error en el login " + e);
            $('#cabecera').after('<div class="alert alert-danger text-center" role="alert">' +
                e + '</div>');
        }
    });
});

$("#registerForm").submit(function (e) {
    e.preventDefault(); // Para que no se ejecute el submit, puesto que vamos a realizarlo a través de ajax

    var form = $(this);
    var url = "?action=register";

    $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(),
        success: function (data) {
            $('#registerModal').modal('toggle');
            $('.alert').remove();
            if (data == '1') {
                $('#cabecera').after('<div class="alert alert-success text-center" role="alert">' +
                'Usuario registrado correctamente</div>');
            } else {
                $('#cabecera').after('<div class="alert alert-danger text-center" role="alert">' +
                data + '</div>');
            }
        }
    });
});
