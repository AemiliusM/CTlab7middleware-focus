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

  //   static async getAllpuns() {
  //     const puns = await Pun.getpuns();
  //     return puns;
  //   }

  //   static async updatepun(updates, id) {
  //     const updatedpun = await Pun.fixOnepun(updates, id);
  //     return updatedpun;
  //   }

//   static async deletepun(id) {
//     const deletedpun = await Pun.deleteOnepun(id);
//     return deletedpun;
//   }
}
