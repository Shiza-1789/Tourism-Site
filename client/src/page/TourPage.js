import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { deleteTour, fetchOneTour } from "../http/tourAPI";
import { useNavigate, useParams } from "react-router-dom";
import deleteIcon from "../img/delete.png"
import { LOGIN_ROUTE, TOURS_ROUTE } from "../utils/consts";
import { purchaseTour } from "../http/ukassaAPI";
import { checkAvaible } from "../http/ordersAPI";

const TourPage = () =>{
    const {user} = useContext(Context)
    const [tour, setTour] = useState({})
    const [tourAvaible, setTourAvaible] = useState(true)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchOneTour(id)
        .then(data => {
            setTour(data)
        })
        checkAvaible(id)
        .then(data => {
            console.log(data)
            setTourAvaible(data)
        })
    }, [])

    const purchaseTourClick = async () => {
        if (!user.isAuth) {
            navigate(LOGIN_ROUTE)
            return
        }

        const response = await purchaseTour(user.user.id, id);
        window.location.replace(response.url)
    }

    const deleteClick = async () => {
        try {
            await deleteTour(id)
            navigate(TOURS_ROUTE)
        } catch (e) {
            alert(e)
        }        
    }

    return(
        <div className="grid w-full justify-items-center divide-y divide-solid md:text-lg">
            <div 
                className="w-full grid justify-items-center bg-top bg-cover"
                style={{backgroundImage: `url(${process.env.REACT_APP_API_URL + tour.img})`}}
            >
                <div className="grid w-full bg-gradient-to-b from-transparent from-30% via-white via-60% to-white">
                    <div className="grid w-full h-[200px]">
                        {user.user.role === "ADMIN" && 
                            <img className="justify-self-end w-12 h-12 m-4 cursor-pointer" src={deleteIcon} onClick={() => deleteClick()}/>
                        }
                    </div>
                    <h1 className="text-xl font-sans font-semibold pb-4 justify-self-center">{tour.name}</h1>
                </div>
            </div>
            <div className="py-4 grid w-full justify-items-center gap-4 px-5">
                <div className="w-full flex gap-4 justify-around">
                    <a className="w-28 text-center">Длительность в днях: {tour.duration}</a>
                    <a className="self-center">Цена: {tour.price}р.</a>
                </div>
                {tourAvaible ? 
                <button className="w-24 h-10 outline outline-2" onClick={() => purchaseTourClick()}>Купить</button>
                :
                <div className="w-24 h-10 outline outline-2 text-center grid"><a className="self-center">Нет мест</a></div>
                }
            </div>
            <ul className="w-full px-5 list-disc py-4 px-5">
                <li>Место прохождения: {tour.place}</li>
                <li>Количество человек: {tour.amountofparticipants}</li>
                <li>Сложность тура: {tour.difficulty}</li>
                <li>Дата проведения: {tour.date}</li>
            </ul>
            <div className="texl-lg w-full text-left py-4 px-5">
                <p className="font-bold">Описание тура</p>               
                <a>{tour.description}</a>            
            </div>
        </div>
    )
}
export default TourPage;