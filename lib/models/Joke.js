import pool from '../utils/pool.js';

export default class Joke {
  constructor(jokeRow) {
    console.log('JOKEROW', jokeRow);
    this.id = jokeRow.id;
    this.category = jokeRow.category;
    this.typeOf = jokeRow.type_of;
    this.setup = jokeRow.setup;
    this.delivery = jokeRow.delivery;
    this.joke = jokeRow.joke;
  }

  static async makeJoke({ category, typeOf, setup = null, delivery = null, joke }) {
    console.log('CAT', category);
    console.log('TYPEOF', typeOf);
    console.log('JOKE',  joke);
    const { rows: jokeRows } = await pool.query(
      'INSERT INTO jokes (category, type_of, setup, delivery, joke) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [category, typeOf, setup, delivery, joke]
    );
    console.log('JOKE[]', jokeRows[0]);
    return new Joke(jokeRows[0]);
  }
}

 
// static async insert({ quantity }) {
//     const { rows } = await pool.query(
//       'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
//       [quantity]
//     );
//     return new Order(rows[0]);
//   }
