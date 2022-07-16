// http://api.themoviedb.org/3/movie/now_playing?api_key=bf13d212e86d995a4f0b9809db21ee89&language=pt-BR

import { useEffect } from "react";
import { useState } from "react";
import api from    './../../services/api';


function Home() {

    const [filme, setFilme] = useState([]);

    useEffect(()=> {

        async function loadFilms() {
            const response = await api.get("movie/now_playing", {
                params: {

                    api_key: "bf13d212e86d995a4f0b9809db21ee89",
                    language: "pt-BR",
                    page: 1,

                }
            })

            console.log(response.data.results);
        }

        loadFilms()

    }, []);


    return(
        <div> 
            <h1> Home - Bem vindo</h1> 
        </div>
    )
    
}


export default Home;