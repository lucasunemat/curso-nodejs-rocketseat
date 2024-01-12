/**
 * Stream:
 * Conceito de conseguir ir lendo pequenas partes do arquivo e já ir trabalhando com elas
 * sem precisar ler o arquivo todo de uma vez
 * É o mesmo que spotify: posso ir ouvindo a música sem precisar que a internet carregue ela toda
 */

/**
 * Dois tipos de stream:
 * Readable: leitura de dados (ex. ler um arquivo excel e ir inserindo no banco de dados da aplicação)
 * Writable: escrita de dados (ex. escrever um arquivo excel com dados do banco de dados da aplicação) ou
 * enviar uma música aos poucos para o front end exibir ao usuário
 */

/**
 * O que o nodejs faz?
 * Se você for usar um readable strem para importar dados excel para aplicação SEM stream, você vai ter 
 * que esperar o arquivo fazer upload para DEPOIS a aplicação começar a fazer inserts no banco de dados
 * Se você usa stream, você vai lendo o arquivo aos poucos e já vai inserindo no banco de dados aos poucos
 */

/**
 * Em node, sempre que a gente tem uma entrada e saída, temos uma stream;
 * req e res são streams. Você pode enviar dados de req aos poucos e tambem devolver dados de res aos poucos
 * Req e res são "portas", e todas as portas no node são streams
 */

/**
 * No nodejs existe o stdin e stdout, que são os comandos que damos no terminal.
 * Nós trabalhamos stdin e stdout com o process (process.stdin e process.stdout)
 */

/**
 * Stdin = tudo que digito no terminal (stream readable, por que ela vai lendo os
 * dados digitados aos poucos)
 * Ele retorna uma stream que pode ser conectada com outra stream (ex. stdout, que
 * mostra dados no terminal aos poucos, tipo spotify)
 */

//process.stdin
//.pipe(process.stdout);

/*
 * Vamos criar uma stream do zero, aqui
 */

import { Readable } from 'node:stream';

class OneToHundredStrem extends Readable {
    index = 1;

    _read() {
        const i = this.index++;

        //esse setTimeouts
        setTimeout(() => {
            if (i > 100) {
                //push serve readable streamfornecer informações para quem estiver consumindo
                //ao enviar nulo digo que nao tenho mais info para enviar
                this.push(null);
            } else { //aqui é tipo o que eu quero mostrar no stdout, o que ta sendo processado por ele
                const buf = Buffer.from(String(i)) //envio a informação que quero mostrar no stdout convertida em string (buffer só aceita string)
                this.push(buf)
            }
        }, 500)

    }
}

new OneToHundredStrem().pipe(process.stdout); //pipe é o que conecta uma stream com outra
