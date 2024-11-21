const db = require('./db'); // Conexão com o banco de dados (MySQL)

const adicionarProduto = async (nome, sku, descricao, preco, unidade_medida, quantidade_min, quantidade_max, estoque_atual) => {
  const query = `
    INSERT INTO produtos (nome, sku, descricao, preco, unidade_medida, quantidade_min, quantidade_max, estoque_atual)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  // Garantir que não há valores undefined
  const values = [
    nome || "Nome não especificado",
    sku || "000000",
    descricao || null,
    preco || 0.0,
    unidade_medida || "Unidade",
    quantidade_min || 0,
    quantidade_max || 0,
    estoque_atual || 0
  ];

  console.log("Valores recebidos para inserção:", values); // Debug

  try {
    await db.execute(query, values);
  } catch (error) {
    throw new Error('Erro ao adicionar produto: ' + error.message);
  }
};


const listarProdutos = async (id) => {
  let query = 'SELECT * FROM produtos';
  const values = [];
  
  if (id) {
    query += ' WHERE id = ?';  // Se um id for fornecido, filtra os produtos
    values.push(id);
  }

  try {
    const [produtos] = await db.execute(query, values);
    return produtos;
  } catch (error) {
    throw new Error('Erro ao listar produtos: ' + error.message);
  }
};

const editarProduto = async (id, nome, sku, descricao, preco, unidade_medida, quantidade_min, quantidade_max, estoque_atual) => {
  const query = `
    UPDATE produtos SET nome = ?, sku = ?, descricao = ?, preco = ?, unidade_medida = ?, quantidade_min = ?, quantidade_max = ?, estoque_atual = ?
    WHERE id = ?`;

  const values = [nome, sku, descricao, preco, unidade_medida, quantidade_min, quantidade_max, estoque_atual, id];

  try {
    await db.execute(query, values);
  } catch (error) {
    throw new Error('Erro ao editar produto: ' + error.message);
  }
};

module.exports = { adicionarProduto, listarProdutos, editarProduto };
