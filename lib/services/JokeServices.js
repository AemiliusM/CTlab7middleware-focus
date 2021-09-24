// import Joke from '../models/Joke.js';
import fetchJokeAPI from '../utils/jokeAPI.js';

export default class JokeService {
  static async getRandomSafeJoke() {
    const joke = await fetchJokeAPI();
    return joke;
  }
}
