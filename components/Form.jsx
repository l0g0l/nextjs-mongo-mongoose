import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Form = ({ formdata, forNewMovie = true }) => {
    const router = useRouter() //llamamos a router para que nos redirija a otra página

    const [form, setForm] = useState({ //poniendo dentro del state un obj con las propiedades de los inputs, nos ahorramos hacer un useState por cada input, de esta manera el value del imput será form.title, form.plot
        title: formdata.title,
        plot: formdata.plot
    })
    const [message, setMessage] = useState([]) //es un arrray porque puede dar varios mensajes, tanto para el title como para el plot

    const handleChange = (event) => {
        const { value, name } = event.target
        setForm({
            ...form, //hacemos copia de lo que hubiera en form del state
            [name]: value //le añadimos el value del name del input
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (forNewMovie) {
            postData(form) //llamamos  a la funcion con el form del state como parámetro que tiene tanto el title como el plot
        } else {
            console.log('estas editando')
            putData(form)

        }

    }

    const putData = async (form) => {
        setMessage([])
        const { id } = router.query //esto es para poder acceder al id y hacer uuna url dinámica
        try {
            const res = await fetch(`/api/movie/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })

            const data = await res.json() //recogemos la data
            // console.log(data)
            if (!data.success) { // si la data no es ok, recorremos el array, copiamos lo que hubiera y añadimos el nuevo mensaje de error
                for (const key in data.error.errors) {
                    let error = data.error.errors[key]
                    setMessage(oldmessage => [
                        ...oldmessage
                    ],
                        { message: error.message })
                }
            } else {
                setMessage([])
                router.push("/")//si la data sale ok, nos redirige a home 
            }


        }
        catch (error) {
            console.log(error)
        }
    }

    const postData = async (form) => {
        try {
            console.log(form) //vemos lo que escribe el usuario
            const res = await fetch('/api/movie', { //lo mandamos a la api propia de next
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })

            const data = await res.json() //recogemos la data
            console.log(data)
            if (!data.success) { // si la data no es ok, recorremo el array, copiamos lo que hubiera y añadimos el nuevo mensaje de error
                for (const key in data.error.errors) {
                    let error = data.error.errors[key]
                    setMessage(oldmessage => [
                        ...oldmessage
                    ],
                        { message: error.message })
                }
            } else {
                router.push("/")//si la data sale ok, nos redirige a home 
            }


        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control my-2"
                    placeholder="Title"
                    autoComplete="on"
                    name="title"
                    value={form.title}
                    onChange={handleChange} />
                <input
                    type="text"
                    className="form-control my-2"
                    placeholder="Plot"
                    autoComplete="off"
                    name="plot"
                    value={form.plot}
                    onChange={handleChange} />
                <button className="btn btn-primary w-100" type="submit">
                    {forNewMovie ? 'Agregar' : 'Editar'}
                </button>
                <Link href="/">
                    <a className="btn btn-warning w-100 my-2">Volver...</a>
                </Link>
                {message.map(({ message }) => (
                    <p key={message}>{message}</p>
                ))}
            </form>
        </div>
    )
}

export default Form
