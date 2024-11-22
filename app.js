const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const methodOverride = require('method-override');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Certifique-se de que a pasta 'views' está correta
app.use(helmet());
app.use(morgan('dev'));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('index');
});

const produtosRoutes = require('./routes/produtos');
const fornecedoresRoutes = require('./routes/fornecedores');
const movimentacaoRoutes = require('./routes/movimentacao');

app.use('/produtos', produtosRoutes);
app.use('/fornecedores', fornecedoresRoutes);
app.use('/movimentacao', movimentacaoRoutes);

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
