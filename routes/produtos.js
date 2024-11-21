const express = require('express');
const Joi = require('joi');
const { adicionarProduto, listarProdutos, editarProduto, deletarProduto } = require('../models/produtos');
const router = express.Router();

// Validação com Joi para produto
const produtoSchema = Joi.object({
  nome: Joi.string().required(),
  sku: Joi.string().required(), // SKU obrigatório
  descricao: Joi.string().optional().allow(''), // Descrição é opcional
  preco: Joi.number().required(),
  quantidade: Joi.number().required(),
  fornecedor_id: Joi.number().required() // fornecedor_id obrigatório
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
  console.log('Dados recebidos:', req.body); // Verifique o corpo da requisição
  
  const { error } = produtoSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message); // Retorna o erro de validação
  }

  try {
    // Adiciona o produto incluindo o campo 'sku'
    await adicionarProduto(req.body.nome, req.body.sku, req.body.descricao, req.body.preco, req.body.quantidade, req.body.fornecedor_id);
    res.redirect('/produtos'); // Redireciona para a lista de produtos após a adição
  } catch (err) {
    next(err); // Caso ocorra erro na adição
  }
});

// Rota para exibir o formulário de Editar Produto
router.get('/editar/:id', async (req, res, next) => {
  try {
    const produto = await listarProdutos(req.params.id); // Obtém o produto pelo ID
    res.render('editproduto', { title: 'Editar Produto', produto });
  } catch (error) {
    next(error); // Passa o erro para o middleware de tratamento
  }
});

// Rota para processar Editar Produto
router.post('/editar/:id', async (req, res, next) => {
  const { error } = produtoSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message); // Retorna erro de validação se necessário
  }

  try {
    // Atualiza os dados do produto
    await editarProduto(req.params.id, req.body.nome, req.body.sku, req.body.descricao, req.body.preco, req.body.quantidade, req.body.fornecedor_id);
    res.redirect('/produtos'); // Redireciona para a lista de produtos após a atualização
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento
  }
});

// Rota para deletar um produto
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await deletarProduto(id); // Deleta o produto
    res.redirect('/produtos'); // Redireciona para a página de produtos após a exclusão
  } catch (error) {
    next(error); // Passa o erro para o middleware de tratamento
  }
});

module.exports = router;
