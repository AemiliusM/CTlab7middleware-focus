import pool from '../utils/pool.js';

export default class ProgJoke {
  constructor(punRow) {
    this.id = punRow.id;
    this.category = punRow.category;
    this.typeOf = punRow.type_of;
    this.setup = punRow.setup;
    this.delivery = punRow.delivery;
  }

  static async makeProgJoke({ category, typeOf, setup = null, delivery = null, joke = null }) {
    const { rows } = await pool.query(
      'INSERT INTO punnyjokes (category, type_of, setup, delivery, joke) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [category, typeOf, setup, delivery, joke]
    );
    return new ProgJoke(rows[0]);
  }

  static async getProgJokes() {
    const { rows } = await pool.query(
      'SELECT * FROM punnyjokes'
    );
    return rows.map((row) => {
      return new ProgJoke(row);
    });
  }

  static async fixOneProgJoke({ category, typeOf, setup = null, delivery = null, joke = null }, id) {
    const { rows } = await pool.query('UPDATE punnyjokes SET category = ($1), type_of = ($2), setup = ($3), delivery = ($4), joke = ($5) WHERE id = ($6) RETURNING *',  [category, typeOf, setup, delivery, joke, id]);
    return new ProgJoke(rows[0]);
  }

  static async deleteOneProgJoke(id) {
    const { rows } = await pool.query(`DELETE FROM punnyjokes WHERE id = ${id} RETURNING *`);
    return new ProgJoke(rows[0]);
  }
}
