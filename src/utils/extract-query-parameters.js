export function extractQueryParams(query) {
    /**
     * substr: retorna uma parte da string, começando na posição 1 (ou seja, sem o ?)
     * split: divide a string em um array, usando & como separador
     * reduce: reduz o array a um unico valor (queryParams, objeto que quero no final)
     * a digestão fica:
     * ?search=Diego&order=desc --> original
     * search=Diego&order=desc --> apliquei substr
     * [ 'search=Diego' , 'order=desc' ] --> apliquei split
     * [ ['search' , 'Diego' ], [ 'order' , 'desc' ] ] --> apliquei segundo split (isso
     *                                                     é um estado virtual que o reduce usa para pegar os valores)
     * queryParams = { search: 'Diego', order: 'desc' } --> após o reduce terminar
     */
    return query.substr(1).split('&').reduce((queryParams, param) => {
        const [key, value] = param.split('=')

        queryParams[key] = value

        return queryParams
    }, {})
}