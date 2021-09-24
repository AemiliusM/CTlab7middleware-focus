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
}
