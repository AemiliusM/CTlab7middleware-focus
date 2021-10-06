import fetch from 'node-fetch';
const fetchXmasJokeAPI = async() => {

  const apiData = await fetch('https://v2.jokeapi.dev/joke/christmas?safe-mode&type=twopart');
  const mungeXmasData = await apiData.json();
  return {
    'category' : mungeXmasData.category,
    'type' : mungeXmasData.type,
    'setup' : mungeXmasData.setup,
    'delivery' : mungeXmasData.delivery 
  };
    
};

export default fetchXmasJokeAPI;
