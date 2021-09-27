import doubleJoke from '../models/DoubleJoke.js';
import fetchDoubleJokeAPI from '../utils/doublejokeAPI.js';

export default class DoubleJokeService {
  static async getRandomDoubleSafeJoke() {
    const joke = await fetchDoubleJokeAPI();
    return joke;
  }

  static async createJoke({ category, typeOf, joke }) {
    const newJoke = await doubleJoke.makeJoke({ category, typeOf, joke });
    return newJoke;
  }

  static async getAllJokes() {
    const jokes = await doubleJoke.getJokes();
    return jokes;
  }

  static async updateJoke(updates, id) {
    const updatedJoke = await doubleJoke.fixOneJoke(updates, id);
    return updatedJoke;
  }

  static async deleteJoke(id) {
    const deletedJoke = await doubleJoke.deleteOneJoke(id);
    return deletedJoke;
  }
}
