import fs from 'node:fs/promises';

//configurando o caminho do arquivo db.json 
const databasePath = new URL('../db.json', import.meta.url);

export class Database {
    //propriedade database que é um objeto vazio
    //o # faz ser prop privada impossivel de ser acessada livremente fora da classe Database
    //teste alteração
    #database = {}; 

    //ao iniciar aplicação, precisamos recuperar os dados do arquivo db.json no formato do banco
    constructor() {
        fs.readFile(databsePath, 'utf8').then(data => {
            // JSON.parse transforma o JSON em objeto
            this.#database = JSON.parse(data);
        })
    }

    //aqui estou salvando as informações do banco de dados em um arquivo db.json
    //JSON.stringify transforma o objeto em JSON   
    //estou usando o caminho databasePath que configurei na linha 4 
    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select (table){
        //retorna ou a tabela, ou um array vazio
        const data = this.#database[table] || [];

        return data;
    }

    insert (table, data){
        // se já tem array da tabela (ex: tabela de usuários),
        // adiciona o dado no array
        if (Array.isArray(this.#database[table])){
            this.#database[table].push(data);
        } else {
            //se não tem array da tabela, cria um array com o
            //dado novo
            this.#database[table] = [data];
        }

        this.#persist();
        
        return data;
    }
}