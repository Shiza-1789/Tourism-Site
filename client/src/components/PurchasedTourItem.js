import React from "react";

const PurchasedTourItem = ({purchasedTour}) => {
    const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric' }
    return (
        <div 
            className="w-full md:max-w-[800px] h-[300px] md:h-52 rounded-lg"
            style={{backgroundImage: `url(${process.env.REACT_APP_API_URL + purchasedTour.img})`}}
        >
            <div className="md:grid md:grid-cols-2 w-full h-full bg-gradient-to-b md:bg-gradient-to-r from-transparent from-40% md:from-30% via-white via-60% md:via-50% to-white">
                <div></div>
                <div className="grid justify-items-center gap-4">
                    <a className="text-white stroke-black text-stroke text-xl self-center text-center pt-44 md:pt-2 md:w-[300px]">{purchasedTour.name}</a>                
                    <div className="grid grid-cols-2 text-center gap-4 content-center">  
                        <a className="w-36 h-12 bg-white place-self-end border rounded-lg">Дата тура:<br/>{purchasedTour.date}</a>
                        <a className="w-36 h-12 bg-white place-self-end border rounded-lg">Длительность в днях: {purchasedTour.duration}</a>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default PurchasedTourItem;