$(document).ready(() => {
    var din = $('#dinheiro').text();
    din = din.toString().replace('.', ',');
    din = din.replace('                                                ', ' ')
    $('#dinheiro').text(din)
})