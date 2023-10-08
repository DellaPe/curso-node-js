import { mongoose } from 'mongoose'
import { randomUUID } from 'node:crypto'

const movieSchema = new mongoose.Schema({
  _id: String,
  title: String,
  year: Number,
  director: String,
  duration: Number,
  rate: Number,
  poster: String,
  genre: [String]
})

const MovieModelDB = mongoose.model('Movie', movieSchema)

export class MovieModel {
  static async getAll ({ genre }) {
    try {
      const movies = await MovieModelDB.find().exec() // Recomendacion exec() para que devuelva una promesa
      if (!genre) return { movies }
      const lowerCaseGenre = genre.toLowerCase()
      const lowerCaseMovies = movies.map(({ genre, ...movie }) => ({ ...movie, genre: genre.map((genre) => genre.toLowerCase()) }))
      const filteredMovies = lowerCaseMovies.filter(({ genre }) => genre.includes(lowerCaseGenre))
      return { hasError: false, movies: filteredMovies }
    } catch (error) {
      return { hasError: true, error: 'Error getting movies' }
    }
  }

  static async getById ({ id }) {
    try {
      const movie = await MovieModelDB.findById(id).exec() // Recomendacion exec() para que devuelva una promesa
      if (!movie) return { hasError: true, error: 'Movie not found' }
      return { movie }
    } catch (error) {
      return { hasError: true, error: 'Error getting movie' }
    }
  }

  static async create ({ movie }) {
    try {
      const movies = await MovieModelDB.find().exec() // Recomendacion exec() para que devuelva una promesa
      const lowerCaseTitle = movie.title.toLowerCase()
      const movieExists = movies.find(({ title }) => title.toLowerCase() === lowerCaseTitle)
      if (movieExists) return { hasError: true, error: 'Movie already exists' }
      const newMovie = new MovieModelDB({ _id: randomUUID(), ...movie })
      await newMovie.save()
      return { newMovie }
    } catch (error) {
      return { hasError: true, error: 'Error creating movie' }
    }
  }

  static async update ({ id, movie }) {
    try {
      const movieDB = await MovieModelDB.findById(id).exec() // Recomendacion exec() para que devuelva una promesa
      if (!movieDB) return { hasError: true, error: 'Movie not found' }
      // Mejorar
      const { title, year, director, duration, rate, poster, genre } = movie
      if (title) movieDB.title = title
      if (year) movieDB.year = year
      if (director) movieDB.director = director
      if (duration) movieDB.duration = duration
      if (rate) movieDB.rate = rate
      if (poster) movieDB.poster = poster
      if (genre) movieDB.genre = genre

      await movieDB.save()
      return { hasError: false }
    } catch (error) {
      return { hasError: true, error: 'Error updating movie' }
    }
  }

  static async delete ({ id }) {
    try {
      const movie = await MovieModelDB.findById(id).exec() // Recomendacion exec() para que devuelva una promesa
      if (!movie) return { hasError: true, error: 'Movie not found' }
      await MovieModelDB.findOneAndRemove(id).exec()
      return { hasError: false }
    } catch (error) {
      return { hasError: true, error: 'Error deleting movie' }
    }
  }
}
