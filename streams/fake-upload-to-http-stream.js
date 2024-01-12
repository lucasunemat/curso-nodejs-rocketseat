import { Readable } from 'node:stream';

class OneToHundredStream extends Readable {
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
                this.push(buf) //isso é um chunk (pedaço) de informação que estou enviando para o stdout
            }
        }, 500)

    }
}

/**
 * Quando to trabalhando com readable streams, eu tenho que usar ou post ou put
 * Isso porque ela está lendo os dados do usuário e mandndo para o backend
 */

//A partir de agora essa OneToHundredStrem é um readable stream que será representada pelo "req" lá no meu arquivo stream-http-server.js
fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half' // adicione essa linha
})
