const express = require('express');
const Joi = require('joi');
const { adicionarFornecedor, listarFornecedores, editarFornecedor } = require('../models/fornecedores');
const router = express.Router();

// Validação com Joi
const fornecedorSchema = Joi.object({
  nome: Joi.string().required(),
  sku: Joi.string().required(),
  descricao: Joi.string(),
  preco: Joi.number().positive().required(),
  unidade_medida: Joi.string().required(),
  quantidade_min: Joi.number().integer().min(0).required(),
  quantidade_max: Joi.number().integer().min(0),
  estoque_atual: Joi.number().integer().min(0),
});

// Rota para listar fornecedores
router.get('/', async (req, res, next) => {
  try {
    const fornecedores = await listarFornecedores();
    res.render('showfornecedores', { title: 'Lista de Fornecedores', fornecedores });
  } catch (error) {
    next(error);
  }
});

// Rota para exibir o formulário de Adicionar Fornecedor
router.get('/adicionar', (req, res) => {
  res.render('addfornecedor', { title: 'Adicionar Fornecedor' });
});

// Rota para processar Adicionar Fornecedor
router.post('/adicionar', async (req, res, next) => {
  const { error } = fornecedorSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await adicionarFornecedor(req.body);
    res.redirect('/fornecedores');
  } catch (err) {
    next(err);
  }
});

// Rota para exibir o formulário de Editar Fornecedor
router.get('/editar/:id', async (req, res, next) => {
  try {
    const produto = await listarProdutos(req.params.id);
    res.render('editfornecedor', { title: 'Editar Fornecedor', fornecedor });
  } catch (error) {
    next(error);
  }
});

// Rota para processar Editar Fornecedor
router.post('/editar/:id', async (req, res, next) => {
  const { error } = fornecedorSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await editarFornecedor(req.params.id, req.body);
    res.redirect('/fornecedor');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
