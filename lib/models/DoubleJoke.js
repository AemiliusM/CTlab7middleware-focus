import pool from '../utils/pool.js';

export default class doubleJoke {
  constructor(jokeRow) {
    this.id = jokeRow.id;
    this.category = jokeRow.category;
    this.typeOf = jokeRow.type_of;
    this.setup = jokeRow.setup;
    this.delivery = jokeRow.delivery;
  }

  static async makeJoke({ category, typeOf, setup, delivery }) {
    const { rows: jokeRows } = await pool.query(
      'INSERT INTO doublejokes (category, type_of, setup, delivery) VALUES ($1, $2, $3, $4) RETURNING *',
      [category, typeOf, setup, delivery]
    );
    return new doubleJoke(jokeRows[0]);
  }

  static async getJokes() {
    const { rows } = await pool.query(
      'SELECT * FROM doublejokes'
    );
    return rows.map((row) => {
      return new doubleJoke(row);
    });
  }

  static async getJoke(id) {
    const { rows } = await pool.query(
      `SELECT * FROM doublejokes WHERE id = ${id}`
    );
    return new doubleJoke(rows[0]);
  }

  static async fixOneJoke({ category, typeOf, setup, delivery }, id) {
    const { rows } = await pool.query('UPDATE doublejokes SET category = ($1), type_of = ($2), setup = ($3), delivery = ($4) WHERE id = ($5) RETURNING *',  [category, typeOf, setup, delivery, id]);
    return new doubleJoke(rows[0]);
  }

  static async deleteOneJoke(id) {
    const { rows } = await pool.query(`DELETE FROM doublejokes WHERE id = ${id} RETURNING *`);
    return new doubleJoke(rows[0]);
  }
}
