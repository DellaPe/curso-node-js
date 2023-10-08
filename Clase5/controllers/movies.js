import { validateMovie, validatePatchMovie } from '../schemas/movies.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query // query params
    const { movies } = await this.movieModel.getAll({ genre }) // No savemos si es sin
    res.json(movies)
  }

  getById = async (req, res) => { // path-to-regexp
    const { id } = req.params
    const { movie, hasError, error } = await this.movieModel.getById({ id })
    if (!hasError) return res.json(movie)
    res.status(404).json({ error })
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)
    if (result.error) return res.status(400).json({ errors: JSON.parse(result.error.message) }) // o 422
    const { newMovie, hasError, error } = await this.movieModel.create({ movie: result.data })
    if (hasError) return res.status(409).json({ error })
    res.status(201).json(newMovie) // Puede ser util devolver el recurso
  }

  update = async (req, res) => {
    const { id } = req.params
    const { hasError, error, updatedMovie } = await this.movieModel.update({ id, movie: req.body })
    if (hasError) return res.status(404).json({ error })
    const result = validatePatchMovie(req.body)
    if (result.error) return res.status(400).json({ errors: JSON.parse(result.error.message) })
    res.json(updatedMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const { hasError, error } = await this.movieModel.delete({ id })
    console.log(hasError, error)
    if (hasError) return res.status(404).json({ error })
    res.json('Movie deleted')
  }
}
