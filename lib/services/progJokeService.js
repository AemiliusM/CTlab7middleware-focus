import ProgJoke from '../models/ProgJoke.js';
import fetchProgrammingAPI from '../utils/programmingjokeAPI.js';

export default class progJokeService {
  static async getRandomSafeProgJoke() {
    const progJoke = await fetchProgrammingAPI();
    return progJoke;
  }

  static async createJoke({ category, typeOf, setup, delivery, joke }) {
    const newprogJoke = await ProgJoke.makeProgJoke({ category, typeOf, setup, delivery, joke });
    return newprogJoke;
  }

  static async getAllProgJokes() {
    const progJokes = await ProgJoke.getProgJokes();
    return progJokes;
  }

  static async getJokeById(id) {
    const joke = await ProgJoke.getJoke(id);
    return joke;
  }

  static async updateProgJoke(updates, id) {
    const updatedProgJoke = await ProgJoke.fixOneProgJoke(updates, id);
    return updatedProgJoke;
  }

  static async deleteProgJoke(id) {
    const deletedProgJoke = await ProgJoke.deleteOneProgJoke(id);
    return deletedProgJoke;
  }
}
