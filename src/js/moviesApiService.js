const API_KEY = '4ee9f3c9031692c2042b06be7b52de80';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  // Фильмы при загрузке страницы
  fetchTrendingMovies() {
    return fetch(
      `${BASE_URL}/trending/all/week?api_key=${API_KEY}&page=${this.page}&include_adult=false`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(({ results }) => {
        this.incrementPage();

        return results;
      });
  }

  // фильмы из строки поиска
  fetchSearchMovies() {
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}&include_adult=false`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(({ results, total_pages }) => {
        this.incrementPage();
        // Количество страниц
        console.log(total_pages);

        return results;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    if (this.page <= 0) {
      return;
    }

    this.page -= 1;
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
