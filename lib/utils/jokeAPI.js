import fetch from 'node-fetch';
const fetchJokeAPI = async() => {

  const apiData = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode?format=json');
  const mungeData = await apiData.json();
  return {
    'catagory' : mungeData.category,
    'type' : mungeData.type,
    'setup' : mungeData.delivery,
    'delivery' : mungeData.delivery,
    'joke' : mungeData.joke 
  };
    
};
export default fetchJokeAPI;
