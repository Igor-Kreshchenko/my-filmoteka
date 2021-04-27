import refs from './refs';
import MoviesApiService from './moviesApiService';
import moviesTpl from './templates/movies.hbs';
import movieCardTpl from './templates/modal.hbs';

refs.searchFormRef.addEventListener('submit', onSearch);
refs.loadMoreBtnRef.addEventListener('click', onLoadMore);
refs.moviesRef.addEventListener('click', onOpenModal);

const moviesApiService = new MoviesApiService();

// При загрузке страницы
onLoadPage();
function onLoadPage() {
  moviesApiService.fetchTrendingMovies().then(renewMoviesMarkup);
}
// ---

function onSearch(event) {
  event.preventDefault();

  // query - это атрибут name у инпута(таким образом получаем ссылку на инпут внутри формы)
  moviesApiService.query = event.currentTarget.elements.query.value;
  moviesApiService.resetPage();
  moviesApiService.fetchSearchMovies().then(movies => {
    clearMoviesContainer();
    renewMoviesMarkup(movies);
  });
}

function onLoadMore() {
  moviesApiService.fetchSearchMovies().then(renewMoviesMarkup);
}

function renewMoviesMarkup(movies) {
  refs.moviesRef.innerHTML =  moviesTpl(movies);

  // Показывает ко-во страниц с фильмами
  console.log(moviesApiService.numberOfPages);
}

function clearMoviesContainer() {
  refs.moviesRef.innerHTML = '';
}

// Модалка
function onOpenModal(e) {
  document.body.classList.add('show-modal');
  refs.closeBtnRef.addEventListener('click', onCloseModal);

  const movieId = e.target.id;
  movieCardMarkup(movieId);
}

function onCloseModal() {
  document.body.classList.remove('show-modal');

  // очистка бэкдропа при закрытии, чтобы старая картинка не промелькивала
  refs.modalRef.innerHTML = '';
}

function movieCardMarkup(id) {
  moviesApiService
    .fetchMovieById(id)
    .then(movieCardTpl)
    .then(r => {
      refs.modalRef.innerHTML = r;
    });
}

// пагинация
refs.paginationList.addEventListener('click', onPageClick)

function onPageClick(e){
    if(e.target.nodeName !== 'BUTTON'){
        return;
    }

    const currentPageNum = e.target.dataset.index;
    moviesApiService.fetchTrendingMovies(currentPageNum).then(renewMoviesMarkup)
}