import conectarDB from '../../../config/dbConfig'
import Movie from '../../../models/Movie'

export default async function handler(req, res) {

  await conectarDB()

  //GET /api/movie/:id obtener peli
  //DELETE /api/movie/:id elimina una peli
  //PUT /api/movie/:id  edita peli

  const { method, query:{id} } = req
  //console.log(req)  dentro de req hay una propiedad que es query y dentro le podemos poner la palabra que queramos, le pongo id
  

  switch (method) {
    case 'PUT':
        try {
            const movie = await Movie.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
              });
              if (!movie) {
                return res.status(404).json({ success: false });
              }
          return res.json({success:true, data:movie})
        }
        catch (error) {
          return res.status(404).json({success:false, error})
  
        }
    case 'DELETE':
      try {
        const movie= await Movie.findByIdAndDelete(id)
        if(!movie) {
            return res.status(404).json({success:false})
        }
        return res.json({success:true, data:movie})
      }
      catch (error) {
        return res.status(404).json({success:false})

      }
    case 'GET':
      try {
        const movie= await Movie.findById(id).lean()
        if(!movie) {
            return res.status(404).json({success:false})
        }
        return res.json({success:true, data:movie})
      }
      catch (error) {
        return res.status(404).json({success:false})

      }

    default:
      return res.status(500).json({ success: false, error: 'fallo del servidor' })
  }


}
