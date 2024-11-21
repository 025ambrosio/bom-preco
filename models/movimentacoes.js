const db = require('./db'); // Importa o pool de conexões

// Adicionar movimentação
async function adicionarMovimentacao(produto_id, tipo, quantidade, motivo) {
    const sql = `
        INSERT INTO movimentacoes (produto_id, tipo, quantidade, motivo)
        VALUES (?, ?, ?, ?)
    `;
    await db.query(sql, [produto_id, tipo, quantidade, motivo]);

    // Atualizar o estoque do produto
    const atualizarEstoque = `
        UPDATE produtos 
        SET estoque_atual = estoque_atual + ?
        WHERE id = ?
    `;
    const ajuste = tipo === 'entrada' ? quantidade : -quantidade;
    await db.query(atualizarEstoque, [ajuste, produto_id]);
}

// Listar movimentações
async function listarMovimentacoes() {
    const sql = `
        SELECT m.*, p.nome AS produto_nome 
        FROM movimentacoes m
        JOIN produtos p ON m.produto_id = p.id
        ORDER BY m.data_movimentacao DESC
    `;
    const [rows] = await db.query(sql); // Usa o pool para fazer a consulta

    // Log para verificação do conteúdo
    console.log('Tipo de dados retornado:', Array.isArray(rows)); // Deve imprimir true
    console.log('Dados retornados:', rows); // Aqui você verá os dados em si

    return rows;
}

module.exports = { adicionarMovimentacao, listarMovimentacoes };
