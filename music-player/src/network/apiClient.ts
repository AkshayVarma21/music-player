import axios from 'axios';



export const API = {


    makeRequest(path: string, key: string, reqInit: any) {

        const headers = {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': 'c6058e522bmsh640f1afd613f8fap158b8ejsn7796bf995ba1',
            'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
        }
        const init = Object.assign({}, reqInit, { headers });
        return axios({
            url: path,
            ...init,
        }).then((res: any) => res)
            .then((res) => {
                return ({
                    status: res.status,
                    body: res,
                    headers: res.headers
                })
            })
    },

    // GET call

    async get(path: string, key: string, queryParams: any) {
        const getData = {
            method: 'GET',
            params: queryParams,
        }
        return this.makeRequest(path, key, getData)
    }




}

const axiosClient = axios.create({
    baseURL: `https://api.example.com`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'c6058e522bmsh640f1afd613f8fap158b8ejsn7796bf995ba1',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
});


export default axiosClient;
