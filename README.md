---

# Sistema de Controle de Estoque - Bom Preço 🛒

Este é um sistema de controle de estoque desenvolvido para o mercadinho **Bom Preço**, permitindo a gestão eficiente de produtos, fornecedores, movimentação de estoque e geração de relatórios.

---

## 📋 Funcionalidades

### 🛍️ Gestão de Produtos
- Adicionar, listar e editar produtos.
- Exibir informações detalhadas, como SKU, preço, estoque atual e validade.

### 🤝 Gestão de Fornecedores
- Adicionar, listar e editar fornecedores.
- Gerenciar dados como nome, contato e endereço.

### 📦 Movimentação de Estoque
- Registrar entradas e saídas de produtos no estoque.
- Consultar o histórico detalhado de movimentações.

---

## 🛠️ Tecnologias Utilizadas

- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/)
  - [MySQL](https://www.mysql.com/)

- **Frontend:**
  - [EJS](https://ejs.co/)
  - [Bootstrap](https://getbootstrap.com/)

- **Outras Dependências:**
  - `body-parser`, `dotenv`, `helmet`, `joi`, `method-override`, `morgan`, `mysql2`

---

## 📂 Estrutura do Projeto

```plaintext
project/
├── models/
│   ├── produtos.js        # Lógica para gerenciar dados relacionados a produtos
│   ├── fornecedor.js      # Lógica para gerenciar dados de fornecedores
│   └── movimentacao.js    # Lógica para gerenciar movimentações de estoque
├── routes/
│   ├── produtos.js        # Rotas para produtos
│   ├── fornecedor.js      # Rotas para fornecedores
│   └── movimentacao.js    # Rotas para movimentações de estoque
├── views/
│   ├── index.ejs          # Página inicial
│   ├── addproduto.ejs     # Formulário para adicionar produtos
│   ├── editproduto.ejs    # Formulário para editar produtos
│   ├── showprodutos.ejs   # Lista de produtos cadastrados
│   ├── addfornecedor.ejs  # Formulário para adicionar fornecedores
│   ├── editfornecedor.ejs # Formulário para editar fornecedores
│   ├── showfornecedores.ejs # Lista de fornecedores cadastrados
│   └── movimentacao.ejs   # Formulário para registrar movimentações
├── middlewares/
│   └── errorHandler.js    # Middleware para tratamento de erros
├── .env                   # Configurações sensíveis (ex.: acesso ao banco)
├── package.json           # Gerenciamento de dependências e scripts
├── README.md              # Documentação do projeto
└── app.js                 # Arquivo principal para inicializar o servidor
```

---

## ⚙️ Instalação

Siga os passos abaixo para configurar o projeto localmente:

### Pré-requisitos
- **Node.js** (versão X ou superior)
- **MySQL** configurado e rodando

### Passo a passo

1. Clone este repositório:
   ```bash
   git clone https://github.com/025ambrosio/bom-preco.git
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd bom-preco
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente no arquivo `.env`:
   ```plaintext
   DB_HOST=seu_host
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=sua_base_de_dados
   ```

5. Execute o projeto:
   - **Modo normal:**
     ```bash
     npm start
     ```
   - **Modo desenvolvimento:**
     ```bash
     npm run dev
     ```

6. Acesse no navegador:
   ```
   http://localhost:3000
   ```

---

## 🔗 Rotas do Sistema

### Produtos
- `GET /produtos` - Lista os produtos cadastrados
- `GET /produtos/adicionar` - Exibe o formulário para adicionar um produto
- `POST /produtos/adicionar` - Adiciona um novo produto
- `GET /produtos/editar/:id` - Exibe o formulário para editar um produto
- `POST /produtos/editar/:id` - Atualiza os dados do produto

### Fornecedores
- `GET /fornecedores` - Lista os fornecedores cadastrados
- `GET /fornecedores/adicionar` - Exibe o formulário para adicionar um fornecedor
- `POST /fornecedores/adicionar` - Adiciona um fornecedor
- `GET /fornecedores/editar/:id` - Exibe o formulário para editar um fornecedor
- `POST /fornecedores/editar/:id` - Atualiza os dados do fornecedor

### Movimentação de Estoque
- `GET /movimentacao` - Exibe o formulário para registrar uma movimentação
- `POST /movimentacao` - Registra uma movimentação (entrada/saída)

---

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:
1. Faça um fork do repositório.
2. Crie uma branch para sua funcionalidade:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m "Adiciona minha funcionalidade"
   ```
4. Envie suas alterações para a branch:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request!

---

## 📜 Licença

Este projeto está licenciado sob a licença [MIT](https://opensource.org/licenses/MIT).

---
