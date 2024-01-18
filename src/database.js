export class Database {
    //propriedade database que é um objeto vazio
    //o # faz ser prop privada impossivel de ser acessada livremente fora da classe Database
    //teste alteração
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