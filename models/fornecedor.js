const db = require('./db'); 

const adicionarFornecedor = async (nome, contato, endereco, produtos_fornecidos) => {
  const query = `
    INSERT INTO fornecedores (nome, contato, endereco, produtos_fornecidos)
    VALUES (?, ?, ?, ?)
  `;
  
  const values = [nome, contato, endereco, produtos_fornecidos || ''];

  try {
    await db.execute(query, values);
  } catch (error) {
    throw new Error('Erro ao adicionar fornecedor: ' + error.message);
  }
};

const listarFornecedores = async (id = null) => {
  let query = 'SELECT * FROM fornecedores';
  
  if (id) {
    query += ' WHERE id = ?';
  }

  try {
    const [fornecedores] = await db.execute(query, id ? [id] : []);
    return fornecedores;
  } catch (error) {
    throw new Error('Erro ao listar fornecedores: ' + error.message);
  }
};

const editarFornecedor = async (id, nome, contato, endereco, produtos_fornecidos) => {
  const query = `
    UPDATE fornecedores
    SET nome = ?, contato = ?, endereco = ?, produtos_fornecidos = ?
    WHERE id = ?
  `;

  const values = [nome, contato, endereco, produtos_fornecidos, id];

  try {
    await db.execute(query, values);
  } catch (error) {
    throw new Error('Erro ao editar fornecedor: ' + error.message);
  }
};


const deletarFornecedor = async (id) => {
  const query = 'DELETE FROM fornecedores WHERE id = ?';
  
  try {
    await db.execute(query, [id]); 
  } catch (error) {
    throw new Error('Erro ao deletar fornecedor: ' + error.message);
  }
};

module.exports = { adicionarFornecedor, listarFornecedores, editarFornecedor, deletarFornecedor };
