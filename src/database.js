import fs from 'node:fs/promises';

/**
 * O método constructor() é necessário porque ele permite que a classe Database seja inicializada
 * com um estado inicial. No caso específico desse arquivo, o estado inicial é um objeto vazio que
 * representa o banco de dados.
 * Se você criasse uma função para ler os dados do arquivo db.json, você não teria como inicializar
 * o banco de dados. Você teria que passar o objeto vazio para a função como um argumento, o que
 * tornaria o código menos conciso e mais difícil de entender.
 * Além disso, uma função para ler os dados do arquivo db.json não seria capaz de armazenar os dados
 * em um estado interno. Isso significaria que você teria que passar o objeto de dados para todas as
 * funções que precisam acessá-lo, o que tornaria o código mais complexo e menos eficiente.
 */


//configurando o caminho do arquivo db.json 
const databasePath = new URL('../db.json', import.meta.url);

export class Database {
    //propriedade database que é um objeto vazio, é o estado inicial do banco de dados
    //o # faz ser prop privada impossivel de ser acessada livremente fora da classe Database
    //teste alteração
    #database = {};

    //ao iniciar aplicação, precisamos recuperar os dados do arquivo db.json no formato do banco
    constructor() {
        fs.readFile(databasePath, 'utf8').then(data => {
            // JSON.parse transforma o JSON em objeto
            this.#database = JSON.parse(data);
        })
            .catch(() => {
                //se não tiver nada no arquivo, vai criar um objeto vazio
                this.#persist();
            })

    }

    //aqui estou salvando as informações do banco de dados em um arquivo db.json
    //JSON.stringify transforma o objeto em JSON   
    //estou usando o caminho databasePath que configurei na linha 4 
    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table) {
        //retorna ou a tabela, ou um array vazio
        const data = this.#database[table] || [];

        return data;
    }

    insert(table, data) {
        // se já tem array da tabela (ex: tabela de usuários),
        // adiciona o dado no array
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            //se não tem array da tabela, cria um array com o
            //dado novo
            this.#database[table] = [data];
        }

        this.#persist();

        return data;
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        if (rowIndex >= -1) {
            this.#database[table][rowIndex] = {id, ...data}
            this.#persist();
        }
    }

    delete(table, id) {
        //sabemos que teremos um id porque na rota POST sempre geramos um UUID e salvamos no banco
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        console.log('row:', rowIndex) //retorna qual a posição do registro dentro do array de JSON USERS (database)

        // só retorna de 0 para cima (menor posição do array de JSON USERS é 0)
        if (rowIndex >= -1) {
            /**
             * O método splice() aceita de 1 a 4 parâmetros. O primeiro parâmetro é o índice de início,
             * onde a operação de fatiamento (splice, em inglês) começa. O segundo parâmetro é opcional
             * e representa o número de elementos a serem removidos. Se o segundo parâmetro for omitido,
             * todos os elementos a partir do índice de início serão removidos.
             
             * Os parâmetros adicionais são opcionais e representam os novos elementos a serem adicionados
             * ao array. Se um ou mais parâmetros adicionais forem fornecidos, os elementos existentes no
             * array a partir do índice de início serão deslocados para o lado direito.
             */
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
        }
    }
}