const express = require('express');
const { listarProdutos } = require('../models/produtos');
const { adicionarMovimentacao, listarMovimentacoes } = require('../models/movimentacoes');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const produtos = await listarProdutos();
    res.render('movimentacao', { title: 'Movimentação de Estoque', produtos });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    await adicionarMovimentacao(req.body);
    res.redirect('/historico');
  } catch (error) {
    next(error);
  }
});

router.get('/historico', async (req, res, next) => {
  try {
    const movimentacoes = await listarMovimentacoes();
    res.render('historico', { title: 'Histórico', movimentacoes });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

