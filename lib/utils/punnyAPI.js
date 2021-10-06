import fetch from 'node-fetch';
const fetchPunAPI = async() => {

  const apiData = await fetch('https://v2.jokeapi.dev/joke/pun?safe-mode&type=single');
  const mungePunData = await apiData.json();
  return {
    'category' : mungePunData.category,
    'type' : mungePunData.type,
    'joke' : mungePunData.joke
  };
    
};

export default fetchPunAPI;
