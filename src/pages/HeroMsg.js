import '@aws-amplify/ui-react/styles.css';
import './HeroMsg.css';
import React, { useContext, useRef, useState } from 'react';
import { InView } from 'react-intersection-observer';

//thumbnail imports


import tnDamianEng from '../assets/thumbnails/tnDamianEng.png';
import tnDamianFre from '../assets/thumbnails/tnDamianFre.png';
import tnFinlayEng from '../assets/thumbnails/tnFinlayEng.png';
import tnFinlayFre from '../assets/thumbnails/tnFinlayFre.png';
import tnMarissaEng from '../assets/thumbnails/tnMarissaEng.png';
import tnMarissaFre from '../assets/thumbnails/tnMarissaFre.png';
import tnEllaEng from '../assets/thumbnails/tnEllaEng.png';
import tnEllaFre from '../assets/thumbnails/tnEllaFre.png';
import tnJavierEng from '../assets/thumbnails/tnJavierEng.png';
import tnJavierFre from '../assets/thumbnails/tnJavierFre.png';
import tnMarieEng from '../assets/thumbnails/tnMarieEng.png';
import tnMarieFre from '../assets/thumbnails/tnMarieFre.png';
import { LanguageContext } from '../LanguageContext';


const HeroMsg = () => {
    //language handler 

    
    const { language } = useContext(LanguageContext); 

    // Define video URLs based on the selected language

    

    const englishVideos = {

        damian: 'https://dqdi1yce51qjt.cloudfront.net/english-with-caption/Warner_V3_SRT_English.mp4',
        finlay: 'https://dqdi1yce51qjt.cloudfront.net/english-with-caption/Knox_V3_SRT_English.mp4',
        marissa: 'https://dqdi1yce51qjt.cloudfront.net/english-with-caption/Papaconstantinou_V3_SRT_English.mp4',
        javier: 'https://dqdi1yce51qjt.cloudfront.net/english-with-caption/Acevedo_V3_SRT_English.mp4',
        ella: 'https://dqdi1yce51qjt.cloudfront.net/english-with-caption/Jansen_V3_SRT_English.mp4',
        marie: 'https://dqdi1yce51qjt.cloudfront.net/english-with-caption/Marie-Alex-Belanger-English.mp4'

        // Include other English video URLs here...
    };
    const frenchVideos = {

        damian: 'https://dqdi1yce51qjt.cloudfront.net/french-with-caption/Warner_V3_SRT_French.mp4',
        finlay: 'https://dqdi1yce51qjt.cloudfront.net/french-with-caption/Knox_V3_SRT_French.mp4',
        marissa: 'https://dqdi1yce51qjt.cloudfront.net/french-with-caption/Papaconstantinou_V3_SRT_French.mp4',
        javier: 'https://dqdi1yce51qjt.cloudfront.net/french-with-caption/Acevedo_V3_SRT_French.mp4',
        ella: 'https://dqdi1yce51qjt.cloudfront.net/french-with-caption/Jansen_V3_SRT_French.mp4',
        marie: 'https://dqdi1yce51qjt.cloudfront.net/french-with-caption/Marie-Alex-Belanger-French.mp4'

        // Include other French video URLs here...
    };


    //this switches the videos from englisht to french
    const videoUrls = language === 'english' ? englishVideos : frenchVideos;
    console.log('Video URLs:', videoUrls);


    ///////////////////////////////////////////////////////////////////
    const videoRefs = {
        damian: useRef(null),
        finlay: useRef(null),
        ella: useRef(null),
        javier: useRef(null),
        marissa: useRef(null)
        // Add refs for other videos as needed
    };



    return (
        <InView>
            <div className='messages-page'>
                <div className='page-title-div'>
                    <h1 className='page-title'>{language === 'english' ? `The Athlete's Voice` : 'Écoutez vos Héros'}</h1>

                </div>
                {/* <div className='lang-button-div'>
                    <button className='mobile-btn-lang' onClick={toggleLanguage}>{language === 'english' ? 'Passer au Français' : 'Switch to English'}</button>
                </div> */}
                <div className='welcome-statement default-div'>
                    <p className='Athlete-message'>{language === 'english' ? 'We asked some of the top Canadian athletes in swimming, athletics, and volleyball why Safe Sport is important for athletes and what it means to them. See what they had to say below.' : 'Nous avons demandé à certains des meilleurs athlètes canadiens en natation, athlétisme et volley-ball pourquoi le Sport Sécuritaire est important pour les athlètes et ce que cela représente pour eux. Découvrez ce qu`ils avaient à dire ci-dessous.'}</p>

                </div>
                <div className='hero-messages'>
                    <div className='content-section'>
                        <h2 className='Header-hero'> {language === 'english' ? `Damian Warner (Athletics)` : `Damian Warner (Athlétisme)`}</h2>
                        <p className='Athlete-message'>{language === 'english' ? ` Damian won decathlon gold at Tokyo 2020, setting an Olympic record as he became just the fourth man to ever break the 9000-point mark. Warner led the Olympic decathlon from start to finish as he completed the two-day, 10-discipline event with 9018 points to become the first Canadian to earn the honorary title of World's Greatest Athlete. Warner had previously won bronze at Rio 2016 and finished fifth in his Olympic debut in the grueling two-day event at London 2012.` : `Damian a remporté l'or au décathlon à Tokyo 2020, établissant un record olympique en devenant le quatrième homme à franchir la barre des 9 000 points. Warner a mené le décathlon olympique du début à la fin en complétant l'épreuve de deux jours regroupant 10 disciplines avec 9 018 points pour devenir le premier Canadien à remporter le titre honorifique de meilleur athlète du monde. Warner avait déjà remporté le bronze à Rio 2016 et terminé cinquième à ses débuts olympiques lors de l'épreuve épuisante de deux jours à Londres 2012.
`}</p>

                        <br></br>
                        <p className='Athlete-message'>{language === 'english' ? `Damian started in track and field at 17, at the suggestion of his high school basketball coaches. He had his Olympic dream sparked by watching Catriona Le May Doan and Donovan Bailey compete when he was a kid. Outside of sport Damian graduated from Fanshawe College in 2010 and enjoys art and drawing, playing video games, and traveling. His favourite motto is: “You can do anything you set your mind to” and his role model is Vince Carter, who he watched as a kid and inspired him to pursue professional sports.` : `Damian a commencé l'athlétisme à 17 ans, sur la suggestion de ses entraîneurs de basket-ball au lycée. Son rêve olympique a été suscité en regardant Catriona Le May Doan et Donovan Bailey concourir lorsqu'il était enfant. En dehors du sport, Damian est diplômé du Fanshawe College en 2010 et aime l'art et le dessin, jouer à des jeux vidéo et voyager. Sa devise préférée est : « Vous pouvez faire tout ce que vous voulez » et son modèle est Vince Carter, qu'il a observé lorsqu'il était enfant et qui l'a inspiré à poursuivre un sport professionnel.
`}</p>

                        <div className="video-Container">
                            <video
                                key={language}

                                poster={language === 'english' ? tnDamianEng : tnDamianFre}
                                id='HFYHVideo'

                                width="750"
                                height="500"
                                controls
                                controlsList="nodownload"

                            >
                                <source src={language === 'english' ? videoUrls.damian : videoUrls.damian} type="video/mp4" />
                            </video>

                        </div>
                    </div>
                    <div className='content-section'>
                        <h2 className='Header-hero'> {language === 'english' ? `Marissa Papaconstantinou (Para Athletics)` : `Marissa Papaconstantinou (Para-Athlétisme)`} </h2>
                        <p className='Athlete-message'>{language === 'english' ? `Marissa is a two-time Paralympian and medalist in track and field where she competes in the T64 100m and 200m. Born without her right foot, Marissa competes in the T64 category, a classification for athletes with the absence of one leg below the knee.` : `Marissa est une paralympienne médaillée et double médaillée en athlétisme, où elle concourt dans les épreuves de 100m et 200m T64. Née sans son pied droit, Marissa concourt dans la catégorie T64, une classification pour les athlètes n'ayant pas de jambe sous le genou.`}</p>

                        <br></br>
                        <p className='Athlete-message'>{language === 'english' ? `Marissa made her impressive international debut at the 2015 IPC World Championships where she finished seventh in the 200m and eighth in the 100m. In 2016, just a year later she made her Paralympic Games debut at age 16 in Rio de Janeiro where she ran a personal best 13.65 seconds in the 100m, finishing third in her heat. Marissa returned to the 2020 Paralympic Games in Tokyo, where she won Bronze in the T64 200m.` : `Marissa a fait ses débuts internationaux impressionnants aux Championnats du monde IPC 2015 où elle a terminé septième du 200m et huitième du 100m. En 2016, juste un an plus tard, elle a fait ses débuts aux Jeux paralympiques à l'âge de 16 ans à Rio de Janeiro où elle a couru en 13,65 secondes, un record personnel dans le 100m, terminant troisième de sa série. Marissa est retournée aux Jeux paralympiques de 2020 à Tokyo, où elle a remporté le bronze dans le 200m T64.`}</p>

                        <br></br>
                        <p className='Athlete-message'>{language === 'english' ? `Marissa took up Para athletics at age 11 at the Phoenix Track Club in Scarborough, Ont., and soon after was fitted with her first running blade. She's always participated in sports and also enjoys soccer and basketball.` : `Marissa a commencé l'athlétisme adapté à l'âge de 11 ans au Phoenix Track Club à Scarborough, en Ontario, et peu de temps après a été équipée de sa première lame de course. Elle a toujours participé aux sports et aime aussi le soccer et le basketball.`}</p>

                        <div className="video-Container">
                            <video

                                id='HFYHVideo'
                                key={language}
                                poster={language === 'english' ? tnMarissaEng : tnMarissaFre}
                                width="750"
                                height="500"
                                controls
                                controlsList="nodownload"

                            >
                                <source src={language === 'english' ? videoUrls.marissa : videoUrls.marissa} type="video/mp4" />
                            </video>

                        </div>
                    </div>
                    <div className='content-section'>
                        <h2 className='Header-hero'> {language === 'english' ? `Finlay Knox (Swimming)` : `Finlay Knox (Natation)`}</h2>
                        <p className='Athlete-message'>{language === 'english' ? `Finlay Knox is a 2024 World Champion in the 200-metre individual medley and was a member of the Canadian Olympic swim team in Tokyo 2020. Finlay is also two-time short-course world championship medallist, a Pan American Games champion in the 200-metre IM, and won two bronze medals in the 2023 PanAm games as part of the men's 4x100 metre freestyle relay and the mixed 4x100 freestyle relay teams. He fell in love with the water while living in New Zealand before he and his family moved to Okotoks, Alberta, where he began his competitive swimming career.` : `Finlay Knox est champion du monde 2024 au 200 mètres quatre nages individuel et a été membre de l'équipe olympique canadienne de natation à Tokyo 2020. Finlay est également deux fois médaillé aux Championnats du monde en petit bassin et champion des Jeux panaméricains au 200 mètres quatre nages. mètres IM et a remporté deux médailles de bronze aux Jeux panaméricains de 2023 dans le cadre du relais 4x100 mètres libre masculin et des équipes mixtes de relais 4x100 libre. Il est tombé amoureux de l'eau alors qu'il vivait en Nouvelle-Zélande avant de déménager avec sa famille à Okotoks, en Alberta, où il a commencé sa carrière de nageur de compétition.`}</p>

                        <div className="video-Container">
                            <video

                                id='HFYHVideo'
                                key={language}
                                poster={language === 'english' ? tnFinlayEng : tnFinlayFre}
                                width="750"
                                height="500"
                                controls
                                controlsList="nodownload"

                            >

                                <source src={language === 'english' ? videoUrls.finlay : videoUrls.finlay} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    <div className='content-section'>
                        <h2 className='Header-hero'>{language === 'english' ? `Javier Acevedo (Swimming)` : `Javier Acevedo (Natation)`}  </h2>
                        <p className='Athlete-message'>{language === 'english' ? `Two-time Olympian Javier Acevedo was the youngest Canadian to earn a spot on the Rio 2016 Olympic swim team at age 18. He represented Canada again at the 2020 Olympic Games in Tokyo. Hailing from Toronto, Acevedo is a five-time world championship medallist and four-time Commonwealth Games medalist. Acevedo trains at the High Performance Centre - Ontario located in Toronto.` : `Javier Acevedo, double olympien, a été le plus jeune Canadien à obtenir une place dans l'équipe de natation olympique de Rio 2016 à l'âge de 18 ans. Il a représenté le Canada à nouveau aux Jeux olympiques de 2020 à Tokyo. Originaire de Toronto, Acevedo est médaillé cinq fois aux championnats du monde et quatre fois aux Jeux du Commonwealth. Acevedo s'entraîne au Centre de haute performance - Ontario situé à Toronto.`}</p>

                        <div className="video-Container">
                            <video

                                id='HFYHVideo'
                                key={language}
                                poster={language === 'english' ? tnJavierEng : tnJavierFre}
                                width="750"
                                height="500"
                                controls
                                controlsList="nodownload"

                            >
                                <source src={language === 'english' ? videoUrls.javier : videoUrls.javier} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    <div className='content-section'>
                        <h2 className='Header-hero'> {language === 'english' ? `Ella Jansen (Swimming)` : `Ella Jansen (Natation)`} </h2>
                        <p className='Athlete-message'>{language === 'english' ? `Ella Jansen is a two-time medalist at the 2022 Commonwealth Games and was named Swimming Canada's Breakout Swimmer of the Year in 2022. She was also part of the 2023 World Aquatics Championships team that competed in Fukuoka, Japan. Jansen trains at the High Performance Centre - Ontario located in Toronto.` : `Ella Jansen est médaillée deux fois aux Jeux du Commonwealth de 2022 et a été nommée Nageuse émergente de l'année par Natation Canada en 2022. Elle a également fait partie de l'équipe des Championnats du monde d'athlétisme 2023 qui a concouru à Fukuoka, au Japon. Jansen s'entraîne au Centre de haute performance - Ontario situé à Toronto.`}</p>

                        <div className="video-Container">
                            <video

                                id='HFYHVideo'
                                key={language}
                                poster={language === 'english' ? tnEllaEng : tnEllaFre}
                                width="750"
                                height="500"
                                controls
                                controlsList="nodownload"
                            // onPlay={() => handlePlay('ella')}
                            >
                                <source src={language === 'english' ? videoUrls.ella : videoUrls.ella} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    <div className='content-section'>
                        <h2 className='Header-hero'>  {language === 'english' ? `Marie-Alex Bélanger (Volleyball)` : `Marie-Alex Bélanger (Volleyball)`} </h2>

                        <p className='Athlete-message'>{language === 'english' ? `Volleyball athlete Marie-Alex Bélanger, originally from Saint-Alphonse-Rodriguez, Quebec, started her volleyball career in indoor court and switched to beach volleyball later in her career. She competed for the Université de Montreal Carabins for five years and was part of their 2015 National Championship bronze medal team. Marie-Alex earned the Mary Lyons Award for U Sports Women's Volleyball Player of the Year and the U Sports Female athlete of the year in 2018. Bélanger was a member of the Canadian women's national volleyball team, participating in the 2017 FIVB Volleyball World Grand Prix and the 2018 FIVB Volleyball Women's World Championship. After competing for several European professional volleyball teams, Bélanger began focusing on beach volleyball, reaching the podium in 2022 and 2023 on the NORCECA (North, Central America and Caribbean Volleyball Confederation) circuit.` : `L'athlète de volleyball Marie-Alex Bélanger, originaire de Saint-Alphonse-Rodriguez, au Québec, a commencé sa carrière de volleyball en salle et est passée au beach-volley plus tard dans sa carrière. Elle a compétitionné pour les Carabins de l'Université de Montréal pendant cinq ans et a fait partie de leur équipe médaillée de bronze aux championnats nationaux de 2015. Marie-Alex a remporté le prix Mary Lyons pour la Joueuse de l'année en volleyball féminin de U Sports et l'athlète féminine de l'année de U Sports en 2018. Bélanger a été membre de l'équipe nationale féminine de volleyball du Canada, participant au Grand Prix mondial de volleyball de la FIVB 2017 et au Championnat du monde de volleyball féminin de la FIVB 2018. Après avoir compétitionné pour plusieurs équipes professionnelles de volleyball européennes, Bélanger a commencé à se concentrer sur le beach-volley, atteignant le podium en 2022 et 2023 sur le circuit de la NORCECA (Confédération de volleyball d'Amérique du Nord, centrale et des Caraïbes).`}</p>

                        <div className="video-Container">
                            <video

                                id='HFYHVideo'
                                key={language}
                                poster={language === 'english' ? tnMarieEng : tnMarieFre}
                                width="750"
                                height="500"
                                controls
                                controlsList="nodownload"
                            // onPlay={() => handlePlay('ella')}
                            >
                                <source src={language === 'english' ? videoUrls.marie : videoUrls.marie} type="video/mp4" />
                            </video>
                        </div>
                    </div>


                </div>
            </div>
        </InView >
    );
};

export default HeroMsg;