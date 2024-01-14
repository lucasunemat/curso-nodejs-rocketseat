export async function json(req, res) {
    //crio um array de buffers (to usando isso porque quero dar um console log no body da requisição no terminal)
    const buffers = [];

    //juntando todos os pedaços que vieram da req (chunks)
    for await (const chunk of req) {
        buffers.push(chunk);
    }

    try {
        //se tem body, cria uma var body e  converte para string e depois para json e joga na req.body
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        //se não tem body, seta como null
        req.body = null;
    }
    /* 
     * setando header da resposta indicando para o front que é um json | facilita o navegador a entender
     * o que está sendo retornado e formatar
     * No contexto desse middleware, ele faz a função de sempre indicar ao navegador que o que está sendo
     * enviado é JSON sempre que ele é invocado
     */
    req.setHeader('Content-Type', 'application/json')
}