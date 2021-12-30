import mongoose from 'mongoose'

const MovieSchema = new mongoose.Schema({
    title:{
        type: String,
        require: [true, "por favor introduzca un titulo"]
    },
    plot:{
        type: String,
        require: [true, "por favor introduzca el plot"]
    }
})

//primero mira si el modelo de Movie ya está creado, y si lo está no lo crea de nuevo y sino, lo crea
export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema)