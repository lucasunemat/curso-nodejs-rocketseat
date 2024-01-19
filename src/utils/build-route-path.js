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

    console.log(Array.from(path.matchAll(routeParametersRegex)));
}