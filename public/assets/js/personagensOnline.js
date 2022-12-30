// Jogadores serão inseridos aqui

let players = []

// Funções de ação dos personagens

function checarOutOfBounds(orientacao, medida, character) {
    if (orientacao >= gameStart[`offset${medida}`] - (character[`offset${medida}`] / 2)) {
        return gameStart[`offset${medida}`] - character[`offset${medida}`]
    } else {
        return orientacao < character[`offset${medida}`] / 2 ? 0 : orientacao - (character[`offset${medida}`] / 2)
    }
}

function pegarPosicaoAtual(sentido, character) {
    let margem = getComputedStyle(character)[`margin${sentido}`]
    return Number(margem.substring(0, margem.indexOf('px')))
}

function moverChar(x, y, tempo, character) {
    let personagem = character.style
    personagem.transition = `margin ${tempo}s linear`
    personagem.marginLeft = `${x}px`
    personagem.marginTop = `${y}px`
}

function olharPara(x, y, p) {
    p.deg = Math.atan2(p.coordsAtuais.y + (window[p.id].offsetHeight / 2) - y, p.coordsAtuais.x + (window[p.id].offsetWidth / 2) - x) * 180 / Math.PI
    console.log(p)
    window[p.id].style.transform = `rotate(${p.deg - 90}deg)`
}

function movimentacao(p) {
    if (p.emMovimento) {
        p.coordsAtuais = {x: pegarPosicaoAtual("Left", window[p.id]), y: pegarPosicaoAtual("Top", window[p.id])}
        moverChar(p.coordsAtuais.x, p.coordsAtuais.y, 0, window[p.id])
    }

    p.emMovimento = true

    olharPara(p.coordsFuturas.x, p.coordsFuturas.y, p)

    let tempo = ((((p.coordsFuturas.y - p.coordsAtuais.y)**2) + ((p.coordsFuturas.x - p.coordsAtuais.x)**2))**(1/2)) / p.moveSpeed
    clearTimeout(desligarMovimento)
    var desligarMovimento = setTimeout(() => {
        console.log("wtf")
        p.emMovimento = false
    }, tempo*1000)

    moverChar(p.coordsFuturas.x, p.coordsFuturas.y, tempo, window[p.id])

    p.coordsAtuais = {x: p.coordsFuturas.x, y: p.coordsFuturas.y}
}