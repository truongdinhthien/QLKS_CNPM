import axios from 'axios';
import * as Config from './Constants/Config';

export default async function callApi (endpoint, method = 'GET', body)
{
    return await axios ({
        method : method,
        url : `${Config.API_URL}/${endpoint}`,
        data : body
    }).catch(err => {
       return err.response
    }).then(res => res)
}