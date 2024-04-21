import shApis from '../helpers/ShApis'
import shStorage from '../repositories/ShStorage'
import { onMounted, ref } from 'vue'
import shRepo from '../helpers/ShRepo'

/**
 * useShFetch is a custom hook for fetching data from a given URL and caching it.
 * @param {string} url - The URL to fetch data from.
 * @param {string} path - The path to drill down to the data in the response.
 * @param {string} cacheKey - The key to use when caching the data.
 * @returns {object} An object containing the status, loading state, error, data, and a function to refetch the data.
 */
const useShFetch = (url, path, cacheKey) => {
    const status = ref('pending')
    const loading = ref(false)
    const error = ref(null)
    const data = ref(null)

    onMounted(() => {
        reFetchData()
    })

    /**
     * Fetches data from the given URL and updates the status, loading state, error, and data refs.
     * If a cacheKey is provided and there is cached data for that key, the cached data is used instead of fetching.
     */
    const reFetchData = (dataUrl) => {
        loading.value = true
        status.value = 'loading'
        if (cacheKey && shStorage.getItem(cacheKey)) {
            data.value = shStorage.getItem(cacheKey)
            status.value = 'success'
            loading.value = false
        } else {
            shApis.doGet(dataUrl ?? url).then(response => {
                status.value = 'success'
                let res = response.data
                if (path) {
                    let pathArr = path.split('.')
                    for (let i = 0; i < pathArr.length; i++) {
                        res = res[pathArr[i]]
                    }
                }
                data.value = res
                if (cacheKey) {
                    shStorage.setItem(cacheKey, res)
                }
            })
                .catch(res => {
                    status.value = 'error'
                    error.value = res.message ? res.message : (res.error ? res.error : 'An unexpected error occurred')
                    shRepo.showToast(error.value, 'error')
                })
                .finally(() => {
                    loading.value = false
                })
        }
    }

    return {
        status,
        loading,
        error,
        data,
        reFetchData
    }
}

export default useShFetch
