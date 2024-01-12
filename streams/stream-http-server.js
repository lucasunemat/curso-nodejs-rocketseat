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
const server = http.createServer((req, res) => {
    req
        .pipe(new InverseNumberStream()) //aqui é a stream de transformação
        .pipe(res) //res é a resposta que o servidor vai dar para o usuário, é como se fosse o stdout
})

server.listen(3334)


