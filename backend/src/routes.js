const express = require('express');
const routes = express.Router();
const axios = require('axios');
const multer = require('multer');
const upload = multer(); 


const users = [{
    id: 1,
    name: 'favan',
    email: "pifavan@gmail.com",
    password: "12345"
}];


routes.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        return res.status(200).json(user);
    }
    return res.status(401).json('Invalid Email or Password');
});

// Rota para upload de PDF
routes.post('/api/upload', upload.single('pdf'), async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/upload', req.file.buffer, {
            headers: {
                'Content-Type': 'application/pdf',
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });

        
        res.setHeader('Content-Disposition', response.headers['content-disposition']);
        res.setHeader('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao processar o arquivo.');
    }
});

module.exports = routes;