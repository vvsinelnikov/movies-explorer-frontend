import React from 'react';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import Footer from '../Footer/Footer';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs'
import AboutMe from '../AboutMe/AboutMe'
import Portfolio from '../Portfolio/Portfolio'
import Navigation from '../Navigation/Navigation'
import NavigationContext from '../../contexts/NavigationContext';

function Main() {
  const { navShown, setNavShown } = React.useContext(NavigationContext);
  React.useEffect(() => {
    setNavShown(false)
  }, []);

  return (
    <>
      <Header />
      <div className='main'>
        { navShown ? ( <Navigation /> ) : ( <></> ) }
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </div>
      <Footer />
    </>
  );
}

export default Main;
