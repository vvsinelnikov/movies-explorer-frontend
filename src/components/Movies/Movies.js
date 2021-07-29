import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';

function Movies(props) {

  const [isShort, setIsShort] = React.useState('');
  React.useEffect(() => {
    setIsShort(false)
    }, []
  )
  const handleChange = ({ target: { checked } }) => {
    setIsShort(checked)
  }

  return (
    <>
      <Header toggleNav={props.toggleNav} isLoggedIn={props.isLoggedIn} />
      <div className='main'>
        { props.navShown ? ( <Navigation isLoggedIn={props.isLoggedIn} toggleNav={props.toggleNav}/> ) : ( <></> ) }
        <SearchForm isShort={isShort} handleChange={handleChange} />
        <Preloader />
        <MoviesCardList page={'Movies'} isShort={isShort}/>
      </div>
      <Footer />
    </>
  );
}

export default Movies;
