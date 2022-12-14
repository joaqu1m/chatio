var express = require("express")
var router = express.Router()
var database = require("./../database/conexao")

router.post("/mandarMensagem", function (req, res) {
    var instrucao =
    `
    insert into userMensagem (texto, fkUsuario) values ('${req.body.texto}', '${req.body.fkUsuario}');
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
    select max(idMensagem) as id from userMensagem;
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
    select idMensagem, nickname, texto from userMensagem join usuario on fkUsuario = idUsuario where idMensagem > ${req.params.valores};
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

router.get("/deletarMensagensAntigas/:valores", function (req, res) {
    
    var instrucao =
    `
    delete from userMensagem where idMensagem < ${req.params.valores - 49};
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