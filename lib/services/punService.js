import Pun from '../models/Pun.js';
import fetchPunAPI from '../utils/punnyAPI.js';

export default class PunService {
  static async getRandomSafePun() {
    const pun = await fetchPunAPI();
    return pun;
  }

  static async createPun({ category, typeOf, setup, delivery, joke }) {
    const newpun = await Pun.makePun({ category, typeOf, setup, delivery, joke });
    return newpun;
  }

  static async getAllPun() {
    const puns = await Pun.getPuns();
    return puns;
  }

  static async updatePun(updates, id) {
    const updatedpun = await Pun.fixOnePun(updates, id);
    return updatedpun;
  }

//   static async deletepun(id) {
//     const deletedpun = await Pun.deleteOnepun(id);
//     return deletedpun;
//   }
}
