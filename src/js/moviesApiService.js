const API_KEY = '4ee9f3c9031692c2042b06be7b52de80';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  // фильмы из строки поиска
  fetchSearchMovies() {
    fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}&include_adult=false`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.incrementPage();
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
