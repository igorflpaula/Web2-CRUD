const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:  process.env.DB_NAME
});

// PRODUTOS CRUD - CREATE READ UPDATE DELETE

// READ
exports.view = (req,res) => {
    
    connection.query('SELECT * FROM produtos WHERE situacao = "ativo"', (err,rows) => {

        if(!err){
            let produtoRemovido = req.query.removed;
            res.render('home', { rows,  produtoRemovido});
        }
        else{
            console.log(err);
        }

        
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

        
    });
};    

// CRIATE
exports.form = (req,res) => {
    res.render('addproduto');
}

exports.create = (req,res) => {
    const { nome, preco, descricao, id_usuario, situacao} = req.body;

    connection.query('INSERT INTO produtos SET nome = ?, preco = ?, descricao = ?, id_usuario = ?, situacao = ?',[nome, preco, descricao,id_usuario, situacao], (err,rows) => {

        if(!err){
            res.render('addproduto', { alert: 'Produto adicionado com sucesso!'});
        }
        else{
            console.log(err);
        }

        
    });
};

// EDIÇÃO
exports.edit = (req,res) => {

    connection.query('SELECT * FROM produtos WHERE id = ?',[req.params.id], (err,rows) => {

        if(!err){
            res.render('editproduto', { rows });
        }
        else{
            console.log(err);
        }

        
    });
};

// UPDATE
exports.update = (req,res) => {

    const { nome, preco, descricao} = req.body;

    connection.query('UPDATE produtos SET nome = ?, preco = ?, descricao = ? WHERE id = ?',[nome, preco, descricao, req.params.id], (err,rows) => {

        if(!err){
            connection.query('SELECT * FROM produtos WHERE id = ?',[req.params.id], (err,rows) => {

                if(!err){
                    res.render('editproduto', { rows, alert: `${nome} editado com sucesso!` });
                }
                else{
                    console.log(err);
                }
                
            });
        }
        else{
            console.log(err);
        }

    });
};

// DELETE

exports.delete = (req,res) => {

    // connection.query('DELETE FROM produtos WHERE id = ?',[req.params.id], (err,rows) => {

    //     if(!err){
    //         res.redirect('/');
    //     }
    //     else{
    //         console.log(err);
    //     }

        
    // });

    connection.query('UPDATE produtos SET situacao = ? WHERE id = ?',['esgotado', req.params.id], (err,rows) => {

        if(!err){
            let produtoRemovido = encodeURIComponent('Produto removido com sucesso.');

            res.redirect('/?removed= ?' + produtoRemovido);
        }
        else{
            console.log(err);
        }

        
    });
};

// DETALHES

exports.viewall = (req, res) => {
    connection.query('SELECT * FROM produtos WHERE id = ?', [req.params.id], (err, rows) => {
      if (!err) {
        res.render('viewproduto', { rows });
      } else {
        console.log(err);
      }
      
    });
  
};