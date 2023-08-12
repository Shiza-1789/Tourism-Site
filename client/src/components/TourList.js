import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import TourItem from "./TourItem";

const TourList = observer (() => {
    const {tour} = useContext(Context)

    return (
        <div className="grid gap-10 justify-items-center">
            {tour.tours.map(tour =>
                <TourItem key={tour.id} tour={tour}/>   
            )}
        </div>
    )

})

export default TourList;