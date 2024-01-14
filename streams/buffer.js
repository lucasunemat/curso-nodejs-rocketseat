/**
 * Buffer é uma representação de espaço na memória que guarda dados em binário
 * É uma forma de transitar dados rapidamente (armazenados para logo tratar e já enviar para outro lugar)
 * Performance = nodejs usa porque é mais rápido para o pc ler informações binárias na memória
 * Buffer é API criada para trabalhar com dados binários de forma nativa no node
 */

const buf = Buffer.from('hello'); //criando buffer a partir de uma string
console.log(buf.toJSON());

/* Resultado: <Buffer 68 65 6c 6c 6f>
    *68 = h
    *65 = e
    *6c = l
    *6c = l
    *6f = o
*/

/**
 * Se usar o toJSON() vai sair { type: 'Buffer', data: [ 104, 101, 108, 108, 111 ] }
 * E esses são os numeros que representam os caracteres na tabela ASCII (e é o valor
 * que aparece se vc converter os hexa pra decimal)
 */
