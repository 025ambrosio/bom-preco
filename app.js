	const express = require('express');
	const bodyParser = require('body-parser');
	const dotenv = require('dotenv');
	const path = require('path');

	dotenv.config();

	const app = express();

	// Configurações
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(express.static(path.join(__dirname, 'public')));
	app.set('view engine', 'ejs');
	app.set('views', path.join(__dirname, 'views'));

	// Rotas básicas
	app.get('/', (req, res) => {
		res.render('index');
	});

	const { adicionarProduto, listarProdutos, editarProduto } = require('./models/produtos');

	// Rota para exibir o formulário de Adicionar Produto
app.get('/produtos/adicionar', (req, res) => {
  res.render('addproduto', { title: 'Adicionar Produto' });
});

// Rota para processar o formulário de Adicionar Produto
app.post('/produtos/adicionar', async (req, res) => {
  const { nome, sku, descricao, preco, unidade_medida, quantidade_min, quantidade_max, estoque_atual } = req.body;

  try {
    await adicionarProduto(nome, sku, descricao, preco, unidade_medida, quantidade_min, quantidade_max, estoque_atual);
    res.redirect('/produtos');
  } catch (error) {
    res.status(500).send('Erro ao adicionar produto: ' + error);
  }
});

// Rota para Listar Produtos
app.get('/produtos', async (req, res) => {
  try {
    const produtos = await listarProdutos();
    res.render('showprodutos', { title: 'Lista de Produtos', produtos });
  } catch (error) {
    res.status(500).send('Erro ao listar produtos: ' + error);
  }
});

// Rota para exibir o formulário de editar produto
app.get('/produtos/editar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [produto] = await listarProdutos(id);  // A função listarProdutos precisa ser ajustada para buscar por ID
    res.render('editproduto', { title: 'Editar Produto', produto });
  } catch (error) {
    res.status(500).send('Erro ao exibir produto para edição: ' + error);
  }
});

// Rota para processar o formulário de editar produto
app.post('/produtos/editar/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, sku, descricao, preco, unidade_medida, quantidade_min, quantidade_max, estoque_atual } = req.body;

  try {
    await editarProduto(id, nome, sku, descricao, preco, unidade_medida, quantidade_min, quantidade_max, estoque_atual);
    res.redirect('/produtos');
  } catch (error) {
    res.status(500).send('Erro ao editar produto: ' + error);
  }
});

	const { adicionarFornecedor, listarFornecedores, editarFornecedor } = require('./models/fornecedores');

// Rota para exibir o formulário de Adicionar Fornecedor
app.get('/fornecedores/adicionar', (req, res) => {
  res.render('addfornecedor', { title: 'Adicionar Fornecedor' });
});

// Rota para processar o formulário de Adicionar Fornecedor
app.post('/fornecedores/adicionar', async (req, res) => {
  const { nome, contato, endereco } = req.body;

  try {
    await adicionarFornecedor(nome, contato, endereco);
    res.redirect('/fornecedores');
  } catch (error) {
    res.status(500).send('Erro ao adicionar fornecedor: ' + error);
  }
});

// Rota para listar fornecedores
app.get('/fornecedores', async (req, res) => {
  try {
    const fornecedores = await listarFornecedores();
    res.render('showfornecedores', { title: 'Fornecedores', fornecedores });
  } catch (error) {
    res.status(500).send('Erro ao listar fornecedores: ' + error);
  }
});

// Rota para exibir o formulário de editar fornecedor
app.get('/fornecedores/editar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [fornecedor] = await listarFornecedores(id);  // A função listarFornecedores precisa ser ajustada para buscar por ID
    res.render('editfornecedor', { title: 'Editar Fornecedor', fornecedor });
  } catch (error) {
    res.status(500).send('Erro ao exibir fornecedor para edição: ' + error);
  }
});

// Rota para processar o formulário de editar fornecedor
app.post('/fornecedores/editar/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, contato, endereco } = req.body;

  try {
    await editarFornecedor(id, nome, contato, endereco);
    res.redirect('/fornecedores');
  } catch (error) {
    res.status(500).send('Erro ao editar fornecedor: ' + error);
  }
});

	const { adicionarMovimentacao, listarMovimentacoes } = require('./models/movimentacoes');

	// Rota para exibir o formulário de movimentação
	app.get('/movimentacao', async (req, res) => {
		const produtos = await listarProdutos(); // Função do módulo de produtos
		res.render('movimentacao', { title: 'Movimentação de Estoque', produtos });
	});

	// Rota para processar o formulário de movimentação
	app.post('/movimentacao', async (req, res) => {
		const { produto_id, tipo, quantidade, motivo } = req.body;
		try {
			await adicionarMovimentacao(produto_id, tipo, parseInt(quantidade), motivo);
			res.redirect('/historico');
		} catch (error) {
			res.status(500).send('Erro ao registrar movimentação: ' + error.message);
		}
	});

	// Rota para exibir o histórico de movimentações
	app.get('/historico', async (req, res) => {
		try {
			const movimentacoesList = await listarMovimentacoes();
			console.log(movimentacoesList); // Verifique o que é retornado
			if (Array.isArray(movimentacoesList)) {
				res.render('historico', { movimentacoes: movimentacoesList, title: 'Histórico' });
			} else {
				console.error('Erro: O retorno de listarMovimentacoes não é um array');
				res.status(500).send('Erro ao carregar histórico');
			}
		} catch (err) {
			console.error('Erro ao carregar histórico:', err);
			res.status(500).send('Erro ao carregar histórico');
		}
	});


const { relatorioEstoqueAtual, relatorioProdutosAbaixoMinimo } = require('./models/relatorios');
console.log(relatorioEstoqueAtual);  // Agora, verá diretamente o conteúdo da função

// Rota para exibir o relatório de estoque atual
app.get('/relatorio/estoque', async (req, res) => {
    try {
        const estoque = await relatorioEstoqueAtual();
        res.render('relatorioEstoque', { title: 'Relatório de Estoque Atual', estoque });
    } catch (error) {
        console.error('Erro ao gerar relatório de estoque:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Rota para exibir o relatório de produtos abaixo do mínimo
app.get('/relatorio/abaixo-minimo', async (req, res) => {
    const produtosAbaixoMinimo = await relatorioProdutosAbaixoMinimo();
    res.render('relatorioAbaixoMinimo', { title: 'Produtos Abaixo da Quantidade Mínima', produtosAbaixoMinimo });
});

	// Iniciar servidor
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Servidor rodando na porta ${PORT}`);
	});
