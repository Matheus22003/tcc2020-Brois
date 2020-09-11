$(function () {
    var availableTags = [

    ];
    const dados = socket.on("listaUsers", (listaUsers) => {
        const id = $("#_id").val();

        for (let index = 0; index < listaUsers.length; index++) {
            const element = listaUsers[index];
            if (`${element._id}${element._id}` == id) {
                listaUsers.splice(index, 1);
            }
        }

        for (let i = 0; i < listaUsers.length; i++) {
            const element = listaUsers[i];
            availableTags[i] = element.rivalsId
        }
    })


    setTimeout(() => {
        // console.log(availableTags);
    }, 555)

    var inputAddAmigo = $("#addAmigo");
    inputAddAmigo.on('keyup touchstart', (e) => {
        if (inputAddAmigo.val().length < 2) {

        }
        else {
            $("#addAmigo").autocomplete({
                source: availableTags
            });
        }
    })

    $("#btnConvidar").on('click touchstart', (e) => {
        const id = $("#_id").val();
        var existe = false;
        for (let i = 0; i < availableTags.length; i++) {
            const element = availableTags[i];

            if (existe == true) {
                i = availableTags.length - 1
            }
            else {
                if (element == inputAddAmigo.val()) {
                    existe = true;
                }
                else {
                    existe = false;
                }
            }

        }

        if (existe == true) {
            // console.log(existe);
            socket.emit("addAmigoAtivado", true)
            // socket.emit(`addAmigo`,close())
            socket.emit("addAmigo", { rivalsId: id, rivalsIdRivalsAmgio: inputAddAmigo.val() })
            location.reload();
        }
        else {
            console.log(existe);
        }

    })



});