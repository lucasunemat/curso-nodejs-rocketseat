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

import http from 'node:http';

//criando servidor e colocando para ouvir na porta localhost:3333
//ao chamar esse endereço vai cair na função de callback
//req : obtém informações de quem está mandando a requisição
//res : devolve resposta para quem fez a requisição

const users = [];

const server = http.createServer((req, res) => {
    const { method, url } = req; //desestruturando req e obtendo method e url dele
    console.log(method, url);

    //JSON é variavel global do node
    if (method === 'GET' && url === '/users') {
        return res
        .setHeader('Content-Type', 'application/json') //setando header da resposta indicando para o front que é um json | facilita o navegador a entender o que está sendo retornado e formatar
        .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@gmail.com!'
        })
        return res.writeHead(201).end('Criando usuários!');
        //CRIOU algo com sucessso = 201. Usamos writeHead para escrever o cabeçalho da resposta
    }

    return res.writeHead(404).end(); //aqui eu tô falando pra tipo, se não cair em nenhuma das rotas (ifs) executar isso (404 - not found)
})

server.listen(3333);



