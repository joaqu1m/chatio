create database testes;
use testes;

/*
drop database testes;
drop table numeros;
drop table mensagem;
*/

create table numeros (
id int primary key auto_increment,
rng decimal(5,3),
dia char(10),
hora char(8)
);

create table mensagem (
idMensagem int primary key auto_increment,
dono varchar(16),
texto varchar(512)
);

select * from numeros;
select * from mensagem;
select * from mensagem where idMensagem > 0;
select max(idMensagem) from mensagem;