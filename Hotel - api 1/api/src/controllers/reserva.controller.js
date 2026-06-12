const prisma = require("../data/prisma");

const cadastrarReserva = async (req, res) => {
    try {
        const data = req.body;

        data.dataEntrada = new Date(data.dataEntrada);
        data.dataSaida = new Date(data.dataSaida);

        const quartoId = Number(data.quartoId);

        if (!quartoId) {
            return res.status(400).json({
                erro: "quartoId é obrigatório"
            });
        }

        const quarto = await prisma.quarto.findUnique({
            where: {
                id: quartoId
            }
        });

        if (!quarto) {
            return res.status(404).json({
                erro: "Quarto não encontrado"
            });
        }

        const reserva = await prisma.reserva.create({
            data: {
                ...data,
                quartoId
            }
        });

        res.status(201).json(reserva);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao cadastrar reserva",
            detalhes: error.message
        });
    }
};

const listarReserva = async (req, res) => {
    try {
        const reservas = await prisma.reserva.findMany({
            include: {
                quarto: true
            }
        });

        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const buscarReserva = async (req, res) => {
    try {
        const { id } = req.params;

        const reserva = await prisma.reserva.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                quarto: true
            }
        });

        if (!reserva) {
            return res.status(404).json({
                erro: "Reserva não encontrada"
            });
        }

        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const atualizarReserva = async (req, res) => {
    try {
        const { id } = req.params;

        const reserva = await prisma.reserva.update({
            where: {
                id: Number(id)
            },
            data: req.body
        });

        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const excluirReserva = async (req, res) => {
    try {
        const { id } = req.params;

        const reserva = await prisma.reserva.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

module.exports = {
    cadastrarReserva,
    listarReserva,
    buscarReserva,
    atualizarReserva,
    excluirReserva
};