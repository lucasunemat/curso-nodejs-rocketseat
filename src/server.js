/* http
 * modulo interno do node para facilitar trabalho com problemas comuns
 * esse modulo tem funcionalidades para trabalhar com http (reqs, responses...)
*/

/* 
 * CommonJS => importa modulos usando require (padrão)
 * ES Module => importa/exporta modulos usando import/export
 * Para usar isso, vá para package.json e adicione "type": "module"
 */

// ex. de invocação padrão por CommonJS: 
// const http = require('http'); 

// importando o modulo htt.p com ES Module. colocamos "node" antes para 
// mostrar que trata-se de módulo interno, e não framework de terceiro

/**
 * Utilizaremos o file system do node (fs)
 * O node:fs/promises é uma versão do fs que retorna promises (permite usar
 * fetch, .then etc)
 * O node:fs é um pacote mais antigo que não retorna promises, mas tem os 
 * métodos de streaming (readFile, writeFile etc)
 */

import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './database.js';
import { randomUUID } from 'node:crypto'; //módulo onde tenho ferramenta para gerar uuid
//criando servidor e colocando para ouvir na porta localhost:3333
//ao chamar esse endereço vai cair na função de callback
//req : obtém informações de quem está mandando a requisição
//res : devolve resposta para quem fez a requisição

const database = new Database();

//const users = [];

const server = http.createServer(async (req, res) => {
    const { method, url } = req; //desestruturando req e obtendo method e url dele

    /*chamando middleware json.js
     * a função dele é pegar o req e incluir o req.body com o couteúdo da requisção em JSON (vide json.js)
     * um middleware por definição é função que recebe req e res e faz alguma coisa com eles. Ele INTERCEPTA
     * a requisição e faz alguma coisa com ela. Nesse caso, ele cria uma nova var (req.body) e inclui o corpo
     * da requisição e converte ele para JSON
     * no caso esse middleware é GLOBAL. Ele vai valer para todas as rotas (então o res.setHeader('Content-Type',
     * 'application/json') vai valer para todas as rotas
    */
    await json(req, res);

    //isso aqui faz aparecer o "POST /users" no terminal 
    console.log(method, url);

    //JSON é variavel global do node
    if (method === 'GET' && url === '/users') {
        const users = database.select('users');
 
        return res
            .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body;

        //cria objeto com os dados do usuário
        const user = {
            id: randomUUID(),
            name, //to adicionando o nome que veio da requisição. é o mesmo que colocar name: name
            email,
        }

        //cria uma chave "users" que vai ser um array de objetos com dados dos usuários
        database.insert('users', user);

        return res.writeHead(201).end('Usuário criado!');
        //CRIOU algo com sucessso = 201. Usamos writeHead para escrever o cabeçalho da resposta
    }

    return res.writeHead(404).end(); //aqui eu tô falando pra tipo, se não cair em nenhuma das rotas (ifs) executar isso (404 - not found)
})

server.listen(3333);



