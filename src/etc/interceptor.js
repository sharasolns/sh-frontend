import shRepo from '@/lib/repo/helpers/ShRepo.js'

const intercept = axiosInstance=> {
    axiosInstance.interceptors.response.use(function (response) {
        console.log(response)
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const allowedPaths = ['/sh-auth','/register','/login']
        if(error.request.status === 401){
            if(!allowedPaths.includes(window.location.pathname)){
                window.location.href = shRepo.getShConfig('loginUrl','/sh-auth')
            }
        }
        return Promise.reject(error);
    })
}
export {
    intercept
}