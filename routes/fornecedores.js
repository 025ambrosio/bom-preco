const express = require('express');
const Joi = require('joi');
const { adicionarFornecedor, listarFornecedores, editarFornecedor, deletarFornecedor } = require('../models/fornecedor');
const router = express.Router();

// Validação com Joi
const fornecedorSchema = Joi.object({
  nome: Joi.string().required(),
  endereco: Joi.string(),
  contato: Joi.alternatives().try(
    Joi.string().email().required(), // E-mail é uma das opções
    Joi.string().pattern(/^\d{10,11}$/).required() // Telefone é outra opção
  ).required(), // Um ou outro é obrigatório
  produtos_fornecidos: Joi.string()
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
    await adicionarFornecedor(req.body.nome, req.body.contato, req.body.endereco, req.body.produtos_fornecidos);
    res.redirect('/fornecedores');
  } catch (err) {
    next(err);
  }
});

// Rota para exibir o formulário de Editar Fornecedor
router.get('/editar/:id', async (req, res, next) => {
  try {
    const fornecedor = await listarFornecedores(req.params.id);
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
    await editarFornecedor(req.params.id, req.body.nome, req.body.contato, req.body.endereco, req.body.produtos_fornecidos);
    res.redirect('/fornecedores');
  } catch (err) {
    next(err);
  }
});

// Rota para deletar um fornecedor
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await deletarFornecedor(id); // Ajuste de acordo com o método do seu modelo
    res.redirect('/fornecedores'); // Redireciona para a lista de fornecedores
  } catch (error) {
    next(error);
  }
});

module.exports = router;
