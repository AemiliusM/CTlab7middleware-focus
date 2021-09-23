import Joke from '../models/Joke.js';

export default class JokeService {
  static async getRandomSafeJoke() {
    const joke = await Joke.getJoke();
    return joke;
  }
}
