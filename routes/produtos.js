const express = require('express');
const Joi = require('joi');
const { adicionarProduto, listarProdutos, editarProduto } = require('../models/produtos');
const router = express.Router();

// Validação com Joi
const produtoSchema = Joi.object({
  nome: Joi.string().required(),
  sku: Joi.string().required(),
  descricao: Joi.string(),
  preco: Joi.number().positive().required(),
  unidade_medida: Joi.string().required(),
  quantidade_min: Joi.number().integer().min(0).required(),
  quantidade_max: Joi.number().integer().min(0),
  estoque_atual: Joi.number().integer().min(0),
});

// Rota para listar produtos
router.get('/', async (req, res, next) => {
  try {
    const produtos = await listarProdutos();
    res.render('showprodutos', { title: 'Lista de Produtos', produtos });
  } catch (error) {
    next(error);
  }
});

// Rota para exibir o formulário de Adicionar Produto
router.get('/adicionar', (req, res) => {
  res.render('addproduto', { title: 'Adicionar Produto' });
});

// Rota para processar Adicionar Produto
router.post('/adicionar', async (req, res, next) => {
  const { error } = produtoSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await adicionarProduto(req.body);
    res.redirect('/produtos');
  } catch (err) {
    next(err);
  }
});

// Rota para exibir o formulário de Editar Produto
router.get('/editar/:id', async (req, res, next) => {
  try {
    const produto = await listarProdutos(req.params.id);
    res.render('editproduto', { title: 'Editar Produto', produto });
  } catch (error) {
    next(error);
  }
});

// Rota para processar Editar Produto
router.post('/editar/:id', async (req, res, next) => {
  const { error } = produtoSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await editarProduto(req.params.id, req.body);
    res.redirect('/produtos');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
