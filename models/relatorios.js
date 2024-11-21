const db = require('./db');

// Relatório de Estoque Atual
async function relatorioEstoqueAtual() {
    const sql = `
        SELECT nome, estoque_atual 
        FROM produtos
        ORDER BY nome;
    `;
    const [rows] = await db.query(sql); // Usando diretamente o pool de conexões
    return rows;
}

// Relatório de Produtos Abaixo da Quantidade Mínima
async function relatorioProdutosAbaixoMinimo() {
    const sql = `
        SELECT nome, estoque_atual, quantidade_min
        FROM produtos
        WHERE estoque_atual < quantidade_min
        ORDER BY nome;
    `;
    const [rows] = await db.query(sql); // Usando diretamente o pool de conexões
    return rows;
}


module.exports = {
    relatorioEstoqueAtual,
    relatorioProdutosAbaixoMinimo,
};
