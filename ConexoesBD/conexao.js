// Nome: Luiz Fernando Menezes
// Objetivo: CRUD de Jogos com Classes, Async/Await e Banco de Dados
import mysql from 'mysql2/promise';

export default class JogoDB {
    static async connect() {
        // conexão utilizando a versão promise do mysql2
        return await mysql.createConnection({
            host: "localhost",
            user: 'root',
            password: 'admin',
            database: 'loja' // Nome do banco de dados
        });
    }

    // Listar todos os jogos
    static async getJogos() {
        const connection = await JogoDB.connect();
        try {
            const sql = "SELECT * FROM jogo";
            const [rows] = await connection.execute(sql);
            return rows;
        } catch (error) {
            throw error;
        } finally {
            await connection.end();
        }
    }

    // Consulta por ID
    static async getJogosById(id) {
        const connection = await JogoDB.connect();
        try {
            const sql = "SELECT id, nome, genero FROM jogo WHERE id = ?";
            const [rows] = await connection.execute(sql, [id]);
            return rows[0]; 
        } catch (error) {
            throw error;
        } finally {
            await connection.end();
        }
    }

    // Salvar no banco (Inserir)
    static async save(jogo) {
        const connection = await JogoDB.connect();
        try {
            const sql = "INSERT INTO jogo (nome, genero) VALUES (?, ?)";
            const [result] = await connection.execute(sql, [jogo.nome, jogo.genero]);
            jogo.id = result.insertId;
            return jogo;
        } catch (error) {
            throw error;
        } finally {
            await connection.end();
        }
    }

    // Atualizar banco de dados
    static async update(jogo) {
        const connection = await JogoDB.connect();
        try {
            const sql = "UPDATE jogo SET nome = ?, genero = ? WHERE id = ?";
            await connection.execute(sql, [jogo.nome, jogo.genero, jogo.id]);
            return jogo;
        } catch (error) {
            throw error;
        } finally {
            await connection.end();
        }
    }

    // Deletar por ID
    static async deletebyId(id) {
        const connection = await JogoDB.connect();
        try {
            const sql = "DELETE FROM jogo WHERE id = ?";
            const [result] = await connection.execute(sql, [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        } finally {
            await connection.end();
        }
    }
}