require('dotenv').config();

const express = require('express');
const cors = require('cors');

const quartoRoutes = require('./src/routes/quarto.routes');
const reservaRoutes = require('./src/routes/reserva.routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/quarto', quartoRoutes);
app.use('/reserva', reservaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});