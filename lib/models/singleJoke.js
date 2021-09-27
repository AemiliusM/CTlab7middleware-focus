import pool from '../utils/pool.js';

export default class singleJoke {
  constructor(jokeRow) {
    this.id = jokeRow.id;
    this.category = jokeRow.category;
    this.typeOf = jokeRow.type_of;
    this.joke = jokeRow.joke;
  }

  static async makeJoke({ category, typeOf, joke }) {
    const { rows: jokeRows } = await pool.query(
      'INSERT INTO singlejokes (category, type_of, joke) VALUES ($1, $2, $3) RETURNING *',
      [category, typeOf, joke]
    );
    return new singleJoke(jokeRows[0]);
  }

  static async getJokes() {
    const { rows } = await pool.query(
      'SELECT * FROM singlejokes'
    );
    return rows.map((row) => {
      return new singleJoke(row);
    });
  }

  static async fixOneJoke({ category, typeOf, joke }, id) {
    const { rows } = await pool.query('UPDATE singlejokes SET category = ($1), type_of = ($2), joke = ($3) WHERE id = ($4) RETURNING *',  [category, typeOf, joke, id]);
    return new singleJoke(rows[0]);
  }

  static async deleteOneJoke(id) {
    const { rows } = await pool.query(`DELETE FROM singlejokes WHERE id = ${id} RETURNING *`);
    return new singleJoke(rows[0]);
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
