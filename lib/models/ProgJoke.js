import pool from '../utils/pool.js';

export default class ProgJoke {
  constructor(progRow) {
    this.id = progRow.id;
    this.category = progRow.category;
    this.typeOf = progRow.type_of;
    this.joke = progRow.joke;
  }

  static async makeProgJoke({ category, typeOf, joke }) {
    const { rows } = await pool.query(
      'INSERT INTO programmingjokes (category, type_of, joke) VALUES ($1, $2, $3) RETURNING *',
      [category, typeOf, joke]
    );
    return new ProgJoke(rows[0]);
  }

  static async getProgJokes() {
    const { rows } = await pool.query(
      'SELECT * FROM programmingjokes'
    );
    return rows.map((row) => {
      return new ProgJoke(row);
    });
  }

  static async fixOneProgJoke({ category, typeOf, joke }, id) {
    const { rows } = await pool.query('UPDATE programmingjokes SET category = ($1), type_of = ($2), joke = ($3) WHERE id = ($4) RETURNING *',  [category, typeOf, joke, id]);
    return new ProgJoke(rows[0]);
  }

  static async deleteOneProgJoke(id) {
    const { rows } = await pool.query(`DELETE FROM programmingjokes WHERE id = ${id} RETURNING *`);
    return new ProgJoke(rows[0]);
  }
}
