const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares globais
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(helmet());
app.use(morgan('dev'));

// Rota inicial
app.get('/', (req, res) => {
  res.render('index');
});

// Rotas
const produtosRoutes = require('./routes/produtos');
const fornecedoresRoutes = require('./routes/fornecedores');
const movimentacaoRoutes = require('./routes/movimentacao');

app.use('/produtos', produtosRoutes);
app.use('/fornecedores', fornecedoresRoutes);
app.use('/movimentacao', movimentacaoRoutes);

// Middleware para tratar erros
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
