import "./Home.css";
// import { Authenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
// import './EducationPages.css';
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { LanguageContext } from "../LanguageContext";
import "../components/Authenticator.css";
import axios from "axios";
import { API } from "../constants";
import { useNavigate } from "react-router-dom";

// const localVideoPath = '../../public/assets/placeholder1.mp4';
const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [isSignIn, setIsSignIn] = useState(true);

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    date: "",
    sport: "",
  });

  const [showForgotPassword ,setShowForgotPassword] = useState(false);
  
   const [showChangePassword ,setShowChangePassword] = useState(false);

   const [message, setMessage]= useState(false);

   const [otp,setOtp] = useState('');  


  //language handler
  const { language } = useContext(LanguageContext);

  // const [language, setLanguage] = useState('english');

  // Define video URLs based on the selected language

  const englishVideos = {
    promo:
      "https://dqdi1yce51qjt.cloudfront.net/english-with-caption/main-promo-eng.mp4",

    // Include other English video URLs here...
  };
  const frenchVideos = {
    promo:
      "https://dqdi1yce51qjt.cloudfront.net/french-with-caption/main-promo-french.mp4",

    // Include other French video URLs here...
  };
  //this switches the videos from englisht to french
  const videoUrls = language === "english" ? englishVideos : frenchVideos;
  console.log("Video URLs:", videoUrls);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if(!/\S+@\S+\.\S+/.test(signUpData.email)){
        alert("Invalid email address")
        return;
      }
      if(signUpData.password.length < 8){
        alert("Password must be at least 8 characters long")
        return;
      }
      if (signUpData.password !== signUpData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      const { name, email, password, date, sport } = signUpData;
    if (!name || !email || !password || !date || !sport) {
        alert("Please fill out all fields");
        return;
      }
      const response = await axios.post(`${API}/auth/signup`, {
        name,
        email,
        password,
        birthDate: date,
        sport,
      });
      if (response.status === 201) {
        alert("Sign up successful");
        window.location.reload();
      } else {
        alert("Error signing up. Please try again.");
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = signInData;
      if(!/\S+@\S+\.\S+/.test(email)){
        alert("Invalid email address")
        return;
      }
      if (!email || !password) {
        alert("Please fill out all fields");
        return;
      }
      const response = await axios.post(`${API}/auth/signin`, {
        email,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.reload();
        // navigate("/education")
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Invalid credentials");
      console.error(error);
    }
  };

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prevSignInData) => ({
      ...prevSignInData,
      [name]: value,
    }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevSignUpData) => ({
      ...prevSignUpData,
      [name]: value,
    }));
  };

  const handleChagePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/auth/reset-password`, {
        email: signInData.email,
        otp: otp,
        newPassword: signUpData.password,
      });
      console.log(otp,'otp is')
      if (response.status === 200) {
        alert("Password reset successful");
        setShowChangePassword(false);
        setShowForgotPassword(false);
      } else {
        alert("Error resetting password. Please try again.");
      }
    }

    catch (error) {
      console.error(error);
      alert("Error resetting password. Please try again.");
    }
  }

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/auth/sendOTP`, {
        email: signInData.email,
      });
      console.log(response);  
      if (response.status === 200) {
        setMessage(response.data.message)
      } else {
        setMessage(response.data.message)
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="home-page">
      <div className="page-title-div">
        <h1 className="page-title">
          {language === "english"
            ? "Welcome to the Safe Sport Education for Youth Program"
            : "Bienvenue au programme d`éducation au sport sécuritaire pour les jeunes"}{" "}
        </h1>
        <br></br>
      </div>

      {/* <Authenticator signUpAttributes={['given_name', 'family_name', 'birthdate']} className='home-page-authenticator' hideDefault={true}>
                {({ signOut, user }) => (
                    <div className="logout-btn">
                        <button className="signOut-btn" onClick={signOut}>{language === 'english' ? 'Sign Out' : 'Se déconnecter'}</button>
                    </div>
                )}


            </Authenticator> */}
      {/* <Authenticator className='home-page-authenticator'/>     */}

      {!user&&!showForgotPassword&&!showChangePassword && (
        <div className="auth-container">
          <div className="toggle">
            <button
              className={isSignIn ? "active" : ""}
              onClick={() => setIsSignIn(true)}
            >
              Sign In
            </button>
            <button
              className={!isSignIn ? "active" : ""}
              onClick={() => {
                setIsSignIn(false);
              }}
            >
              Create Account
            </button>
          </div>
          {isSignIn ? (
            <form className="form">
              <h2>Sign In</h2>
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={signInData.email}
                onChange={handleSignInChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                value={signInData.password}
                onChange={handleSignInChange}
              />
              <button type="submit" onClick={handleSignIn}>
                Sign In
              </button>
              <button className="forgot-password" onClick={()=>setShowForgotPassword(true)}>
                Forgot Password
              </button>
            </form>
          ) : (
            <form className="form">
              <h2>Create Account</h2>
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={signUpData.email}
                onChange={handleSignUpChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                value={signUpData.password}
                onChange={handleSignUpChange}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                required
                value={signUpData.confirmPassword}
                onChange={handleSignUpChange}
              />
              <input
                type="name"
                placeholder="Given Name"
                name="name"
                required
                value={signUpData.name}
                onChange={handleSignUpChange}
              />
              <input
                type="date"
                placeholder="Birthdate"
                name="date"
                required
                value={signUpData.date}
                onChange={handleSignUpChange}
              />
              <select
                  name="sport"
                  required
                  value={signUpData.sport}
                  onChange={handleSignUpChange}
                  className="select-form-input"
                >
                  <option value="" disabled>
                    Select a sport
                  </option>
                  <option value="football">Football</option>
                  <option value="basketball">Basketball</option>
                  <option value="tennis">Tennis</option>
                  <option value="baseball">Baseball</option>
                  <option value="hockey">Hockey</option>
                  <option value="swimming">Swimming</option>
                  <option value="volleyball">Volleyball</option>
                  <option value="cricket">Cricket</option>
                  <option value="rugby">Rugby</option>
                  <option value="golf">Golf</option>
                </select>

              <button type="submit" onClick={handleSignUp}>
                Create Account
              </button>
            </form>
          )}
        </div>
      )}
      {showForgotPassword && (
        <div className="auth-container">
          <form className="form">
            <h2>Enter your Email</h2>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              value={signInData.email}
              onChange={handleSignInChange}
            />
            <button type="submit" className="mb-3" onClick={handleSendOTP}>
              Send Code
            </button>

            {message && <p>{message}</p>}
            <input
              type="text"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="submit" className="forgot-password" onClick={()=>{setShowChangePassword(true); setShowForgotPassword(false)}}>Submit</button>
            <button className="forgot-password" onClick={()=>{setShowChangePassword(false);setShowForgotPassword(false)}}>Cancel</button>
          </form>
        </div>
      )}

      {showChangePassword && (
        <div className="auth-container">
          <form className="form">
            <h2>Change Password</h2>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              value={signUpData.password}
              onChange={handleSignUpChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              value={signUpData.confirmPassword}
              onChange={handleSignUpChange}
            />
            <button type="submit" onClick={handleChagePassword}>Change Password</button>
            <button onClick={()=>{setShowChangePassword(false);setShowForgotPassword(false)}} className="forgot-password">Cancel</button>
          </form>
        </div>
      )}

      {/* <div className='lang-button-div'>
                <button className='mobile-btn-lang' onClick={toggleLanguage}>{language === 'english' ? 'Passer au Français' : 'Switch to English'}</button>
            </div> */}
      {/* {userEmail ? (
                <div className="user-email-container">
                    <p>Your email: {userEmail}</p>
                </div>
            ) : null} */}
      <div className="video-Container">
        <video
          id="HFYHVideo"
          key={language}
          width="800px"
          height="auto"
          controls
          controlsList="nodownload"
        >
          <source
            src={language === "english" ? videoUrls.promo : videoUrls.promo}
            type="video/mp4"
          />
        </video>
      </div>
      <div className="default-div">
        <h2>
          {language === "english"
            ? "Safe Sport Education for Youth Overview"
            : "Éducation au sport sécuritaire pour les jeunes"}{" "}
          <br></br>{" "}
        </h2>
      </div>
      {/* <div className='welcome-statement default-div'>
                <p>{language === 'english' ? `Welcome to Safe Sport Education for Youth! This educational program will provide you with all the tools you need to have a safe and positive sports experience. Safe Sport Education for Youth is brought to you by the National Sports Organizations representing athletics, volleyball, and swimming. These videos are short and all you need to do is watch them. Easy right? Check out the videos and be a part of our new movement called Safe Sport.` : `Bienvenue à l'éducation Safe Sport pour la jeunesse ! Ce programme éducatif vous fournira tous les outils nécessaires pour vivre une expérience sportive sûre et positive. L'éducation Safe Sport pour la jeunesse vous est proposée par les organisations nationales de sports représentant l'athlétisme, le volleyball et la natation. Ces vidéos sont courtes et tout ce que vous avez à faire est de les regarder. Facile non ? Regardez les vidéos et faites partie de notre nouveau mouvement appelé Safe Sport.`}</p>

                <br></br>
                <br></br>
                <p>{language === 'english' ? `Every athlete deserves a sports experience that's free of maltreatment and abuse. Sports can provide the fun and positive environment you deserve, but sometimes it doesn't exactly work out that way. We have tailored this education program to provide you with the tools to protect yourself from negative sporting situations. This program has been designed specifically for athletes age 13-19. If you are under 13, please get permission from your parent(s) or guardian(s) before you start the program.` : `Chaque athlète mérite une expérience sportive sans mauvais traitements ni abus. Le sport peut offrir l'environnement amusant et positif que vous méritez, mais parfois cela ne se passe pas exactement ainsi. Nous avons adapté ce programme éducatif pour vous fournir les outils nécessaires pour vous protéger des situations sportives négatives. Ce programme a été spécialement conçu pour les athlètes âgés de 13 à 19 ans. Si vous avez moins de 13 ans, veuillez obtenir la permission de vos parents ou tuteurs avant de commencer le programme.`}</p>

                <br></br>
                <br></br>
                <p>{language === 'english' ? `Some of the information you hear may be hard to hear and could make you uncomfortable. We've got a page ` : `Certaines des informations que vous entendrez peuvent être difficiles à entendre et peuvent vous mettre mal à l'aise. Nous avons une page `}<Link className='custom-links' to="/resources"> (Resources)</Link>{language === 'english' ? ` with links to some of the support and resources available to help you get through it. There are there to help you.` : ` avec des liens vers certains des soutiens et ressources disponibles pour vous aider à y faire face. Ils sont là pour vous aider.`}</p>

            </div> */}
      <div className="welcome-statement default-div">
        <p>
          {language === "english"
            ? `This new Safe Sport Education Program for Youth aged 13-19 provides a comprehensive approach to fostering a safe and respectful sporting environment. This program covers essential topics such as recognizing and reporting abuse, setting boundaries, and promoting healthy relationships within sports communities. Through interactive modules and engaging discussions, participants will gain the knowledge and skills necessary to navigate potential risks and protect themselves and others. It's important to note that some of the information covered may evoke discomfort, and participants are encouraged to seek out support (Visit our Resources Page `
            : `Ce nouveau programme d'éducation sur le sport sécuritaire destiné aux jeunes âgés de 13 à 19 ans propose une approche globale pour favoriser un environnement sportif sûr et respectueux. Ce programme couvre des sujets essentiels tels que reconnaître et signaler les abus, fixer des limites et promouvoir des relations saines au sein des communautés sportives. Grâce à des modules interactifs et à des discussions engageantes, les participants acquerront les connaissances et les compétences nécessaires pour gérer les risques potentiels et se protéger ainsi que les autres. Il est important de noter que certaines des informations couvertes peuvent susciter un inconfort, et les participants sont encouragés à rechercher de l'aide (visitez notre page de ressources `}
          <Link className="custom-links" to="/resources">
            {" "}
            {language === "english" ? `Here` : `Ici`}
          </Link>
          {language === "english"
            ? ` ) if needed. For those under the age of 13 we strongly suggest you take this training with the support of a parent or guardian. Together, we strive to create a culture of safety and empowerment in sports for all young athletes.`
            : ` ) si nécessaire. Pour les moins de 13 ans, nous vous suggérons fortement de suivre cette formation avec le soutien d'un parent ou d'un tuteur. Ensemble, nous nous efforçons de créer une culture de sécurité et d'autonomisation dans le sport pour tous les jeunes athlètes.`}
        </p>
      </div>
      <div className="gap-container"></div>
      {/* <div className='welcome-statement default-div'>
                <p>{language === 'english' ? `So how does the Safe Sport for Youth program work. We kept it simple for anyone to use. Just follow these step by step instructions and be open to learning:` : `Alors, comment fonctionne le programme Safe Sport for Youth. Nous l'avons rendu simple pour que tout le monde puisse l'utiliser. Suivez simplement ces instructions étape par étape et soyez ouvert à l'apprentissage:`}</p>

                <br></br>
                <br></br>
                <p>
                    <ul>
                        <li>{language === 'english' ? 'Register for the website using an email that we can send your certificate of completion to.' : 'Inscrivez-vous sur le site Web en utilisant une adresse e-mail à laquelle nous pouvons envoyer votre certificat de réussite.'}</li>
                        <br />
                        <li>{language === 'english' ? 'Watch the videos on the education page in order. No skipping ahead.' : 'Regardez les vidéos sur la page éducative dans l`ordre. Ne pas sauter.'}</li>
                        <br />
                        <li>{language === 'english' ? 'Stay present and pay attention to the videos. The information matters!' : 'Restez présent et faites attention aux vidéos. Les informations sont importantes!'}</li>
                        <br />
                        <li>{language === 'english' ? 'Receive your certificate of completion by email and submit it to your sports club if they have asked for it.' : 'Recevez votre certificat de réussite par e-mail et soumettez-le à votre club de sport s`ils vous l`ont demandé.'}</li>
                        <br />
                        <li>{language === 'english' ? 'Spread the word! We all need to do our part to keep sport safe.' : 'Passez le mot! Nous devons tous faire notre part pour garder le sport sûr.'}</li>
                    </ul>
                </p>

            </div>
            <div className='gap-container'> */}
    </div>
  );
};

export default Home;
