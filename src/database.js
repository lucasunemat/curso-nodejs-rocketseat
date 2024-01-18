export class Database {
    //propriedade database que é um objeto vazio
    #database = {}; 

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
        
        return data;
    }
}