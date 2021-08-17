/* eslint-disable no-unused-vars */
import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { shortieDuration } from '../../utils/constants';
import NavigationContext from '../../contexts/NavigationContext';

function Movies() {
  const { navShown, setNavShown } = React.useContext(NavigationContext);
  React.useEffect(() => { setNavShown(false) }, []);

  const [showPreloader, setShowPreloader] = React.useState(false); // прелоадер
  const [movies, setMovies] = React.useState([]); // фильмы

  // ПОИСК
  // Валидация поисковой строки
  const [searchValidationState, setSearchValidationState] = React.useState({
    validation: false,
    isValid: false,
    showError: false
  });

  // Обновляем значение поисковой строки
  const [searchString, setSearchString] = React.useState('');
  function handleSearchChange(evt) {
    setSearchString(evt.target.value)
    setSearchValidationState(prev => ({...prev,
      isValid: evt.target.validity.valid
    }))
  }

  // Загрузка фильмов из localStorage
  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem('lastMovies'))) {
      setMovies(JSON.parse(localStorage.getItem('lastMovies')))
    }
    }, []
  )

  // Обработчик поиска
  function handleSearch(evt) {
    evt.preventDefault();
    setSearchValidationState(prev => ({...prev,
      showError: false, // сброс ошибок
      validation: true // запуск валидации при первом поиске
    }));
    if (searchValidationState.isValid) {
      setShowPreloader(true);
      setcurrentPage(1) // сбрасываем результаты на первую страницу
      setMovies([]); // сбрасываем текущие фильмы
      let searchedMovies = []; // сбрасываем результат прошлого поиска
      const jwt = localStorage.getItem('jwt');
      moviesApi.getMovies()
        .then((movies) => { // поиск по всем фильмам
          const regexp = new RegExp(searchString, 'i');
          searchedMovies = movies.filter(movie => regexp.test(movie.nameRU))
          return mainApi.getLikedMovies(jwt)
        })
        .then((liked) => { // простановка лайков в найденных фильмах
          searchedMovies.forEach(movie => {
            if (liked.find(m => m.id === movie.id)) { movie.isLiked = true }
          })
          setMovies(searchedMovies) // конечный результат поиска
          localStorage.setItem('lastMovies', JSON.stringify(searchedMovies));
          setShowPreloader(false);
        })
        .catch(err => setSearchValidationState(prev => ({...prev,
          showError: `${err}`}
        )));
    }
  }

  // Определение количества результатов
  const [moviesCount, setМoviesCount] = React.useState(Number);
  const [currentPage, setcurrentPage] = React.useState(1);
  React.useEffect(() => {
    updateSize()
    }, []
  )
  function updateSize() {
    const pageWidth = document.documentElement.scrollWidth
    if (pageWidth < 480) { setМoviesCount(5) }
    if (pageWidth >= 480 && pageWidth < 768) { setМoviesCount(16) }
    if (pageWidth >= 768) { setМoviesCount(36) }
  }
  window.addEventListener('resize', () => { setTimeout(updateSize, 1000) });

  function loadMovies() { setcurrentPage(currentPage + 1) } // постраничная подгрузка

  // Фильтр по короткометражкам
  const [isShort, setIsShort] = React.useState(false);
  function handleIsShortChange(evt) {
    setIsShort(evt.target.checked);
    evt.target.blur(); // снятие фокуса (обводки) после клика
  }

  // Финальный вывод фильмов
  function filteredMovies() {
    const filteredMovies = isShort ? movies.filter(movie => movie.duration < shortieDuration) : movies;
    return filteredMovies.slice(0, moviesCount * currentPage) // постраничная выдача
  }

  function likeClick(movie) {
    const jwt = localStorage.getItem('jwt');
    movie.isLiked ? mainApi.dislikeMovie(jwt, movie) : mainApi.likeMovie(jwt, movie)
      .then(() => {
        movie.isLiked = movie.isLiked ? false : true;
        const updatedMovies = movies.map(m => m.id === movie.id ? movie : m);
        setMovies(updatedMovies);
        localStorage.setItem('lastMovies', JSON.stringify(updatedMovies));
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <Header />
      <div className='main'>
        { navShown ? ( <Navigation /> ) : ( <></> ) }
        <SearchForm
          handleSearch={handleSearch}
          handleSearchChange={handleSearchChange}
          searchValidationState={searchValidationState}
          handleIsShortChange={handleIsShortChange}
          isShort={isShort}
        />

        { showPreloader && !searchValidationState.showError? ( <Preloader /> ) : ( <></> ) }

        { searchValidationState.validation && !showPreloader && filteredMovies().length === 0 && !searchValidationState.showError ? ( <p className='movies__no-results'>Ничего не найдено</p> ) : ( <></> ) }
        { searchValidationState.showError ? ( <p className='movies__no-results'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> ) : ( <></> ) }

        { filteredMovies().length > 0 ? (<MoviesCardList likeClick={likeClick} filteredMovies={filteredMovies} />) : ('') }

        <div className='movies__loader'>
          { (( isShort ? movies.filter(movie => movie.duration < shortieDuration ).length : movies.length ) > (currentPage * moviesCount)) ? ( <input type='button' value='Еще' onClick={loadMovies} className='movies__loader-button'/> ) : ( <></> ) }
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Movies;
