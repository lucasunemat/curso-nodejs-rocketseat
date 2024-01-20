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

/**
 * Sobre formas de enviar dados do FRONT para o BACK:
 * 1. Query Params: envia dados pela URL (ex. http://localhost:3333/users?name=Joao)
 * classico de URL statefull. Usado para informação não sensiveis que vão modificar a 
 * resposta do backend (por ex, a visualização de uma lista por meio de um filtro)
 
 * 2. Route Params: envia dados pela URL (ex. GET http://localhost:3333/users/1).
 * o 1 meio que é parte da url, e serve para identificar recurso (tipo os dados do
 * user com id 1). Você entende a ação por meio de do método GET, DELETE, PUT + url.
 * tambem não pode ser usado para dados sensiveis. Não é criptografado.
 
 * 3. Request Body: envia dados pelo corpo da requisição (ex. POST http://localhost:3333/users).
 * é o que usamos até aqui. É para envio de formulários. Mais seguro. Passam por HTTP 
 * e são criptografados. Ex: POST http://localhost:3333/users (url sem informações explicitas)
 */

/**
 * Vetor retornado pelo .match():
    [
        '/users/c9ef080d-6df6-4371-a524-f49e02ca5698/groups/1', ---------------> url toda
        'c9ef080d-6df6-4371-a524-f49e02ca5698',                 ---------------> o que deu match no primeiro grupo
        '1',                                                    ---------------> o que deu match no segundo grupo
        index: 0,
        input: '/users/c9ef080d-6df6-4371-a524-f49e02ca5698/groups/1',
        groups: undefined
    ]
 */

import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-parameters.js';
//criando servidor e colocando para ouvir na porta localhost:3333
//ao chamar esse endereço vai cair na função de callback
//req : obtém informações de quem está mandando a requisição
//res : devolve resposta para quem fez a requisição

const server = http.createServer(async (req, res) => {
    const { method, url } = req; //desestruturando req e obtendo method e url dele

    //console.log(url) --> url no caso do create é /users/

    /*chamando middleware json.js
     * a função dele é pegar o req e incluir o req.body com o couteúdo da requisção em JSON (vide json.js)
     * um middleware por definição é função que recebe req e res e faz alguma coisa com eles. Ele INTERCEPTA
     * a requisição e faz alguma coisa com ela. Nesse caso, ele cria uma nova var (req.body) e inclui o corpo
     * da requisição e converte ele para JSON
     * no caso esse middleware é GLOBAL. Ele vai valer para todas as rotas (então o res.setHeader('Content-Type',
     * 'application/json') vai valer para todas as rotas
    */
    await json(req, res);

    //filtro para encontrar a rota no routes.js
    const route = routes.find(route => {
        //o retorno da função buildRoutePath é uma regex, que pode testar urls e strings em geral com o método .test()
        //ele retorna true ou false
        // -- no caso de um post, preciso que a url bata com o método e com o path (/users/)
        // -- no caso de um delete, preciso que a url bata com o método e com o path (/^\/users\/(?<id>[a-z0-9-_]+)/)
        return route.method === method && route.path.test(url);
    })

    //se encontra a rota, executa o handler passando os parametros que ele precisa
    //tudo com apenas um if
    if (route) {
        //verificando se a url aqui recebida bate com a regex da rota (que usa o path no lugar de url)
        //o match() ao contrário do test() retorna um array com os parametros da url, retorna mais que true ou false
        //retorna tudo o que deu match e mais informações

        console.log(req.url.match(route.path))

        const routeParams = req.url.match(route.path);
        //console.log(extractQueryParams(routeParams.groups.query));
        //console.log(routeParams.groups);
        //console.log(routeParams)
        const {query, ...params} = routeParams.groups;
        //console.log(params); 
        

        req.params = params; //resto dos groups tirando o query
        //digestão e transformação da query em objeto -- aqui basta colocar query porque extraí ela lá em cima. Se não existir query, retorna um objeto vazio
        req.query = query ? extractQueryParams(query) : {}; //aqui eu crio aquele objeto com chave e valor das querys

        //cria um objeto com os parametros da url dentro da req contendo o id do user
        //assim eu terei acesso ao id do user dentro do handler da rota DELETE ali no return
        // id é uma informação que vem da url, não do corpo da requisição	
        req.params = {...routeParams.groups};

        return route.handler(req, res);
    }

    return res.writeHead(404).end(); //aqui eu tô falando pra tipo, se não cair em nenhuma das rotas (ifs) executar isso (404 - not found)
})

server.listen(3333);

/**
 * Para fins didaticos:
 * RouteParams:

    [
        '/users?search=josias&page=2',
        '?search=josias&page=2',
        'search=josias&page=2',
        index: 0,
        input: '/users?search=josias&page=2',
        groups: [Object: null prototype] { query: '?search=josias&page=2' }
    ]

 * RouteParams.groups:

    [Object: null prototype] { query: '?search=josias&page=2' }

 * RouteParams.groups.query:

    ?search=josias&page=2

 */


