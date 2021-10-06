import singleJoke from '../models/singleJoke.js';
import fetchJokeAPI from '../utils/singlejokeAPI.js';

export default class JokeService {
  static async getRandomSingleSafeJoke() {
    const joke = await fetchJokeAPI();
    return joke;
  }

  static async createSingleJoke({ category, typeOf, joke }) {
    const newJoke = await singleJoke.makeJoke({ category, typeOf, joke });
    return newJoke;
  }

  static async getAllJokes() {
    const jokes = await singleJoke.getJokes();
    return jokes;
  }

  static async getJokeById(id) {
    const joke = await singleJoke.getJokes(id)
    return joke;
  }

  static async updateJoke(updates, id) {
    const updatedJoke = await singleJoke.fixOneJoke(updates, id);
    return updatedJoke;
  }

  static async deleteJoke(id) {
    const deletedJoke = await singleJoke.deleteOneJoke(id);
    return deletedJoke;
  }
}
