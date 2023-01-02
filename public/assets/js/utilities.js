function trocarCaractere(texto, charAtual, charIntencionado) {
    novaString = texto
    while (novaString.indexOf(charAtual) > -1) {
        novaString = novaString.replace(charAtual, charIntencionado)
    }
    return novaString
}

function porcentagem(numero) {
    return visGrupos.offsetHeight * (0.01 * numero)
}