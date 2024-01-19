/**
 * /users/:id
 */

// função que valida se o caminho da rota tem parâmetros desejados

export function buildRoutePath(path) {
    // um grupo onde pode ter letras de a até z,
    // tanto maiúsculas quanto minúsculas, infinitas vezes
    // o g é para pegar tudo que der match, g = global
    // cada () é um subgrupo, uma busca dentro da busca
    const routeParametersRegex = /:([a-zA-Z]+)/g;
    //const teste1 = /:([a-zA-Z]+)/g

    // substitui O QUE DER MATCH (ou seja, o que tiver :sjhfsjfsdkf) pelo que está dentro do parênteses
    // para nomear grupos, usa ?<nomeDoGrupo>
    // ?<$1> indica que quero pegar o primeiro retorno (linha 12, após os dois pontos) e usar como nome do grupo
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

     //const teste2 = /\/users\/([a-z0-9\-_]+)/

    // indica que o caminho da rota deve começar com o pathWithParams (ou seja, após /users/, deve ter um id)
    // essa parte relativa a ^${pathWithParams} é dizendo o que vai vir depois do /users/
    // ou seja, no final, vai concatenar /users/ com ^${pathWithParams}
    const pathRegex = new RegExp(`^${pathWithParams}`);

    return pathRegex;
}