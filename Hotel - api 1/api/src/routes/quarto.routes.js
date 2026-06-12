
const express = require("express");

const router = express.Router();

const { 
    cadastrarQuarto, 
    listarQuarto, 
    buscarQuarto, 
    atualizarQuarto, 
    excluirQuarto } = require("../controllers/quarto.controller");

router.post("/cadastrar", cadastrarQuarto);
router.get("/listar", listarQuarto);
router.get("/buscar/:id", buscarQuarto);
router.put("/atualizar/:id", atualizarQuarto);
router.delete("/excluir/:id", excluirQuarto);

module.exports = router;

