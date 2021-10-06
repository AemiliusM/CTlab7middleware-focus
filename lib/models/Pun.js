import pool from '../utils/pool.js';

export default class Pun {
  constructor(punRow) {
    this.id = punRow.id;
    this.category = punRow.category;
    this.typeOf = punRow.type_of;
    this.joke = punRow.joke;
  }

  static async makePun({ category, typeOf, joke }) {
    const { rows } = await pool.query(
      'INSERT INTO punnyjokes (category, type_of, joke) VALUES ($1, $2, $3) RETURNING *',
      [category, typeOf, joke]
    );
    return new Pun(rows[0]);
  }

  static async getPuns() {
    const { rows } = await pool.query(
      'SELECT * FROM punnyjokes'
    );
    return rows.map((row) => {
      return new Pun(row);
    });
  }

  static async fixOnePun({ category, typeOf, joke }, id) {
    const { rows } = await pool.query('UPDATE punnyjokes SET category = ($1), type_of = ($2), joke = ($3) WHERE id = ($4) RETURNING *',  [category, typeOf, joke, id]);
    return new Pun(rows[0]);
  }

  static async deleteOnePun(id) {
    const { rows } = await pool.query(`DELETE FROM punnyjokes WHERE id = ${id} RETURNING *`);
    return new Pun(rows[0]);
  }
}
