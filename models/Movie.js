import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "por favor ingrese el título amigoooooooooaaaaaaaa"],
  },
  plot: {
    type: String,
    required: [true, "por favor ingrese el plot amigoooooooooaaaaaaaa"],
  },
});

//primero mira si el modelo de Movie ya está creado, y si lo está no lo crea de nuevo y sino, lo crea
export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);



