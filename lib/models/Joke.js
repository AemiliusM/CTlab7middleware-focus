import pool from '../utils/pool.js';

export default class Joke {
  constructor(jokeRow) {
    this.id = jokeRow.id;
    this.category = jokeRow.category;
    this.typeOf = jokeRow.type_of;
    this.setup = jokeRow.setup;
    this.delivery = jokeRow.delivery;
    this.joke = jokeRow.joke;
  }

  static async makeJoke({ category, typeOf, setup = null, delivery = null, joke }) {
    const { rows: jokeRows } = await pool.query(
      'INSERT INTO jokes (category, type_of, setup, delivery, joke) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [category, typeOf, setup, delivery, joke]
    );
    return new Joke(jokeRows[0]);
  }

  static async getJokes() {
    const { rows } = await pool.query(
      'SELECT * FROM jokes'
    );
    return rows.map((row) => {
      return new Joke(row);
    });
  }

  static async fixOneJoke({ category, typeOf, setup = null, delivery = null, joke }, id) {
    const { rows } = await pool.query('UPDATE jokes SET category = ($1), type_of = ($2), setup = ($3), delivery = ($4), joke = ($5) WHERE id = ($6) RETURNING *',  [category, typeOf, setup, delivery, joke, id]);
    return new Joke(rows[0]);
  }

  static async deleteOneJoke(id) {
    const { rows } = await pool.query(`DELETE FROM jokes WHERE id = ${id} RETURNING *`);
    return new Joke(rows[0]);
  }
}
//  static async changeOne(quantity, id) {
//     const { rows } = await pool.query('Update orders SET quantity = ($1) WHERE id = ($2) RETURNING *;', 
//       [quantity, id]); return new Order(rows[0]);
//   }
 
// static async insert({ quantity }) {
//     const { rows } = await pool.query(
//       'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
//       [quantity]
//     );
//     return new Order(rows[0]);
//   }
