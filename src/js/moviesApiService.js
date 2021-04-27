const API_KEY = '4ee9f3c9031692c2042b06be7b52de80';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalPages = 1;
  }

  // callback
  fetchMovies(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(({ results, total_pages }) => {
        // Раскомментировать для кнопки load-more 
        // this.incrementPage();
        this.totalPages = total_pages;

        return results;
      })
      .catch(console.log);
  }

  // Фильмы при загрузке страницы
  fetchTrendingMovies(paginPage = 1) {
    this.page = paginPage;

    return this.fetchMovies(
      `${BASE_URL}/trending/all/week?api_key=${API_KEY}&page=${this.page}`,
    );
  }

  // фильмы из строки поиска
  fetchSearchMovies(paginPage = 1) {
    this.page = paginPage;

    return this.fetchMovies(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}&include_adult=false`,
    );
  }

  // Список всех жанров
  fetchGenresList() {
    return fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .catch(console.log);
  }

  // Получить фильм по id
  fetchMovieById(id) {
    return fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .catch(console.log);
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

  // узнать кол-во всех страниц
  get numberOfPages() {
    return this.totalPages;
  }

  set numberOfPages(newTotalPages) {
    this.totalPages = newTotalPages;
  }
}
