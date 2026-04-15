import express from 'express';
import bodyParser from 'body-parser';
import JogoDB from "./conexao.js";
import cors from 'cors';

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("API de Jogos - Luiz Menezes");
});

// Listar todos
app.get('/jogos', async function(req, res) {
    try {
        let jogos = await JogoDB.getJogos();
        res.json(jogos);
    } catch (error) {
        res.status(500).send("Erro ao buscar jogos");
    }
});

// Buscar por ID
app.get('/jogos/:id', async function (req, res) {
    try {
        let id = req.params.id;
        let jogo = await JogoDB.getJogosById(id);
        res.json(jogo);
    } catch (error) {
        res.status(500).send("Erro ao buscar o jogo");
    }
});

// Inserir novo
app.post('/jogos', async function (req, res) {
    try {
        let jogo = req.body;
        let jogoSalvo = await JogoDB.save(jogo);
        res.json(jogoSalvo);
    } catch (error) {
        res.status(500).send("Erro ao salvar o jogo");
    }
});

// Atualizar
app.put('/jogos', async function (req, res) {
    try {
        let jogo = req.body;
        let jogoAtualizado = await JogoDB.update(jogo);
        res.json(jogoAtualizado);
    } catch (error) {
        res.status(500).send("Erro ao atualizar o jogo");
    }
});

// Deletar
app.delete('/jogos/:id', async function (req, res) {
    try {
        let id = req.params.id;
        let deletado = await JogoDB.deletebyId(id);
        res.json({ mensagem: "Jogo removido com sucesso", linhasAfetadas: deletado });
    } catch (error) {
        res.status(500).send("Erro ao deletar o jogo");
    }
});

let server = app.listen(3000, function (){
    console.log("Servidor rodando em http://localhost:3000");
});