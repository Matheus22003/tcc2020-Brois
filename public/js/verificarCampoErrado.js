function varificarCampoNumeroFixo(id, valorDeCaracteresFixo, mensagem) {
    $(`#${id}`).on("keyup touchstart", () => {

        var val = $(`#${id}`).val().length
        if (val < valorDeCaracteresFixo) {
            $(`#${id}`).removeClass("is-valid").addClass(`is-invalid`)
            if ($(`#err${id}`).length) {
            }
            else {
                $(`<div id="err${id}" class="invalid-feedback">
                ${mensagem}
            </div>`).insertAfter(`#${id}`)
            }
        }
        else {
            $(`#${id}`).addClass("is-valid").removeClass(`is-invalid`)

        }
    })
}

function campoVazio(id) {
    $(`#${id}`).on("keyup touchstart", () => {
        var val = $(`#${id}`).val().length
        if (val <= 0) {
            $(`#${id}`).removeClass("is-valid").addClass(`is-invalid`)
        } else {
            $(`#${id}`).addClass("is-valid").removeClass(`is-invalid`)
        }
    })
}