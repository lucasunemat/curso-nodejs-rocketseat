import http from 'node:http'
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;

        console.log(transformed)

        //aqui o primeiro parametro é o erro, e o segundo é o dado transformado
        callback(null, Buffer.from(String(transformed)));
    }
}

/**
 * req = readable stream
 * res = writable stream
 */

//req está representando a OneToHundredStrem no corpo dele, ele traz ela no corpo dele
const server = http.createServer(async (req, res) => {
    // vamos tentar trabalhar com hipotese de precisar ler tudo usando stram readable para DEPOIS tratar os dados
    // por isso, criamos um array de buffers
    const buffers = [];

    // e para cada chunk da requisição, eu vou adicionar no array de buffers
    // for...of: pegar valores de objetos iteráveis
    // usamos await para esperar todos os chunks serem adicionados no array de buffers
    for await (const chunk of req) {
        buffers.push(chunk);
    }

    // após isso, vou mostrar tudo
    const fullStreamContent = Buffer.concat(buffers).toString();
    console.log(fullStreamContent) //isso aqui faz aparecer no terminal os dados enviados pelo fake-upload-to-http-stream.js

    res.end(fullStreamContent);

    // req
    //     .pipe(new InverseNumberStream()) //aqui é a stream de transformação
    //     .pipe(res) //res é a resposta que o servidor vai dar para o usuário, é como se fosse o stdout
})

server.listen(3334)

/**
 * A abordagem de usar o pipe ali que está comentada é mais para arquivos de texto, audio, video, etc, que podem ser consumidos por chunks
 * Agora existem estruturas de dados que não permitem isso, basicamente JSON. Você tem que esperar todos os chunks virem para juntar no 
 * arquivo e consumir ele, pois pedaços de JSON são inúteis, você precisa do JSON completo para a maioria dos processamentos.
 */


