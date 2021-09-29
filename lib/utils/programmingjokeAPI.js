import fetch from 'node-fetch';
const fetchProgrammingAPI = async() => {

  const apiData = await fetch('https://v2.jokeapi.dev/joke/Programming?safe-mode');
  const mungePunData = await apiData.json();
  return {
    'category' : mungePunData.category,
    'type' : mungePunData.type,
    'setup' : mungePunData.setup,
    'delivery' : mungePunData.delivery,
    'joke' : mungePunData.joke
  };
    
};

export default fetchProgrammingAPI;
