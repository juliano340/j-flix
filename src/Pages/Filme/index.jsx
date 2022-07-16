import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from './../../services/api';
import './filme.css';

function Filme() {

    const {id} = useParams();
    const [filme, setFilme] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {

        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "bf13d212e86d995a4f0b9809db21ee89",
                    language: "pt-BR",
                }
            })
            .then((response)=> {
                
                setFilme(response.data);
                setLoading(false)
            })
            .catch(() => {
                console.log("Filme não encontrado!!!")
            })

        }

        loadFilme()

        return() => {
            console.log("Componente desmontado!!")
        }

    }, [])



    if(loading) {
        return(
            <div>
                <h1 className="filme-info">Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse:</h3> 
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} /10</strong>
            <div className="area-buttons">
                <button>Salvar</button>
                
                <a href="#"><button>Trailer</button></a>
            </div>

        </div>
    )
    
}

export default Filme;
