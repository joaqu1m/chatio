let ultimoIdProcurado = 0
let nomeAtual = ""

telaChatTexto.addEventListener("keydown", function(resposta) {
    if (resposta.key == "Enter") {
        resposta.preventDefault()
        mandarMensagem()
    }
})

function abrirChat(abrir) {
    if (abrir) {
        chat.style.height = "35vh"
        caixote.style.height = "80%"
        document.querySelectorAll('.areaInput').forEach(it => 
            it.style.height = "10%"
        )
        chatBotaoAbrirChatImagem.src = "./assets/imgs/Minus-Silhouette-Transparent-Image.png"
        chatBotaoAbrirChat.setAttribute("onclick","abrirChat(false)")
    } else {
        chat.style.height = "7vh"
        caixote.style.height = "0"
        document.querySelectorAll('.areaInput').forEach(it => 
            it.style.height = "50%"
        )
        chatBotaoAbrirChatImagem.src = "./assets/imgs/2137555-200.png"
        chatBotaoAbrirChat.setAttribute("onclick","abrirChat(true)")
    }
}

fetch("/chat/buscarUltimoId", {
    method: "GET"
})
.then(function (response) {
    if (response.ok) {
        response.json().then(function (resposta) {
            ultimoIdProcurado = resposta[0].id
            if (ultimoIdProcurado == null) {ultimoIdProcurado = 0}
            setInterval(buscarNovasMensagens, 250)
            setInterval(deletarMensagensAntigas, 30000)
        })
    }
})

function buscarNovasMensagens() {
    fetch(`/chat/buscarNovasMensagens/${ultimoIdProcurado}`, {
        method: "GET"
    })
    .then(function (response) {
        if (response.ok && response.statusText != "No Content") {
            response.json().then(function (resposta) {
                resposta = resposta.reverse()
                ultimoIdProcurado = resposta[resposta.length-1].idMensagem
                for (i = 0; i < resposta.length; i ++) {
                    if (resposta[i].nickname == nomeAtual) {
                        caixote.innerHTML += `<div class="mensagem">${resposta[i].texto}</div>`
                    } else {
                        caixote.innerHTML += `<div class="mensagem"><b style="font-size: 75%;">${resposta[i].nickname} diz:</b><br>${resposta[i].texto}</div>`
                    }
                    nomeAtual = resposta[i].nickname
                    caixote.scrollTop = caixote.scrollHeight
                }
            })
        }
    })
}

function deletarMensagensAntigas() {
    fetch(`/chat/deletarMensagensAntigas/${ultimoIdProcurado}`, {
        method: "GET"
    })
    .then(function (response) {
        if (response.ok && response.statusText != "No Content") {
            response.json().then(function (resposta) {
                console.log(resposta)
            })
        }
    })
}

function mandarMensagem() {
    if (telaChatTexto.value == "") {
        return
    }

    fetch("/chat/mandarMensagem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            texto: trocarCaractere(trocarCaractere(trocarCaractere(telaChatTexto.value, "  ", " "), "<", ""), ">", "").trim(),
            fkUsuario: localStorage.idUsuario
        })
    })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                telaChatTexto.value = ""
                if (resposta != null) {
                    console.log("Mensagem enviada com sucesso")
                }
            })
        }
    })
}