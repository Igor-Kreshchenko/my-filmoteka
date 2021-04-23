import refs from './refs';
// import MoviesApiService from './js/moviesApiService';

refs.searchFormRef.addEventListener('submit', onSearch);

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '4ee9f3c9031692c2042b06be7b52de80';

fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=1`)
  .then(response => response.json)
  .then(console.log);

function onSearch(event) {
  event.preventDefault();
}
