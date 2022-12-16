var express = require("express")
var router = express.Router()
var database = require("./../database/conexao")

router.post("/realizarCadastro", function (req, res) {
    var instrucao =
    `
    insert into usuario (nickname, senha, dataNasc) values ('${req.body.nickname}', '${req.body.senha}', '${req.body.dataNasc}');
    `

    console.log("Executando a instrução SQL: \n" + instrucao)
    database.executar(instrucao)
    .then(
        function (resultado) {
            res.json(resultado)
        }
    ).catch(
        function (erro) {
            console.log(erro)
            console.log(
                "\nHouve um erro ao realizar a inserção! Erro: ",
                erro.sqlMessage
            )
            res.status(500).json(erro.sqlMessage)
        }
    )
})

router.get("/validarLogin/:nickname/:senha", function (req, res) {
    var instrucao =
    `
    select * from usuario where nickname = '${req.params.nickname}' and senha = '${req.params.senha}';
    `
    console.log("Executando a instrução SQL: \n" + instrucao)
    database.executar(instrucao)
    .then(
        function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(
        function (erro) {
            console.log(erro)
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        }
    )
})

module.exports = router