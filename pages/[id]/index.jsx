import conectarDB from '../../config/dbConfig';
import Movie from '../../models/Movie'
import Link from 'next/link';
import { useRouter } from 'next/router';

const MoviePage = ({ success, error, movie }) => {
    // console.log(success)
    // console.log(error)
    // console.log(movie)

    const router = useRouter()


    if (!success) {
        return (
            <div className="container text-center my-5">
                <h2>{error}</h2>
                <Link href="/">
                    <a className="btn btn-success">Volver</a>
                </Link>
            </div>
        )
    }

    const deleteData = async (id) => {
        try {
         await fetch(`/api/movie/${id}`, {
             method: 'DELETE'
         })
         router.push('/')
        }
        catch(err) {
        console.log(err)
        }
    }

    return (
        <div className="container">
            <h1>detalle de movie</h1>
            <div className="card">
                <div className="card-body">
                    <div className="card-title">
                        <h5 className="text-uppercase">{movie.title}</h5>
                    </div>
                    <p className="fw-light">{movie.plot}</p>
                    <Link href="/">
                        <a className="btn btn-success btn-sm me-2">Volver</a>
                    </Link>
                    <Link href={`/${movie._id}/edit`}>
                        <a className="btn btn-warning btn-sm me-2">Editar</a>
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => (deleteData(movie._id))}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}

export default MoviePage

//accedeos a los parms para hacer la  url dinámica y acceder al id y se hacen todas las validaciones de errores y si ha ido bien
export async function getServerSideProps({ params }) {
    try {
        await conectarDB() //conexion BBDD

        const movie = await Movie.findById(params.id).lean()
        console.log(movie)
        //si no existe la película retorna el error
        if (!movie) {
            return {
                props: { success: false, error: 'Película no encontrada' }
            }
        }

        movie._id = `${movie._id}` //tenemos que convertir el _id en un tring, lo hacemos con las back-tick


        return {
            props: { success: true, movie } //muy importante hacer este return así!!! con las props
        }

    }
    catch (error) {
        console.log(error)
        if (error.kind === 'ObjectId') { //en el console del error vemos que si el id no es válido, sale la  propiedad Kind:'ObjectId', por tanto, retornamos el error ido no válido y sino, retornamos el error error en servidor

            return {
                props: { success: false, error: 'id no valido' } //muy importante hacer este return así!!! con las props
            }
        }
        return {
            props: { success: false, error: 'Error de servidor' } //muy importante hacer este return así!!! con las props
        }
    }


}
