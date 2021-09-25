import Joke from '../models/Joke.js';
import fetchJokeAPI from '../utils/jokeAPI.js';

export default class JokeService {
  static async getRandomSafeJoke() {
    const joke = await fetchJokeAPI();
    return joke;
  }

  static async createJoke({ category, typeOf, joke }) {
    // console.log('NEWJOKE', category);
    const newJoke = await Joke.makeJoke({ category, typeOf, joke });
    return newJoke;
  }

  static async getAllJokes() {
    const jokes = await Joke.getJokes();
    return jokes;
  }

  static async updateJoke(updates, id) {
    const updatedJoke = await Joke.fixOneJoke(updates, id);
    return updatedJoke;
  }

  static async deleteJoke(id) {
    console.log(id);
    const deletedJoke = await Joke.deleteOneJoke(id);
    return deletedJoke;
  }
}
