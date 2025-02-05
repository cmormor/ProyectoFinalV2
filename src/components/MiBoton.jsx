import { Link } from "react-router-dom";

export const MiBoton = ({ ruta, texto, icono }) => {
    return (
        <Link to={ruta} className='text-decoration-none btn bg-primary col-2'>
            <span>{texto}</span>
            <i className={`bi bi-${icono}`}></i>
        </Link>
    );
}