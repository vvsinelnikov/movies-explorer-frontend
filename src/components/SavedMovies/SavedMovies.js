import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import MainApi from '../../utils/MainApi';
import { shortieDuration } from '../../utils/constants';
import NavigationContext from '../../contexts/NavigationContext';

function SavedMovies() {
  const { navShown, setNavShown } = React.useContext(NavigationContext);
  React.useEffect(() => {
    setNavShown(false)
  }, []);

  const [myMovies, setMyMovies] = React.useState([]); // фильмы
  const [showPreloader, setShowPreloader] = React.useState(false); // прелоадер

  // Предзагрузка моих фильмов
  React.useEffect(() => {
    setShowPreloader(true);
    setMyMovies([]); // сбрасываем текущие фильмы
    MainApi.getMovies()
      .then((movies) => {
        const myIDs = [5, 6]
        return movies.filter(movie => myIDs.includes(movie.id)) })
      .then((movies) => {
        setMyMovies(movies);
        setShowPreloader(false);
      })
      .catch(err => setSearchValidationState(prev => ({...prev,
          showError: `${err}`}
        )));
    }, []
  )

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

  // Обработчик поиска
  function handleSearch(evt) {
    if (evt) { evt.preventDefault() }
    setSearchValidationState(prev => ({...prev,
      showError: false, // сброс ошибок
      validation: true // запуск валидации при первом поиске
    }));
    chechSearchValidity(searchString);
    if (searchValidationState.isValid) {
      const regexp = new RegExp(searchString, 'i');
      const mySearchedMovies = myMovies.filter(movie => regexp.test(movie.nameRU))
      setMyMovies(mySearchedMovies);
    }
  }

  // Фильтр по короткометражкам
  const [isShort, setIsShort] = React.useState(false);
  function handleIsShortChange(evt) {
    setIsShort(evt.target.checked);
    evt.target.blur(); // снятие фокуса (обводки) после клика
  }

  // Финальный вывод фильмов
  function filteredMovies() {
    return isShort ? myMovies.filter(movie => movie.duration < shortieDuration ) : myMovies;
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

        { filteredMovies().length === 0 && !showPreloader ? ( <p className='movies__no-results'>Ничего не найдено</p> ) : ( <></> ) }
        { searchValidationState.showError ? ( <p className='movies__no-results'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> ) : ( <></> ) }

        <MoviesCardList filteredMovies={filteredMovies} page={'Movies'} />
      </div>
      <Footer />
    </>
  );
}

export default SavedMovies;
