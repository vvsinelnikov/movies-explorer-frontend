import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';
import { shortieDuration } from '../../utils/constants';
import NavigationContext from '../../contexts/NavigationContext';

function Movies() {
  const { navShown, setNavShown } = React.useContext(NavigationContext);
  React.useEffect(() => {
    setNavShown(false)
  }, []);

  const [showPreloader, setShowPreloader] = React.useState(false); // прелоадер
  const [movies, setMovies] = React.useState([]); // фильмы

  // ПОИСК
  // Валидация поисковой строки
  const [searchValidationState, setSearchValidationState] = React.useState({
    validation: false,
    isValid: false,
    isDisabled: false,
    showError: false
  });
  function chechSearchValidity(string) {
    if (string.length > 0) {
      setSearchValidationState(prev => ({...prev,
        isValid: true,
        isDisabled: false
      }))
    }
    else {
      setSearchValidationState(prev => ({...prev,
        isValid: false,
        isDisabled: true
      }))
    }
  }

  // Обновляем значение поисковой строки
  const [searchString, setSearchString] = React.useState('');
  function handleSearchChange(evt) {
    setSearchString(evt.target.value)
    chechSearchValidity(evt.target.value)
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
    if (evt) { evt.preventDefault() }
    setSearchValidationState(prev => ({...prev,
      showError: false, // сброс ошибок
      validation: true // запуск валидации при первом поиске
    }));
    chechSearchValidity(searchString);
    if (searchValidationState.isValid) {
      setShowPreloader(true);
      setcurrentPage(1) // сбрасываем результаты на первую страницу
      setMovies([]); // сбрасываем текущие фильмы
      moviesApi.getMovies()
        .then((movies) => {
          const regexp = new RegExp(searchString, 'i');
          return movies.filter(movie => regexp.test(movie.nameRU))
        })
        .then((movies) => {
          setMovies(movies);
          localStorage.setItem('lastMovies', JSON.stringify(movies));
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
    const filteredMovies = isShort ? movies.filter(movie => movie.duration < shortieDuration ) : movies;
    return filteredMovies.slice(0, moviesCount * currentPage)
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

        <MoviesCardList filteredMovies={filteredMovies} page={'Movies'} />

        <div className='movies__loader'>
          { (( isShort ? movies.filter(movie => movie.duration < shortieDuration ).length : movies.length ) > (currentPage * moviesCount)) ? ( <input type='button' value='Еще' onClick={loadMovies} className='movies__loader-button'/> ) : ( <></> ) }
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Movies;
