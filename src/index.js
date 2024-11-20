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

// Obter um pet pelo seu ID
// GET /pets/:id
app.get("/pets/:id", (req, res) => {
    try {
        // 1 entrada
        const { id } = req.params;

        // 2 processamento
        const pet = pets.find(item => item.id === id);
        if(!pet) {
            return res.status(404).send({
                ok: false,
                mensagem: "Pet não foi encontrado"
            });
        }

        // 3 saida
        res.status(200).send({
            ok: true,
            mensagem: "Pet obtido com sucesso",
            dados: pet
        });
    } catch (error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
});

// Atualizar um pet existente
// PUT /pets/:id
app.put("/pets/:id", (req, res) => {
    try {
        // 1 entrada
        const { id } = req.params;
        const { nome, raca, idade, nomeTutor } = req.body;

        // 2 processamento
        const pet = pets.find(item => item.id === id);
        if(!pet) {
            return res.status(404).send({
                ok: false,
                mensagem: "Pet não foi encontrado"
            });
        }

        pet.nome = nome;
        pet.raca = raca;
        pet.idade = idade;
        pet.nomeTutor = nomeTutor;

        // 3 saida
        res.status(200).send({
            ok: true,
            mensagem: "Pet atualizado com sucesso",
            dados: pets
        });
    } catch (error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
});

// Excluir um pet existente
// DELETE /pets/:id
app.delete("/pets/:id", (req, res) => {
    try {
        // 1 entrada
        const { id } = req.params;

        // 2 processamento
        const petIndex = pets.findIndex(item => item.id === id);
        if(petIndex < 0) {
            return res.status(404).send({
                ok: false,
                mensagem: "Pet não foi encontrado"
            });
        }

        pets.splice(petIndex, 1);

        // 3 saida
        res.status(200).send({
            ok: true,
            mensagem: "Pet excluido com sucesso",
            dados: pets
        });

    } catch (error) {
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
