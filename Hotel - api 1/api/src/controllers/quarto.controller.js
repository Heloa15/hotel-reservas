const prisma = require("../data/prisma");

const cadastrarQuarto = async (req, res) => {
    const data = req.body;

    const quarto = await prisma.quarto.create({
        data
    });

    res.status(201).json(quarto);
};

const listarQuarto = async (req, res) => {
    const quartos = await prisma.quarto.findMany({
        include: {
            reservas: true
        }
    });

    res.status(200).json(quartos);
};

const buscarQuarto = async (req, res) => {
    const { id } = req.params;

    const quarto = await prisma.quarto.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            reservas: true
        }
    });

    res.status(200).json(quarto);
};

const atualizarQuarto = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const quarto = await prisma.quarto.update({
        where: {
            id: Number(id)
        },
        data
    });

    res.status(200).json(quarto);
};

const excluirQuarto = async (req, res) => {
    const { id } = req.params;

    const quarto = await prisma.quarto.delete({
        where: {
            id: Number(id)
        }
    });

    res.status(200).json(quarto);
};

module.exports = {
    cadastrarQuarto,
    listarQuarto,
    buscarQuarto,
    atualizarQuarto,
    excluirQuarto
};