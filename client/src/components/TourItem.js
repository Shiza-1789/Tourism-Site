import React from "react";
import { useNavigate } from "react-router-dom";
import { TOUR_ROUTE } from "../utils/consts";

const TourItem = ({tour}) => {
    const navigate = useNavigate();

    return (
        <div 
            className="w-full md:max-w-[900px] h-[300px] md:h-52 outline outline-2 outline-black rounded-lg"
            style={{backgroundImage: `url(${process.env.REACT_APP_API_URL + tour.img})`}}
            onClick={() => navigate(TOUR_ROUTE + '/' + tour.id)}
        >
            <div className="md:grid md:grid-cols-2 w-full h-full bg-gradient-to-b md:bg-gradient-to-r from-transparent from-40% md:from-30%  via-white via-60% md:via-50% to-white">
                <div></div>
                <div className="grid justify-items-center gap-4">
                    <a className="text-white stroke-black text-stroke text-xl self-center text-center pt-44 md:pt-2 md:w-[300px]">{tour.name}</a>                
                    <div className="grid grid-cols-2 text-center gap-4 content-center">  
                        <a className="w-36 h-12 bg-white place-self-end border rounded-lg">Длительность в днях: {tour.duration}</a>
                        <a className="w-36 h-12 bg-white place-self-end border rounded-lg">Цена:<br/>{tour.price}р.</a>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default TourItem;