const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// Carrega dados do arquivo
function loadData() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Salva dados no arquivo
function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Rota para obter todas as pessoas
app.get('/pessoas', (req, res) => {
    const pessoas = loadData();
    res.json(pessoas);
});

// Rota para adicionar uma nova pessoa
app.post('/pessoas', (req, res) => {
    const pessoas = loadData();
    const novaPessoa = {
        id: Date.now(),
        ...req.body
    };
    pessoas.push(novaPessoa);
    saveData(pessoas);
    res.status(201).json(novaPessoa);
});

// Rota para remover uma pessoa
app.delete('/pessoas/:id', (req, res) => {
    let pessoas = loadData();
    pessoas = pessoas.filter(p => p.id !== parseInt(req.params.id));
    saveData(pessoas);
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});