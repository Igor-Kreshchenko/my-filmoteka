import refs from './refs';
import MoviesApiService from './moviesApiService';
import moviesTpl from './templates/movies.hbs';

refs.searchFormRef.addEventListener('submit', onSearch);
refs.loadMoreBtnRef.addEventListener('click', onLoadMore);

const moviesApiService = new MoviesApiService();

// При загрузке страницы
onLoadPage();
function onLoadPage() {
  moviesApiService.fetchTrendingMovies().then(appendMoviesMarkup);
}
// ---

function onSearch(event) {
  event.preventDefault();

  // query - это атрибут name у инпута(таким образом получаем ссылку на инпут внутри формы)
  moviesApiService.query = event.currentTarget.elements.query.value;
  moviesApiService.resetPage();
  moviesApiService.fetchSearchMovies().then(movies => {
    clearMoviesContainer();
    appendMoviesMarkup(movies);
  });
}

function onLoadMore() {
  moviesApiService.fetchSearchMovies().then(appendMoviesMarkup);
}

function appendMoviesMarkup(movies) {
  refs.moviesRef.insertAdjacentHTML('beforeend', moviesTpl(movies));
}

function clearMoviesContainer() {
  refs.moviesRef.innerHTML = '';
}
