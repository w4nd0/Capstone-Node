# Capstone-NodeJs

Este projeto é uma Api que simula um site de vendas para uma pizzaria, feito por estudantes da instituição de ensino [Kenzie Academy Brasil](https://kenzie.com.br/) e sem fins lucrativos.

### 📋 Pré-requisitos

Para iniciar o projeto na sua máquina, é necessário que sua máquina tenha instalado yarn e o git, além de uma versão do node compativel.

Começe clonando o repositório usando git clone:
 ```
 git clone https://gitlab.com/GustavoSil/capstone-nodejs.git
 ```

### 🔧 Instalação

Para instalar as depêndencias do projeto basta rodar o seguinte comando:
```
yarn install
```
Também é preciso criar um `.env` com as informações do banco de dados e outras informações necessárias conforme o `.env.example`

## ⚙️ Executando os testes

Para rodar os testes na sua máquina, é necessário rodas migrations no seu banco de dados de teste, para isso basta rodar o seguinte comando:
```
yarn test_migration_run
```

e para executar rode o seguinte comando no seu terminal:
```
yarn test
```

## 📦 Desenvolvimento
Esta api foi hospedada em [capstone_nodejs](https://capstone_nodejs.herokuapp.com) na plataforma [Heroku](https://www.heroku.com/home) em uma conta gratuita.
 
É possivel ver os endpoints da api na documentação [Capstone_nodejs](https://capstone_nodejs.herokuapp.com/api-documentation)

## 🛠️ Construído com

* [NodeJs](https://nodejs.org/en/) - Software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web.
* [Express](https://expressjs.com/) - Express.js é um framework para Node.js que fornece recursos mínimos para construção de servidores web.
* [Typescript](https://www.typescriptlang.org/) - TypeScript é uma linguagem de programação de código aberto desenvolvida pela Microsoft. É um superconjunto sintático estrito de JavaScript e adiciona tipagem estática opcional à linguagem.
## ✒️ Autores

* **Gustavo Silva** - *Tech Leader* - [Gustavo Silva](https://gitlab.com/GustavoSil)
* **Wander Moreira** - *Scrum Master* - [Wander Moreira](https://gitlab.com/trevius)
* **Guilherme Lemes de Freitas** - *Product Owner* - [Guilherme Lemes de Freitas](https://gitlab.com/guilemes-freitas)

## 📜 Licence
MIT
