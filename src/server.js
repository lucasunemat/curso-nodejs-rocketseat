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

const server = http.createServer(async (req, res) => {
    const { method, url } = req; //desestruturando req e obtendo method e url dele

    //crio um array de buffers (to usando isso porque quero dar um console log no body da requisição no terminal)
    const buffers = [];

    //juntando todos os pedaços que vieram da req (chunks)
    for await (const chunk of req) {
        buffers.push(chunk);
    }

    try {
        //se tem body, cria uma var body e  converte para string e depois para json e joga na req.body
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        //se não tem body, seta como null
        req.body = null;
    }

    //isso aqui faz aparecer o "POST /users" no terminal 
    console.log(method, url);

    //JSON é variavel global do node
    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json') //setando header da resposta indicando para o front que é um json | facilita o navegador a entender o que está sendo retornado e formatar
            .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body;

        users.push({
            id: 1,
            name, //to adicionando o nome que veio da requisição. é o mesmo que colocar name: name
            email,
        })
        return res.writeHead(201).end('Criando usuários!');
        //CRIOU algo com sucessso = 201. Usamos writeHead para escrever o cabeçalho da resposta
    }

    return res.writeHead(404).end(); //aqui eu tô falando pra tipo, se não cair em nenhuma das rotas (ifs) executar isso (404 - not found)
})

server.listen(3333);



