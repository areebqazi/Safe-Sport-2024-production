import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import EducationPage from "./pages/EducationPage";
import Resources from "./pages/Resources";
import Header from "./components/Header";
import HeroMsg from "./pages/HeroMsg";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.css";
import { LanguageProvider, LanguageContext } from "./LanguageContext";

Amplify.configure(awsExports);

function App() {
  const [mobileMenuVisible, setMobileMenuVisible] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  return (
    <div className="App">
      <div className="background-div">
        <LanguageProvider>
          <Router>
            <Header />
            <LanguageContext.Consumer>
              {({ language, toggleLanguage }) => (
                <>
                  <div className="lang-button-div">
                    <button
                      className="mobile-btn-lang"
                      onClick={toggleLanguage}
                    >
                      {language === "english" ? "Passer au Français" : "Switch to English"}
                    </button>
                  </div>
                  <div className="content-desktop">
                    <NavLink
                      className="content-link"
                      exact
                      activeClassName="active"
                      to="/"
                    >
                      {language === "english" ? "Home" : "Accueil"}
                    </NavLink>
                    <NavLink
                      className="content-link"
                      activeClassName="active"
                      to="/education"
                    >
                      {language === "english" ? "Education" : "Éducation"}
                    </NavLink>
                    <NavLink
                      className="content-link"
                      activeClassName="active"
                      to="/HeroMsg"
                    >
                      {language === "english"
                        ? "The Athlete’s Voice"
                        : "Écoutez vos Héros"}
                    </NavLink>
                    <NavLink
                      className="content-link"
                      activeClassName="active"
                      to="/Resources"
                    >
                      {language === "english"
                        ? "Resources and Support"
                        : "Ressources et Support"}
                    </NavLink>
                    <NavLink
                      className="content-link"
                      activeClassName="active"
                      to="/FAQ"
                    >
                      {language === "english" ? "FAQs" : "FAQ"}
                    </NavLink>
                  </div>
                  <div className="content-mobile">
                    <button className="hamburger" onClick={toggleMobileMenu}>
                      ☰
                    </button>
                    <div
                      className={`mobile-menu ${
                        mobileMenuVisible ? "visible" : ""
                      }`}
                    >
                      <NavLink
                        className="content-link"
                        exact
                        activeClassName="active"
                        onClick={toggleMobileMenu}
                        to="/"
                      >
                        {language === "english" ? "Home" : "Accueil"}
                      </NavLink>
                      <NavLink
                        className="content-link"
                        activeClassName="active"
                        onClick={toggleMobileMenu}
                        to="/education"
                      >
                        {language === "english" ? "Education" : "Éducation"}
                      </NavLink>
                      <NavLink
                        className="content-link"
                        activeClassName="active"
                        onClick={toggleMobileMenu}
                        to="/HeroMsg"
                      >
                        {language === "english" ? "The Athlete's Voice" : "Écoutez vos Héros"}
                      </NavLink>
                      <NavLink
                        className="content-link"
                        activeClassName="active"
                        onClick={toggleMobileMenu}
                        to="/Resources"
                      >
                        {language === "english" ? "Resources and Support" : "Ressources et Support"}
                      </NavLink>
                      <NavLink
                        className="content-link"
                        activeClassName="active"
                        onClick={toggleMobileMenu}
                        to="/FAQ"
                      >
                        {language === "english" ? "FAQs" : "FAQ"}
                      </NavLink>
                    </div>
                  </div>
                </>
              )}
            </LanguageContext.Consumer>

            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/FAQ" element={<FAQ />}></Route>
              <Route path="/education" element={<EducationPage />}></Route>
              <Route path="/HeroMsg" element={<HeroMsg />}></Route>
              <Route path="/Resources" element={<Resources />}></Route>
            </Routes>
            <Footer />
          </Router>
        </LanguageProvider>
      </div>
    </div>
  );
}

export default App;
