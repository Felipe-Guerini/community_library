import express from 'express';
const app = express();

app.use(express.json());

const users = []


app.post('/users', (req, res) => {
    const body = req.body
    users.push(body)
    res.status(201).send("Usuario criado com sucesso")
})

app.get('/users', (req, res) => {
    res.send({message:"Esses sao os usuarios", users})
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});