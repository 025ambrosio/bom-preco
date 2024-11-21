const db = require('./db'); 

const adicionarFornecedor = async (nome, contato, endereco) => {
  const query = `
    INSERT INTO fornecedores (nome, contato, endereco)
    VALUES (?, ?, ?)`;

  const values = [nome, contato, endereco];

  try {
    await db.execute(query, values);
  } catch (error) {
    throw new Error('Erro ao adicionar fornecedor: ' + error.message);
  }
};

// Função para listar fornecedores
async function listarFornecedores() {
  const query = 'SELECT * FROM fornecedores';  // Consulta para buscar todos os fornecedores
  const [fornecedores] = await db.execute(query);  // A consulta retorna os dados de fornecedores
  return fornecedores;
}

const editarFornecedor = async (id, nome, contato, endereco) => {
  const query = `
    UPDATE fornecedores SET nome = ?, contato = ?, endereco = ?
    WHERE id = ?`;

  const values = [nome, contato, endereco, id];

  try {
    await db.execute(query, values);
  } catch (error) {
    throw new Error('Erro ao editar fornecedor: ' + error.message);
  }
};


module.exports = { adicionarFornecedor, listarFornecedores, editarFornecedor };

