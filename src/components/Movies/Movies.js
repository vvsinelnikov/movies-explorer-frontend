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
  const [allMovies, setAllMovies] = React.useState([]); // все фильмы
  const [searchedMovies, setSearchedMovies] = React.useState([]); // результат поиска по фильмам

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
      setSearchedMovies(JSON.parse(localStorage.getItem('lastMovies')))
    }
    }, []
  )

  // Первичная загрузка всех фильмов
  function getAllMovies() {
    const jwt = localStorage.getItem('jwt');
    let all = [];
    setShowPreloader(true);
    moviesApi.getMovies()
      .then((movies) => { // загрузка всех фильмов
        all = movies;
        return mainApi.getLikedMovies(jwt); // запрос лайкнутых фильмов
      })
      .then((liked) => { // простановка лайков во всех фильмах
        all.forEach(movie => {
          if (liked.find(m => m.id === movie.id)) { movie.isLiked = true }
        });
        setAllMovies(all); // запись всех фильмов с лайками в стейт
        serachAllMovies(all);
        setShowPreloader(false);
      })
      .catch((err) => {
        setShowPreloader(false);
        setSearchValidationState(prev => ({...prev, showError: `${err}`}));
      });
  }

  // Поиск в сохраненных фильмах
  function serachAllMovies(movies) {
    setcurrentPage(1) // сбрасываем результаты на первую страницу
    const regexp = new RegExp(searchString, 'i');
    const searchedMovies = movies.filter(movie => regexp.test(movie.nameRU))
    setSearchedMovies(searchedMovies) // конечный результат поиска
    localStorage.setItem('lastMovies', JSON.stringify(searchedMovies));
  }

  // Обработчик поиска
  function handleSearch(evt) {
    evt.preventDefault();
    setSearchValidationState(prev => ({...prev,
      showError: false, // сброс ошибок
      validation: true // запуск валидации при первом поиске
    }));
    if (searchValidationState.isValid) {
      allMovies.length === 0 ? getAllMovies() : serachAllMovies(allMovies)
    }
  }

  // Определение количества результатов
  const [moviesCount, setМoviesCount] = React.useState(Number);
  const [currentPage, setcurrentPage] = React.useState(1);
  React.useEffect(() => {
    window.addEventListener('resize', () => { setTimeout(updateSize, 1000) });
    updateSize()
    }, []
  )
  function updateSize() {
    const pageWidth = document.documentElement.scrollWidth
    if (pageWidth < 480) {
      setМoviesCount(1);
      setcurrentPage(5);
    }
    if (pageWidth >= 480 && pageWidth < 768) {
      setМoviesCount(2);
      setcurrentPage(4)
    }
    if (pageWidth >= 768) {
      setМoviesCount(3);
      setcurrentPage(4);
    }
  }

  function loadMovies() { setcurrentPage(currentPage + 1) } // постраничная подгрузка

  // Фильтр по короткометражкам
  const [isShort, setIsShort] = React.useState(false);
  function handleIsShortChange(evt) {
    setIsShort(evt.target.checked);
    evt.target.blur(); // снятие фокуса (обводки) после клика
  }

  // Финальный вывод фильмов
  function filteredMovies() {
    const filteredMovies = isShort ? searchedMovies.filter(movie => movie.duration < shortieDuration) : searchedMovies;
    return filteredMovies.slice(0, moviesCount * currentPage) // постраничная выдача
  }

  function likeClick(movie) {
    const jwt = localStorage.getItem('jwt');
    console.log(movie.isLiked)
    if (movie.isLiked) {
      mainApi.dislikeMovie(jwt, movie)
        .then(() => {
          movie.isLiked = undefined;
          const updatedMovies = searchedMovies.map(m => m.id === movie.id ? movie : m);
          setSearchedMovies(updatedMovies);
          localStorage.setItem('lastMovies', JSON.stringify(updatedMovies));
        })
        .catch(err => console.log(err))
    }
    else {
      mainApi.likeMovie(jwt, movie)
        .then(() => {
          movie.isLiked = true;
          const updatedMovies = searchedMovies.map(m => m.id === movie.id ? movie : m);
          setSearchedMovies(updatedMovies);
          localStorage.setItem('lastMovies', JSON.stringify(updatedMovies));
        })
        .catch(err => console.log(err))
    }
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
          { (( isShort ? searchedMovies.filter(movie => movie.duration < shortieDuration ).length : searchedMovies.length ) > (currentPage * moviesCount)) ? ( <input type='button' value='Еще' onClick={loadMovies} className='movies__loader-button'/> ) : ( <></> ) }
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Movies;
