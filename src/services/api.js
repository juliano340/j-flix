// URL DA API  http://api.themoviedb.org/3/movie/now_playing?api_key=bf13d212e86d995a4f0b9809db21ee89&language=pt-BR
//BASE URL: http://api.themoviedb.org/3/

import axios from "axios";

const api = axios.create({
    baseURL: 'http://api.themoviedb.org/3/',

})

export default api;