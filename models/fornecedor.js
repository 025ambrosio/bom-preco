const db = require('./db'); // Importando o pool de conexões

// Adicionar fornecedor
const adicionarFornecedor = async (nome, contato, endereco, produtos_fornecidos) => {
  const query = `
    INSERT INTO fornecedores (nome, contato, endereco, produtos_fornecidos)
    VALUES (?, ?, ?, ?)
  `;
  
  // Usando o valor de produtos_fornecidos do parâmetro
  const values = [nome, contato, endereco, produtos_fornecidos || '']; // Caso o campo esteja vazio, insere uma string vazia ou NULL

  try {
    await db.execute(query, values); // Executa a query no banco
  } catch (error) {
    throw new Error('Erro ao adicionar fornecedor: ' + error.message);
  }
};

// Listar fornecedores
const listarFornecedores = async (id = null) => {
  let query = 'SELECT * FROM fornecedores';
  
  if (id) {
    query += ' WHERE id = ?'; // Se um ID for passado, filtra por ele
  }

  try {
    const [fornecedores] = await db.execute(query, id ? [id] : []);
    return fornecedores;
  } catch (error) {
    throw new Error('Erro ao listar fornecedores: ' + error.message);
  }
};

// Editar fornecedor
const editarFornecedor = async (id, nome, contato, endereco, produtos_fornecidos) => {
  const query = `
    UPDATE fornecedores
    SET nome = ?, contato = ?, endereco = ?, produtos_fornecidos = ?
    WHERE id = ?
  `;

  // Passando o valor de produtos_fornecidos para a query
  const values = [nome, contato, endereco, produtos_fornecidos, id];

  try {
    await db.execute(query, values); // Executa a query para editar o fornecedor
  } catch (error) {
    throw new Error('Erro ao editar fornecedor: ' + error.message);
  }
};

// Deletar fornecedor
const deletarFornecedor = async (id) => {
  const query = 'DELETE FROM fornecedores WHERE id = ?';
  
  try {
    await db.execute(query, [id]); // Executa a query para deletar o fornecedor
  } catch (error) {
    throw new Error('Erro ao deletar fornecedor: ' + error.message);
  }
};

module.exports = { adicionarFornecedor, listarFornecedores, editarFornecedor, deletarFornecedor };
