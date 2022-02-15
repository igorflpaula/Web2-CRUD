CREATE table usuario(
	id integer not null auto_increment,
    nome varchar(30),
    email varchar(50),
    senha varchar(30), 
    criacao datetime,
    primary key (id)
)

CREATE table produtos(
	id integer not null auto_increment,
    id_usuario integer,
    nome varchar(30),
    preco decimal(10,2),
    descricao varchar(50),
    situacao varchar(10),
    primary key (id),
    foreign key (id_usuario) references usuario(id)
)

INSERT INTO produtos (id_usuario, nome, preco, descricao, situacao) values (1, "Pizza de Calabresa", 35.5, 
"Molho de tomate, mussarela, calabresa, cebola, parmesão e azeitonas", "ativo")

INSERT INTO produtos (id_usuario, nome, preco, descricao, situacao) values (1, "Pizza de Mussarela", 32.5, 
"Molho de tomate, mussarela", "ativo"),(1, "Pizza de Bacon", 38, 
"Molho de tomate, mussarela, bacon, tomate", "ativo")