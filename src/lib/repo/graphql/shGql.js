import shApis from '../helpers/ShApis.js'

const query = async qlQuery => {
    const result = await shApis.graphQlQuery(qlQuery)
    return result.data
}
const mutate = async mutation => {
    const result = await shApis.graphQlMutate(mutation)
    return result.data
}
export default {
    query,
    mutate
}