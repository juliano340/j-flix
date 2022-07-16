import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from './../../services/api';
import './filme.css';

function Filme() {

    const {id} = useParams();
    const navigate = useNavigate();
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
                navigate('/', {replace:true})
                console.log("Filme não encontrado!!!")
                return;
            })

        }

        loadFilme()

        return() => {
            console.log("Componente desmontado!!")
        }

    }, [navigate, id])


    function salvarFilme() {
        const minhaLista = localStorage.getItem("@j-flix");
        let filmesSalvos = JSON.parse(minhaLista) || [] ;

        const hasFilme =filmesSalvos.some((filmesSalvos)=> filmesSalvos.id === filme.id);

        if(hasFilme) {
            alert("Esse filme já está na sua lista!")
            return;
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@j-flix", JSON.stringify(filmesSalvos));
        alert("Filme salvo com sucesso!")
        
    }

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
                <button onClick={salvarFilme}>Salvar</button>
                
                <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}><button>Trailer</button></a>
            </div>

        </div>
    )
    
}

export default Filme;
