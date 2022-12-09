process.env.AMBIENTE_PROCESSO = "local"
//process.env.AMBIENTE_PROCESSO = "cloud"

var express = require("express")
var cors = require("cors")
var path = require("path")
var PORTA = process.env.AMBIENTE_PROCESSO == "local" ? '1001' : '8080'

console.log(`> bibliotecas importadas com sucesso`)

var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use(cors())

app.use("/chat", require("./src/queries/chat"))

console.log(`> rotas definidas`)

app.listen(PORTA, function () {
    console.log(`> servidor do seu site já está rodando no endereço http://localhost:${PORTA} em ambiente ${process.env.AMBIENTE_PROCESSO}`)
})