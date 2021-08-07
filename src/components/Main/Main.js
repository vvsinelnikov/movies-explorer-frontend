import React from 'react';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import Footer from '../Footer/Footer';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs'
import AboutMe from '../AboutMe/AboutMe'
import Portfolio from '../Portfolio/Portfolio'
import Navigation from '../Navigation/Navigation'

function Main(props) {

  return (
    <>
      <Header toggleNav={props.toggleNav} isLoggedIn={props.isLoggedIn} />
      <div className='main'>
        { props.navShown ? ( <Navigation isLoggedIn={props.isLoggedIn} toggleNav={props.toggleNav}/> ) : ( <></> ) }
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
