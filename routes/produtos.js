const express = require('express');
const Joi = require('joi');
const { adicionarProduto, listarProdutos, editarProduto, deletarProduto } = require('../models/produtos');
const router = express.Router();

const produtoSchema = Joi.object({
  nome: Joi.string().required(),
  sku: Joi.string().required(), 
  descricao: Joi.string().optional().allow(''), 
  preco: Joi.number().required(),
  quantidade: Joi.number().required(),
  fornecedor_id: Joi.number().required() 
});

router.get('/', async (req, res, next) => {
  try {
    const produtos = await listarProdutos();
    res.render('showprodutos', { title: 'Lista de Produtos', produtos });
  } catch (error) {
    next(error);
  }
});

router.get('/adicionar', (req, res) => {
  res.render('addproduto', { title: 'Adicionar Produto' });
});

router.post('/adicionar', async (req, res, next) => {
  console.log('Dados recebidos:', req.body); 
  
  const { error } = produtoSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message); 
  }

  try {
    await adicionarProduto(req.body.nome, req.body.sku, req.body.descricao, req.body.preco, req.body.quantidade, req.body.fornecedor_id);
    res.redirect('/produtos');
  } catch (err) {
    next(err);
  }
});

router.get('/editar/:id', async (req, res, next) => {
  try {
    const produto = await listarProdutos(req.params.id); 
    res.render('editproduto', { title: 'Editar Produto', produto });
  } catch (error) {
    next(error);
  }
});

router.post('/editar/:id', async (req, res, next) => {
  const { error } = produtoSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    await editarProduto(req.params.id, req.body.nome, req.body.sku, req.body.descricao, req.body.preco, req.body.quantidade, req.body.fornecedor_id);
    res.redirect('/produtos');
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await deletarProduto(id);
    res.redirect('/produtos');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
