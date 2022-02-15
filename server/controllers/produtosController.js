const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:  process.env.DB_NAME
});

// PRODUTOS

// READ
exports.view = (req,res) => {
    
    connection.query('SELECT * FROM produtos WHERE situacao = "ativo"', (err,rows) => {

        if(!err){
            res.render('home', { rows });
        }
        else{
            console.log(err);
        }

        console.log('Conteúdo da tabela Produtos:\n', rows);
    });
    

};

// BUSCA
exports.find = (req,res) => {
    let buscar = req.body.search;

    connection.query('SELECT * FROM produtos WHERE nome LIKE ? OR descricao LIKE ?', ['%' + buscar + '%', '%' + buscar + '%'], (err,rows) => {

        if(!err){
            res.render('home', { rows });
        }
        else{
            console.log(err);
        }

        console.log('Conteúdo da tabela Produtos:\n', rows);
    });
};    

// CRIAÇÃO
exports.form = (req,res) => {
    res.render('addproduto');
}

exports.create = (req,res) => {
    const { nome, preco, descricao} = req.body;

    connection.query('INSERT INTO produtos SET nome = ?, preco = ?, descricao = ?, id_usuario = 1, situacao = "ativo"',[nome, preco, descricao], (err,rows) => {

        if(!err){
            res.render('addproduto', { alert: 'Produto adicionado com sucesso!'});
        }
        else{
            console.log(err);
        }

        console.log('Conteúdo da tabela Produtos:\n', rows);
    });
}