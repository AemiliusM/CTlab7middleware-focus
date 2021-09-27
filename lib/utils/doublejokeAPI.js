import fetch from 'node-fetch';
const fetchDoubleJokeAPI = async() => {

  const apiData = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode&type=twopart');
  const mungeDoubleData = await apiData.json();
  return {
    'category' : mungeDoubleData.category,
    'type' : mungeDoubleData.type,
    'setup' : mungeDoubleData.setup,
    'delivery' : mungeDoubleData.delivery 
  };
    
};

export default fetchDoubleJokeAPI;
