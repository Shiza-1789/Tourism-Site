import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import PurchasedTourItem from "./PurchasedTourItem";

const PutchasedTourList = observer (() => {
    const {tour} = useContext(Context)

    return (
        <div className="h-[300px] grid gap-10 justify-items-center overflow-y-auto">
            {tour.purchasedTours.length !== 0 ?
                tour.purchasedTours.map(purchasedTour =>
                    <PurchasedTourItem key={purchasedTour.id} purchasedTour={purchasedTour.tour}/>   
                )
                :
                <div className="self-center text-2xl md:text-3xl">Оплаченных туров нет!</div>
            }
        </div>
    )
})

export default PutchasedTourList;