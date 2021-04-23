import refs from './refs';
import MoviesApiService from './moviesApiService';

refs.searchFormRef.addEventListener('submit', onSearch);
refs.loadMoreBtnRef.addEventListener('click', onLoadMore);

const moviesApiService = new MoviesApiService();

function onSearch(event) {
  event.preventDefault();

  // query - это атрибут name у инпута(таким образом получаем ссылку на инпут внутри формы)
  moviesApiService.query = event.currentTarget.elements.query.value;

  moviesApiService.resetPage();
  moviesApiService.fetchSearchMovies();
}

function onLoadMore() {
  moviesApiService.fetchSearchMovies();
}
