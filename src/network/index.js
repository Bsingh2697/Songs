import axios from 'axios';
import { apiConstants } from '../utils/constants/apiConstants';
import { endpoints } from './../utils/constants/endpoints';

const TIMEOUT_DURATION = 60000;

export const defaultInstance = axios.create({
    baseURL:endpoints.base_url,
    timeout:TIMEOUT_DURATION,
    validateStatus: function(status) {
        return status>=200 && status<500
    },
})

defaultInstance.interceptors.request.use(
    
    requestConfig=>{
        console.log('Request Data', requestConfig)
        requestConfig.headers[apiConstants.rapid_api_key]="5252b61832msh0810f8b4facf30ap1ea38fjsn92b51ece64b1";
        // requestConfig.headers[apiConstants.content_type] = "",
        requestConfig.headers[apiConstants.rapid_api_host]="deezerdevs-deezer.p.rapidapi.com";
        return requestConfig
    },
    error=>{ 
        console.log("Error",error)
        return Promise.reject(error)
    }
)

defaultInstance.interceptors.response.use(
    response=>{
        console.log("Response Received")

        return response
    },
    error=>{
        console.log('Error', error)
        return Promise.reject(error)
    }
)

export const apiRequest = (
    url,
    params,
    successCallBack,
    errorCallBack,
    exceptionCallBack
)=> {
    let promise = Promise
        promise = defaultInstance.get(url,{params:params})
    
        promise
        .then((response)=>{
            console.log('Response',response)
            if(response.status===200)
                successCallBack(response)
            else errorCallBack(response)}
        )
        .catch((e)=>{
            if(exceptionCallBack) exceptionCallBack(e)
        })
    //
}