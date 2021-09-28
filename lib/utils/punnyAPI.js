import fetch from 'node-fetch';
const fetchPunAPI = async() => {

  const apiData = await fetch('https://v2.jokeapi.dev/joke/pun?safe-mode');
  const mungePunData = await apiData.json();
  return {
    'category' : mungePunData.category,
    'type' : mungePunData.type,
    'setup' : mungePunData.setup,
    'delivery' : mungePunData.delivery 
  };
    
};

export default fetchPunAPI;
