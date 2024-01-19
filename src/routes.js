import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
    {
        method: 'GET', //metodo
        path: buildRoutePath('/users'), //caminho para chamar a rota, é a url
        //funcao que será executada
        handler: (req, res) => {
            const users = database.select('users')

            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'), // retorna /^\/users/ (a mesma coisa que o que foi enviado)
        handler: (req, res) => {
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
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'), //identificando recurso para deletar - //retorna /^\/users\/(?<id>[a-z0-9-_]+)/
        handler: (req, res) => {
            const { id } = req.params; //pegando id do usuário que veio da URL da requisicao
            const { name, email } = req.body; //pegando dados do usuário que vieram do CORPO da requisição
            database.update('users', id, {
                name,
                email,
            });

            return res.writeHead(204).end(); //204: deu certo mas não tem nada para retornar
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'), //identificando recurso para deletar - //retorna /^\/users\/(?<id>[a-z0-9-_]+)/
        handler: (req, res) => {
            const { id } = req.params; //pegando id do usuário que veio da requisição
            database.delete('users', id);

            return res.writeHead(204).end(); //204: deu certo mas não tem nada para retornar
        }
    }
]