var express = require("express")
var router = express.Router()
var database = require("./../database/conexao")

router.post("/mandarMensagem", function (req, res) {
    var instrucao =
    `
    insert into mensagem (dono, texto) values ('${req.body.nome}', '${req.body.texto}');
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

router.get("/buscarUltimoId", function (req, res) {
    var instrucao =
    `
    select max(idMensagem) as id from mensagem;
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
router.get("/buscarNovasMensagens/:valores", function (req, res) {

    var instrucao =
    `
    select * from mensagem where idMensagem > ${req.params.valores};
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