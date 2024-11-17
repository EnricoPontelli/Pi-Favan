const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors()); // Habilita CORS para permitir requisições do frontend
app.use(routes);

app.listen(3333, () => {
    console.log('Listening on port 3333');
});