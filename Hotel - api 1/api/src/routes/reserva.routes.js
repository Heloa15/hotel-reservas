
const express = require("express");

const router = express.Router();

const { 
    cadastrarReserva, 
    listarReserva, 
    buscarReserva, 
    atualizarReserva, 
    excluirReserva} = require("../controllers/reserva.controller");

router.post("/cadastrar", cadastrarReserva);
router.get("/listar", listarReserva);
router.get("/buscar/:id", buscarReserva);
router.put("/atualizar/:id", atualizarReserva);
router.delete("/excluir/:id", excluirReserva);

module.exports = router;

