import conectarDB from '../../../config/dbConfig'
import Movie from '../../../models/Movie'

export default async function handler(req, res) {

  await conectarDB()

  //POST /api/movie
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const movie = new Movie(req.body)
        await movie.save()

        return res.status(200).json({ success: true, movie })
      }
      catch (error) {
        res.status(400).json({ success: false, error })
      }

    default:
      return res.status(500).json({ success: false, error: 'fallo del servidor' })
  }


}
