$('#abrirLoginFecharRegistro').click(function (e) {
    e.preventDefault();

    $('#modalRegister')
        .modal('hide')
        .on('hidden.bs.modal', function (e) {
            //$('#modalLogin').modal('show');

            $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
        });

});

$('#fecharLoginAbrirRegistro').click(function (e) {
    e.preventDefault();

    $('#modalLogin')
        .modal('hide')
        .on('hidden.bs.modal', function (e) {
            $('#modalRegister').modal('show');

            $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
        });

});


//Segunda Perte Registro

// $('#proxRegistro').click(function (e) {
//     e.preventDefault();

//     $('#modalRegister')
//     // .removeClass("show")
//         .modal('hide')
//         .on('hidden.bs.modal', function (e) {
//             $('#segundaParteReg').modal('show');

//             $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
//         });

// });
$('#proxRegistro').click(function (e) {
    e.preventDefault();

    $('#modalRegister')
        // .removeClass("show")
        .modal('hide')
        .on('hidden.bs.modal', function (e) {
            $('#segundaParteReg').modal('show');
            $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
        });

});

//Voltar form cad

$('#voltarCad').click(function (e) {
    e.preventDefault();

    $('#segundaParteReg')
        .modal('hide')
        .on('hidden.bs.modal', function (e) {
            $('#modalRegister').modal('show');

            $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
        });

});

