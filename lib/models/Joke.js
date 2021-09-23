import pool from '../utils/pool.js';

export default class Joke {
  constructor(jokeRow) {
    this.id = jokeRow.id;
  }

  static async getJoke() {
    const { jokeRow } = await pool.query(
      'SELECT * FROM jokes WHERE jokes.catagory = ($2) jokes.type = ($3) jokes.joke = ($4) jokes.setup = ($4) jokes.delivery = ($5)'
    );
    return new Joke(jokeRow);
  }
}
