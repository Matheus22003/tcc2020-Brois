// Verificar rivalsID

$('#reg_rivalsId').on('keypress', (function (e) {
    var regex = new RegExp("^[a-z0-9._\b]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
}));
$('#formReg').on("keyup touchstart", function (e) {


    var bloqueia = true
    // Receber dados do servidor


    //Nome
    var qtdeName = $('#reg_name').val();
    //Sobrenome
    var qtdeSobrenome = $('#reg_sobrenome').val();
    //rivalsId
    var rivalsid = $('#reg_rivalsId').val();
    //email
    var email = $('#reg_email').val();
    //Data
    // var data = $('reg_dataNasci').val();
    //Telefone
    var telefone = $('#reg_celular').val()

    // Socket 

    socket.emit('id', rivalsid)
    const dados = socket.on('dados', function (msg) {
        // False = Nick Usado
        // True = nick livre
        if (qtdeName.length == 0 || qtdeSobrenome.length == 0 || rivalsid.length == 0 || email.length == 0 || msg == false) {
            bloqueia = true
        }
        else if (qtdeName.length < 3 || qtdeSobrenome.length < 3 || rivalsid.length <= 1 || telefone.length < 15 || msg == false) {
            bloqueia = true
        }
        else {
            bloqueia = false
        }


        if (bloqueia == true) {
            $("#proxBTN").addClass('disabledModal');
            $("#proxBTN").addClass('disabled');
            $("#proxBTN").attr("disabled", "disabled");
            $("#proxRegistro").addClass('disabled');
            $("#proxRegistro").attr("disabled", "disabled")
        }
        else if (bloqueia == false) {
            $("#proxRegistro").removeClass("disabled")
            $("#proxBTN").removeClass('disabledModal');
            $("#proxBTN").removeClass("disabled")

            $("#proxRegistro").removeAttr("disabled");
            $("#proxBTN").removeAttr("disabled");
        }

    })

    var bloqueiaDois = true

    let exibicao = $('[name="reg_exibicaoTag"]').val();
    let senhaUm = $(`#reg_senha`).val();
    let senhaDois = $(`#reg_senhaConfirma`).val();

    if (exibicao.length == 0 || senhaUm.length == 0 || senhaDois.length == 0) {
        bloqueiaDois = true;
    }
    else if (exibicao == null || senhaUm == null || senhaDois == null || exibicao == " ") {
        bloqueiaDois = true;
    }
    else if (senhaUm != senhaDois) {
        bloqueiaDois = true;
    }
    else {
        bloqueiaDois = false;
    }

    if (bloqueiaDois == true) {
        $("#regFinal").addClass('disabledModal');
        $("#regFinal").addClass('disabled');
        $("#regFinal").attr("disabled", "disabled");
    }
    else if (bloqueiaDois == false) {
        $("#regFinal").removeClass('disabledModal');
        $("#regFinal").removeClass("disabled")
        $("#regFinal").removeAttr("disabled");
    }



})