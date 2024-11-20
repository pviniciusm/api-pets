import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { pets } from './pets.js';
import { randomUUID } from 'crypto';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Listar todos os Pets
// GET /pets
app.get("/pets", (req, res) => {
    try {
        res.status(200).send({
            ok: true,
            mensagem: "Pets listados com sucesso",
            dados: pets
        });
    } catch (error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
});

// Criar um novo pet
// POST /pets
app.post("/pets", (req, res) => {
    try {
        // 1 entrada
        const { nome, idade, raca, nomeTutor } = req.body;
        
        // 2 processamento
        const novoPet = {
            id: randomUUID(),
            nome,
            idade,
            raca,
            nomeTutor
        };

        pets.push(novoPet);

        // 3 saida
        res.status(201).send({
            ok: true,
            mensagem: "Pet criado com sucesso",
            dados: pets
        });
    } catch(error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
});

const porta = process.env.PORT;
app.listen(porta, () => {
    console.log(`O servidor está executando na porta ${porta}`);
});
