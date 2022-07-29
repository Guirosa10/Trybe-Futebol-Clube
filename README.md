# Boas vindas ao repositório Trybe Futebol Clube



Introdução
=============
Este projeto foi feito junto ao curso da Trybe. Neste, utilizamos typescript e sequelize ORM para criar um CRUD. A partir das tecnologias, criamos um informativo de classificações das partidas de futebol do seu time favorito. O front-end foi pré-desenvolvido pelo time da trybe, sendo assim, apenas o backend da aplicação foi desenvolvido.

Tecnologias
-------------
- Javascript
- Typescript
- React
- MySQL
- Node.js
- Express
- Docker


### Bibliotecas

- BodyParser
- Cors
- Dotenv
- JsonWebToken
- Sequelize
- Nodemon
- Eslint
----

### Como Instalar

#### Instalação com Docker
1. Você deve possuir o Docker instalado em sua máquina.
2. Configure as váriaveis de ambient no arquivo `.env`, referentes a sua máquina.
3. A partir da pasta principal do repositório, execute o comando `$ docker-compose up --build`
4. Após concluída a instalação, entre na pasta `./backend/database/todoDatabase.sql` e execute o banco de dados na porta criada pelo docker, para assim, criá-lo.
5. Desfrute da aplicação, que já foi iniciada no seu Browser.

#### Instalação sem Docker

1. Você deve possuir o node versão 16 instalado em sua máquina e também MySQL.
2. Configure as váriaveis de ambiente, localizadas no arquivo `.env` com as informações da sua conexão com banco
3. Navegue até a pasta `./backend/database/todoDatabase.sql` e execute o banco de dados em seu MySQL.
4. Navegue até a pasta `/backend`e execute o comando npm install no terminal.
5. Após a instalação, rode o comando `npm run dev` e deixe o terminal rodando.
6. Abra outro terminal e navegue até a pasta `./frontend`.
7. Execute o comando `npm install`.
8. Após a instalação, rode o comando `npm start`
9. A aplicação ira abrir em seu browser e você já pode utilizá-la.
