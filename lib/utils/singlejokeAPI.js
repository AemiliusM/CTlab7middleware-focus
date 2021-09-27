import fetch from 'node-fetch';
const fetchJokeAPI = async() => {

  const apiData = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode&type=single');
  console.log('THATONE', apiData);
  const mungeData = await apiData.json();
  console.log('thisone', mungeData);
  return {
    'category' : mungeData.category,
    'type' : mungeData.type,
    'joke' : mungeData.joke 
  };
    
};

export default fetchJokeAPI;
