import React, { useEffect } from "react";
import '../styleSheets/main.css';
import layerBase from "../img/layer-base.png"
import layerMiddle from "../img/layer-middle.png"
import layerFront from "../img/layer-front.png"
import { MAIN_ROUTE } from "../utils/consts";
  
const MainPage = () =>{
    var baseStyle = {
        backgroundImage: "url("+ layerBase + ")"
      };
    var middleStyle = {
        backgroundImage: "url("+ layerMiddle + ")"
      }; 
    var frontStyle = {
        backgroundImage: "url("+ layerFront + ")"
      }; 

    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset
            document.getElementById("clas").style.cssText += `--scrollTop: ${position}px`
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    })

    return(   
        <div id="clas" className="wrapper">
            <div className="content">

                <header className="main-header">
                    <div className="layers">
                        <div className="layer__header">
                            <div className="layers__caption">Добро пожаловать!</div>
                            <div className="layers__title">Туристическая фирма "Костер"</div>
                        </div>
                        <div className="layer layers__base" style={baseStyle}></div>
                        <div className="layer layers__middle" style={middleStyle}></div>
                        <div className="layer layers__front" style={frontStyle}></div>
                    </div>
                </header>
            
                <article className="main-article bg-black px-10" >
                    <div className="main-article__content">
                        <h2 className="main-article__header">Наша миссия</h2>
                        <p className="main-article__paragraph leading-4 md:leading-8">Мы стараемся сделать все наши путешествия максимально комфортными и доступными, потому что хорошо знаем, как непросто бывает решиться на приключение под названием "поход". Мы внимательно относимся к каждому туристу!

Отвечаем на все ваши вопросы, тщательно консультируем по снаряжению, помогаем с покупкой билетов и оформлением документов. Всегда учитываем пожелания по маршруту, питанию и организации. А самая важная награда для нас - ваши хорошие отзывы!

Каждое наше путешествие - это не только интересный маршрут, но и возможность встретить настоящих друзей. Мы много общаемся, помогаем друг другу, поём песни у костра, любуемся звёздами по ночам. А ещё, мы убеждены, что в походах рождаются самые крепкие семьи!</p>
                    </div>
                    <div className="copy">© Дипломный проект Авджян</div>
                </article>

            </div>
        </div>
    )
}
export default MainPage;