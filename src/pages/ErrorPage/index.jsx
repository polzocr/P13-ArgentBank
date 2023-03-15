import './index.css'
import { Link } from 'react-router-dom'


export default function ErrorPage(){
    return (
        <>
            <div>Une erreur est survenue, cette page n'existe pas !</div>
            <Link to="/">Retour à l'accueil</Link>
        </>
        
    )
}