import mysql from 'mysql2/promise' // la ventajas de mysql2 es que soporta async/await

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'movies_database'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()
      const [genres] = await connection.query(
        'SELECT * FROM genres WHERE LOWER(name) = ?;', [lowerCaseGenre]
        // no usar `` porque es fallo de seguridad
        // Se puede inyectar codigo malicioso
      )
      if (genres.length === 0) return { movies: [] }

      const [{ id }] = genres
      const [moviesId] = await connection.query(
        'SELECT movie_id FROM movie_genres WHERE genre_id = ?;', [id]
      )
      if (moviesId.length === 0) return { movies: [] }

      const [movies] = await connection.query(
        // eslint-disable-next-line camelcase
        'title, year, director, duration, rate, poster, BIN_TO_UUID(id)  id FROM movies WHERE id IN (?);', [moviesId.map(({ movie_id }) => movie_id)]
      )
      return { movies }
    }
    const [movies] = await connection.query( // el otro resultado es tableInfo
      'SELECT title, year, director, duration, rate, poster, BIN_TO_UUID(id)  id FROM movies;'
    )
    return { movies }
  }

  static async getById ({ id }) {
    const [movie] = await connection.query(
      'SELECT title, year, director, duration, rate, poster, BIN_TO_UUID(id)  id FROM movies WHERE id = UUID_TO_BIN(?);', [id]
    )
    return { movie }
  }

  static async create ({ movie }) {
    const { title, year, director, duration, rate, poster } = movie
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const uuid = uuidResult[0].uuid
    try {
      await connection.query( // aca si puedo inyectar ya que lo estoy controlando y no viene del user (solo uuid)
        'INSERT INTO movies (id, title, year, director, duration, rate, poster) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);',
        [uuid, title, year, director, duration, rate, poster]
      )
    } catch (error) {
      throw new Error('Error al crear la pelicula')
      // Se podia mandar el error a un servicio de logueo
    }

    // Al no ser autoincrementar es dificil sacar la id
    const [muvieResult] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movies WHERE id = UUID_TO_BIN(?);',
      [uuid]
    )
    return { movie: muvieResult }
  }

  static async update ({ id, movie }) {

  }

  static async delete ({ id }) {

  }
}
