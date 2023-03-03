import {CLIENT_TOKEN} from '../constants'


export const getConfigForHeader = (api_id:number)=>{
  return{
      headers: {
        'X-API-ID': api_id,
        'X-CLIENT-TOKEN': CLIENT_TOKEN,
        'content-type':'application/json'
      }
    }
}