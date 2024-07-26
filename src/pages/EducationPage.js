import React, { useState, useEffect, useRef, useContext } from "react";

import "./EducationPages.css";
import { InView } from "react-intersection-observer";
import { toPng } from "html-to-image";

//imports for the completion certificate
import EngCertificate from "../assets/cert/SafeSportCompletionCertificate.png";
import FreCertificate from "../assets/cert/SafeSportCompletionCertificateFrench.png";
import { LanguageContext } from "../LanguageContext";
import { API, videoData } from "../constants";
import axios from "axios";

const EducationPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [showCongratulationsPopup, setShowCongratulationsPopup] =
    useState(false);
  const [videosData, setVideoData] = useState([]);
  // fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${API}/videos`);
        setVideoData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideos();
  }, []);
  const [videoStatus, setVideoStatus] = useState(
    JSON.parse(localStorage.getItem("videoStatus")) ||
      user?.user?.videoStatus || [
        { unlocked: true, watched: false },
        { unlocked: false, watched: false },
        { unlocked: false, watched: false },
        { unlocked: false, watched: false },
        { unlocked: false, watched: false },
        { unlocked: false, watched: false },
        { unlocked: false, watched: false },
        { unlocked: false, watched: false },
        { unlocked: false, watched: false },
        { unlocked: false, watched: false },
      ]
  );

  const [isSignIn, setIsSignIn] = useState(true);

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    date: "",
    sport: "",
  });

  useEffect(() => {
    // Update localStorage whenever videoStatus changes
    let allVideosWatched = videoStatus.every((video) => video.watched);
    allVideosWatched = videoStatus[videoData?.length - 1].watched;
    if (allVideosWatched) {
      console.log("User has watched all the videos!");
      setShowCongratulationsPopup(true);
      updateVideoStatus();
    }
  }, [videoStatus]);

  //language handler
  const { language } = useContext(LanguageContext);

  // Define video URLs based on the selected language
  const divRef = useRef(null);

  const handleDownloadImage = async () => {
    if (!divRef.current) return; // Check if the ref is available
    try {
      const dataUrl = await toPng(divRef.current, { cache: false }); // Convert to PNG
      sendCertificateByEmail(dataUrl);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "certificate.png"; // Customize the filename
      link.click();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
        alert("Invalid email address");
        return;
      }
      if (signUpData.password.length < 8) {
        alert("Password must be at least 8 characters long");
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
      if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Invalid email address");
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

  const handleVideoCompletion = (index) => {
    // Mark the current video as watched
    setVideoStatus((prevStatus) =>
      prevStatus.map((video, i) =>
        i === index ? { ...video, watched: true } : video
      )
    );

    // Unlock the next video if there is one
    if (index + 1 < videoStatus.length && videosData[index + 1]) {
      setVideoStatus((prevStatus) =>
        prevStatus.map((video, i) =>
          i === index + 1 ? { ...video, unlocked: true } : video
        )
      );
    }
  };

  useEffect(() => {
    updateVideoStatus();
  }, [videoStatus]);

  const updateVideoStatus = async () => {
    try {
      const response = await axios.patch(`${API}/user/${user?.user?._id}`, {
        ...user,
        videoStatus: videoStatus,
      });
      localStorage.setItem("videoStatus", JSON.stringify(videoStatus));
    } catch (error) {
      console.log(error);
    }
  };

  const handleVideoEnded = (index) => {
    // Check if the user has finished watching the entire video
    console.log(`Video ${index + 1} fully watched!`);
    handleVideoCompletion(index);
  };

  const sendCertificateByEmail = async (certificateDataUrl) => {
    try {
      const response = await axios.post(`${API}/user/send-certificate`, {
        email: user.user.email,
        certificateBase64: certificateDataUrl,
      });
      if (response.status === 200) {
        alert("Certificate emailed successfully!");
      } else {
        alert("Failed to email certificate. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to email certificate. Please try again.");
    }
  };

  return (
    <InView>
      <div className="education-page">
        <div className="page-title-div">
          <h1 className="page-title">
            {language === "english"
              ? "Safe Sport Education"
              : "Éducation sur la Maltraitance"}
          </h1>
        </div>
        {!user && (
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
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  required
                  value={signUpData.firstName}
                  onChange={handleSignUpChange}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  required
                  value={signUpData.lastName}
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
                  <option value="football">Atheltics</option>
                  <option value="swimming">Swimming</option>
                  <option value="volleyball">Volleyball</option>
                  <option valye="other">Other</option>
                </select>

                <button type="submit" onClick={handleSignUp}>
                  Create Account
                </button>
              </form>
            )}
          </div>
        )}
        {user && (
          <div className="video-container">
            {videosData.map((video, index) => (
              <div key={index}>
                <div
                  className={`video-wrapper ${
                    videoStatus[index].unlocked ? "" : "locked"
                  }`}
                >
                  <video
                    key={language} // Add key prop here to force re-render
                    poster={
                      language === "english" ? video.posterEng : video.posterFre
                    } // Add poster images
                    id="education-Video"
                    controls
                    loading="lazy"
                    controlsList="nodownload"
                    onEnded={() => handleVideoEnded(index)}
                    className={videoStatus[index].unlocked ? "" : "locked"}
                  >
                    <source
                      src={language === "english" ? video.urlEng : video.urlFre}
                      type="video/mp4"
                    />
                  </video>
                  {videoStatus[index].unlocked ? null : (
                    <div className="lock-overlay"></div>
                  )}
                </div>
                <div className="titles-container">
                  <h3 className="video-title">
                    {language === "english" ? video.titleEng : video.titleFre}
                  </h3>
                  <p className="video-info">
                    {language === "english"
                      ? video.descriptionEng
                      : video.descriptionFre}
                  </p>
                </div>
              </div>
            ))}

            {/* This is the pop-up where the user enters the info for the certificate */}
            {showCongratulationsPopup && (
              <div className="congratulations-popup congrats-div">
                <h2>
                  {language === "english"
                    ? "Congratulations!"
                    : "Toutes nos félicitations!"}
                </h2>
                <br></br>
                <p>
                  {language === "english"
                    ? "You've finished watching all the video modules. Please download your Certificate."
                    : "Vous avez fini de regarder tous les modules vidéo. Veuillez télécharger votre certificat."}
                </p>

                <button onClick={() => setShowCongratulationsPopup(false)}>
                  Close
                </button>
                <div ref={divRef} className="certificate-wrapper">
                  <p className="certificate-wrapper-Date">
                    {new Date().toLocaleDateString("en-US")}
                  </p>
                  <p className="certificate-wrapper-Name">{user?.user?.name}</p>
                  <p className="certificate-wrapper-Sport">
                    {user?.user?.sport.toUpperCase()}
                  </p>
                  <img
                    src={
                      language === "english" ? EngCertificate : FreCertificate
                    }
                    alt="Certification"
                    className="certificate"
                  />
                </div>
                <br></br>

                <button className="dwn-btn" onClick={handleDownloadImage}>
                  {language === "english"
                    ? "Download Certificate"
                    : "Télécharger le certificat"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </InView>
  );
};

export default EducationPage;
