create database chatio;
use chatio;

#drop database chatio;
#drop table usuario;
#drop table userStatus;
#drop table userInventory;
#drop table userMensagem;

create table usuario (
idUsuario int primary key auto_increment,
nickname varchar(16) not null unique,
senha varchar(16) not null,
dataNasc date
);

create table userStatus (
ultimoUpdate datetime,
x int,
y int
);

create table userInventory (
idItem int primary key auto_increment,
nomeItem varchar(45),
tipoItem varchar(45),
statusItem varchar(45)
);

create table userMensagem (
idMensagem int primary key auto_increment,
texto varchar(512),
fkUsuario int,
foreign key (fkUsuario) references usuario(idUsuario)
);

select * from usuario;
select * from userStatus;
select * from userInventory;
select * from userMensagem;