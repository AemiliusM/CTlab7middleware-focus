import XmasJoke from '../models/XmasJoke.js';
import fetchXmasJokeAPI from '../utils/xmasjokeAPI.js';

export default class XmasJokeService {
  static async getRandomXmasSafeJoke() {
    const joke = await fetchXmasJokeAPI();
    return joke;
  }

  static async createJoke({ category, typeOf, setup, delivery }) {
    const newJoke = await XmasJoke.makeJoke({ category, typeOf, setup, delivery });
    return newJoke;
  }

  static async getAllJokes() {
    const jokes = await XmasJoke.getJokes();
    return jokes;
  }

  static async getJokeById(id) {
    const joke = await XmasJoke.getJokes(id);
    return joke;
  }

  static async updateJoke(updates, id) {
    const updatedJoke = await XmasJoke.fixOneJoke(updates, id);
    return updatedJoke;
  }

  static async deleteJoke(id) {
    const deletedJoke = await XmasJoke.deleteOneJoke(id);
    return deletedJoke;
  }
}
