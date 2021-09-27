import axios from 'axios';
//import domain from '../main'
export default {
    methods:{
       async request(path,type='GET',data={},header={}){
            const config = {
                headers:header
            }
            const uri = `http://localhost/api/${path}`
            switch (type)
            {
                case 'POST':
                {
                   return axios.post(uri,data,config)
                }
                case 'PUT':
                {
                    return axios.put(uri,data,config)
                }
                case 'DELETE':
                {
                   return axios.delete(uri,config)
                }
                default:
                {
                  return  axios.get(uri,config)
                }
            }
        },
       async authRequest(path,type='GET',data={},header={}){
            header.Authorization = `Bearer ${this.$store.getters.getToken}`
            return this.request(path,type,data,header)
        }
    }
}