

import Nprogress from 'nprogress'
import shRepo from '@/lib/repo/helpers/ShRepo.js'
const intercept = axiosInstance=> {
    axiosInstance.interceptors.request.use(config=>{
        Nprogress.start()
        return config
    }, error=>{
        return Promise.reject(error)
    })
    axiosInstance.interceptors.response.use(function (response) {
        Nprogress.done()
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        console.log(error.response)
        Nprogress.done()
        const url = error.request.responseURL.replace(error.config.baseURL,'')
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const status = error.request.status
        const exemptedStatuses = [422,401]
        if(!exemptedStatuses.includes(status)){
            shRepo.showToast(`${error.message}\n(${url})`, 'error')
        }
        return Promise.reject(error);
    })
}
export {
    intercept
}
