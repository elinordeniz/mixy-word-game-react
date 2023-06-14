import axios from "axios"

const BASE_URL="https://mixy-word-guess-api.p.rapidapi.com"
export default axios.create({
    baseURL: BASE_URL,
    headers:{
        // 'X-RapidAPI-Key' :'3c50daaf95mshbd2a2526de893a8p15ec12jsn6b67b4cc36af',
        // 'X-RapidAPI-Host': 'mixy-word-guess-api.p.rapidapi.com',
        // "content-type": "application/json; charset=utf-8",
        'X-RapidAPI-Key' :process.env.REACT_APP_MIXY_WORD_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_MIXY_WORD_API_HOST
    }
})